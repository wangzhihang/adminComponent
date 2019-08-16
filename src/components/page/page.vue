<template>
  <div class="tablePage">
     <Page 
     :current="current" 
     :total="total"
     :page-size="pageSize" 
     :placement="placement"
     :size="size"
     :simple="simple"
     :show-total="showTotal"
     :show-elevator="showElevator"
     :show-sizer="showSizer"
     :class-name="className"
     :styles="styles"
     :transfer="transfer"
     :prev-text="prevText"
     :next-text="nextText"
     @on-change="onChange"
     @on-page-size-change="onPageSizeChange"
      />
  </div>
    
</template>

<script>
export default {
  name: "TablePage",
  props:{
    current:{
        type:Number,
        default:1
    },
    total:{
        type:Number,
        default:0
    },
    pageSize:{
        type:Number,
        default:10
    },
    // pageSizeOpts:{
    //     type:Array,
    //     default:[10, 20, 30, 40]
    // },
    placement:{
        type:String,
        default:'bottom'
    },
    size:{
        type:String
    },
    simple:{
        type:Boolean,
        default:false
    },
    showTotal:{
        type:Boolean,
        default:false
    },
    showElevator:{
        type:Boolean,
        default:false
    },
    showSizer:{
        type:Boolean,
        default:false
    },
    className:{
        type:String
    },
    styles:{
        type:Object
    },
    transfer:{
        type:Boolean,
        default:false
    },
    prevText:{
        type:String
    },
    nextText:{
        type:String
    }

  },
  data(){
    return {
      
    }
  },
  methods: {
      onChange(index){
            this.current=index;
            this.$emit('currentIndex', index)
      },
      onPageSizeChange(size){
          this.pageSize=size;
          this.$emit('currentPageSize', index)
      }
  }
};
</script>
<style lang="less">
.tablePage{
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 30px;
    text-align: center;
}
</style>