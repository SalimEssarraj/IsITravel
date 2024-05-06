<template>
   <div class="main-comp">
        <div class="CardS custom-bg w-40 p-4 d-flex" v-if="FormVoli">
            <form id="flight-form">
            <h1 @click="CambioFormH" class="form-TITOLO" style="color:white">Volo <icon class="mdi mdi-airplane"></icon></h1>
            <div class="row">
    <div class="form-group col-md align-items-start flex-column">
        <div class="form-check">
  <input class="form-check-input" type="radio" name="flexRadioDefault" id="AndataRitorno">
  <label class="form-check-label" for="flexRadioDefault1">
    Andata e Ritorno
  </label>
</div>
    </div>
    <div class="form-group col-md align-items-start flex-column">
        <div class="form-check">
            <input class="form-check-input" type="radio" name="flexRadioDefault" id="Andata">
            <label class="form-check-label" for="Andata">
                Andata
            </label>
        </div>
    </div>
</div>
                <div class="row">
                    <div class="form-group col-md align-items-start flex-column">
                        <label for="Aerpar" class="d-inline-flex col-auto">Aeroporto partenza</label>
                        <div class="dropdown-container">
                            <input type="text" id="Da" class="inputPersHome" placeholder="Da" @input="RicercaAeroporti" @blur="closeDropdown">
                            <ul class="dropdown-list" v-if="showdrop && AeroportiTrovati.length > 0" style="color:black;">
                                <li v-for="(airport, index) in AeroportiTrovati.slice(0, 3)" :key="index" @click="AeroportoSelezionato(airport.iataCode)">
                                    <b>{{ airport.iataCode }}</b> | {{ airport.name }}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="form-group col-md align-items-start flex-column">
                    <label for="AerArr" class="d-inline-flex col-auto">Aeroporto arrivo</label>
                     <div class="dropdown-container">
                        <input type="text" id="A" class="inputPersHome" placeholder="A" @input="RicercaAeroportiA">
                        <ul class="dropdown-listA" v-if="showdropA && AeroportiTrovatiA.length > 0" style="color:black;">
                                <li v-for="(airport, index) in AeroportiTrovatiA.slice(0, 3)" :key="index" @click="AeroportoSelezionatoA(airport.iataCode)">
                                    <b>{{ airport.iataCode }}</b> | {{ airport.name }}
                                </li>
                            </ul>
                      </div>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-md align-items-start flex-column" >
                    <label for="datePar" class="d-inline-flex col-auto">Data partenza</label>
                        <input type="date" id="DataPartenza" class="inputPersHome DatePA">
                    </div>
                    <div class="form-group col-md align-items-start flex-column">
                    <label for="dateArr" class="d-inline-flex col-auto">Data arrivo</label>
                        <input type="date" id="DataArrivo" class="inputPersHome DatePA" >
                    </div>
                </div>
                <div class="row">
    <div class="form-group col-lg-3 align-items-start flex-column" id="numeroPersone" >
        <div style="display: flex; align-items: center;">
            <label for="adults" class="d-inline-flex col-auto" style="margin-right: 5px;">Adulti 12+</label>
            <span class="sublabel"></span>
        </div>
        <select class="inputPersHomeOP" id="adults">
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
        </select>
    </div>
    <div class="form-group col-lg-3 align-items-start flex-column dist" id="numeroPersone">
        <div style="display: flex; align-items: center;">
             <label for="children" class="d-inline-flex col-auto distlabelB">Bambini 2-11</label>
            <span class="sublabel"></span>
        </div>
        <select class="inputPersHomeOP" id="children">
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
        </select>
    </div>
    <div class="form-group col-lg-3 align-items-start flex-column dista"  id="numeroPersone">
        <div style="display: flex; align-items: center;">
            <label for="infants" class="d-inline-flex col-auto distlabelN" >Neonati 0-2</label>
            <span class="sublabel"></span>
        </div>
        <select class="inputPersHomeOP" id="infants">
            <option value="0">0</option>
            <option value="1">1</option>
        </select>
    </div>
