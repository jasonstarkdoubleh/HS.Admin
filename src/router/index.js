import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import NotFound from '@/views/Error/404'
import Home from '@/views/Home'

import Intro from '@/views/Intro/Intro'


import store from '@/store'
import { getIFrameUrl } from '@/utils/iframe'

import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import { getAccessToken } from '@/utils/auth' // getToken from cookie

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      component: Home,
      children: [
        {
          path: '',
          name: '系统介绍',
          component: Intro
        }
      ]
    },
    {
      path: '/login',
      name: '登录',
      component: Login
    },
    {
      path: '/404',
      name: 'notFound',
      component: NotFound
    }
  ]
})

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar

  if (to.path === '/login') {
    next()
    NProgress.done()
  } else {

    if (getAccessToken()) { // determine if there has token
      /* has token*/
      console.log("getToken")
      if (to.path === '/login') {
        next({ path: '/' })
        NProgress.done()
      } else {
        addDynamicMenuAndRoutes(to, from)
        next()
        NProgress.done()
      }
    } else {
      /* has no token*/
      // if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      //   next()
      // } else {
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
      // }
    }
  }
})


/**
* 加载动态菜单和路由
*/
function addDynamicMenuAndRoutes(to, from) {
  // 保存iframeUrl到store，供IFrame组件读取展示
  store.commit('setIFrameUrl', to.path)
  if (store.state.app.menuRouteLoaded) {
    console.log('动态菜单和路由已经存在.')
    return
  }

  store.dispatch('getNavTree').then(res => {
    console.log(res)

    //console.log(treen)
    const treen = treeUtils(res)
    // 保存菜单树
    store.commit('setNavTree', treen)
    let dynamicRoutes = addDynamicRoutes(treen)
    console.log(dynamicRoutes)
    console.log(router)
    router.options.routes[0].children = dynamicRoutes
    router.addRoutes(router.options.routes)
    // 保存加载状态
    store.commit('menuRouteLoaded', true)


  }).catch((error) => {
    console.log(error)
  })

}

/**
* 添加动态(菜单)路由
* @param {*} menuList 菜单列表
* @param {*} routes 递归创建的动态(菜单)路由
*/
function addDynamicRoutes(menuList = [], routes = []) {
  var temp = []
  for (var i = 0; i < menuList.length; i++) {
    if (menuList[i].children && menuList[i].children.length >= 1) {
      temp = temp.concat(menuList[i].children)
    } else if (menuList[i].urladdress && /\S/.test(menuList[i].urladdress)) {
      menuList[i].urladdress = menuList[i].urladdress.replace(/^\//, '')
      // 创建路由配置
      var route = {
        path: menuList[i].urladdress,
        component: null,
        name: menuList[i].fullname
      }
      let path = getIFrameUrl(menuList[i].urladdress)
      if (path) {
        // 如果是嵌套页面, 通过iframe展示
        route['path'] = path;
        route['component'] = resolve => require([`@/views/IFrame/IFrame`], resolve)
      } else {
        try {
          // 根据菜单URL动态加载vue组件，这里要求vue组件须按照url路径存储
          // 如url="sys/user"，则组件路径应是"@/views/sys/user.vue",否则组件加载不到
          let array = menuList[i].urladdress.split('/')

          let url='';
          for(let j = 0; j<  array.length;j++){
            url = url + '/'+ array[j].substring(0, 1).toUpperCase() + array[j].substring(1);
          }
         // let url = array[0].substring(0, 1).toUpperCase() + array[0].substring(1) + '/' + array[1].substring(0, 1).toUpperCase() + array[1].substring(1)

          route['component'] = resolve => require([`@/views${url }`], resolve)
        } catch (e) {
          console.log(e)
        }
      }
      routes.push(route)
    }
  }
  if (temp.length >= 1) {
    addDynamicRoutes(temp, routes)
  } else {
    console.log('动态路由加载...')
    console.log(routes)
    console.log('动态路由加载完成.')
  }
  return routes
}

/**
 * 
 * @param {*} obj 
 * @param {*} arr 
 */
function sonsTree(obj, arr) {
  var children = [];
  for (var i = 0; i < arr.length; i++) {
    if (!arr[i].isShow) {
      if (arr[i].parentid == obj.moduleid && arr[i].enabledmark == 1) {  //pid等于加入数组
        arr[i].isShow = true
        arr[i].id = arr[i].moduleid
        arr[i].name = arr[i].fullname
        arr[i].url = arr[i].urladdress
        sonsTree(arr[i], arr);//递归出子元素
        // arr[i].pname=obj.fullname;
        children.push(arr[i]);
      }
    }
  }
  if (children.length > 0) {
    obj.children = children;
  }
  return obj;
}


function treeUtils(arr) {
  let ptree = [];
  let tree = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].parentid == '0' && arr[i].enabledmark == 1) {//获取父元素
      arr[i].isShow = true
      arr[i].id = arr[i].moduleid
      arr[i].name = arr[i].fullname
      arr[i].url = arr[i].urladdress
      let o = sonsTree(arr[i], arr);
      ptree.push(o);
    }
  }
  console.log(ptree);
  return ptree;
}


export default router
