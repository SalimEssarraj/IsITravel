<template>
  <div class="codiceConf">
    <div class="box">
      <div class="formCodice">
        <div style="color: white; position: absolute; top: 10px; left: 15px; margin-bottom: 20px;">
          <b><h1 style="display: inline; font-weight:bold;">Verifica email</h1></b>
        </div>
        <div class="tabella-container">
          <div class="tabella-item">
            <input type="text" id="numero" class="input-codiceConf" placeholder="Inserisci il codice">
          </div>
          <vs-button class="pulsanteInvia" type="relief" @click="Invia">Invia</vs-button>
        </div>
      </div>
    </div>
  </div>
</template>


<style>
@import url('https://fonts.googleapis.com/css2?family=Kanit&display=swap');

.codiceConf { 
  background-size: cover;
  overflow: hidden;
  font-family: "Kanit", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh; 
}

.formCodice {
  background: linear-gradient(to bottom, #2F095E, #6F1F9F);
  position: relative;
  padding: 20px;
  width:300px;
  border-radius: 10px;
  box-shadow: 0px 10px 20px rgba(0,0,0,0.2); 
  margin-bottom: 20px; 
}


.formCodice h1 {
  text-align: center;
  color: white;
  margin-bottom: 20px; 
}

.tabella-container {
  display: grid;
  grid-template-rows: 1fr;
  gap: 20px;
  margin-top: 70px;
  margin-bottom: 30px;
}

.tabella-item {
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 40px;
}

.input-codiceConf {
  border: 3px solid white;
  width: 55%;
  padding: 8px;
  color: #152A79; 
  background-color: #E6E6FA; 
  border-radius: 15px;
  box-sizing: border-box;
  flex: 1;
}

.input-codiceConf:focus {
  outline: none;
  border-color: lightblue; 
}

.input-codiceConf::placeholder {
  color: #000;
}
.pulsanteInvia {
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: #007bff;
}
.pulsanteInvia:hover {
  background: #0056b3;
}
@media screen and (max-width: 768px) {
  .formCodice {
    margin-top: 100px; 
  }
}
</style>


<script>
export default {
  data: () => ({
    emailValue: null,
    passwordValue: null,
    usernameValue: null,
  }),
  methods: {
    Invia(){
  const codiceInserito = document.getElementById("numero").value;
  const userData = {
    email: this.emailValue,
    codice: codiceInserito,
    username: this.usernameValue,
    password: this.passwordValue,
  };

fetch('http://localhost:3000/verify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })


  .then(response => {
    if (!response.ok) {
      throw new Error('Errore durante la ricezione del codice dell\'utente');
    }
    return response.json();


  })
  .then(data => {
    console.log(data.message);
    this.$vs.notify({ title: 'Successo', text: data.message, color: 'success' });
    this.$router.push({ name: 'home' });
  })

  .catch(error => {

    console.error('Errore durante la registrazione dell\'utente:', error);
    this.$vs.notify({ title: 'Errore', text: 'Errore nel codice.', color: 'danger' });
    this.$router.push({ name: 'registrazione' });
  });



    }
},
  mounted() {
    this.emailValue = localStorage.getItem('userEmail');
    this.passwordValue = localStorage.getItem('password');
    this.usernameValue = localStorage.getItem('username');
  }
};
</script>

