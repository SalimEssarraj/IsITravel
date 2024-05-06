import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'


//Vuesax
import Vuesax from 'vuesax3'
import 'vuesax3/dist/vuesax.css' //Vuesax styles

//Material Icons
import 'material-icons/iconfont/material-icons.css';


//Bootstrap

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

const vuetify = createVuetify({
    components,
    directives,
  })

createApp(App).use(vuetify).use(Vuesax).use(router).mount('#app')
