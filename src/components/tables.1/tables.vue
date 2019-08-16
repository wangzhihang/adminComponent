<template>
  <div class="tables" ref="tables">
	  <Row class="search-con search-con-top">
        <Col span="6">
          <Button type="primary" v-show="showExportBtn" @click="exportData"><Icon type="ios-download-outline"></Icon>导出为Csv文件</Button>
          <Button type="primary" v-show="showAddBtn" @click="addData" style="margin-left:15px;">新建</Button>
        </Col>
        <Col span="18">
          <div v-if="searchable && searchPlace === 'top'" style="float:right">
            <Select v-model="searchKey" class="search-col">
              <Option v-for="item in columns" v-if="item.key !== 'handle'" :value="item.key" :key="`search-col-${item.key}`">{{ item.title }}</Option>
            </Select>
            <Input @on-change="handleClear" clearable placeholder="输入关键字搜索" class="search-input" v-model="searchValue"/>
            <Button @click="handleSearch" class="search-btn" type="primary"><Icon type="search"/>&nbsp;&nbsp;搜索</Button>
          </div>
        </Col>
    </Row>
    <Table
      ref="tablesMain"
      :data="insideTableData"
      :columns="insideColumns"
      :stripe="stripe"
      :border="border"
      :show-header="showHeader"
      :width="width"
      :height="height"
      :loading="loading"
      :disabled-hover="disabledHover"
      :highlight-row="highlightRow"
      :row-class-name="rowClassName"
      :size="size"
      :no-data-text="noDataText"
      :no-filtered-data-text="noFilteredDataText"
      @on-current-change="onCurrentChange"
      @on-select="onSelect"
      @on-select-cancel="onSelectCancel"
      @on-select-all="onSelectAll"
      @on-selection-change="onSelectionChange"
      @on-sort-change="onSortChange"
      @on-filter-change="onFilterChange"
      @on-row-click="onRowClick"
      @on-row-dblclick="onRowDblclick"
      @on-expand="onExpand"
    >
      <slot name="header" slot="header"></slot>
      <slot name="footer" slot="footer"></slot>
      <slot name="loading" slot="loading"></slot>
    </Table>
    <div v-if="searchable && searchPlace === 'bottom'" class="search-con search-con-top">
      <Select v-model="searchKey" class="search-col">
        <Option v-for="item in columns" v-if="item.key !== 'handle'" :value="item.key" :key="`search-col-${item.key}`">{{ item.title }}</Option>
      </Select>
      <Input placeholder="输入关键字搜索" class="search-input" v-model="searchValue"/>
      <Button class="search-btn" type="primary"><Icon type="search"/>&nbsp;&nbsp;搜索</Button>
    </div>
    <a id="hrefToExportTable" style="display: none;width: 0px;height: 0px;"></a>
	<add-drawer v-model="showDrawer" :columns="columns" :currentColumn.sync="currentColumn"  @newCols="newCols" :editCurClos="editCurClos" :action="action" :dragWidth="dragWidth" :radioArr="radioArr" :checkBoxArr="checkBoxArr" :selectArr="selectArr"></add-drawer>

  </div>
</template>

