<template>
  <div class="project_detail_box setMg-b10" :style="{borderRadius: bra,height: height,marginBottom: mb}">
    <div class="setItemIcon itemIconBg setBottomLine" style="width: 100%;height: 30px;line-height: 30px">
      <!-- <span class="icon"></span> -->
      <span class="title">{{title}}</span>
      <!--jingli-->
      <Icon :type="type" :size="size" class="cardIcon" style="float:right;margin: 5px 5px 0 0;" @click="onClick"></Icon>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "card",
  props:{
     height: {
      type: String
    },
    title: {
      type: String
    },
    type: {
      type: String
    },
    size: {
      type: String,
      default: '16'
    }
  },
  data(){
    return {
      bra: '5px',
      mb: '10px',
    }
  },
  methods: {
    onClick(){
      this.$emit('on-click')
      // console.log(1)
    }
  }
};
</script>
<style lang="less">
.project_detail_box {
  padding: 0 !important;
  // overflow: hidden;
  background-color: #ffffff;
  box-shadow: -1px 0 3px 2px #e8e8e8;
  padding: 10px;
  .setMg-b10 {
    margin-bottom: 10px;
  }
  .setBottomLine {
    border-bottom: 1px solid #E1E1E1;
  }
  .setItemIcon{
  display: inline-block;
  .icon{
    display: inline-block;
    width: 8px;
    height: 20px;
    border-radius: 10px;
    margin-right: 8px;
    margin-bottom: -4px;
  }
  .title{
    font-size: 15px;
    font-weight: 600;
  }
  .cardIcon {
    color: #7676CD;
  }
  .operate{
    float: right;
    font-size: 18px;
    margin-top: -3px;
    margin-right: 5px;
    color: #2895A5;
  }

  .itemIconBg {
    // background-color: #206C8D;
    /*background: #03cbc842;*/
  }
  .title {
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 10px;
    color: #7676CD;
  }
  .material-table {
    padding: 0 10px;
  }
  .project_detail_unprocess {
    line-height: 24px;
    i {
      color: orange;
      font-size: 16px;
      margin-top: -3px;
    }
  }
  .produce_detail {
    padding: 0 15px;
    .ivu-form-item {
      margin-bottom: 0;
      .ivu-form-item-label {
        font-weight: 600;
      }
    }
  }
  .waitsrcoll {
    height: 75px;
    overflow-y: scroll;
  }
  .waitsrcoll::-webkit-scrollbar {
    display: none;
  }
}
}
</style>