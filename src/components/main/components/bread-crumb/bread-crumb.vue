<template>
  <div class="breadCrumb">
        <Breadcrumb separator=">">
            <BreadcrumbItem v-for="item in breadCrumbList" :to="item.router">
              <span  @click="toHome(item.title)">
                <common-icon style="margin-right: 4px;" :type="item.icon || ''"/>
                <span>{{item.title}}</span>
              </span>
            </BreadcrumbItem>
        </Breadcrumb>
  </div>
    
</template>

<script>
import CommonIcon from '@/components/common-icon'
export default {
  name: "BreadCrumb",
  components:{
      CommonIcon
  },
  props:{
    breadCrumbList:{
      type:Array
    }
  },
  data(){
    return {
      // isShowBreadCrumb:false
    }
  },
  mounted(){
      // console.log('$route=='+this.$route.path+this.menuList)
      // if(this.$route.path=='/'){
      //     this.isShowBreadCrumb=false;
      // }else{
      //     this.isShowBreadCrumb=true;
      // }
  },
  computed:{
  },
  methods: {
    toHome(title){
      if(title=='首页'){
        this.$store.commit("getBreadCrumbList",[])
      }
    }
  }
};
</script>
<style lang="less">
.breadCrumb{
  .ivu-breadcrumb{
    color: #515a6e;
    font-size: 12px;
    // padding-bottom: 10px;
  }
}
</style>