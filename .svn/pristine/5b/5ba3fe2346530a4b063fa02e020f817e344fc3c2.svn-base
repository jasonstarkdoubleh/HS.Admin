import { loginByUsername, logout, getUserInfo } from '@/api/moudules/login'
import { getAccessToken, setAccessToken, removeToken,setRefreshToken } from '@/utils/auth'

const user = {
  state: {   
    token:null,
    createTime: null,
    updateTime: null,
    userid: "",
    encode: "",
    username: "",
    realname: "",
    nickname: "",
    headicon: "",
    quickquery: "",
    simplespelling: "f4ff40f94fdaa4856c2231f2e5197ab5",
    gender: 0,
    birthday: "",
    mobile: "",
    telephone: "",
    email: "",
    oicq: "",
    wechat: "",
    msn: "",
    managerid: "",    
    organizeid: "",
    departmentid: "",
    roleid: "",
    dutyid: "",
    postid: "345345345",
    postname: "河北省张家口市 阿里云",
    workgroupid: "",
    securitylevel: null,
    useronline: 1,
    openid: 8,
    question: "",
    answerquestion: "",
    checkonline: null,   
    firstvisit: "2017-11-15T11:35:18.000+0000",
    previousvisit: "2018-05-07T07:05:30.000+0000",
    lastvisit: "2018-05-07T07:05:37.000+0000",
    logoncount: 396,
    sortcode: null,   
    createdate: "2017-11-15T11:35:18.000+0000",
    sysRoles: [
        {
            id: 1,
            code: "SUPER_ADMIN",
            name: "超级管理员",
            createTime: "2018-01-19T12:32:16.000+0000",
            updateTime: "2018-01-19T12:32:18.000+0000"
        }
    ],
    permissions: [
        ],
    accountNonExpired: true,
    accountNonLocked: true,
    credentialsNonExpired: true
    
  },
  openid:[],
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },    
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, sysRoles) => {
      state.sysRoles = sysRoles
    },
    SET_STATE:(state,data)=>{
        state=data
    },
    setOpenId:(state,data) =>{
      state.openid = data
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername({ commit }, userInfo) {
      console.log('ssssssss')
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        loginByUsername(username, userInfo.password).then(response => {
          console.log(response.data)
          const data = response.data.data
          console.log(data)
          commit('SET_TOKEN', data.access_token)
          setAccessToken(data.access_token)
          setRefreshToken(data.refresh_token)
          resolve(data.access_token)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token).then(response => {
          if (!response.data) { // 由于mockjs 不支持自定义状态码只能这样hack
            reject('error')
          }
          const data = response.data.data
          // const openid = data.openid;
          commit('SET_STATE', datas)
          
          if (data.sysRoles && data.sysRoles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.sysRoles)
          } else {
            reject('getInfo: roles must be a non-null array !')
          }

          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 第三方验证登录
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.token)
    //       setToken(response.data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },

    // 动态修改权限
    // ChangeRoles({ commit, dispatch }, role) {
    //   return new Promise(resolve => {
    //     commit('SET_TOKEN', role)
    //     setToken(role)
    //     getUserInfo(role).then(response => {
    //       const data = response.data
    //       commit('SET_ROLES', data.roles)
    //       commit('SET_NAME', data.name)
    //       commit('SET_AVATAR', data.avatar)
    //       commit('SET_INTRODUCTION', data.introduction)
    //       dispatch('GenerateRoutes', data) // 动态修改权限后 重绘侧边菜单
    //       resolve()
    //     })
    //   })
    // }
  }
}

export default user
