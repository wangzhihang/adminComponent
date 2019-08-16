<template>
  	<div class="addDrawer">
		<Drawer title="新增列表" :closable="false" :value="value" v-show="sync_value" closable mask-closable :width="dragWidth" @on-close="onClose">
			<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
				<FormItem v-for="item in columns" v-if="item.key&&item.key !== 'handle'&&item.type=='input'" :type="item.inputType" :key="item.key" :label="`${item.title}：`" :prop="item.key" >
					<Input v-model="formValidate[item.key]" :placeholder="`请输入${item.title}`" :clearable="true"></Input>
				</FormItem>
				<FormItem v-for="item in columns" v-if="item.key&&item.key !== 'handle'&&item.type=='radio'" :key="item.key" :label="`${item.title}：`" :prop="item.key" >
					<RadioGroup v-model="formValidate[item.key]">
						<Radio v-for="item in radioArr" :key="item.label" :label="item.label"></Radio>
					</RadioGroup>
				</FormItem>
				<FormItem v-for="item in columns" v-if="item.key&&item.key !== 'handle'&&item.type=='check'" :key="item.key" :label="`${item.title}：`" :prop="item.key" >
					<CheckboxGroup v-model="formValidate[item.key]">
						<Checkbox v-for="item in checkBoxArr" :key="item.label" :label="item.label"></Checkbox>
					</CheckboxGroup>
				</FormItem>
				<FormItem v-for="item in columns" v-if="item.key&&item.key !== 'handle'&&item.type=='select'"  :key="item.key" :label="`${item.title}：`" :prop="item.key" >
					<Select v-model="formValidate[item.key]" :placeholder="`请输入${item.title}`" :clearable="true" :filterable="true">
						<Option v-for="item in selectArr" :value="item.value" :key="item.value" >{{ item.label }}</Option>
					</Select>
				</FormItem>
				<FormItem v-for="item in columns" v-if="item.key&&item.key !== 'handle'&&item.type=='selectMultify'"  :key="item.key" :label="`${item.title}：`" :prop="item.key" >
					<Select v-model="formValidate[item.key]" :multiple="true" :placeholder="`请输入${item.title}`" :clearable="true" :filterable="true">
						<Option v-for="item in selectArr" :value="item.value" :key="item.value" >{{ item.label }}</Option>
					</Select>
				</FormItem>
				<FormItem v-for="item in columns" v-if="item.key&&item.key !== 'handle'&&item.type=='date'||item.type=='datetime'" format="yyyy-MM-dd" :key="item.key" :label="`${item.title}：`" :prop="item.key" >
					<DatePicker  v-model="formValidate[item.key]" :type="item.type" :transfer="true" :placeholder="`请输入${item.title}`" style="width: 260px"></DatePicker>
				</FormItem>
				<FormItem v-for="item in columns" v-if="item.key&&item.key !== 'handle'&&item.type=='daterange'||item.type=='datetimerange'" format="yyyy-MM-dd HH:mm:ss" :key="item.key" :label="`${item.title}：`" :prop="item.key" >
					<DatePicker  v-model="formValidate[item.key]" :type="item.type" :transfer="true" :placeholder="`请输入${item.title}`" style="width: 260px"></DatePicker>
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
		columns:{
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
		currentColumn:{
			type:Object,
			default:{} 
		},
		action:{
			type:String
		}
	},
	watch: {
		currentColumn(newCurCol){
			if(this.action=='edit'){
				for (var index in this.currentColumn.row) {
					this.columns.forEach(item=>{
						if(item.key==index){
							this.formValidate[item.key]=this.currentColumn.row[index];
						}
					})
				}
			}
		}
	},
	data() {
		return {
			formValidate:{
				
			},
			ruleValidate:{
			}
		};
	},
	mounted() {	
	},
	created(){
		this.columns.forEach((item,index)=>{
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
				this.ruleValidate[item.key]=selectMultipy();
			}else if(item.key&&item.key !== 'handle'&&item.type == 'date'||item.type=='datetime'){
				this.ruleValidate[item.key]=dateTime();
			}else if(item.key&&item.key !== 'handle'&&item.type == 'daterange'||item.type=='datetimerange'){
				this.ruleValidate[item.key]=dateTimeRange()
			}
		})
	},
	methods: {
		handleSubmit () {
			this.$refs.formValidate.validate((valid) => {
				if (valid) {
					for (var index in this.formValidate) {
						this.columns.forEach(item=>{
							if(item.key==index&&item.type=="date"){
								this.formValidate[index]=this.$moment(this.formValidate[index]).format("YYYY-MM-DD")
							}else if(item.key==index&&item.type=="datetime"){
								this.formValidate[index]=this.$moment(this.formValidate[index]).format("YYYY-MM-DD HH:mm:ss")
							}else if(item.key==index&&item.type=="check"){
								this.formValidate[index]=this.formValidate[index].join(",")
							}else if(item.key==index&&item.type=="selectMultify"){
								this.formValidate[index]=this.formValidate[index].join(',')
							}
						})
					}
					if(this.action=='add'){
						this.$emit('newCols',this.formValidate)
					}else if(this.action=='edit'){
						this.$emit('editCurClos',this.formValidate)
						console.log('formValidate==='+JSON.stringify(this.formValidate))
					}
					this.formValidate={};
					this.sync_value=false;
					this.$Message.success('Success!');
				} else {
					this.$Message.error('Fail!');
				}
			})
		},
		handleReset () {
			this.$refs.formValidate.resetFields();
		},
		onClose(){
			this.sync_value = false
			this.formValidate={};
			this.currentColumn={}
			// this.$emit('currentColumn',this.currentColumn)
		}
	}
};
</script>

<style lang="less">


</style>