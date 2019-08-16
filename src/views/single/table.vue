<template>
	<div class="projectList">
		<tables
			:columns="columns" 
			:column="columns"
			:value="tableData"
			:stripe="true"
			:highlightRow="true"
			:showExportBtn="true"
			:showAddBtn="true"
			:editable="true"
			search-place="top"
			:radioArr="radioArr"
			:checkBoxArr="checkBoxArr"
			:selectArr="selectArr"
			@on-delete="handleDelete"
			@on-view="handleView"
			@addNewCols="addNewCols" 
			@on-edit="onEdit"
			@editCurCloumn="editCurCloumn"
			:currentColumn="currentColumn"
			:showDrawerAdd="showDrawerAdd"
			:action="action"
			:formValidate="formValidate"
		/>
		<table-page :total="100"></table-page>
	</div>
</template>

<script>
import Tables from '@/components/tables';
import TablePage from '@/components/page'

export default {
  name: 'ProjectList',
  components: {
	Tables,
	TablePage
  },
  data () {
    return {
		showDrawerAdd:false,
		action:'',
		columns: [
			{ type: 'index',width: 60,align: 'center'},
			{ title: "Name", key: "name", sortable: true ,editable:true,type:"input",inputType:"text"},
			// { title: "Age", key: "age" ,editable:true,type:"input",inputType:"number"},
			{ title: "Sex", key: "sex" ,editable:true,type:"radio"},
			{ title: "Fruit", key: "fruit" ,editable:true,type:"check"},
			{ title: "Address", key: "address" ,editable:true,type:"selectMultify"},
			{ title: "gatherTime", key: "gatherTime" ,editable:true,type:"date",slot: 'gatherTime'},
			// { title: "gatherRangeTime", key: "gatherRangeTime" ,editable:true,type:"daterange",slot: 'gatherRangeTime'},
			{ title: "Handle", key: "handle", options: ["delete","view","edit"]}
		],
		tableData: [
			{
			name: "John Brown",
			sex: "男",
			fruit: ["西瓜","苹果"],
			address: ["上海","北京"],
			gatherTime:"2019-08-07T00:00:00",
			// gatherRangeTime:["2019-07-05T00:00:00","2019-08-07T00:00:00"],
			$isEdit: false,
			id:"3679527262983553024"
			},
			{
			name: "Jim Green",
			sex: "男",
			fruit: ["西瓜","苹果"],
			address: ["上海","北京"],
			gatherTime:"2019-08-07T00:00:00",
			// gatherRangeTime:["2019-07-05T00:00:00","2019-08-07T00:00:00"],
			$isEdit: false,
			id:"3679527262983553025"
			},
			{
			name: "Joe Black",
			sex: "男",
			fruit: ["西瓜","苹果"],
			address: ["上海","北京"],
			gatherTime:"2019-08-07T00:00:00",
			// gatherRangeTime:["2019-07-05T00:00:00","2019-08-07T00:00:00"],
			$isEdit: false,
			id:"3679527262983553026"
			},
			{
			name: "Jon Snow",
			sex: "男",
			fruit: ["西瓜","苹果"],
			address: ["上海","北京"],
			gatherTime:"2019-08-07T00:00:00",
			// gatherRangeTime:["2019-07-05T00:00:00","2019-08-07T00:00:00"],
			$isEdit: false,
			id:"3679527262983553027"
			}
		],
		radioArr:[{"label":"男","value":"男"},{"label":"女","value":"女"}],
		// checkBoxArr:["西瓜","苹果","柚子"],
		checkBoxArr:[{"label":"西瓜","value":"西瓜"},{"label":"苹果","value":"苹果"},{"label":"柚子","value":"柚子"}],
		selectArr:[{"label":"上海","value":"上海"},{"label":"北京","value":"北京"},{"label":"南京","value":"南京"}],
		currentColumn:{},
		formValidate:{
			name:'',
			age:null,
			sex:'',
			fruit:[],
			address:[],
			gatherTime:''
			
		},
	}
  },
  mounted () {
    
  },
  methods:{
	  	handleDelete(params) {
			console.log(params);
		},
		handleView(param){
			console.log(param.row);
			this.$Modal.info({
				title: 'User Info',
				content: `Name：${param.row.name}<br>Age：${param.row.age}<br>Address：${param.row.address}`
			})
		},
		addNewCols(newCols){
			console.log("newCols=="+JSON.stringify(newCols))
			// this.insideTableData.unshift(newCols)
		},
		onEdit(params){
			// console.log('params==='+JSON.stringify(params))
			// this.currentColumn=params;
			this.showDrawerAdd=true;
			this.action='edit'
			//根据当前列的id调接口获取数据
			this.currentColumn={
				name: "John Brown",
				sex: "男",
				fruit: ["西瓜","苹果"],
				address: ["上海","北京"],
				gatherTime:"2019-08-07T00:00:00"
			}
		},
		editCurCloumn(editCols){
			// console.log("clearCurCols=="+JSON.stringify(clearCurCols))
			this.currentColumn={};
			console.log("editCols=="+JSON.stringify(editCols))
			//下一步 刷新列表
			// this.insideTableData.splice(this.currentColumn.index,1,editCols)
		}
  }
}
</script>

<style lang="less">


</style>
