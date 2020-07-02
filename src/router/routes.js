
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '/', component: () => import('pages/Water.vue') },
      { path: '/rub', component: () => import('pages/Rubish.vue') },
      { path: '/water', component: () => import('pages/Water1.vue') },
      { path: '/waterMark', component: () => import('pages/waterMark.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
