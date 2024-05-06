<template>
  <div class="login-page">
    <div v-if="loggedIn" class="user-info">
      <h1 style="color:white;">{{ username }}</h1>
      <b><p style="color:white;">{{ email }}</p></b>
      <button class="logout-button" @click="logout">Logout</button>
    </div>
    <div class="form" v-if="!loggedIn">
      <form class="login-form">
        <h1 class="form-title" style="font-weight:bold;">Login su IsITravel</h1>
        <div class="input-container">
          <input type="text" placeholder="Username *" class="input-field" id="Username"/>
          <div class="password-container">
            <input :type="showPassword ? 'text' : 'password'" id="password" class="input-field" placeholder="Password *">
            <span class="iconaPassword" @click="togglePasswordVisibility">
              <icon size="25" class="mdi mdi-eye" :class="showPassword ? 'mdi mdi-eye-off' : 'mdi mdi-eye'"></icon>
            </span>
          </div>
        </div>
       <button type="button" class="submit-button" @click="Login" style="color:white">Login</button>
        <p class="message">Non hai un account? <router-link to="/registrati">Registrati</router-link></p>
      </form>
    </div>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');



.login-page { 
  overflow: hidden;
  font-family: "Montserrat", sans-serif;
  font-weight:300;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  min-height: 100vh; 
}

.form {
  width: 350px;
  padding: 20px;
  background: linear-gradient(to bottom, #2F095E, #6F1F9F);
  border-radius: 8px;
}
.form-title {
  margin-top: 0;
  margin-bottom: 30px; 
  color: white;
  text-align: center;
  font-size: 30px;
}

.input-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px; 
}

.input-field {
  border: 3px solid white;
  position: relative;
  width: 200px;
  padding: 10px 40px 10px 10px; 
  margin-bottom: 18px;
  color: #152A79; 
  font-weight:bold;
  background-color: #E6E6FA; 
  border-radius: 15px;
  box-sizing: border-box;
  flex: 1;
}

.iconaPassword {
  position: absolute;
  top: 40%;
  right: 10px; 
  transform: translateY(-50%);
  cursor: pointer;
}

.input-field:focus {
  outline: none;
  border-color: lightblue; 
}

.input-field::placeholder {
  color: #000;
  font-weight:bold;
}
.password-container {
  position: relative;
}

.input-field.password-field {
  padding-right: 35px; 
}
.submit-button {
  width: 80%;
  padding: 10px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  margin-top: 15px; 
  margin-left: auto;
  margin-right: auto; 
  display: block; 
}

.submit-button:hover {
  background: #0056b3;
}

.message {
  margin-top: 10px;
  text-align: center;
  color:white;
}

.message a {
  color: white;
  font-weight: bold;
}
.iconaPassword i {
  color: #999;
}
.user-info {
  display: flex;
  position:relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to bottom, #2F095E, #6F1F9F);
  width: 300px;
  height: 200px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 10px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.user-info h2 {
  font-size: 24px;
  color: white;
  margin-bottom: 10px; 
}

.user-info p {
  font-size: 18px;
  color: white; 
  color: #666;
  margin-bottom: 10px; 
}

.logout-button {
  margin-top: 10px; 
  background-color: red;
  color: white;
  border: 2px solid red;
  border-radius: 10px;
  padding: 10px 20px;
  cursor: pointer;
}

.logout-button:hover {
  background-color: darkred;
  border-color: darkred;
}
</style>

<script>
import { jwtDecode } from 'jwt-decode';
import CryptoJS from 'crypto-js';
export default {
  data: () => ({
    loggedIn: false,
    username: '',
    email: '',
    showPassword: false
  }),
  methods: {
    openLoading(){
      this.$vs.loading()
      setTimeout( ()=> {
        this.$vs.loading.close()
      }, 4000);
    },
    Login(){
      const userValue = document.getElementById("Username").value;
      const pwValue = document.getElementById("password").value;

       if (!userValue || !pwValue ) {
    this.$vs.notify({title:'Errore',text:'I campi username, passowrd sono obbligatori!',color:'danger'});
    return;
  }
  const salt = "IsITravel"; 

  
  const saltedPassword = pwValue + salt;

  console.log(userValue)
  console.log(pwValue)
  const hashedPassword = CryptoJS.SHA256(saltedPassword).toString();

  const utenteInfo = {
    username: userValue,
    password: hashedPassword,
  };

  this.openLoading()


fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(utenteInfo)
  })


  .then(response => {


    if (!response.ok) {
      throw new Error('Errore durante il login dell\'utente');
    }
    return response.json();


  })
  .then(data => {
    console.log(data.message);
    this.$vs.notify({ title: 'Successo', text: data.message, color: 'success' });
    localStorage.setItem('jwtToken', data.token);
  
  
    const decodedToken = jwtDecode(data.token);
    this.username = decodedToken.username;
    this.email = decodedToken.email;
    this.loggedIn = true;

  })

  .catch(error => {
    console.error('Errore durante il login dell\'utente:', error);
    this.$vs.notify({ title: 'Errore', text: 'Credenziali errate o account non esistente.', color: 'danger' });
    
  });
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    logout() {
  
  fetch('http://localhost:3000/logout', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('jwtToken') 
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Errore durante il logout');
    }

    localStorage.removeItem("jwtToken");
    this.loggedIn = false;
    this.username = '';
    this.email = '';
    this.$vs.notify({ title: 'Successo', text: 'Logout effettuato con successo.', color: 'success' });
  })
  .catch(error => {
    console.error('Errore durante il logout:', error);
    this.$vs.notify({ title: 'Errore', text: 'Si è verificato un errore durante il logout.', color: 'danger' });
  });
}
  },
  mounted() {
    const jwtToken = localStorage.getItem('jwtToken');
    if (jwtToken) {
      const decodedToken = jwtDecode(jwtToken);
      const expirationTime = decodedToken.exp * 1000; 
    const currentTime = Date.now();
    const remainingTime = expirationTime - currentTime;
    const remainingSeconds = Math.ceil(remainingTime / 1000);
    console.log('Tempo rimanente prima della scadenza del token (in secondi):', remainingSeconds);
    if(remainingSeconds <= 0){
      localStorage.removeItem("jwtToken");
      this.loggedIn = false;
      this.username = '';
      this.email = '';
    }else{
      this.username = decodedToken.username;
      this.email = decodedToken.email;
      this.loggedIn = true;
    }
    }
  }
};
</script>
