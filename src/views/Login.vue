<template>
  <el-form :model="loginForm" :rules="fieldRules" ref="loginForm" label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <span class="tool-bar">
      <!-- 主题切换 -->
      <theme-picker style="float:right;" class="theme-picker" :default="themeColor" @onThemeChange="onThemeChange"></theme-picker>
      <!-- 语言切换 -->
      <!-- <lang-selector class="lang-selector"></lang-selector>    -->
    </span>
    <h2 class="title" style="padding-left:22px;" >系统登录</h2>
    <el-form-item prop="account">
      <el-input type="text" v-model="loginForm.account" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <!-- <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox> -->
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:48%;" @click.native.prevent="reset">重 置</el-button>
      <el-button type="primary" style="width:48%;" @click.native.prevent="login" :loading="loading">登 录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapState } from 'vuex'
import Cookies from "js-cookie"
import ThemePicker from "@/components/ThemePicker"
import LangSelector from "@/components/LangSelector"
import {setAccessToken,setRefreshToken} from "@/utils/auth"
import { getUserInfo } from '@/api/moudules/login'
export default {
  name: 'Login',
  components:{
    ThemePicker,
    LangSelector
  },
  data() {
    return {
      loading: false,
      sysRoles:[],
      loginForm: {
        account: '',
        password: ''
      },
      fieldRules: {
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ]
      },
      checked: true,
      clientHeight:1
    }
  },
  methods: {
    getHeight:function () {
      this.clientHeight = document.documentElement.clientHeight;
      this.$store.commit('setclientHeight',this.clientHeight);
      localStorage.setItem("clientHeight",this.clientHeight-95);
      console.log(sessionStorage.getItem("clientHeight"))
      console.log(this.clientHeight)
    },
    login() {
      this.loading = true
      let userInfo = {username:this.loginForm.account, password:this.loginForm.password};
      // this.$router.push('/')  // 登录成功，跳转到主页
      // this.$api.login.loginByUsername(this.loginForm.account,this.loginForm.password).then((res) => {
      //   console.log(res)
      //     if(res.data.status) {
      //        Cookies.set('token', res.data.token) // 放置token到Cookie
      //        setAccessToken(res.data.data.access_token)
      //        setRefreshToken(res.data.data.refresh_token)
      //       console.log(res.data.data)
      //       //sessionStorage.setItem('user', userInfo.account) // 保存用户到本地会话
      //       this.$store.commit('menuRouteLoaded', false) // 要求重新加载导航菜单
      //       this.$router.push('/')  // 登录成功，跳转到主页
      //     } else { 
      //       this.$message({
      //         message: res.msg,
      //         type: 'error'
      //       })
          
      //     }
      //     this.loading = false
      //   }).catch((res) => {
      //     this.$message({
      //     message: res.message,
      //     type: 'error'
      //     })
      //   });
   
        this.$store.dispatch('LoginByUsername',userInfo)
          .then((token) => {
          console.log(token);
          getUserInfo(token).then(res => {
            console.log(res.data.data.permissions)
            // let data = res.data.data;
            this.$store.dispatch('setpermiss',res.data.data.permissions)
            this.sysRoles = res.data.data.sysRoles
            console.log(this.sysRoles.length)
          }).then(() => {
            console.log(this.sysRoles.length)
            // if(this.sysRoles.length < 1){
            //   this.$message({
            //     message: '权限不足，拒绝访问',
            //     type: 'error'
            //   });
            //   this.loading = false
            //   return false
            // }
            this.loading = false
            console.log(11111)
            this.$router.push('/')
            console.log(22222)
          })
        }) .catch(() => {
            this.loading = false
          })
   
   
   },
    reset() {
      this.$refs.loginForm.resetFields()
    },
    // 切换主题
    onThemeChange: function(themeColor) {
      this.$store.commit('setThemeColor', themeColor)
    }
  },
  computed:{
    ...mapState({
      themeColor: state=>state.app.themeColor
    })
  },
  mounted(){
    this.getHeight()
  }
}
</script>

<style lang="scss" scoped>
  .login-container {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 150px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
</style>
