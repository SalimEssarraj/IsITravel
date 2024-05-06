<template>
<div class="app-container">
<div class="header">
  <div class="container">
			<router-link to="/" style="color:white; font-size: 30px; font-weight:700; margin-top:15px;" id="TITOLO" class="logo">IsITravel</router-link>
			<ul style="color:white; float: right;">
      <li><router-link to="/AreaRiservata"><button class="btn-profile circle-icon"><span class="mdi mdi-account"></span></button></router-link></li>
				<li><router-link to="/login"><button class="btn-home">Login</button></router-link></li>
        <li><router-link to="/registrati"><button class="btn-about">Registrati</button></router-link></li>
			</ul>
	</div>
  </div>
  <router-view/>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');
body {
  margin: 0;
  font-family: "Montserrat", sans-serif;
  background-image: url('../img/imgspiaggia.jpg');
  background-size: cover;
  background-position: center;
}


body::before {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.25); 
}

.btn-home{
  font-weight:300;
  border: 2px solid white; 
  color: white; 
  padding: 10px 20px; 
  text-align: center; 
  text-decoration: none; 
  display: inline-block; 
  font-size: 16px; 
  margin: 4px 2px; 
  cursor: pointer;
  border-radius: 35px; 
  transition-duration: 0.4s;
}
.btn-profile {
  font-weight: 300;
  border: 2px solid white;
  color: white;
  padding: 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 100%; 
  transition-duration: 0.4s;
}

.circle-icon {
  width: 50px; 
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.btn-about {
  font-weight:300;
  background-color: #1190AF; 
  border: none; 
  color: white; 
  padding: 10px 20px; 
  text-align: center; 
  text-decoration: none; 
  display: inline-block; 
  font-size: 16px; 
  margin: 4px 2px; 
  cursor: pointer;
  border-radius: 35px; 
  transition-duration: 0.4s; 
}

.btn-home:hover{
	background-color: #0E126F;
}
.btn-about:hover {
  background-color: #0D4663; 
}

.logo {
  color: white;
  display: block;
  float: left;
  font-size: 3em;
  margin-top: 35px; 
  text-decoration: none;
}
.header {
	background-color:  #2F095E;
	box-shadow: 1px 1px 4px 0 rgba(0,0,0,.1);
	position: fixed;
	width: 100%;
	z-index: 3;
}

.header .container {
  text-align: right; 
}

.header ul {
  margin: 0;
  padding: 0;
  list-style: none;
  overflow: hidden;
  background-color: #2F095E;
}


.header li {
  display: inline-block; 
  margin-left: 10px; 
}

.header li a {
	display: block;
	padding: 20px 3px;
	text-decoration: none;
	color: white;
	font-weight: 600;
}



.header .logo {
	display: block;
	float: left;
	font-size: 2em;
	padding: 10px 20px 10px 20px;
	text-decoration: none;
}


.header .menu {
	clear: both;
	max-height: 0;
	transition: max-height .2s ease-out;
}




@media (max-width: 48em) {
  .header ul {
    float: none;
    text-align: center;
  }
  
  .header li {
    display: inline-block;
    margin: 1px;
  }
.btn-home{
    width: 55px;
    padding: 1px; 
    font-size: 14px;
    margin-right: 1px;
  width: auto; 
}
   .btn-profile {
    width: 25px;
    height: 25px;
    padding: 1px; 
    font-size: 14px; 
    margin-right: 1px;
    width: auto;
  }
  .btn-about {
    width: 75px;
    font-size: 14px;
    padding:1px;
    margin-right: 1px;
    width: auto;
  }

  .header li a {
    padding: 10px 5px;
    margin-top: 15px; 
  }
  #TITOLO{
    margin-top: 10px;
  }
}


</style>



<script>
export default {
  data() {
    return {
      showProfileNotificationIcon: false
    };
  },
  methods: {
    
  },
  mounted() {
  },
};
</script>