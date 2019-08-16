<template>
  	<div class="addDrawer">
		<Drawer title="新增列表" :closable="false" :value="value" v-show="sync_value" closable mask-closable :width="dragWidth" @on-close="onClose">
			<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
				<FormItem v-for="item in column" v-if="item.key&&item.key !== 'handle'&&item.type=='input'"  :key="item.key" :label="`${item.title}：`" :prop="item.key" >
					<Input v-model="formValidate[item.key]" :placeholder="`请输入${item.title}`" :clearable="true" :type="item.inputType" />
				</FormItem>
				<FormItem v-for="item in column" v-if="item.key&&item.key !== 'handle'&&item.type=='radio'" :key="item.key" :label="`${item.title}：`" :prop="item.key" >
					<RadioGroup v-model="formValidate[item.key]">
						<Radio v-for="radio in radioArr" :key="radio.label" :label="radio.label"></Radio>
					</RadioGroup>
				</FormItem>
				<FormItem v-for="item in column" v-if="item.key&&item.key !== 'handle'&&item.type=='check'" :key="item.key" :label="`${item.title}：`" :prop="item.key" >
					<CheckboxGroup v-model="formValidate[item.key]" @on-change="handleCheckChange($event,item.key)">
						<Checkbox v-for="check in checkBoxArr" :key="check.label" :label="check.label"></Checkbox>
					</CheckboxGroup>
				</FormItem>
				<FormItem v-for="item in column" v-if="item.key&&item.key !== 'handle'&&item.type=='select'"  :key="item.key" :label="`${item.title}：`" :prop="item.key" >
					<Select v-model="formValidate[item.key]" :placeholder="`请输入${item.title}`" :clearable="true" :filterable="true" @on-change="handleSelectChange($event,item.key)">
						<Option v-for="select in selectArr" :value="select.value" :key="select.value" :label="select.label"></Option>
					</Select>
				</FormItem>
				<FormItem v-for="item in column" v-if="item.key&&item.key !== 'handle'&&item.type=='selectMultify'"  :key="item.key" :label="`${item.title}：`" :prop="item.key" >
					<Select v-model="formValidate[item.key]" :placeholder="`请输入${item.title}`" :filterable="true" :multiple="true" @on-change="handleSelMultipyChange($event,item.key)">
						<Option v-for="select in selectArr" :value="select.value" :key="select.value" :label="select.label"></Option>
					</Select>
				</FormItem>
				<FormItem v-for="item in column" v-if="item.key&&item.key !== 'handle'&&item.type=='date'||item.type=='datetime'" format="yyyy-MM-dd" :key="item.key" :label="`${item.title}：`" :prop="item.key" >
					<DatePicker v-model="formValidate[item.key]" :type="item.type" :transfer="true" :placeholder="`请输入${item.title}`" style="width: 260px"></DatePicker>
				</FormItem>
				<FormItem v-for="item in column" v-if="item.key&&item.key !== 'handle'&&item.type=='daterange'||item.type=='datetimerange'" format="yyyy-MM-dd HH:mm:ss" :key="item.key" :label="`${item.title}：`" :prop="item.key" >
					<DatePicker v-model="formValidate[item.key]" :type="item.type" :transfer="true" :placeholder="`请输入${item.title}`" style="width: 260px"></DatePicker>
				</FormItem>
				<FormItem class="dragDrawerFooter">
					<Button @click="handleReset">Reset</Button>
					<Button type="primary" @click="handleSubmit">Submit</Button>
				</FormItem>
			</Form>
		</Drawer>
  	</div>
</template>

