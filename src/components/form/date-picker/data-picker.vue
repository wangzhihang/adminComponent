<template>
  <div class="datePicker" style="position: relative;display: inline-block;">
    <!-- {{label}} -->
    <Date-picker
      v-model="params.startTime"
      @on-change="handleChangeStart"
      :type="dateType"
      placeholder="开始日期"
      class="date-picker"
      :options="options"
      style="margin-left:0;"
    ></Date-picker>
    <span v-show="showEndDate">至</span>
    <Date-picker
      v-model="params.endTime"
      @on-change="handleChangeEnd"
      :type="dateType"
      placeholder="结束日期"
      class="date-picker"
      :options="options"
      v-show="showEndDate"
      style="margin-right:0;"
    ></Date-picker>
    <Radio-group v-model="params.status" :class="(isBr)?'radio-group':''" v-if="quickSelect">
      <span>最近：</span>
      <Radio label="week">一周</Radio>
      <Radio label="onemonth">1个月</Radio>
      <Radio label="threemonth">3个月</Radio>
      <Radio label="sixmonth">半年</Radio>
      <Radio label="year">一年</Radio>
    </Radio-group>
  </div>
</template>
<script>
export default {
  //disableDate 禁用日期        string   (beforeToady,afterToady)
  props: ["startTime", "endTime", "disableDate","dateType","num"],
  data() {
    return {
      params: {
        status: "",
        startTime: null,
        endTime: null
      },
      isBr: false, //isBr 是否分行显示
      quickSelect: false, // 是否显示快捷选择
      label: "选择时间：", // label默认的字段
      // 禁用日期
      options: {},
      showEndDate:true
    };
  },
  created() {
    // 是否显示快捷选择
    if (this.$attrs.hasOwnProperty("quickSelect")) {
      this.quickSelect = true;
    }
    // 是否分行显示
    if (this.$attrs.hasOwnProperty("isBr")) {
      this.isBr = true;
    }
    // 传了label,就改变label
    if (this.$attrs.label) {
      this.label = this.$attrs.label;
    }
    // 初始化开始时间和结束时间
    this.params.startTime = this.startTime;
    this.params.endTime = this.endTime;

    // 初始化禁用日期,默认不禁用
    // 禁用今天之前的日期
    if (this.disableDate === "beforeToady") {
      this.options = {
        disabledDate: date => {
          return date && date.valueOf() < Date.now() - 86400000;
        }
      };
      // 禁用今天之后的日期
    } else if (this.disableDate === "afterToady") {
      this.options = {
        disabledDate: date => {
          return date && date.valueOf() > Date.now();
        }
      };
    }
    //判断显示几个datepicker
    if(this.num==1){
      this.showEndDate=false;
    }else if(this.num==2){
      this.showEndDate=true;
    }
  },
  mounted() {
    // 重置方法
    // 触发方式 this.$refs.foo.$emit('reset',startTime,endTime)
    this.$on("reset", (startTime, endTime) => {
      this.params.startTime = startTime;
      this.params.endTime = endTime;
      this.params.status = "reset";
      this.$emit("selectDate", this.params);
    });
  },
  methods: {
    handleChangeStart(data) {
      this.params.startTime = data;
      this.$emit("selectDate", this.params);
    },
    handleChangeEnd(data) {
      this.params.endTime = data;
      this.$emit("selectDate", this.params);
    }
  },
  watch: {
    "params.status"(val) {
      if (val === "reset") {
        return;
      }
      this.params.endTime = this.$utils.time.formatTime();
      switch (val) {
        case "week":
          this.params.startTime = this.$utils.time.formatSubtractTime(7, "d");
          break;
        case "onemonth":
          this.params.startTime = this.$utils.time.formatSubtractTime(1, "M");
          break;
        case "threemonth":
          this.params.startTime = this.$utils.time.formatSubtractTime(3, "M");
          break;
        case "sixmonth":
          this.params.startTime = this.$utils.time.formatSubtractTime(6, "M");
          break;
        case "year":
          this.params.startTime = this.$utils.time.formatSubtractTime(12, "M");
          break;
      }
      this.$emit("selectDate", this.params);
    }
  }
};
</script>
<style scoped>
.date-picker {
  width: 200px;
  display: inline-block;
  margin-left: 10px;
  margin-right: 10px;
}
.radio-group {
  position: absolute;
  top: 40px;
  right: 0;
  min-width: 315px;
  z-index: 10;
}
</style>
