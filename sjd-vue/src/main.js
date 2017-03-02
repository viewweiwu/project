// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routers.js';
import rem from './rem.js';
import Mint from 'mint-ui';

import 'mint-ui/lib/style.css';
import './assets/less/main.less';

Vue.use(VueRouter);
Vue.use(Mint);

Vue.config.productionTip = false;

// 实例化VueRouter
const router = new VueRouter({
    mode: 'hash',
    routes
});

const app = new Vue({
    router
}).$mount('#app');