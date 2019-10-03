import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './components/user/LoginView.vue'),
    },
    {
      path: '/me',
      component: () => import(/* webpackChunkName: "user-dashboard" */ './components/user/UserDashboard.vue'),
      children: [
        {
          path: '',
          name: 'user-dashboard',
          component: () => import(/* webpackChunkName: "user-tab-home" */ './components/user/UserTabHome.vue'),
        },
        {
          path: 'bookmarks',
          name: 'user-bookmarks',
          component: () => import(/* webpackChunkName: "user-tab-bookmarks" */ './components/user/UserTabBookmarks.vue'),
        },
      ],
    },
    {
      path: '/for/:projectTypeSlug',
      component: () => import(/* webpackChunkName: "project-type" */ './components/project-type/ProjectTypeView.vue'),
      props: true,
      children: [
        {
          path: '',
          name: 'project-type',
          component: () => import(/* webpackChunkName: "no-package-selected" */ './components/pkg/NoPackageSelected.vue'),
        },
        {
          path: 'pkg/:packageId',
          component: () => import(/* webpackChunkName: "package-view" */ './components/pkg/PackageView.vue'),
          props: true,
          children: [
            {
              path: '',
              name: 'package',
              component: () => import(/* webpackChunkName: "package-tab-general" */ './components/pkg/PackageTabGeneral.vue'),
            },
          ],
        },
      ],
    },
  ],
})
