<template>
  <div class="about">
    <div class="center-box">
      <div class="form-container" >
         <div style="color: white; text-align:center">
         <b><h1 style="display: inline; font-weight:bold; font-size: 30px;">Registrati su IsITravel</h1></b>
</div>
        <div class="grid-container">
          <div class="grid-item">
            <input type="text" id="name" class="custom-input" placeholder="Nome">
          </div>
          <div class="grid-item">
            <input type="text" id="surname" class="custom-input" placeholder="Cognome">
          </div>
          <div class="grid-item">
            <input type="email" id="email" class="custom-input" placeholder="Email *">
          </div>
          <div class="grid-item">
            <input type="text" id="username" class="custom-input" placeholder="Username *">
          </div>
          <div class="grid-item">
          <input :type="showPassword ? 'text' : 'password'" id="password" class="custom-input" placeholder="Password *">
          <span class="toggle-password" @click="togglePasswordVisibility">
            <icon size="25" class="mdi mdi-eye" :class="showPassword ? 'mdi mdi-eye-off' : 'mdi mdi-eye'"></icon>
          </span>
        </div>
          <div class="grid-item">
          <input :type="showPassword ? 'text' : 'password'" id="confermapassword" class="custom-input" placeholder="Conferma Password *">
          <span class="toggle-password" @click="togglePasswordVisibility">
            <icon size="25" class="mdi mdi-eye" :class="showPassword ? 'mdi mdi-eye-off' : 'mdi mdi-eye'"></icon>
          </span>
        </div>
          <vs-button class="vs-button" type="relief" @click="getInputValues">Conferma</vs-button>
        </div>
      </div>
    </div>
  </div>
</template>


<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');

.about { 
  background-size: cover;
  overflow: hidden;
  font-family: "Montserrat", sans-serif;
  font-weight:300;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh; 
}

.form-container {
  background: linear-gradient(to bottom, #2F095E, #6F1F9F);
  position: relative;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 10px 20px rgba(0,0,0,0.2); 
  margin-bottom: 20px; 
}


.form-container h1 {
  text-align: center;
  color: white;
  margin-bottom: 20px; 
}

.grid-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px; 
  margin-top: 40px;
  margin-bottom: 30px; 
}

.grid-item {
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 25px;
  padding: 10px;
}

.custom-input {
  border: 3px solid white;
  width: 200px;
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

.custom-input:focus {
  outline: none;
  border-color: lightblue; 
}

.custom-input::placeholder {
  font-weight:bold;
  color: #000;
}

.custom-label {
  color: white;
  margin-right: 10px; 
  text-align: right; 
}


.vs-button {
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: #007bff;
  border-radius: 15px;
}

.vs-button:hover {
  background: #0056b3;
}

.toggle-password {
  position: absolute;
  right: 18px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}

.toggle-password i {
  color: #999;
}

@media screen and (min-width: 768px) {
  .grid-container {
    grid-template-columns: repeat(2, 1fr);
  }
  .grid-item {
    justify-content: flex-end;
  }
}

@media screen and (max-width: 768px) {
  .form-container {
    margin-top: 100px; 
  }
}
</style>


<script>
import CryptoJS from 'crypto-js';
export default {
  data: () => ({
    showPassword: false
  }),
  methods: {
    openLoading(){
      this.$vs.loading()
      setTimeout( ()=> {
        this.$vs.loading.close()
      }, 4000);
    },
 getInputValues() {
  const emailValue = document.getElementById("email").value;
  const usernameValue = document.getElementById("username").value;
  const passwordValue = document.getElementById("password").value;
  const confirmPasswordValue = document.getElementById("confermapassword").value;

  if (!emailValue || !usernameValue || !passwordValue || !confirmPasswordValue) {
    this.$vs.notify({title:'Errore',text:'I campi email, username, passowrd e conferma password sono obbligatori!',color:'danger'});
    return;
  }

  if (passwordValue !== confirmPasswordValue) {
    this.$vs.notify({title:'Errore',text:'Le password non corrispondono!',color:'danger'});
    return;
  }

  const emailRegex = /^[^\s@]+@(gmail\.com|outlook\.it|yahoo\.com)$/;
  if (!emailRegex.test(emailValue)) {
    this.$vs.notify({title:'Errore',text:'L\'email deve avere dominio (@gmail.com, @yahoo.com, @outlook.it)!',color:'danger'});
    return;
  }

  const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
  if (!passwordRegex.test(passwordValue)) {
    this.$vs.notify({title:'Errore',text:'La password deve contenere almeno 8 caratteri, una lettera maiuscola e un carattere speciale (!@#$%^&*)',color:'danger'});
    return;
  }

  
  const salt = "IsITravel"; 

  
  const saltedPassword = passwordValue + salt;

  
  const hashedPassword = CryptoJS.SHA256(saltedPassword).toString();

const userData = {
    email: emailValue,
  };

 console.log(userData)

this.openLoading()
  fetch('http://localhost:3000/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })


  .then(response => {


    if (!response.ok) {
      throw new Error('Errore durante la registrazione dell\'utente');
    }
    return response.json();


  })
  .then(data => {
    console.log(data.message);
    this.$vs.notify({ title: 'Successo', text: data.message, color: 'success' });
    localStorage.setItem('userEmail', emailValue);
    localStorage.setItem('username', usernameValue);
    localStorage.setItem('password', hashedPassword);
    this.$router.push({ name: 'codeConfirm' });
  })

  .catch(error => {
    if (error.response && error.response.status === 400) {
    this.$vs.notify({ title: 'Errore', text: 'Email già utilizzata', color: 'danger' });
    }else{
    console.error('Errore durante la registrazione dell\'utente:', error);
    this.$vs.notify({ title: 'Errore', text: 'Email già registrata. Prova ad accedere o utilizzare un altra email.', color: 'danger' });
    }
  });
  

},
togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    }
},
  mounted() {
  }
};
</script>

