import { createApp } from 'vue';
import App from './App.vue';
import router from "./router";
import AOS from 'aos';
import 'aos/dist/aos.css';
import i18n from './i18n';
import store from "./state/store";

import BootstrapVue3 from 'bootstrap-vue-3';
import vClickOutside from "click-outside-vue3";
import VueApexCharts from "vue3-apexcharts";
import Maska from 'maska';

import VueFeather from 'vue-feather';

import '@/assets/scss/config/default/app.scss';
import '@vueform/slider/themes/default.css';
import '@/assets/scss/mermaid.min.css';



AOS.init({
    easing: 'ease-out-back',
    duration: 1000
});

createApp(App)
    .use(store)
    .use(router)
    .use(VueApexCharts)
    .use(BootstrapVue3)
    .component(VueFeather.type, VueFeather)
    .use(Maska)
    .use(i18n)
    .use(vClickOutside).mount('#app');