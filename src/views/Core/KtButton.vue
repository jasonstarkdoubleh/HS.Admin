<template>
  <el-button :size="size" :type="type" 
    :loading="loading" :disabled="!hasPerms(perms)" @click="handleClick" :icon="icon" :style="styleaction">
    {{label}}
  </el-button>
</template>

<script>
import { hasPermission } from '@/permission/index.js'
export default {
  name: 'KtButton',
  props: {
    styleaction:{
      type:String,
      default:null
    },
    icon:{
      type:String,
      default:null
    },
    label: {  // 按钮显示文本
      type: String,
      default: 'Button'
    },
    size: {  // 按钮尺寸
      type: String,
      default: 'mini'
    },
    type: {  // 按钮类型
      type: String,
      default: null
    },
    loading: {  // 按钮加载标识
      type: Boolean,
      default: false
    },
    disabled: {  // 按钮是否禁用
      type: Boolean,
      default: false
    },
    perms: {  // 按钮权限标识，外部使用者传入
      type: String,
      default: 'a'
    }
  },
  data() {
    return {
    }
  },
  methods: {
    handleClick: function () {
      // 按钮操作处理函数
      this.$emit('click', {})
    }, 
    hasPerms: function (perms) {
      // 根据权限标识和外部指示状态进行权限判断
      // alert(typeof hasPermission(perms))
      // console.log(hasPermission(perms));
      // return hasPermission(perms);
        // & !this.disabled
      return true
    }
  },
  mounted() {
  }
}
</script>

<style scoped>

</style>
