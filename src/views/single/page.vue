<template>
  <div>
    <Button @click="showDrawer">抽屉</Button>
    <drag-drawer 
	v-model="showWindownDrawer" 
	:width="50" 
	:min-width="400" 
	:scrollable="true" 
	title="生产信息"
	class="smallDrawer"
	>
		<iForm 
		ref="formValidate"
		:model="formValidate"
		:rules="ruleValidate"
		labelPosition="left"
		:labelWidth="100"
		>
			<drag-card :disHover="true" :bordered="false" title="基础信息">
				<iFormItem label="tel：" prop="tel">
					<m-input v-model="formValidate.tel" type="text" placeholder="请输入电话号码" @getInputValue="getTelValue"></m-input>
				</iFormItem>
				<iFormItem label="name：" prop="name">
					<m-input v-model="formValidate.name" type="text" placeholder="请输入姓名" @getInputValue="getNameValue"></m-input>
				</iFormItem>
				<iFormItem label="select：" prop="select">
					<select-box v-model="formValidate.select" :list="list" :ismultiple="false" @getSelectedData="getSelectedData"></select-box>
				</iFormItem>
				<iFormItem label="radio：" prop="radio">
					<radio-button v-model="formValidate.radio" :list="radioList" @getRadioData="getRadioData"></radio-button>
				</iFormItem>
				<iFormItem label="checkbox：" prop="checkbox">
					<check-box v-model="formValidate.checkbox" :list="checkBoxList" @getCheckBoxData="getCheckBoxData"></check-box>
				</iFormItem>
				<iFormItem label="选择时间：" prop="dateTime">
					<date-picker v-model="formValidate.dateTime" dateType="date" @selectDate="selectDate"></date-picker>
				</iFormItem>
			</drag-card>
			<drag-card :disHover="true" :bordered="false" title="基础信息">
				<iFormItem label="ip：" prop="ip">
					<m-input v-model="formValidate.ip" type="text" placeholder="请输入IP" @getInputValue="getIPValue"></m-input>
				</iFormItem>
				<!-- <iFormItem label="选择时间：" prop="dateTime1">
					<date-picker v-model="formValidate.dateTime1" dateType="daterange" @selectDate="selectDate1"></date-picker>
				</iFormItem> -->
			</drag-card>
			<div class="dragDrawerFooter">
				<Button @click="resert">重置</Button>
				<Button type="primary"  @click="submit">确定</Button>
			</div>
		</iForm>
	</drag-drawer>
  </div>
</template>

<script>
import DragDrawer from '@/components/drag-drawer'
import DragCard from '@/components/drag-card'
import iForm from '@/components/form/form.vue'
import iFormItem from '@/components/form/formItem.vue'
import MInput from '@/components/form/input'
import SelectBox from '@/components/form/select'
import RadioButton from '@/components/form/radio'
import CheckBox from '@/components/form/check-box'
import DatePicker from '@/components/form/date-picker'
import {tel,name,select,selectMultipy,radio,checkbox,dateTime,dateTimeRange,text} from '@/components/form/Format.js'
export default {
  name: 'home',
  components: {
	DragDrawer,
	DragCard,
	iForm,
	iFormItem,
	MInput,
	SelectBox,
	RadioButton,
	CheckBox,
	DatePicker
  },
  data () {
    return {
	  showWindownDrawer:false,
	  formValidate:{
		  tel:'',
		  name:'',
		  select:'',
		  radio:'',
		  checkbox:[],
		  dateTime:'',
		//   dateTime1:'',
		  ip:''
	  },
	  list: [{
                value: 'New York',
                label: 'New York'
            },
            {
                value: 'London',
                label: 'London'
            },
            {
                value: 'Sydney',
                label: 'Sydney'
            },
            {
                value: 'Ottawa',
                label: 'Ottawa'
            },
            {
                value: 'Paris',
                label: 'Paris'
            },
            {
                value: 'Canberra',
                label: 'Canberra'
            }
		],
	radioList:[
		{
			value:'金斑蝶',
			label:'金斑蝶'
		},
		{
			value:'爪哇犀牛',
			label:'爪哇犀牛'
		},
		{
			value:'印度黑羚',
			label:'印度黑羚'
		}
		],
		checkBoxList:[
		{
			value:'香蕉',
			label:'香蕉'
		},
		{
			value:'苹果',
			label:'苹果'
		},
		{
			value:'西瓜',
			label:'西瓜'
		}
		],
	  ruleValidate:{
		  "tel":tel(),
		  "name":name(),
		  "select":select(),
		  "radio":radio(),
		  "checkbox":checkbox(),
		  "dateTime":dateTime(),
		//   "dateTime":dateTimeRange(),
		  "ip":text()
	  }
    }
  },
  mounted () {
    
  },
  methods:{
    showDrawer(){
      this.showWindownDrawer=true;
	},
	getTelValue(data){
		this.formValidate.tel=data;
	},
	getNameValue(data){
		this.formValidate.name=data;
	},
	getSelectedData(data){
		this.formValidate.select=data;
	},
	getRadioData(data){
		this.formValidate.radio=data;
	},
	getCheckBoxData(data){
		this.formValidate.checkbox=data;
	},
	selectDate(data){
		this.formValidate.dateTime=data;
	},
	selectDate1(data){
		this.formValidate.dateTime1=data;
	},
	getIPValue(data){
		this.formValidate.ip=data;
	},
	//提交表单
    submit(){
        // 参数：1.验证数据model   2.form的ref   3.form的规则
        this.$refs.formValidate.dragCardSubmit(
        this.formValidate,
        this.$refs.formValidate,
        this.ruleValidate)
        
	},
	resert(){
		// this.$refs.formValidate.resetFields();
		// 参数：1.验证数据model   2.form的ref
		this.$refs.formValidate.dragCardResert(this.formValidate,this.$refs.formValidate)
	}
  }
}
</script>

<style lang="less">

</style>
