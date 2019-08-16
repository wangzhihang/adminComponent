<template>
  <div class="iselect">
	{{label}}
    <!-- 非多选的情况 -->
    <i-select
      v-if="!ismultiple"
      v-model="selectedData"
      :placeholder="placeholder"
      :filterable="filterable"
      :disabled="disabled"
      :not-found-text="notFoundText"
      :label-in-value="labelInValue"
      clearable
      @on-change="getSelectedData"
      @on-clear="clearSelect"
      class="select"
    >
      <i-option v-for="item in list" :value="item.value" :key="item.id">{{item.label}}</i-option>
    </i-select>
    <!-- 多选的情况 -->
    <i-select
      v-if="ismultiple"
      v-model="selectedMulData"
      :placeholder="placeholder"
      :filterable="filterable"
      :disabled="disabled"
      :not-found-text="notFoundText"
      :label-in-value="labelInValue"
      multiple
      :max-tag-count="2" 
      :max-tag-placeholder="maxTagPlaceholder"
      @on-change="getSelectedMulData"
      @on-clear="clearSelect"
      class="select"
    >
      <i-option v-for="item in list" :value="item.value" :key="item.id">{{item.label}}</i-option>
    </i-select>
  </div>
</template>

<script>
export default {
  name: "SelectBox",
  props: {
    placeholder:{
        type:String
    },
    multiple: {
      type: Boolean,
      required: false,
      default: false
    },
    filterable: {
      type: Boolean,
      required: false,
      default: false
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    notFoundText: {
      type: String,
      default: "无匹配数据"
    },
    labelInValue: {
      type: Boolean,
      dafault: false
    },
    label: {
      type: String,
      required: false
	},
	list:{
		type:Array
  },
  ismultiple:{
    type:Boolean
  }
  },
  watch: {
    "selectedData"(newValue){
        this.$emit("getSelectedData", newValue);
    },
    "selectedMulData"(newValue){
        this.$emit("getSelectedData", newValue);
    }
  },
  data() {
    return {
    selectedData: '',
    selectedMulData:[]
    };
  },
  methods: {
    getSelectedData(value) {
      this.selectedData = value;
      if(this.selectedData){
        //  document.getElementsByClassName("iselect")[0].parentNode.lastChild.innerHTML='';
      }
      this.$emit("getSelectedData", this.selectedData);
    },
    getSelectedMulData(value) {
        this.selectedMulData = value;
        if(this.selectedMulData){
          //  document.getElementsByClassName("iselect")[0].parentNode.lastChild.innerHTML='';
        }
        this.$emit("getSelectedData", this.selectedMulData);
    },
    maxTagPlaceholder(num){
      return 'more'+num;
    },
    clearSelect(){
      event.currentTarget.parentElement.parentElement.parentElement.parentElement.classList.remove("noError")
    }
  }
};
</script>

<style lang="less">
.noError{
  .ivu-select-selection,.ivu-input{
    border: 1px solid #dcdee2;
    &:hover{
      border: 1px solid #589FF0;
      box-shadow: 0 0 0 2px rgba(45, 140, 240, 2)
    }
    .ivu-select-arrow{
      color: #808695;
    }
  }
}

.error{
  .ivu-select-selection,.ivu-input{
    border: 1px solid #ed4014;
    &:hover{
      border: 1px solid #ed4014;
    }
  }
}
.selectNoError{
  color: #ffffff;
}
.noTip{
  position: absolute;
    top: 100%;
    left: 0;
    line-height: 1;
    padding-top: 6px;
    color: transparent;
    background: #fff;
}
</style>