</div>
                <div class="row">
    <div class="form-group col-md-4 align-items-start flex-column">
        <label for="cabin" class="d-inline-flex">Classe</label>
        <select class="inputPersHomeOP" id="classe">
            <option value="Economy">Economy</option>
            <option value="Premium economy">Premium Economy</option>
            <option value="Business">Business</option>
            <option value="First">First</option>
        </select>
    </div>
    <div class="form-group col-md-4 align-items-start flex-column">
        <div class="form-check form-switch VolD">
            <input class="form-check-input" type="checkbox" role="switch" id="Diretto">
            <label class="form-check-label" for="flexSwitchCheckDefault">Voli diretti</label>
        </div>
    </div>
    <div class="form-group col-md-4 align-items-start flex-column">
        <button type="button" class="btn btn-primary ButtF" data-bs-toggle="modal" data-bs-target="#exampleModal"><icon class="mdi mdi-filter"></icon></button>
    </div>
    </div>
                <div class="row justify-content-end align-items-end">
    <div class="text-right col-lg-6" style="margin-top: 20px;">
        <button type="button" class="btn btn-primary" @click="cercaVoli">Cerca voli</button>
    </div>
</div>
            </form>
        </div>




<!----MODAL-->
















<div class="CardS custom-bg w-40 p-4 d-flex" v-else>
            <form id="flight-form">
            <h1 @click="CambioFormV" class="form-TITOLO" style="color:white">Hotel <icon class="mdi mdi-bed"></icon></h1>
            <div class="row">
                    <div class="form-group col-md align-items-start flex-column" >
                    <label for="città" class="d-inline-flex col-auto">Città</label>
                        <input type="text" id="Città" class="inputPersHome" placeholder="Inserisci Città">
                    </div>
                    <div class="form-group col-md align-items-start flex-column">
                    <label for="cabin" class="d-inline-flex">Paese</label>
                      <select class="inputPersHomeOP" id="classe">
                      <option value="Economy">Paese</option>
                      <option value="Premium economy">Premium Economy</option>
                      <option value="Business">Business</option>
                      <option value="First">First</option>
                  </select>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-md align-items-start flex-column" >
                    <label for="CheckO" class="d-inline-flex col-auto">Check-in</label>
                        <input type="date" id="Checkin" class="inputPersHome DatePA">
                    </div>
                    <div class="form-group col-md align-items-start flex-column">
                    <label for="CheckI" class="d-inline-flex col-auto">Check-out</label>
                        <input type="date" id="Checkout" class="inputPersHome DatePA" >
                    </div>
                </div>
                <div class="row">
    <div class="form-group col-lg-3 align-items-start flex-column" id="numeroPersone" >
        <div style="display: flex; align-items: center;">
            <label for="adults" class="d-inline-flex col-auto" style="margin-right: 5px;">Adulti</label>
            <span class="sublabel"></span>
        </div>
        <select class="inputPersHomeOP" id="adults">
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
        </select>
    </div>
    <div class="form-group col-lg-3 align-items-start flex-column dist" id="numeroPersone">
        <div style="display: flex; align-items: center;">
             <label for="children" class="d-inline-flex col-auto distlabelB">Bambini</label>
            <span class="sublabel"></span>
        </div>
        <select class="inputPersHomeOP" id="children">
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
        </select>
    </div>
</div>

<div class="row">
<div class="form-group col-md-4 align-items-start flex-column">
        <button type="button" class="btn btn-primary ButtF" data-bs-toggle="modal" data-bs-target="#exampleModal1"><icon class="mdi mdi-filter"></icon></button>
  </div>
</div>
                <div class="row justify-content-end align-items-end">
    <div class="text-right col-lg-6">
        <button type="button" class="btn btn-primary">Cerca hotels</button>
    </div>
</div>
            </form>
        </div>
    </div>
   

<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" >
    <div class="modal-content" style="background: linear-gradient(to bottom, #2F095E, #6F1F9F);">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel" style="color: white; font-weight:bold">Filtri</h1>
        <button type="button" class=" btn-close" data-bs-dismiss="modal" aria-label="Close" style="color: white;"></button>
      </div>
      <div class="modal-body">
      <div style="color:white;">
          <b><label for="sliderValue">Prezzo massimo:</label>
          <span id="sliderValue"> 0€</span></b>
        </div>
        <input type="range" class="form-range" min="0" max="2000" step="200" @input="updateSliderValue">
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary">Salva</button>
      </div>
    </div>
  </div>
</div>


