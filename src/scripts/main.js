import Vue from 'vue';
import Router from 'vue-router';
import Resource from 'vue-resource';
// Routes
import Home from './modules/views/Home.vue';

// Use VueRouter
Vue.use(Router);
let router = new Router();

// Use VueResource
Vue.use(Resource);
Vue.http.options.root = '/';

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
