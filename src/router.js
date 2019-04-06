import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export const router =  new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Dashboard.vue')
    },
    {
      path: '/vote',
      name: 'vote',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Vote.vue')
    },
    {
      path: '/authorize',
      name: 'authorize',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Authorize.vue')
    }
  ]
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/authorize',];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('isLoggedIn');
  const authorized = localStorage.getItem('authorize'); 
    if (to.path !== '/authorize' ) {
      if (authorized && to.path !== '/' && !loggedIn) {
        return next('/');
      } else if (authorized && authRequired && !loggedIn && to.path !== '/')  {
        return next('/');
      } else if (!authorized  && to.path !== '/authorize') {
        return next('/authorize');
      }

    }
  next();
});
