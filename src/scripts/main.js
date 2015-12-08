import Vue from 'vue';
import Router from 'vue-router';
// Routes
import Home from './modules/views/Home.vue';

// Use VueRouter
Vue.use(Router);
let router = new Router();

// Create an base Vue class
let App = Vue.extend({});

// Set routes here
router.map({
    '/': {
        component: Home
    }
})

// Start app with default Vue class
router.start(App, '#app');
