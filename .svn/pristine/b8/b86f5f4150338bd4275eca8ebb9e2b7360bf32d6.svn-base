<template>
  <div id="tablemain" :style="{height: clientHeight + 'px'}">
    <!--<el-scrollbar style="height: 100%">-->
    <div id="dirtable">
      <el-table
        :data="userInfos"
        border
        :height="clientHeight-30 +'px'"
        highlight-current-row
        @current-change="handleCurrentChange"
        style="width: 100%;padding-top: 0px">
        <el-table-column
          label="排序"
          prop="weizhi"
          width="100">
        </el-table-column>
        <el-table-column
          v-for="(item,index) in tablecols"
          :key="index"
          :type="item.type"
          :width="item.width"
          :prop="item.value"
          :label="item.label"
          show-overflow-tooltip>
        </el-table-column>
      </el-table>
    </div>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="current_change"
          :page-sizes="[20, 30, 40]"
          :page-size="pageArrray"
          :current-page="defaultPage"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    <!--</el-scrollbar>-->
  </div>
</template>

<script>
    export default {
        name: "tablebody",
      data:function () {
        return {
          defaultPage:1,
          pageArrray:20,
          tablecols: [{
            type:'',
            width:'140px',
            label:'账户',
            value:'username'
          },{
            type:'',
            width:'100px',
            label:'姓名',
            value:'realname'
          },{
            type:'',
            width:'60px',
            label:'性别',
            value:'gender'
          },{
            type:'',
            width:'120px',
            label:'手机',
            value:'mobile'
          },{
              type:'',
              width:'130px',
              label:'认证状态',
              value:'idauth'
            },{
              type:'',
              width:'130px',
              label:'权限',
              value:'openid'
            },
            // {
            //   type:'',
            //   width:'100px',
            //   label:'主管',
            //   value:'manager'
            // },
            {
            type:'',
            width:'',
            label:'公司',
            value:'organizename'
          }
            // {
            //   type:'',
            //   width:'',
            //   label:'备注',
            //   value:'description'
            // }
            ],
          tableBut: [{
            type: 'primary',
            size: 'mini',
            status: true,
            name: '编辑'
          }, {
            type: 'danger',
            size: 'mini',
            status: true,
            name: '详细'
          }, {
            type: 'success',
            size: 'mini',
            status: true,
            name: '删除'
          },{
            type:'',
            width:'',
            label:'备注',
            value:'description'
          }],
        }
      },
      // props:['total'],
      methods:{
        handleSizeChange(val) {
          this.pageArrray = val;
          if(this.total >= this.pageArrray){
            let startPage = (this.defaultPage-1)*this.pageArrray;
            this.$api.dic.getUerPage('start='+startPage+'&length='+this.pageArrray).then(
              res => {
                this.$store.commit("setUserInfo",res.data.data.data);
              }
            )
          }
        },
        handleCurrentChange:function (val) {
          console.log(val);
          this.$store.commit("setCurrent",val)
        },
        current_change:function (val) {
          console.log(val);
          this.defaultPage = val
          let startPage = (val-1)*this.pageArrray;
          this.$api.dic.getUerPage('start='+startPage+'&length='+this.pageArrray).then(
            res => {
              this.$store.commit("setUserInfo",res.data.data.data);
            }
          )
        }
      },
      computed:{
        userInfos:function () {
          console.log(localStorage.getItem('clientHeight'));
          console.log(this.defaultPage-1)
          console.log(this.pageArrray);
          for (let i in this.$store.getters.userInfo) {
            this.$store.getters.userInfo[i].weizhi = (this.defaultPage-1)*this.pageArrray+parseInt(i)+1
          }
          for (let i in this.$store.getters.userInfo){
            if(this.$store.getters.userInfo[i].idauth == 1){
              this.$store.getters.userInfo[i].idauth = '已认证'
            }else {
              this.$store.getters.userInfo[i].idauth = '未认证'
            }
          }
          for(let i in this.$store.getters.userInfo){
            if(this.$store.getters.userInfo[i].openid == 5){
              this.$store.getters.userInfo[i].openid = '平台运营商'
            }else  if(this.$store.getters.userInfo[i].openid == 20){
              this.$store.getters.userInfo[i].openid = '飞手'
            }
          }
          return this.$store.getters.userInfo
        },
        total:function () {
          return parseInt(this.$store.getters.total)
        },
        clientHeight:function(){
          console.log(this.$store.getters.clientHeight -90);
          return this.$store.getters.clientHeight -90
        }
      }
    }
</script>

<style scoped>

</style>
