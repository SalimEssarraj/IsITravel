<template>
  <div class="AreaRiservata">
    </div>

</template>

<style >

</style>




<script>
import { jwtDecode } from 'jwt-decode';
export default {
  data() {
    return {
      Islogged: false,
      username: null,
      email: null,
    };
  },
  methods: {
    
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
      this.Islogged = false;
      this.username = '';
      this.email = '';
    }else{
      this.username = decodedToken.username;
      this.email = decodedToken.email;
      this.Islogged = true;
    }
    }
  },
};
</script>