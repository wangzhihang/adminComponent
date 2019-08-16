<template>
  <div class="dragCard">
      <Card 
      :dis-hover="disHover" 
      :bordered="bordered"
      :shadow="shadow"
      :padding="padding"
      :icon="icon"
      >
        <p slot="title">
            <span class="titleIcon"></span>
            <span>{{title}}</span>
        </p>
        <slot></slot>
    </Card>
  </div>
    
</template>

<script>
export default {
  name: "DragCard",
  props:{
    bordered: {
        type: Boolean,
        default:true
    },
    disHover:{
        type: Boolean,
        default:false 
    },
    shadow:{
        type:Boolean,
        default:false
    },
    padding:{
        type:Number,
        default:16
    },
    title:{
        type:String
    },
    icon:{
        type:String
    }
  },
  data(){
    return {
      
    }
  },
  methods: {
    onClick(){
    }
  }
};
</script>
<style lang="less">
.dragCard{
    .titleIcon{
        display: inline-block;
        width: 8px;
        height: 20px;
        border-radius: 10px;
        background-color: #7676cd;
        margin-right: 8px;
        margin-bottom: -4px;
    }
    .ivu-card-head{
        p{
            display: flex;
            margin: auto;
        }
    }
    .ivu-card-body{
        padding: 5px 16px;
    }
}

</style>