<script>
import propsync from 'vue-propsync'
import {tel,name,select,selectMultipy,radio,checkbox,dateTime,dateTimeRange,text,number} from '@/components/form/Format.js'
export default {
	name: "addDrawer",
	mixins: [propsync],
	props: {
		column:{
			type:Array,
			default:[]
		},
		value:{
			type: Boolean,
			default: false,
			isSync: true // 需要开启双向绑定的一定要写这句话，默认不会将所有的 prop 开启双向绑定
		},
		dragWidth:{
			type:[Number,String],
			default:'30'
		},
		multiple:{
			type: Boolean,
			default: false,
		},
		radioArr:{
			type:Array,
			default:[]
		},
		checkBoxArr:{
			type:Array,
			default:[]
		},
		selectArr:{
			type:Array,
			default:[]
		},
		curColumn:{
			type:Object,
			default:{}
		},
	},
	watch: {
		curColumn(newCurCol){
			if(this.$attrs.action=='edit'){
				for (var index in this.curColumn) {
					this.column.forEach(item=>{
						if(item.key==index){
							this.formValidate[item.key]=this.curColumn[index];
						}
					})
				}
			}
		}
	},
	data() {
		return {
			formValidate:this.$attrs.formValidate,
			// formValidate:{
			// 	fruit:[]
				
			// },
			ruleValidate:{

			}
		};
	},
	mounted() {
		this.validate()
	},
	created(){
		
	},
	updated(){
		// this.$nextTick(function(){
		// 	console.log('ruleValidate=='+JSON.stringify(this.ruleValidate))
		// 	console.log('formValidate==='+JSON.stringify(this.formValidate))
		// })	
	},
	methods: {
		validate(){
			this.column.forEach((item,index)=>{
				if(item.key&&item.key !== 'handle'&&item.type == 'input'&&item.inputType=='text'){
					this.ruleValidate[item.key]=text();
				}if(item.key&&item.key !== 'handle'&&item.type == 'input'&&item.inputType=='number'){
					this.ruleValidate[item.key]=number();
				}else if(item.key&&item.key !== 'handle'&&item.type=='check'){
					this.ruleValidate[item.key]=checkbox();
				}else if(item.key&&item.key !== 'handle'&&item.type=='radio'){
					this.ruleValidate[item.key]=radio();
				}else if(item.key&&item.key !== 'handle'&&item.type=='select'){
					this.ruleValidate[item.key]=select();
				}else if(item.key&&item.key !== 'handle'&&item.type == 'selectMultify'){
					this.ruleValidate[item.key]=[{ required: true, type: 'array', min: 1, message: '请至少选择一个', trigger: 'change' }];
				}else if(item.key&&item.key !== 'handle'&&item.type == 'date'||item.type=='datetime'){
					this.ruleValidate[item.key]=dateTime();
				}else if(item.key&&item.key !== 'handle'&&item.type == 'daterange'||item.type=='datetimerange'){
					this.ruleValidate[item.key]=dateTimeRange()
				}
			})
		},
		handleCheckChange(data,key){
			console.log('checkData=='+data)
			if(data.length==0){
				this.formValidate[key]=[];
			}else{
				this.formValidate[key]=data;
			}
		},
		handleSelectChange(data,key){
			if(data==undefined){
				this.formValidate[key]="";
			}else{
				this.formValidate[key]=data;
			}
		},
		handleSelMultipyChange(data,key){
			if(data.length==0){
				this.formValidate[key]=[];
			}else{
				this.formValidate[key]=data;
			}
		},
		handleSubmit () {
			this.$refs["formValidate"].validate((valid) => {
				if (valid) {
					if(Object.getOwnPropertyNames(this.$attrs.action)=="length"){
						this.$emit('addNewCols',this.formValidate)
					}else if(this.$attrs.action=='edit'){
						// this.curColumn={};
						this.$emit('editCurCloumn',this.formValidate,this.curColumn)
					}
					this.resetForm();
					this.$Message.success('Success!');
				} else {
					this.$Message.error('Fail!');
				}
			})
		},
		// format(){
		// 	for (var index in this.formValidate) {
		// 		this.column.forEach(item=>{
		// 			if(item.key==index&&item.type=="date"){
		// 				this.formValidate[index]=this.$moment(this.formValidate[index]).format("YYYY-MM-DD")
		// 			}else if(item.key==index&&item.type=="datetime"){
		// 				this.formValidate[index]=this.$moment(this.formValidate[index]).format("YYYY-MM-DD HH:mm:ss")
		// 			}else if(item.key==index&&item.type=="daterange"){
		// 				let startDate=this.$moment(this.formValidate[index][0]).format("YYYY-MM-DD")
		// 				let endDate=this.$moment(this.formValidate[index][1]).format("YYYY-MM-DD")
		// 				console.log('date==='+startDate+'    '+endDate)				
		// 			}else if(item.key==index&&item.type=="selectMultify"){
		// 				this.formValidate[index]=this.formValidate[index].join(',')
		// 			}
		// 		})
		// 	}
		// },
		resetForm() {
			this.formValidate={}
			// for(let item in this.formValidate){
			// 	this.formValidate[item]=""
			// }
			this.$refs["formValidate"].resetFields();
			this.sync_value=false;
		},
		handleReset () {
			this.$refs["formValidate"].resetFields();
		},
		onClose(){
			this.resetForm();
		}
	}
};
</script>

<style lang="less">


</style>