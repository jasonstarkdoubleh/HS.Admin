<template>
  <div id="dirhigh" :style="{height : clientHeight}">
    <el-container>
      <el-header style="height: 60px">
        <organiazeHeader></organiazeHeader>
      </el-header>
      <el-main>
        <tree-content></tree-content>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import organiazeHeader from './organiazeHeader'
  import treeContent from "@/views/Core/table/treeTable/treeContent"
export default {
    name:"Organiaze",
    data:function(){
      return {
        navdata:'',
      }
    },
  components: { organiazeHeader,treeContent },
  methods:{
    getTree( a,b,c ) {
      for (let i in b) {
        if (a.organizeid === b[i].parentid) {
          const  d={};
          d.item=b[i].fullname;
          d.id=b[i].organizeid;
          d.itemcode=b[i].parentid;
          d.children=[];
          this.getTree(b[i], b, d);
          c.children.push(d);
        }
      }
    },
    getall:function(){
      this.$store.commit("setorglist",[]);
      this.$api.dic.getOrgAll().then(res => {
        this.$store.dispatch('setOrgName',res.data.data);
        console.log(res.data.data);
        this.navdata = res.data.data;
        for (let i in this.navdata) {
          if (this.navdata[i].parentid == "0") {
            const treenodes={item:"",id:"",itemcode:"",children:[]};
            treenodes.item=this.navdata[i].fullname;
            treenodes.id=this.navdata[i].organizeid;
            treenodes.itemcode=this.navdata[i].parentid;
            this.getTree(this.navdata[i], this.navdata, treenodes);
            // console.log(treenodes);
            this.$store.dispatch("pushorglist",treenodes)
          }
        }
      }).then(()=>{
        for(let j in this.orgall){
          if(this.orgall[j].createdate){
            this.$store.commit("setorgdate",[j,this.orgall[j].createdate.substring(0,10)]);
          }
        }
        });
    },
    getTree2:function( a,b,c ) {
      for (let i in b) {
        if (a.organizeid === b[i].parentid) {
          const  d={};
          d.fullname=b[i].fullname;
          d.encode=b[i].encode;
          d.nature=b[i].nature;
          d.createdate=b[i].createdate;
          d.outerphone=b[i].outerphone;
          d.description=b[i].description;
          d.parentid=b[i].parentid;
          d.manager=b[i].manager;
          d.managerid=b[i].managerid;
          d.address=b[i].address;
          d.fax=b[i].fax;
          d.postalcode=b[i].postalcode;
          d.businessscope=b[i].businessscope;
          d.email=b[i].email;
          d.webaddress=b[i].webaddress;
          d.organizeid=b[i].organizeid;
          d.provinceid=b[i].provinceid;
          d.cityid=b[i].cityid;
          d.countyid=b[i].countyid;
          d.children=[];
          this.getTree2(b[i], b, d);
          c.children.push(d);
        }
      }
    },
    getall2:function(){
      this.$store.commit("setorglist2",[]);
      this.$api.dic.getOrgAll().then(res => {
        this.navdata = res.data.data;
        for(let j in this.navdata){
          if(this.navdata[j].createdate){
            this.navdata[j].createdate = this.navdata[j].createdate.substring(0,10)
          }
        }
        for (let i in this.navdata) {
          if (this.navdata[i].parentid == "0") {
            const treenodes={children:[]};
            treenodes.fullname=this.navdata[i].fullname;
            treenodes.encode=this.navdata[i].encode;
            treenodes.nature=this.navdata[i].nature;
            treenodes.createdate=this.navdata[i].createdate;
            treenodes.outerphone=this.navdata[i].outerphone;
            treenodes.description=this.navdata[i].description;
            treenodes.parentid=this.navdata[i].parentid;
            treenodes.manager=this.navdata[i].manager;
            treenodes.managerid=this.navdata[i].managerid;
            treenodes.address=this.navdata[i].address;
            treenodes.fax=this.navdata[i].fax;
            treenodes.postalcode=this.navdata[i].postalcode;
            treenodes.businessscope=this.navdata[i].businessscope;
            treenodes.email=this.navdata[i].email;
            treenodes.webaddress=this.navdata[i].webaddress;
            treenodes.organizeid=this.navdata[i].organizeid;
            treenodes.provinceid=this.navdata[i].provinceid;
            treenodes.cityid=this.navdata[i].cityid;
            treenodes.countyid=this.navdata[i].countyid;
            this.getTree2(this.navdata[i], this.navdata, treenodes);
            this.$store.dispatch("pushorglist2",treenodes)
          }
        }
      })
    },
  },
  computed:{
    clientHeight:function(){
      console.log(this.$store.getters.clientHeight -5 +'px');
      return this.$store.getters.clientHeight -5 +'px'
    },
    orgall:function () {
      return this.$store.getters.orgall
    }
  },
  created:function () {
    this.getall();
    this.getall2();
  }
}
</script>

<style scoped>

</style>
