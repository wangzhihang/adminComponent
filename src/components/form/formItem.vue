<template>
  <div class="iFormItem">
    <FormItem :label="label" :prop="prop">
        <slot></slot>
    </FormItem>
  </div>
</template>
<script>
export default {
  name: 'iFormItem',
  data() {
      return {}
  },
  props: {
      label:{
          type:String,
          default:''
      },
      prop:{
          type:String,
          default:''
      }
  },
  methods: {
   
  },
  created() {
    
  }
}
</script>
<style lang="less">
.smallDrawer{
    .ivu-card-head{
        border-bottom: 0!important;
        padding: 0px;
    }
    .iFormItem{
        .ivu-form-item-content{
            width: 60%!important;
        }
    }
}
.largeDrawer{
    .ivu-card-head{
        padding: 5px 10px;
    }
    .ivu-card-body{
        display: flex;
        flex-wrap: wrap;
    }
    .iFormItem{
        width: 50%;
        .ivu-form-item-content{
            width: 60%!important;
        }
    }
}

</style>
