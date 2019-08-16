<template>
  <div class="iForm">
    <Form :model="model" :rules="rules" :label-width="labelWidth" :label-position="labelPosition">
        <slot></slot>
    </Form>
  </div>
</template>
<script>
import schema from 'async-validator'
export default {
  name: 'iForm',
  data() {
      return {
      }
  },
  props: {
      model:{
          type:Object,
          default:''
      },
      rules:{
          type:Object,
          default:''
      },
       labelWidth:{
          type:Number,
          default:80
      },
      labelPosition:{
          type:String,
          default:'left'
      }
  },
  watch: {
        
    },
  methods: {
    //提交普通表单
    submit(source,formValidate,ruleValidate){
        var validator = new schema(ruleValidate);  

        validator.validate(source, (errors, fields) => {
            if(errors) {
                this.$Message.info("验证未通过，请填写完信息");
                 if (errors) {
                    errors.forEach(error => {
                        // console.log(formValidate.$children[0].$children[0].$children[0].$children)
                        // formValidate.$children[0].$children.forEach  普通表单
                        //formValidate.$children[0].$children[0].$children[0].$children   card下的form
                        formValidate.$children[0].$children.forEach(item=>{
                            if(item.$children[0].$el.getElementsByClassName("ivu-form-item-error-tip")[0]){
                                item.$children[0].$el.getElementsByClassName("ivu-form-item-content")[0].removeChild(item.$children[0].$el.getElementsByClassName("ivu-form-item-error-tip")[0])
                            }
                            if(error.field==item.prop){
                                this.$nextTick(()=>{
                                    let tip=document.createElement("div");
                                    tip.innerText =error.message;
                                    tip.className="ivu-form-item-error-tip";
                                    item.$children[0].$el.getElementsByClassName("ivu-form-item-content")[0].appendChild(tip);
                                })
                                
                            }
                        })
                        
                    });
                }
                return handleErrors(errors, fields);
            }else{
                formValidate.$children[0].$children.forEach(item=>{
                    if(item.$children[0].$el.getElementsByClassName("ivu-form-item-error-tip")[0]){
                        item.$children[0].$el.getElementsByClassName("ivu-form-item-content")[0].removeChild(item.$children[0].$el.getElementsByClassName("ivu-form-item-error-tip")[0])
                    }
                })
                console.log('验证通过')
            }
            
        });
      },
    
    
    //提交dragcaed嵌套的表单
    // 参数：1.验证数据model   2.form的ref   3.form的规则
    dragCardSubmit(source,formValidate,ruleValidate){
        var validator = new schema(ruleValidate);
        validator.validate(source, (errors, fields) => {
            if(errors) {
                console.log('验证未通过'+JSON.stringify(source))
                this.$Message.info("验证未通过，请填写完信息");
                errors.forEach(error => {
                    // console.log(formValidate.$children[0].$children)
                    console.log(formValidate.$children[0].$children[0].$children[0].$children)
                    for(var i=0;i<formValidate.$children[0].$children.length;i++){
                        if(formValidate.$children[0].$children[i].$children.length>0){
                            formValidate.$children[0].$children[i].$children[0].$children.forEach(item=>{
                                if(item.$children[0].$el.getElementsByClassName("ivu-form-item-error-tip")[0]){
                                    item.$children[0].$el.getElementsByClassName("ivu-form-item-content")[0].removeChild(item.$children[0].$el.getElementsByClassName("ivu-form-item-error-tip")[0])
                                }
                                if(error.field==item.prop){
                                    this.$nextTick(()=>{
                                        let tip=document.createElement("div");
                                        tip.innerText =error.message;
                                        tip.className="ivu-form-item-error-tip";
                                        item.$children[0].$el.getElementsByClassName("ivu-form-item-content")[0].appendChild(tip);
                                    })
                
                                }
                            })
                        }
                        
                    }
        
                });
                return handleErrors(errors, fields);
            }else{
                formValidate.$children[0].$children[0].$children[0].$children.forEach(item=>{
                    if(item.$children[0].$el.getElementsByClassName("ivu-form-item-error-tip")[0]){
                        item.$children[0].$el.getElementsByClassName("ivu-form-item-content")[0].removeChild(item.$children[0].$el.getElementsByClassName("ivu-form-item-error-tip")[0])
                    }
                })
                console.log('验证通过'+JSON.stringify(source))
            }
        
        });
      },
      //重置表单
      dragCardResert(source,formValidate){
        for (var index in source) {
            source[index]="";
        }
        console.log(formValidate.$children[0].$children[0].$children)
        for(var i=0;i<formValidate.$children[0].$children.length;i++){
            if(formValidate.$children[0].$children[i].$children.length>0){
                formValidate.$children[0].$children[i].$children[0].$children.forEach(item=>{
                    // console.log(item)
                    let componName=item.$children[0].$children[0].$el
                    //移除input value
                    let inputs=item.$children[0].$el.getElementsByClassName("ivu-form-item-content")[0].getElementsByTagName("input");
                    for(let i=0;i<inputs.length;i++){
                        inputs[i].value='';
                        inputs[i]._value='';
                    }
                    let inputContent=item.$children[0].$el;
                    
                    //移除错误border
                    let errorClassName=item.$children[0].$el.className;
                    if(errorClassName.indexOf('ivu-form-item-error')>-1){
                         item.$children[0].$el.getElementsByClassName("ivu-form-item-content")[0].classList.add("noError")
                    }
                    
                    //移除select
                    if(componName.className=="iselect"){
                        let selectCnt=item.$children[0].$el.getElementsByClassName("ivu-form-item-content")[0];
                        if(selectCnt.getElementsByClassName("ivu-select-selected-value")[0]){
                            item.$children[0].$children[0].selectedData='';
                            item.$children[0].$el.getElementsByClassName("iselect")[0].classList.add("noError");
                            let selectTip=item.$children[0].$el.getElementsByClassName("ivu-form-item-error-tip")[0];
                            let div=document.createElement("div");
                            let textNode=document.createTextNode("请选择");
                            div.appendChild(textNode)
                            div.setAttribute("class","noTip")
                            selectCnt.appendChild(div);
                        }
                        // 多选
                        if(item.$children[0].$children[0].$children[0].multiple){
                            item.$children[0].$children[0].selectedMulData='';
                            item.$children[0].$el.getElementsByClassName("iselect")[0].classList.add("noError");
                            let selectTip=item.$children[0].$el.getElementsByClassName("ivu-form-item-error-tip")[0];
                            let div=document.createElement("div");
                            let textNode=document.createTextNode("请至少选择一个");
                            div.appendChild(textNode)
                            div.setAttribute("class","noTip")
                            selectCnt.appendChild(div);
                        }
                    }
                    
                        
                    //移除错误tip
                    let tip=item.$children[0].$el.getElementsByClassName("ivu-form-item-error-tip")[0];
                    if(tip){
                        tip.style.visibility="hidden";
                    }

                    //移除date
                    if(componName.className=="datePicker"){
                        let dates=item.$children[0].$children[0].$children[0].$children;
                        dates[0].currentValue='';
                        dates[0]._data.currentValue='';
                        // console.log(dates[1].$children[0].$children[5].$el)
                        let dateCells=dates[1].$children[0].$children[5].$el.getElementsByClassName("ivu-date-picker-cells-cell");
                        for(let i=0;i<dateCells.length;i++){
                            if(dateCells[i].className.indexOf('ivu-date-picker-cells-cell-selected')>-1){
                                dateCells[i].classList.remove("ivu-date-picker-cells-cell-selected")
                            }
                        }
                        // dates[1].$children[0].$children[5].dates=[];
                        // dates[1].$children[0].$children[5].focusedDate='';
                        // dates[1].$children[0].$children[5].tableDate=[];
                        // dates[1].$children[0].$children[5].value='';
                    }
                    
                    //移除radio
                    if(componName.className=="radioButton"){
                        let radios=item.$children[0].$children[0].$children[0].$children;
                        radios.currentValue='';
                        for(let i=0;i<radios.length;i++){
                            radios[i].$el.getElementsByClassName("ivu-radio")[0].classList.remove("ivu-radio-checked");
                            radios[i].currentValue=false;
                            radios[i]._data.currentValue=false;
                        }
                    }

                     //移除checkbox
                    if(componName.className=="checkBox"){
                        for(let i=0;i<componName.length;i++){
                            componName[i].classList.remove("ivu-checkbox-checked")
                        }
                        let checkboxs=item.$children[0].$children[0].$children;
                        for(let i=0;i<checkboxs.length;i++){
                            if(checkboxs[i].$children.length>1){
                                checkboxs[i].currentValue=[];
                                for(let j=0;j<checkboxs[i].$children.length;j++){
                                    checkboxs[i].$children[j].currentValue=false;
                                    checkboxs[i].$children[j]._data.currentValue=false;
                                    checkboxs[i].$children[j]._data.model=[];
                                }
                            }
                        }
                    }
                    
                })
            } 
        }
       console.log(formValidate.$children[0].$children[0].$children)
      }
  },
  created() {
    
  }
}
</script>
<style lang="less">
</style>
