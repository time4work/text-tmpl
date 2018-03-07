import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import TmplList from '@/components/TmplList'
import TmplPage from '@/components/TmplPage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'TmplList',
      component: TmplList,
    },
    {
      path: '/vue',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/tmpl/:id',
      name: 'TmplPage',
      component: TmplPage
    }
  ]
})
// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'TmplList',
//       component: TmplList,
//       children: [
//         {
//           path: '/vue',
//           name: 'HelloWorld',
//           component: HelloWorld
//         },
//         {
//           path: '/tmpl/:id',
//           name: 'TmplPage',
//           component: TmplPage
//         }
//       ]
//     }
//   ]
// })