<div class="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" >
    <div class="modal-content" style="background: linear-gradient(to bottom, #2F095E, #6F1F9F);">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel" style="color: white; font-weight:bold">Filtri</h1>
        <button type="button" class=" btn-close" data-bs-dismiss="modal" aria-label="Close" style="color: white;"></button>
      </div>
      <div class="modal-body">
      <div style="color:white;">
          <b><label for="sliderValue">Prezzo massimo:</label>
          <span id="sliderValue"> 0€</span></b>
        </div>
        <input type="range" class="form-range" min="0" max="2000" step="200" @input="updateSliderValue">
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary">Salva</button>
      </div>
    </div>
  </div>
</div>


</template>

<script>
export default {
  data: () => ({
    FormVoli: true,
    AeroportiTrovati: [],
    showdrop: false,
    AeroportiTrovatiA: [],
    showdropA: false
  }),
  methods:{
    CambioFormH(){
      this.FormVoli = false
    },
    CambioFormV(){
      this.FormVoli = true
    },
    async RicercaAeroporti(event) {
  const searchQuery = event.target.value;
  if (!searchQuery) {
    this.AeroportiTrovati = [];
    return;
  }
  try {
    const response = await fetch(`https://port-api.com/airport/search/${searchQuery}`);
    const data = await response.json();
    this.showdrop = true
    const airports = data.features.map(feature => ({
      iataCode: feature.properties.iata,
      name: feature.properties.name
    }));

    
    this.AeroportiTrovati = airports;
  } catch (error) {
    console.error('Errore durante la ricerca degli aeroporti:', error);
  }
},

async RicercaAeroportiA(event) {
  const searchQueryA = event.target.value;
  if (!searchQueryA) {
    this.AeroportiTrovatiA = [];
    return;
  }
  try {
    const response = await fetch(`https://port-api.com/airport/search/${searchQueryA}`);
    const data = await response.json();
    this.showdropA = true
    const airports = data.features.map(feature => ({
      iataCode: feature.properties.iata,
      name: feature.properties.name
    }));

    
    this.AeroportiTrovatiA = airports;
  } catch (error) {
    console.error('Errore durante la ricerca degli aeroporti:', error);
  }
},
AeroportoSelezionato(iataCode) {
      const airport = this.AeroportiTrovati.find(airport => airport.iataCode === iataCode);
      if (airport) {
        document.getElementById('Da').value = airport.iataCode + ' ' + airport.name;
        this.showdrop = false
      }
    },
    AeroportoSelezionatoA(iataCode) {
      const airport = this.AeroportiTrovatiA.find(airport => airport.iataCode === iataCode);
      if (airport) {
        document.getElementById('A').value = airport.iataCode + ' ' + airport.name;
        this.showdropA = false
      }
    },
    cercaVoli() {
  const andataRitornoChecked = document.getElementById('AndataRitorno').checked;
  const andataChecked = document.getElementById('Andata').checked;
  const voliDirettiChecked = document.getElementById('Diretto').checked;

  const volo = {
    da: document.getElementById('Da').value,
    a: document.getElementById('A').value,
    iataCodeDa: document.getElementById('Da').value.split(' ')[0], // Aggiungi il codice IATA per la partenza
    iataCodeA: document.getElementById('A').value.split(' ')[0], // Aggiungi il codice IATA per l'arrivo
    dataPartenza: document.getElementById('DataPartenza').value,
    dataArrivo: document.getElementById('DataArrivo').value,
    adulti: document.getElementById('adults').value,
    bambini: document.getElementById('children').value,
    neonati: document.getElementById('infants').value,
    classe: document.getElementById('classe').value
  };

  if (andataRitornoChecked) {
    volo.andataRitorno = true;
  }
  if (andataChecked) {
    volo.andata = true;
  }
  if (voliDirettiChecked) {
    volo.voliDiretti = true;
  }

  const voliSalvati = [];

  voliSalvati.push(volo);
  localStorage.removeItem('RicercaVoli')
  localStorage.setItem('RicercaVoli', JSON.stringify(voliSalvati));
  this.$router.push({ name: 'RicercaV' });
},
    updateSliderValue(event) {
      const sliderValue = document.getElementById('sliderValue');
      sliderValue.textContent = " " +  event.target.value + "€";
    }
  },
  mounted(){
     
  }
};
</script>