<script>
import TablesEdit from "./edit.vue";
import TablesAdd from "./add.vue";
import handleBtns from "./handle-btns"
import AddDrawer from './addDrawer.vue'
import "./index.less";
import { debuglog } from 'util';
export default {
  name: "Tables",
  components: {
	AddDrawer
  },
  props: {
    value: {
      type: Array,
      default() {
        return []
      }
    },
    columns: {
      type: Array,
      default() {
        return []
      }
    },
    size: String,
    width: {
      type: [Number, String]
    },
    height: {
      type: [Number, String]
    },
    stripe: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: false
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    highlightRow: {
      type: Boolean,
      default: false
    },
    rowClassName: {
      type: Function,
      default() {
        return "";
      }
    },
    context: {
      type: Object
    },
    noDataText: {
      type: String
    },
    noFilteredDataText: {
      type: String
    },
    disabledHover: {
      type: Boolean
    },
    loading: {
      type: Boolean,
      default: false
    },
    /**
     * @description 全局设置是否可编辑
     */
    editable: {
      type: Boolean,
      default: false
    },
    /**
     * @description 是否可搜索
     */
    searchable: {
      type: Boolean,
      default: false
    },
    /**
     * @description 搜索控件所在位置，'top' / 'bottom'
     */
    searchPlace: {
      type: String,
      default: "top"
    },
    showExportBtn:{
        type: Boolean,
        default: false
    },
    showAddBtn: {
      type: Boolean,
      default: false
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
	}
  },
  /**
   * Events
   * @on-start-edit 返回值 {Object} ：同iview中render函数中的params对象 { row, index, column }
   * @on-cancel-edit 返回值 {Object} 同上
   * @on-save-edit 返回值 {Object} ：除上面三个参数外，还有一个value: 修改后的数据
   */
  data() {
    return {
      insideColumns: [],
      insideTableData: [],
      edittingCellId: "",
      edittingText: "",
      searchValue: "",
	  searchKey: "",
	  modal:false,
	  checkboxGroup:[],
	  showDrawer:false,
	  dragWidth:'',
	  action:''
    };
  },
  methods: {
    suportEdit(item, index) {
        item.render = (h, params) => {
            return h(TablesEdit, {
                props: {
                    params: params,
                    value: this.insideTableData[params.index][params.column.key],
                    edittingCellId: this.edittingCellId,
                    editable: this.editable
                },
                on: {
                    input: val => {
                    this.edittingText = val;
                    },
                    "on-start-edit": params => {
                    this.edittingCellId = `editting-${params.index}-${
                        params.column.key
                    }`;
                    this.$emit("on-start-edit", params);
                    },
                    "on-cancel-edit": params => {
                    this.edittingCellId = "";
                    this.$emit("on-cancel-edit", params);
                    },
                    "on-save-edit": params => {
                    this.value[params.row.initRowIndex][
                        params.column.key
					] = this.edittingText;
                    this.$emit("input", this.value);
                    this.$emit(
                        "on-save-edit",
                        Object.assign(params, { value: this.edittingText })
                    );
                    this.edittingCellId = "";
                    }
                }
            });
        };
        
        return item;
    },
    surportHandle(item) {
      let options = item.options || [];
      let insideBtns = [];
      options.forEach(item => {
        if (handleBtns[item]) insideBtns.push(handleBtns[item]);
      });
      let btns = item.button ? [].concat(insideBtns, item.button) : insideBtns;
      item.render = (h, params) => {
        params.tableData = this.value;
        return h("div", btns.map(item => item(h, params, this)));
      };
      return item;
    },
    handleColumns(columns) {
      this.insideColumns = columns.map((item, index) => {
        let res = item;
        // console.log("res=="+JSON.stringify(res)+index)
        if (res.editable) res = this.suportEdit(res, index);
        if (res.key === "handle") res = this.surportHandle(res);
        return res;
      });
    },
    setDefaultSearchKey() {
      this.searchKey =
        this.columns[0].key !== "handle"
          ? this.columns[0].key
          : this.columns.length > 1
          ? this.columns[1].key
          : "";
    },
    handleClear(e) {
      if (e.target.value === "") this.insideTableData = this.value;
    },
    handleSearch() {
        this.insideTableData = this.value.filter(item =>{
        if(typeof(item[this.searchKey])=='number'){
          item[this.searchKey]=item[this.searchKey].toString();
        }
        return	item[this.searchKey].indexOf(this.searchValue) > -1
        
      })
      // this.insideTableData = this.value.filter(
      //   item => item[this.searchKey].indexOf(this.searchValue) > -1
      // );
    },
    handleTableData() {
      this.insideTableData = this.value.map((item, index) => {
        let res = item;
		res.initRowIndex = index;
		for (var tag in res) {
			if(typeof(res[tag])=="object"){
				res[tag]=res[tag].join(',')
			}
		}
        return res;
      });
    },
    exportCsv(params) {
      this.$refs.tablesMain.exportCsv(params);
    },
    clearCurrentRow() {
      this.$refs.talbesMain.clearCurrentRow();
    },
    onCurrentChange(currentRow, oldCurrentRow) {
      this.$emit("on-current-change", currentRow, oldCurrentRow);
    },
    onSelect(selection, row) {
      this.$emit("on-select", selection, row);
    },
    onSelectCancel(selection, row) {
      this.$emit("on-select-cancel", selection, row);
    },
    onSelectAll(selection) {
      this.$emit("on-select-all", selection);
    },
    onSelectionChange(selection) {
      this.$emit("on-selection-change", selection);
    },
    onSortChange(column, key, order) {
      this.$emit("on-sort-change", column, key, order);
    },
    onFilterChange(row) {
      this.$emit("on-filter-change", row);
    },
    onRowClick(row, index) {
      this.$emit("on-row-click", row, index);
    },
    onRowDblclick(row, index) {
      this.$emit("on-row-dblclick", row, index);
    },
    onExpand(row, status) {
      this.$emit("on-expand", row, status);
    },
    exportData(){
        this.$refs.tables.exportCsv({
            filename: `table-${new Date().valueOf()}.csv`
        });
	},
    addData(){
		this.modal=true;
		this.columns.map((item, index) => {
			console.log('item=='+JSON.stringify(item))
		})
		let addRow={};  //保存新建row数据
		let newColomusArr=this.columns.filter(item=>item.key&&item.key!="handle")
		if(newColomusArr.length>6){
			this.modalForm(addRow,newColomusArr)
		}else if(newColomusArr.length<6){
			this.dragWidth="30"
			this.DragDrawerForm('add')
		}
		
	},
	editCurCol(curCol){
		let newColomusArr=this.columns.filter(item=>item.key&&item.key!="handle")
		let curColumn=curCol.row
		if(newColomusArr.length>6){
			this.editModalForm(newColomusArr,curCol)
		}else if(newColomusArr.length<6){
			this.dragWidth="30"
			this.DragDrawerForm('edit')
		}
		else if(newColomusArr.length>12){
			this.dragWidth="50"
		}
		for (let index in curColumn) {
			if(curColumn[index].indexOf(',')>-1){
				curColumn[index]=curColumn[index].split(',')
				return curColumn[index];
			}
		}
	},
	DragDrawerForm(Action){
		if(Action=='edit'){
			this.action='edit';
		}else if(Action=='add'){
			this.action='add';
		}
		this.showDrawer=true;
	},
	
	modalForm(addRow,newColomusArr){
		this.$Modal.confirm({
			scrollable:true,
			render: (h, params) => {
				return h('Form', {
					props:{
						ref:'formValidate',
						// model:this.formValidate,
					}
				},newColomusArr.map((item, index) => {
					if(item.type=="input"){
						return h('FormItem', {
							props: {
								label:item.title+'：',
								prop:item.key
							}
						},[
							h('Input',{
								props:{
									placeholder: '请输入'+item.title,
									clearable:true,
									value:''
								},
								on:{
									'on-change'(event){
										console.log(event.target.value)
										addRow[item.key] = event.target.value;
									}
								}
							})
						])
					}else if(item.type=="radio"){
						return h('FormItem', {
							props: {
								label:item.title+'：',
								prop:item.key
							}
						},[
							h('RadioGroup',{
								props:{
									value:''
								},
								on:{
									'on-change'(val){
										addRow[item.key] = val;
									}
								}
							},this.radioArr.map((radioItem, index) =>{
								return h('Radio',{
									props: {
										label:radioItem.label,
										value:radioItem.value
									}
								})
							})
							)
						])
					}else if(item.type=="check"){
						let checkVal="";
						return h('FormItem', {
							props: {
								label:item.title+'：',
								prop:item.key
							}
						},[
							h('CheckboxGroup',{
								props:{
									value:[]
								},
								on:{
									'on-change'(val){
										console.log('val==='+typeof(val)+'  '+val)
										if(val){
											checkVal+=val+',';
											addRow[item.key] =checkVal.substr(0, checkVal.length - 1)
										}
										console.log(addRow[item.key])
									}
								}
							},this.checkBoxArr.map((checkItem, index) =>{
								return h('Checkbox',{
									props: {
										label:checkItem.label
									},
									on:{
										'on-change'(val){
											console.log('checkval==='+val)
										}
									}
								})
							})
							)
						])
					}else if(item.type=="select"){
						return h('FormItem', {
							props: {
								label:item.title+'：',
								prop:item.key
							}
						},[
							h('Select',{
								props:{
									value:''
								},
								attrs:{
									clearable:true,
									filterable:true
								},
								on:{
									'on-change'(val){
										if(val){
											addRow[item.key] =val
										}
									}
								}
							},this.selectArr.map((selectItem, index) =>{
								return h('Option',{
									props: {
										label:selectItem.label,
										value:selectItem.value
									}
								})
							})
							)
						])
					}else if(item.type=="selectMultify"){
						return h('FormItem', {
							props: {
								label:item.title+'：',
								prop:item.key
							}
						},[
							h('Select',{
								props:{
									value:[]
								},
								attrs:{
									clearable:true,
									filterable:true,
									multiple:true
								},
								on:{
									'on-change'(val){
										if(val){
											addRow[item.key] =val.join(',')
										}
									}
								}
							},this.selectArr.map((selectItem, index) =>{
								return h('Option',{
									props: {
										label:selectItem.label,
										value:selectItem.value
									}
								})
							})
							)
						])
					}else if(item.type=="date"||item.type=='datetime'){
						return h('FormItem', {
							props: {
								label:item.title+'：',
								prop:item.key
							}
						},[
							h('DatePicker',{
								props:{
									value:'',
									type:item.type
								},
								attrs:{
									transfer:true
								},
								style:{
									width:'260px'
								},
								on:{
									'on-change'(val){
										addRow[item.key]=val;
									}
								}
							})
						])
					}else if(item.type=="daterange"||item.type=='datetimerange'){
						return h('FormItem', {
							props: {
								label:item.title+'：',
								prop:item.key
							}
						},[
							h('DatePicker',{
								props:{
									value:[],
									type:item.type
								},
								attrs:{
									transfer:true
								},
								style:{
									width:'260px'
								},
								on:{
									'on-change'(val){
										addRow[item.key]=val.join(',');
									}
								}
							})
						])
					}
					
				})
				);
			},
			 onOk: () => {
				if(typeof(addRow)!= "undefined"){
					this.insideTableData.unshift(addRow)
				}
				
				console.log('insideTableData=='+JSON.stringify(this.insideTableData))
			},
			cancel () {
			}     
		})
	},
	
	
	editModalForm(newColomusArr,curCol){
		this.$Modal.confirm({
			scrollable:true,
			render: (h, params) => {
				return h('Form', {
					props:{
						ref:'formValidate',
						// model:this.formValidate,
					}
				},newColomusArr.map((item, index) => {
					if(item.type=="input"){
						return h('FormItem', {
							props: {
								label:item.title+'：',
								prop:item.key
							}
						},[
							h('Input',{
								props:{
									placeholder: '请输入'+item.title,
									clearable:true,
									value:curCol.row[item.key]
								},
								on:{
									'on-change'(event){
										console.log(event.target.value)
										curCol.row[item.key] = event.target.value;
									}
								}
							})
						])
					}else if(item.type=="radio"){
						return h('FormItem', {
							props: {
								label:item.title+'：',
								prop:item.key
							}
						},[
							h('RadioGroup',{
								props:{
									value:curCol.row[item.key]
								},
								on:{
									'on-change'(val){
										curCol.row[item.key] = val;
									}
								}
							},this.radioArr.map((radioItem, index) =>{
								return h('Radio',{
									props: {
										label:radioItem.label,
										value:radioItem.value
									}
								})
							})
							)
						])
					}else if(item.type=="check"){
						let checkVal="";
						return h('FormItem', {
							props: {
								label:item.title+'：',
								prop:item.key
							}
						},[
							h('CheckboxGroup',{
								props:{
									value:curCol.row[item.key]
								},
								on:{
									'on-change'(val){
										console.log('val==='+typeof(val)+'  '+val)
										// if(val){
										// 	checkVal+=val+',';
										// 	curCol.row[item.key] =checkVal.substr(0, checkVal.length - 1)
										// }
										// console.log([curCol.row[item.key]])
									}
								}
							},this.checkBoxArr.map((checkItem, index) =>{
								return h('Checkbox',{
									props: {
										label:checkItem.label
									},
									on:{
										'on-change'(val){
											console.log('checkval==='+val)
										}
									}
								})
							})
							)
						])
					}else if(item.type=="select"){
						return h('FormItem', {
							props: {
								label:item.title+'：',
								prop:item.key
							}
						},[
							h('Select',{
								props:{
									value:curCol.row[item.key]
								},
								attrs:{
									clearable:true,
									filterable:true
								},
								on:{
									'on-change'(val){
										if(val){
											curCol.row[item.key] =val
										}
									}
								}
							},this.selectArr.map((selectItem, index) =>{
								return h('Option',{
									props: {
										label:selectItem.label,
										value:selectItem.value
									}
								})
							})
							)
						])
					}else if(item.type=="selectMultify"){
						return h('FormItem', {
							props: {
								label:item.title+'：',
								prop:item.key
							}
						},[
							h('Select',{
								props:{
									value:curCol.row[item.key]
								},
								attrs:{
									clearable:true,
									filterable:true,
									multiple:true
								},
								on:{
									'on-change'(val){
										console.log('val==='+typeof(val)+'       '+val)
										curCol.row[item.key] =val.join(',')
									}
								}
							},this.selectArr.map((selectItem, index) =>{
								return h('Option',{
									props: {
										label:selectItem.label,
										value:selectItem.value
									}
								})
							})
							)
						])
					}else if(item.type=="date"||item.type=='datetime'){
						return h('FormItem', {
							props: {
								label:item.title+'：',
								prop:item.key
							}
						},[
							h('DatePicker',{
								props:{
									value:curCol.row[item.key],
									type:item.type
								},
								attrs:{
									transfer:true
								},
								style:{
									width:'260px'
								},
								on:{
									'on-change'(val){
										curCol.row[item.key]=val;
									}
								}
							})
						])
					}else if(item.type=="daterange"||item.type=='datetimerange'){
						return h('FormItem', {
							props: {
								label:item.title+'：',
								prop:item.key
							}
						},[
							h('DatePicker',{
								props:{
									value:[curCol.row[item.key]],
									type:item.type
								},
								attrs:{
									transfer:true
								},
								style:{
									width:'260px'
								},
								on:{
									'on-change'(val){
										console.log('val==='+typeof(val)+'       '+val)
										// curCol.row[item.key]=val.join(',');
									}
								}
							})
						])
					}
					
				})
				);
			},
			 onOk: () => {
				// if(typeof(addRow)!= "undefined"){
				// 	this.insideTableData.unshift(addRow)
				// }
				this.insideTableData.splice(curCol.index,1,curCol.row)
				console.log('curCol.row=='+JSON.stringify(curCol.row))
			},
			cancel () {
			}     
		})
	},
	newCols(newCols){
		this.insideTableData.unshift(newCols)
		this.currentColumn={};
	},
	editCurClos(editCols){
		console.log('==========='+this.currentColumn+'    '+JSON.stringify(editCols))
		// this.insideTableData.splice(curCol.index,1,editCols)
	}
  },
  watch: {
    columns(columns) {
      this.handleColumns(columns);
      this.setDefaultSearchKey();
    },
    value(val) {
      this.handleTableData();
      if (this.searchable) this.handleSearch();
	},
	currentColumn(newCurCol){
		if(newCurCol){
			this.editCurCol(newCurCol)
		}
	}
  },
  mounted() {
    this.handleColumns(this.columns);
    this.setDefaultSearchKey();
	this.handleTableData();
  },
  beforeCreate(){
    // this.ruleProp={
    //     age: [
    //             { required:true, message: '输入不能为空', trigger: 'blur' }
    //         ]
    //   }
  }
};
</script>
