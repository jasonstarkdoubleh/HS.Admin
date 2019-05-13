import Vue from 'vue'
import vuex from 'vuex'

Vue.use(vuex);

import app from './modules/app'
import iframe from './modules/iframe'
import user from './modules/user'
import menu from './modules/menu'
import getters from './getters'
import dir from './modules/dir'


const store = new vuex.Store({
    modules: {
        app: app,
        iframe: iframe,
        user: user,
        menu: menu,
        dir: dir
    },
    getters
})

export default store