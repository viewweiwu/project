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
    path: '/resetPwd',
    name: 'resetPwd',
    component(resolve) {
        require.ensure(['./views/resetPwd.vue'], () => {
            resolve(require('./views/resetPwd.vue'));
        });
    }
}, {
    path: '/login/login',
    name: 'login/login',
    component(resolve) {
        require.ensure(['./views/login/login.vue'], () => {
            resolve(require('./views/login/login.vue'));
        });
    }
}, {
    path: '/login/register',
    name: 'login/register',
    component(resolve) {
        require.ensure(['./views/login/register.vue'], () => {
            resolve(require('./views/login/register.vue'));
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
    path: '/car/addType',
    name: 'car/addType',
    component(resolve) {
        require.ensure(['./views/car/addType.vue'], () => {
            resolve(require('./views/car/addType.vue'));
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
    path: '/select',
    name: 'select',
    component(resolve) {
        require.ensure(['./views/select.vue'], () => {
            resolve(require('./views/select.vue'));
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