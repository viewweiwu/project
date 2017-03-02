const Home = resolve => {
    require.ensure(['./views/home.vue'], () => {
        resolve(require('./views/home.vue'));
    });
};

const routers = [{
    path: '/home',
    name: 'home',
    component: Home
}, {
    path: '/purse',
    name: 'purse',
    component(resolve) {
        require.ensure(['./views/purse.vue'], () => {
            resolve(require('./views/purse.vue'));
        });
    }
}, {
    path: '/changePwd',
    name: 'changePwd',
    component(resolve) {
        require.ensure(['./views/changePwd.vue'], () => {
            resolve(require('./views/changePwd.vue'));
        });
    }
}, {
    path: '/login',
    name: 'login',
    component(resolve) {
        require.ensure(['./views/login.vue'], () => {
            resolve(require('./views/login.vue'));
        });
    }
}, {
    path: '/car/add',
    name: 'car/add',
    component(resolve) {
        require.ensure(['./views/car/add.vue'], () => {
            resolve(require('./views/car/add.vue'));
        });
    }
}, {
    path: '/car/list',
    name: 'car/list',
    component(resolve) {
        require.ensure(['./views/car/list.vue'], () => {
            resolve(require('./views/car/list.vue'));
        });
    }
}, {
    path: '/car/select',
    name: 'car/select',
    component(resolve) {
        require.ensure(['./views/car/select.vue'], () => {
            resolve(require('./views/car/select.vue'));
        });
    }
}, {
    path: '/trip/list',
    name: 'trip/list',
    component(resolve) {
        require.ensure(['./views/trip/list.vue'], () => {
            resolve(require('./views/trip/list.vue'));
        });
    }
}, {
    path: '*',
    component: Home
}];

export default routers;