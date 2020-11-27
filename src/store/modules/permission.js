import { constantRoutes } from '@/router'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, data) {
    return new Promise(resolve => {
      const accessedRoutes = initMenus(data)
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

const initMenus = (routes) => {
  const menus = loadMenus(routes)
  menus.push({ path: '*', redirect: '/404', hidden: true })
  return menus
}

const loadMenus = (routes) => {
  const menus = []
  routes.forEach(route => {
    const menu = loadMenu(route)
    menus.push(menu)
  })
  return menus
}

const loadMenu = (route) => {
  let _route = {}
  if (route.parentId !== '0') { // 非一级菜单
    _route = {
      path: route.path,
      // component: () => import(`@/views/${route.component}.vue`),
      component: () =>Promise.resolve(require(`@/views/${route.component}.vue`).default), // --no-ignore
      name: route.menuName,
      meta: { title: route.title, icon: route.icon, noCache: route.noCache === '1' }
    }
    if (route.children.length !== 0) {
      _route.redirect = route.children[0].path
      _route.children = loadMenus(route.children)
    }
  } else {
    _route = {
      path: route.path,
      component: () => import('@/layout'),
      // alwaysShow: true,
      redirect: route.children[0].path,
      meta: { title: route.title, icon: route.icon, noCache: route.noCache === '1' },
      children: loadMenus(route.children)
    }
  }
  return _route
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
