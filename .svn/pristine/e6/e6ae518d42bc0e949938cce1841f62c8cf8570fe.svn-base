<template>
  <!--<div id="app">-->
    <el-cascader
      :options="options"
      v-model="selectedOptions"
      @change="handleChange">
    </el-cascader>
  <!--</div>-->
</template>

<script>
  import { regionData ,CodeToText} from 'element-china-area-data'
  export default {
    data () {
      return {
        options: regionData,
        selectedOption: []
      }
    },

    methods: {
      handleChange (val) {
        // console.log(val);
        // console.log(this.selectedOptions);
        this.$store.commit("setAdrress",val)
      }
    },
    computed:{
      selectedOptions:function () {
        // if(this.$store.getters.selectedOptions.length > 0){
        //   this.selectedOption = this.$store.getters.selectedOptions
        // }
        return this.$store.getters.selectedOptions
      }
    }
  }
</script>
