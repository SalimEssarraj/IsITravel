<template>
  <div class="RicercaVoli">
    <div class="row custom-row" style="margin-bottom: 50px;">
      <div class="col d-flex align-items-center justify-content-center" style="margin-top: 150px; background: linear-gradient(to bottom, #2F095E, #6F1F9F); border-radius: 10px; height: 75px;" >
        <h1 style="color:white; font-weight:bold; font-size: 30px;">Partenze</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 d-flex justify-content-center align-items-center">
        <div id="map"></div>
      </div>
      <div class="col-md-6">
        <div class="CarDV" v-for="(flight, index) in flights" :key="index">
        <div class="Card-scalo-body">
        <div v-if="flight.layovers && flight.layovers.length > 0">
              <p>Scalo:</p>
              <div v-for="(layover, layoverIndex) in flight.layovers" :key="layoverIndex">
                <p>{{ layover.name }} - Durata: {{ layover.duration }} min</p>
              </div>
            </div>
            </div>
          <div class="CarDV-header">
            <img :src="flight.airline_logo" class="airline-logo" alt="Airline Logo">
            <span class="airline-name">{{ flight.airline }} {{ flight.airplane }}</span>
          </div>
          <div class="CarDV-body">
            <div class="row">
              <div class="col">
                <p class="airport">{{ flight.departure_airport.id }}</p>
                <p class="time">{{ formatDateTime(flight.departure_airport.time) }}</p>
                <p class="airport">{{ flight.departure_airport.name }}</p>
              </div>
              <div class="col">
                <p class="arrow">&#8594;</p>
              </div>
              <div class="col">
                <p class="airport">{{ flight.arrival_airport.id }}</p>
                <p class="time">{{ formatDateTime(flight.arrival_airport.time) }}</p>
                <p class="airport">{{ flight.arrival_airport.name }}</p>
              </div>
            </div>
            <hr>
            <p class="details">
              <span>{{ flight.travel_class }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import L from 'leaflet';
import moment from 'moment';
import 'moment/locale/it';
export default {
  data() {
    return {
      arrayData: null,
      map: null,
      planeIcon: null,
      planeMarker: null,
      flightPath: null,
      flights: [
        {
          "departure_airport": {
            "name": "Milan Malpensa Airport",
            "id": "MXP",
            "time": "2024-05-04 07:15"
          },
          "arrival_airport": {
            "name": "Paris Charles de Gaulle Airport",
            "id": "CDG",
            "time": "2024-05-04 08:45"
          },
          "duration": 90,
          "airplane": "Airbus A320",
          "airline": "Air France",
          "airline_logo": "https://www.gstatic.com/flights/airline_logos/70px/AF.png",
          "travel_class": "Economy",
          "flight_number": "AF 1131",
          "legroom": "29 in",
          "extensions": [
            "Below average legroom (29 in)",
            "Wi-Fi for a fee",
            "In-seat USB outlet",
            "Carbon emissions estimate: 69 kg"
          ]
        },
        {
          "departure_airport": {
            "name": "Paris Charles de Gaulle Airport",
            "id": "CDG",
            "time": "2024-05-04 11:50"
          },
          "arrival_airport": {
            "name": "Rabat-Salé Airport",
            "id": "RBA",
            "time": "2024-05-04 13:45"
          },
          "duration": 175,
          "airplane": "Airbus A320",
          "airline": "Air France",
          "airline_logo": "https://www.gstatic.com/flights/airline_logos/70px/AF.png",
          "travel_class": "Economy",
          "flight_number": "AF 1258",
          "legroom": "29 in",
          "extensions": [
            "Below average legroom (29 in)",
            "Wi-Fi for a fee",
            "In-seat USB outlet",
            "Carbon emissions estimate: 152 kg"
          ],
          "layovers":[ {
          "duration": 185,
          "name": "Paris Charles de Gaulle Airport",
          "id": "CDG"
          }
        ],
        "price":612,
        }
      ],
    };
  },
  methods: {
    async getAirportCoordinatesDA(departureIataCode) {
      try {
        const response = await fetch(`https://port-api.com/airport/iata/${departureIataCode}`);
        const data = await response.json();
        const coordinates = {
          latitude: data.geometry.coordinates[1],
          longitude: data.geometry.coordinates[0]
        };
        return coordinates;
      } catch (error) {
        console.error('Errore durante il recupero delle coordinate:', error);
        return null;
      }
    },
    async getAirportCoordinatesA(arrivalIataCode) {
      try {
        const response = await fetch(`https://port-api.com/airport/iata/${arrivalIataCode}`);
        const data = await response.json();
        const coordinates = {
          latitude: data.geometry.coordinates[1],
          longitude: data.geometry.coordinates[0]
        };
        return coordinates;
      } catch (error) {
        console.error('Errore durante il recupero delle coordinate:', error);
        return null;
      }
    },
    movePlaneAlongPath() {
      const latlngs = this.flightPath.getLatLngs();
      let currentIndex = 0;

      const movePlane = () => {
        const currentLatLng = latlngs[currentIndex]; 
        this.planeMarker.setLatLng(currentLatLng); 
        currentIndex = (currentIndex + 1) % latlngs.length; 

        
        setTimeout(movePlane, 1500);
      };

      movePlane(); 
    },
    formatDateTime(dateTime) {
      moment.locale('it');
  return moment(dateTime).format('ddd, D MMMM, YYYY').replace(/^\w/, (c) => c.toUpperCase());
    },
  },
  mounted() {
    this.arrayData = JSON.parse(localStorage.getItem('RicercaVoli'));
    this.map = L.map('map').setView([51.5, -0.09], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    if (this.arrayData) {
      const departureIataCode = this.arrayData[0].iataCodeDa;
      const arrivalIataCode = this.arrayData[0].iataCodeA;

      Promise.all([
        this.getAirportCoordinatesDA(departureIataCode),
        this.getAirportCoordinatesA(arrivalIataCode)
      ]).then(([departureCoordinates, arrivalCoordinates]) => {
        if (departureCoordinates && arrivalCoordinates) {
          const { latitude: departureLatitude, longitude: departureLongitude } = departureCoordinates;
          const { latitude: arrivalLatitude, longitude: arrivalLongitude } = arrivalCoordinates;

          L.marker([departureLatitude, departureLongitude]).addTo(this.map);
          L.marker([arrivalLatitude, arrivalLongitude]).addTo(this.map);

          this.planeIcon = L.divIcon({ html: '&#9992;', className: 'plane-icon', iconSize: [50, 50] });
          this.planeMarker = L.marker([departureLatitude, departureLongitude], { icon: this.planeIcon }).addTo(this.map);

          this.flightPath = L.polyline([[departureLatitude, departureLongitude], [arrivalLatitude, arrivalLongitude]]).addTo(this.map);

          this.movePlaneAlongPath();
        }
      });
    }
  },
};
</script>

<style>
.RicercaVoli {
  min-height: 100vh;
}

#map {
  height: 70vh;
  width: 95%;
  border: 2px solid #000;
  border-radius: 10px;
}

.plane-icon {
  font-size: 30px;
}

.custom-row {
  max-width: 50%;
  margin: 0 auto;
  position: relative;
}

.CarDV {
  margin-bottom: 5px;
  position: relative;
  width: 95%;
  border: 1px solid #e0e0e0;
  background-color: #fff;
  border-radius: 5px;
}

.CarDV-header {
  background-color: #f5f5f5;
  padding: 10px;
  display: flex;
  align-items: center;
}

.airline-logo {
  width: 30px;
  height: 30px;
  margin-right: 10px;
}

.airline-name {
  font-weight: bold;
}

.CarDV-body {
  padding: 20px;
}
.Card-scalo-body {
  padding:20px;
}
.airport {
  font-size: 16px;
  margin-bottom: 5px;
}

.time {
  font-size: 14px;
  color: #666;
}

.arrow {
  font-size: 24px;
  text-align: center;
}

.duration {
  font-size: 14px;
  color: #666;
  margin-top: 10px;
}

.details {
  margin-bottom: 10px;
}

.legroom, .extensions {
  margin-top: 10px;
}
</style>
