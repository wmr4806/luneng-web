import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import manage from './modules/manage'
/**
                                当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 hidden: true // (默认 false)
                                当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 redirect: 'noRedirect'
                                当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
                                只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
                                若你想不管路由下面的 children 声明的个数都显示你的根路由
                                你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 alwaysShow: true
 name: 'router-name'            设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 meta: {
  roles: ['admin', 'editor']    设置该路由进入的权限，支持多个权限叠加
  title: 'title'                设置该路由在侧边栏和面包屑中展示的名字
  icon: 'svg-name'              设置该路由的图标
  noCache: true                 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
  affix: true                   如果设置为 true，则固定在菜单栏
  breadcrumb: false             如果设置为false，则不会在breadcrumb面包屑中显示
  activeMenu: '/example/list'   指定左侧菜单栏高亮的菜单选型
}
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/bimLink',
    component: () => import('@/views/bimEmpty/bim'),
    hidden: true
  },
  {
    path: '/bimLinks',
    component: () => import('@/views/bimEmpty/bims'),
    hidden: true
  },
  {
    path: '/datav',
    component: () => import('@/views/bimEmpty/datav/index'),
    hidden: true
  },
  {
    path: '/record',
    component: () => import('@/views/record/record')
    // hidden: true
  },
  {
    path: '/recordtable',
    component: () => import('@/views/Comprehensive-report/recordtable'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'dashboard',
        meta: { title: '整体态势', icon: 'dashboard', affix: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  /** when your routing map is too long, you can split it into small modules **/
  manage,
  /** 仅演示用 **/
  {
    path: '/AI-BA',
    component: Layout,
    redirect: 'noRedirect',
    children: [
      {
        path: '/',
        component: () => import('@/views/ai-BA/index'),
        name: 'AIBA',
        meta: { title: '智慧BA', icon: 'excel' }
      }
    ]
  },
  {
    path: '/AI-EnergyEfficiency',
    component: Layout,
    redirect: 'noRedirect',
    children: [
      {
        path: '/',
        component: () => import('@/views/ai-energyEfficiency/index'),
        name: 'AIEnergyEfficiency',
        meta: { title: '智慧能效', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/AI-FireControl',
    component: Layout,
    redirect: 'noRedirect',
    children: [
      {
        path: '/',
        component: () => import('@/views/lnyf/index'),
        name: 'AIFireControl',
        meta: { title: '智慧消防', icon: 'drag' }
      }
    ]
  },
  {
    path: '/AI-Security',
    component: Layout,
    redirect: 'noRedirect',
    children: [
      {
        path: '/',
        component: () => import('@/views/ai-security/index'),
        name: 'AISecurity',
        meta: { title: '智慧安防', icon: 'email' }
      }
    ]
  },
  {
    path: '/AI-WorkOrder',
    component: Layout,
    redirect: 'noRedirect',
    children: [
      {
        path: '/',
        component: () => import('@/views/ai-workOrder/index'),
        name: 'AIWorkOrder',
        meta: { title: '智慧工单', icon: 'message' }
      }
    ]
  },
  // {
  //   path: '/BIM',
  //   component: Layout,
  //   redirect: 'noRedirect',
  //   children: [
  //     {
  //       path: '/',
  //       component: () => import('@/views/BIM/index'),
  //       name: 'BIM',
  //       meta: { title: 'BIM', icon: 'chart' }
  //     }
  //   ]
  // },
  // {
  //   path: '/Cockpit',
  //   component: Layout,
  //   redirect: 'noRedirect',
  //   children: [
  //     {
  //       path: '/',
  //       component: () => import('@/views/cockpit/index'),
  //       name: 'Cockpit',
  //       meta: { title: '领导驾驶舱', icon: 'money' }
  //     }
  //   ]
  // },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
