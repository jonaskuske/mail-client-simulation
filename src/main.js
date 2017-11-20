import Vue from 'vue';
import App from './App.vue';
import './assets/css/style.css';
import '../favicon.ico';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import 'jquery/src/jquery';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';

export const eventBus = new Vue();

new Vue({
  el: '#app',
  render: create => create(App)
});
