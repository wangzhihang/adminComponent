<template>
	<div class="tableDrag">
		<drag-drawer
		v-model="showDrawer"  
		:width="50" 
		:min-width="400" 
		:scrollable="true" 
		title="新增列表"
		class="smallDrawer"
		@onClose="onClose"
		>
			<iForm 
			ref="formValidate"
			:model="formValidate"
			:rules="ruleValidate"
			labelPosition="left"
			:labelWidth="100"
			>
				<drag-card :disHover="true" :bordered="false" title="新增信息">
					<iFormItem label="name：" prop="name">
						<m-input v-model="formValidate.name" type="text" placeholder="请输入姓名" @getInputValue="getNameValue"></m-input>
					</iFormItem>
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
import {tel,name,select,selectMultipy,radio,checkbox,dateTime,dateTimeRange,text} from '@/components/form/Format.js'

export default {
  name: 'addTable',
  components: {
	  DragDrawer,
	  DragCard,
	  iForm,
	  iFormItem,
	  MInput
  },
  data () {
    return {
		showWindownDrawer:this.showDrawer,
		formValidate:{
			name:''
		},
		ruleValidate:{
			"name":name(),
		},
	}
  },
  props:{
	  showDrawer:{
		  type: Boolean
	  }
  },
  mounted () {
    
  },
  methods:{
	  getNameValue(data){
		this.formValidate.name=data;
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
	},
	onClose(param){
		console.log(param)
		if(param=="关闭"){
			this.showDrawer=false;
			this.$emit('update:showDrawer', this.showDrawer)
		}
	}
  }
}
</script>

<style lang="less">


</style>
