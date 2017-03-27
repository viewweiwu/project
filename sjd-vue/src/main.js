// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routers.js';
import rem from './rem.js';
import Mint from 'mint-ui';
import * as Cookies from 'es-cookie';

import 'mint-ui/lib/style.css';
import './assets/font/iconfont.css';
import './assets/less/main.less';

Vue.use(VueRouter);
Vue.use(Mint);

Vue.config.productionTip = false;

// 实例化VueRouter
const router = new VueRouter({
    mode: 'hash',
    routes
});

router.beforeEach((to, from, next) => {
    let openId = Cookies.get('_openid');
    let list = [
        "car/add",
        "car/detail",
        "car/list",
        "trip/detail",
        "trip/list",
        "trip/map",
        "trip/detail",
        "user/info",
        "user/report",
        "home",
        "resetPwd",
        "purse",
    ];
    if (!openId) {
        let href = "/wxauthorize/authorize?callback_url=" + encodeURIComponent(location.href.replace(/\?.*#/g, "#"));
        // location.href = href;
    }

    if (list.indexOf(to.name) >= 0) {
        // 校验 cookie
        let name = Cookies.get('_dc');
        if (name) {
            next();
        } else {
            next({ name: 'login/login' });
        }
    } else {
        next();
    }
})

const app = new Vue({
    router
}).$mount('#app');