<template>
  <div class="datePicker" style="position: relative;display: inline-block;">
    <!-- {{label}} -->
    <DatePicker 
    :type="dateType" 
    :v-model="value"
    :format="format"
    :options="options1"
    :placement="placement"
    :confirm="confirm"
    :disabled="disabled"
    :clearable="clearable"
    :readonly="readonly"
    :transfer="transfer"
    :placeholder="placeholder"
    :multiple="multiple"
    @on-change="handleChange"
    ></DatePicker>
  </div>
</template>
<script>
export default {
  props: {
      dateType:{
          type:String,
          default:'date'
      },
      value:{
          type:[String,Array],
          default:''
      },
      format:{
          type:Date
      },
      options:{
          type:Object
      },
      placement:{
          type:String,
          default:'bottom-end'
      },
      confirm:{
          type:Boolean,
          default:false
      },
      disabled:{
          type:Boolean,
          default:false
      },
       clearable:{
          type:Boolean,
          default:true
      },
      readonly:{
          type:Boolean,
          default:false
      },
      transfer:{
          type:Boolean,
          default:true
      },
      multiple:{
          type:Boolean,
          default:false
      },
      placeholder:{
          type:String,
          default:'请选择日期'
      }
  },
  data() {
    return {
        options1:{
            shortcuts: [
                {
                    text: '今天',
                    value () {
                        return new Date();
                    },
                    onClick: (picker) => {
                        // this.$Message.info('Click today');
                    }
                },
                {
                    text: '昨天',
                    value () {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24);
                        return date;
                    },
                    onClick: (picker) => {
                        // this.$Message.info('Click yesterday');
                    }
                },
                {
                    text: '一周以前',
                    value () {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                        return date;
                    },
                    onClick: (picker) => {
                        // this.$Message.info('Click a week ago');
                    }
                }
            ],
            disabledDate (date) {
                return date.getTime() > new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000-1;
            }
        },
        options2: {
            shortcuts: [
                {
                    text: '最近一周',
                    value () {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        return [start, end];
                    }
                },
                {
                    text: '最近一月',
                    value () {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        return [start, end];
                    }
                },
                {
                    text: '最近三月',
                    value () {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        return [start, end];
                    }
                }
            ],
             disabledDate (date) {
                return date.getTime() > new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000-1;
            }
        }
    }
  },
  created() {
    
  },
  mounted() {
  },
  methods: {
      handleChange(date){
        //   document.getElementsByClassName("datePicker")[0].parentNode.lastChild.innerHTML='';
          this.$emit("selectDate", date);
      }
  },
  watch: {
      "value"(newValue){
          this.$emit("selectDate", newValue);
      }
  }
};
</script>
<style scoped>
.ivu-date-picker {
  width: 240px;
  display: inline-block;
  margin-right: 10px;
}
.radio-group {
  position: absolute;
  top: 40px;
  right: 0;
  min-width: 315px;
  z-index: 10;
}
.ivu-picker-panel-sidebar{
    width: 100px!important;
    margin-left: -100px!important;
}
</style>
