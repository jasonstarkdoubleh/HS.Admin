<template>
  <div id="tableheader">
    <div id="dirheader">
      <div class="dirname">
        <span>用户管理</span>
      </div>
      <div class="dirchoose">
        <div class="chosel">
          <el-select v-model="value" placeholder="请选择" size="small">
            <el-option
              v-for="(item,index) in options1"
              :key="index"
              :label="item.label"
              :value="item.value"/>
          </el-select>
        </div>
        <div class="choinp">
          <el-input v-model="inputdetails" placeholder="请输入内容" size="small"/>
        </div>
        <div class="choser">
          <el-button type="primary" icon="el-icon-search" size="small" @click="searchContent">搜索</el-button>
        </div>
        <div class="cho2">
          <kt-button type="danger" size="small" @click="dialogFormVisible = true" label="新增" icon="el-icon-plus" styleaction="margin-left: 1px" perms="mail:update"></kt-button>
          <kt-button type="success" size="small" @click="edit" label="编辑" icon="el-icon-edit" styleaction="margin-left: 1px" perms="client:save"></kt-button>
          <kt-button type="warning" size="small" @click="delInfo" label="删除" icon="el-icon-delete" styleaction="margin-left: 1px" perms="client:save"></kt-button>
          <kt-button type="success" size="small" @click="resetPassword" label="重置密码" icon="el-icon-menu" styleaction="margin-left: 1px" perms="back:role:update"></kt-button>
          <!--<kt-button type="danger" size="small"  @click="dialogFormVisible = true" label="更多" icon="el-icon-more" styleaction="margin-left: 1px" perms="back:role:update"></kt-button>-->
          <!--<kt-button type="warning" size="small" @click="dialogFormVisible = true" label="用户权限" icon="el-icon-rank" styleaction="margin-left: 1px" perms="back:role:update"></kt-button>-->
          <!--<kt-button type="success" size="small" @click="dialogFormVisible = true" label="访问过滤" icon="el-icon-sort" styleaction="margin-left: 1px" perms="back:role:update"></kt-button>-->
        </div>
      </div>
    </div>

    <el-dialog title="添加用户" :visible.sync="dialogFormVisible" width="800px" class="editFormOrg">
      <el-form :model="form" :inline="true" size="mini" :rules="rules" ref="form">
        <el-form-item label="账户" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="公司">
          <treelist v-model="upcompany" :props="defaultProps" :options="orglist" placeholder="请选择"></treelist>
        </el-form-item>
        <el-form-item label="岗位">
          <!--<el-input v-model="form.dutyid"></el-input>-->
          <el-select v-model="form.dutyid" placeholder="请选择">
            <el-option
              v-for="item in postOptions"
              :key="item.dutyid"
              :label="item.fullname"
              :value="item.dutyid"/>
          </el-select>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="主管">
          <!--<el-input v-model="form.managerid"></el-input>-->
          <el-select v-model="form.managerid" placeholder="请选择">
            <el-option
              v-for="item in managerOptions"
              :key="item.managerid"
              :label="item.manager"
              :value="item.managerid"/>
          </el-select>
        </el-form-item>
        <el-form-item label="部门">
          <!--<el-input v-model="form.departmentid"></el-input>-->
          <el-select v-model="form.departmentid" placeholder="请选择">
            <el-option
              v-for="item in departmentidOptions"
              :key="item.departmentid"
              :label="item.fullname"
              :value="item.departmentid"/>
          </el-select>
        </el-form-item>
        <el-form-item label="权限" prop="openid">
          <el-select v-model="form.openid" placeholder="请选择">
            <el-option value="7" label="农民" />
            <el-option value="9" label="产品提供商" />
            <el-option value="5" label="飞手" />
            <el-option value="20" label="平台运营商" />
          </el-select>
        </el-form-item>
        <el-form-item label="职位">
          <!--<el-input v-model="form.postid"></el-input>-->
          <el-select v-model="form.postid" placeholder="请选择">
            <el-option
              v-for="item in jobOptions"
              :key="item.postid"
              :label="item.fullname"
              :value="item.postid"/>
          </el-select>
        </el-form-item>
        <el-form-item label="角色">
          <!--<el-input v-model="form.roleid"></el-input>-->
          <el-select v-model="form.roleid" placeholder="请选择">
            <el-option
              v-for="item in roleOptions"
              :key="item.roleid"
              :label="item.fullname"
              style="width: 178px"
              :value="item.roleid"/>
          </el-select>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="form.mobile"></el-input>
        </el-form-item>
        <el-form-item label="工号">
          <el-input v-model="form.encode"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="form.realname"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="form.telephone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <!--<el-input v-model="form.gender"></el-input>-->
          <el-select v-model="form.gender" placeholder="请选择">
            <el-option
              v-for="(item,index) in genderOptions"
              :key="index"
              :label="item.label"
              :value="item.value"/>
          </el-select>
        </el-form-item>
        <el-form-item label="生日">
          <!--<el-input v-model="form.birthday"></el-input>-->
          <el-date-picker
            v-model="form.birthday"
            type="date"
            style="width: 178px"
            format="yyyy 年 MM 月 dd 日">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="QQ">
          <el-input v-model="form.oicq"></el-input>
        </el-form-item>
        <el-form-item label="微信">
          <el-input v-model="form.wechat"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.description" style="width: 650px;"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCompany('form')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="编辑用户" :visible.sync="dialogEditVisible"  width="800px" class="editFormOrg">
      <el-form :model="formEdit" :inline="true" size="mini" ref="formEdit">
        <el-form-item label="账户">
          <el-input v-model="formEdit.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="权限">
          <el-select v-model="formEdit.openid.toString()" placeholder="请选择">
            <el-option value="7" label="农民" />
            <el-option value="9" label="产品提供商" />
            <!--<el-option value="8" label="管理员" />-->
            <el-option value="5" label="飞手" />
            <el-option value="20" label="平台运营商" />
          </el-select>
        </el-form-item>
        <el-form-item label="公司">
          <treelist v-model="upcompany" :props="defaultProps" :options="orglist" placeholder="请选择"></treelist>
          <!--<el-input v-model="form.organizeid"></el-input>-->
        </el-form-item>
        <el-form-item label="部门">
          <!--<el-input v-model="form.departmentid"></el-input>-->
          <el-select v-model="formEdit.departmentid" placeholder="请选择">
            <el-option
              v-for="item in departmentidOptions"
              :key="item.departmentid"
              :label="item.fullname"
              :value="item.departmentid"/>
          </el-select>
        </el-form-item>
        <el-form-item label="岗位">
          <!--<el-input v-model="form.dutyid"></el-input>-->
          <el-select v-model="formEdit.dutyid" placeholder="请选择">
            <el-option
              v-for="item in postOptions"
              :key="item.dutyid"
              :label="item.fullname"
              :value="item.dutyid"/>
          </el-select>
        </el-form-item>
        <el-form-item label="职位">
          <!--<el-input v-model="form.postid"></el-input>-->
          <el-select v-model="formEdit.postid" placeholder="请选择">
            <el-option
              v-for="item in jobOptions"
              :key="item.postid"
              :label="item.fullname"
              :value="item.postid"/>
          </el-select>
        </el-form-item>
        <el-form-item label="角色">
          <!--<el-input v-model="form.roleid"></el-input>-->
          <el-select v-model="formEdit.roleid" placeholder="请选择">
            <el-option
              v-for="item in roleOptions"
              :key="item.roleid"
              :label="item.fullname"
              style="width: 178px"
              :value="item.roleid"/>
          </el-select>
        </el-form-item>
        <el-form-item label="主管">
          <!--<el-input v-model="form.managerid"></el-input>-->
          <el-select v-model="formEdit.managerid" placeholder="请选择">
            <el-option
              v-for="item in managerOptions"
              :key="item.managerid"
              :label="item.manager"
              :value="item.managerid"/>
          </el-select>
        </el-form-item>
        <el-form-item label="工号">
          <el-input v-model="formEdit.encode"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="formEdit.realname"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <!--<el-input v-model="form.gender"></el-input>-->
          <el-select v-model="formEdit.gender" placeholder="请选择">
            <el-option
              v-for="(item,index) in genderOptions"
              :key="index"
              :label="item.label"
              :value="item.value"/>
          </el-select>
        </el-form-item>
        <el-form-item label="生日">
          <!--<el-input v-model="formEdit.birthday"></el-input>-->
          <el-date-picker
            v-model="formEdit.birthday"
            type="date"
            style="width: 178px"
            format="yyyy 年 MM 月 dd 日">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="手机">
          <el-input v-model="formEdit.mobile"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="formEdit.telephone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="formEdit.email"></el-input>
        </el-form-item>
        <el-form-item label="微信">
          <el-input v-model="formEdit.wechat"></el-input>
        </el-form-item>
        <el-form-item label="QQ">
          <el-input v-model="formEdit.oicq"></el-input>
        </el-form-item>
        <el-form-item label="MSN">
          <el-input v-model="formEdit.msn"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="formEdit.description" style="width: 650px;"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEditVisible = false">取 消</el-button>
        <el-button type="primary" @click="editCompany(formEdit)">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="重置密码" :visible.sync="dialogPasswordVisible">
      <el-form ref="formPassword" :model="formPassword" label-width="50px">
        <el-form-item label="姓名">
          <el-input v-model="formPassword.realname"></el-input>
        </el-form-item>
        <el-form-item label="账户">
          <el-input v-model="formPassword.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="formPassword.password" type="password"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogPasswordVisible = false">取 消</el-button>
        <el-button type="primary" @click="resetAgain(formPassword)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import treelist from '@/views/Core/treelist'
  import treeTable from "@/views/Core/table/treeTable/treeTable"
  import KtButton from "@/views/Core/KtButton";
  export default {
        name: "tableheader",
      components:{ treelist ,treeTable,KtButton},
      data:function () {
        return {
          rules:{
            username: [
              { required: true, message: '请输入账户名称', trigger: 'blur' },
            ],
            password: [
              { required: true, message: '请输入密码', trigger: 'blur' },
            ],
            upcompany: [
              { required: true, message: '请选择公司', trigger: 'blur' },
            ],
            openid: [
              { required: true, message: '请选择权限', trigger: 'blur' },
            ],
            mobile: [
              { required: true, message: '请填写正确的手机号码', trigger: 'blur' },
              { min: 11, max: 11, message: '请填写正确的手机号码', trigger: 'blur' }
            ],
          },
          readonly:true,
          dialogPasswordVisible:false,
          departmentidOptions:[],
          managerOptions:[],
          roleOptions:[],
          postOptions:[],
          jobOptions:[],
          labelPosition: 'right',
          options: [],
          defaultProps: {
            parent: 'itemcode',   // 父级唯一标识
            value: 'id',          // 唯一标识
            label: 'item',       // 标签显示
            children: 'children', // 子级
          },
          upcompany:'',
          manager:'',
          genderOptions:[
            {
              value: '0',
              label: '男'
            },
            {
              value: '1',
              label: '女'
            }
          ],
          options1: [{
            value: 'username',
            label: '账户'
          }, {
            value: 'realname',
            label: '姓名'
          }, {
            value: 'mobile',
            label: '手机'
          },{
            value: 'address',
            label: '地址'
          }],
          value:'username',
          inputdetails: '',
          tableSelect:[],
          form: {
            username: '',
            password: '',
            organizeid: '',
            departmentid: '',
            dutyid: '',
            postid:'',
            roleid: '',
            managerid: '',
            encode:'',
            realname:'',
            gender:'',
            birthday:'',
            mobile:'',
            telephone:'',
            email:'',
            wechat:'',
            oicq:'',
            openid:'',
            description:''
          },
          formEdit: {
            username: '',
            password: '',
            organizeid: '',
            departmentid: '',
            dutyid: '',
            postid:'',
            roleid: '',
            managerid: '',
            encode:'',
            realname:'',
            gender:'',
            birthday:'',
            mobile:'',
            telephone:'',
            email:'',
            wechat:'',
            oicq:'',
            msn:'',
            description:'',
            openid:''
          },
          formPassword:{
            realname:'',
            username:'',
            password:'',
            userid:''
          },
          dialogFormVisible: false,
          dialogEditVisible:false,
          formLabelWidth: '120px',
        }
      },
      methods:{
        resetPassword:function(){
          this.dialogPasswordVisible = true;
          this.formPassword.realname = this.current.realname;
          this.formPassword.username = this.current.username;
          this.formPassword.userid = this.current.userid;
          console.log(this.formPassword);
        },
        resetAgain:function(data){
          if(this.formPassword.password == ''){
            this.$message.error('密码不能为空')
          }else {
            this.dialogPasswordVisible = false;
            let formDataPwd = new FormData();
            formDataPwd.append("userid",this.formPassword.userid);
            formDataPwd.append("password",this.formPassword.password);
            console.log(formDataPwd);
            this.$api.dic.resetPassword(formDataPwd);
          }
        },
        searchContent:function(){
          if(this.value == 'address'){
            this.$api.dic.getAllUserByKeyArea(this.inputdetails).then((res) => {
              this.$store.commit('setTotal',res.data.data.length)
              this.$store.dispatch("setUser",res.data.data);
            })
          }else {
            this.$api.dic.getAllUserByKey([this.value,this.inputdetails]).then((res) => {
              this.$store.commit('setTotal',res.data.data.length)
              this.$store.dispatch("setUser",res.data.data);
            })
          }
        },
        addCompany:function (data) {
          this.$refs[data].validate((valid) => {
            if (valid) {
              this.dialogFormVisible = false;
              this.form.organizeid = this.upcompany;
              this.$api.dic.saveUserInfo(this.form).then(() => {
                for(let key in this.form){
                  this.form[key] = ''
                }
                this.upcompany = ''
              })
            } else {
              return false;
            }
          });
        },
        edit:function(){
          if(!this.current){
            this.$message.error("请先选中数据在进行编辑")
          }else {
            this.formEdit = this.current;
            this.dialogEditVisible = true;
            // this.formEdit.mobile = this.current.mobile;
            // this.formEdit.telephone = this.current.telephone;
            // this.formEdit.email = this.current.email;
            // this.formEdit.wechat = this.current.wechat;
            // this.formEdit.oicq = this.current.oicq;
            // this.formEdit.msn = this.current.msn;
            // this.formEdit.username = this.current.username;
            // this.formEdit.password = this.current.password;
            // this.formEdit.organizeid = this.current.organizeid;
            // this.formEdit.departmentid = this.current.departmentid;
            // this.formEdit.dutyid = this.current.dutyid;
            // this.formEdit.postid = this.current.postid;
            // this.formEdit.roleid = this.current.roleid;
            // this.formEdit.managerid = this.current.managerid;
            // this.formEdit.encode = this.current.encode;
            // this.formEdit.realname = this.current.realname;
            // this.formEdit.gender = this.current.gender;
            // this.formEdit.birthday = this.current.birthday;
            // console.log(this.current);
            this.upcompany = this.current.organizeid
          }
        },
        editCompany:function (data) {
          if(this.upcompany == ''){
            this.$message.error('必须选择公司')
          }else if(this.formEdit.username == ''){
            this.$message.error('账户不能为空')
          }else if(this.formEdit.password == ''){
            this.$message.error('密码不能为空')
          }else if(this.formEdit.mobile.length != 11){
            this.$message.error('请输入正确的手机号码')
          }else {
            this.dialogEditVisible = false;
            this.formEdit.organizeid = this.upcompany;
            if (this.formEdit.gender == '女'){
              this.formEdit.gender = 1
            } else {
              this.formEdit.gender = 0
            }
            console.log(data);
            this.$api.dic.updateUserInfo(data);
          }
        },
        delInfo:function () {
          if(!this.current.userid){
            this.$message.error("请先选中数据在进行删除")
          }else {
            this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$api.dic.delUserInfo(this.current.userid);
            }).then(() => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });
            });
          }
          }
      },
      computed:{
        orglist:function () {
          return this.$store.getters.orglist
        },
        current:function () {
          return this.$store.getters.current
        },
        userInfos:function () {
          return this.$store.getters.userInfo
        }
      },
      watch:{
        upcompany(val,oldval){
          console.log(val);
          console.log(oldval);
          this.$api.dic.getOrganize(val).then(
            res => {
              console.log(res.data.data);
              this.departmentidOptions = res.data.data;
              if(this.departmentidOptions.length>0){
                if(this.departmentidOptions[0].hasOwnProperty('managerid')){
                  this.managerOptions.push(this.departmentidOptions[0]);
                  for(let i in this.departmentidOptions){
                    if(this.departmentidOptions[i].managerid != '' && this.departmentidOptions[i].managerid != this.departmentidOptions[0].managerid){
                      this.managerOptions.push(this.departmentidOptions[i]);
                    }
                  }
                }
              }
            }
          );
          if(val){
            this.$api.dic.getRoleByOrganize(val).then(
              res => {
                // console.log(res.data.data);
                this.roleOptions = res.data.data
              }
            );
            this.$api.dic.getPostByOrganize(val).then(
              res => {
                // console.log(res.data.data);
                this.postOptions = res.data.data
              }
            );
            this.$api.dic.getJobByOrganize(val).then(
              res => {
                // console.log(res.data.data);
                this.jobOptions = res.data.data
              }
            );
          }
        }
      }
    }
</script>

<style scoped>
  #tableheader{
    min-width: 1100px;
  }
  #dirheader{
    height: 80px;
  }
  .dirname{
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid #c5c9cf;
    font-size: 12px;
  }
  .dirname span{
    float: left;
  }
  .dirchoose{
    height: 50px;
  }
  .dirchoose>*{
    margin-top: 8px;
  }
  .choinp,.chosel,.choser{
    display: inline-block;
    float: left;
  }
  .chosel{
    width: 100px;
  }
  .choinp{
    width: 200px;
    margin-left: 2px;
    margin-right: 2px;
  }
  .cho2{
    float: right;
    margin-right: 10px;

  }
  .cho2 div{
    float: right;

  }
</style>