<style>
.main-comp {
  background-size: cover;
  overflow: hidden;
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  min-height: 100vh;
  position: relative;
}
.CardS.custom-bg + .CardS.custom-bg {
  margin-top: 20px; /* Regola il margine superiore per separare i moduli */
}

.form-group {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  color:white;
}

.form-TITOLO {
  color: white;
  margin-bottom: 30px; 
  font-weight: bold;
  font-size: 35px;
}

label {
  text-align: right;
  margin-right: 5px;
  margin-left: 5px;
}
.dropdown-container {
    position: relative;
}
.dropdown-listA {
    position: absolute;
    top: calc(100% + 10px); 
    left: 0;
    z-index: 1000;
    width: 100%;
    background-color: #fff;
    border: 1px solid #ccc;
    border-top: none;
    list-style-type: none;
    padding: 0;
    margin: 0;
}

.ButtF, .VolD{
  margin-top: 15px;
}

.dropdown-listA li {
    padding: 5px 10px;
    cursor: pointer;
}

.dropdown-listA li:hover {
    background-color: #2B33F5;
    color: #fff;
}
.dropdown-list {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1000;
    width: 100%;
    background-color: #fff;
    border: 1px solid #ccc;
    border-top: none;
    list-style-type: none;
    padding: 0;
    margin: 0;
}
.dropdown-list li {
    padding: 5px 10px;
    cursor: pointer;
}

.dropdown-list li:hover {
    background-color: #2B33F5;
    color: #fff; /* Change text color to white */
}
.inputPersHome {
  border: 3px solid white;
  width: 240px;
  padding: 5px;
  color: #152A79; 
  font-weight:bold;
  background-color: #E6E6FA; 
  border-radius: 15px;
  box-sizing: border-box;
  flex: 1;
  position: relative;
  padding-right: 30px; 
}

.inputPersHome:focus {
  outline: none;
  border-color: lightblue; 
}
.inputPersHome::placeholder {
  font-weight:bold;
  color: #000;
}
button {
  padding: 10px 20px;
  background-color: #0050a0;
  border: none;
  cursor: pointer;
}

.inputPersHomeOP{
border: 3px solid white;
  width: 140px;
  height: 18px;
  padding: 8px;
  color: #152A79; 
  font-weight:bold;
  background-color: #E6E6FA; 
  border-radius: 15px;
  box-sizing: border-box;
  flex: 1;
  position: relative;
  padding-right: 30px;
}
.inputPersHomeOP:focus {
  outline: none;
  border-color: lightblue; 
}

.inputPersHomeOP::placeholder {
  font-weight:bold;
  color: #000;
}
.DatePA {
  position: relative;
}

.DatePA:before {
  content: attr(placeholder);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  color: rgba(0, 0, 0, 0.65);
  pointer-events: none;
  line-height: 1.5;
  padding: 10px 0.5rem 0 0.5rem;
}

.DatePA:focus:before,
.DatePA:not([value=""]):before {
  display: none;
}
.CardS.custom-bg {
  margin-top: 100px; 
}
.custom-bg {
  background: linear-gradient(to bottom, #2F095E, #6F1F9F);
  border-radius: 10px;
  box-shadow: 0px 10px 20px rgba(0,0,0,0.2); 
}

.dist select {
    margin-left: 20px; 
  }
.dista select {
    margin-left: 40px;
}

.distlabelB{
  margin-left:20px;
}

.distlabelN{
  margin-left:40px;
}


@media screen and (max-width: 768px) {
  .form-group {
    flex-direction: column;
    align-items: flex-start;
  }
.CardS.custom-bg {
    width: 80%; 
    margin-top: 100px; 
}
  label {
    width: auto;
    text-align: left;
    margin-right: 0;
    margin-left: 0;
  }

  .inputPersHome,
  .inputPersHomeOP,
  input[type="date"] {
    width: 100%;
    max-width: 300px; 
    font-size: 14px; 
    padding: 8px;
    border-radius: 10px; 
  }

  .dist select {
    margin-left: 0; 
  }
  .dista select {
    margin-left: 0; 
}

 .distlabelB, .distlabelN {
    margin-left: 0; 
  }

  button {
    padding: 8px 16px; 
    font-size: 14px; 
  }
}


</style>