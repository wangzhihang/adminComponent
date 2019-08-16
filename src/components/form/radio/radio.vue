<template>
    <div class="radioButton">
        <RadioGroup v-model="selectedData" @on-change="getSelecteedData">
            <Radio v-for="item in list" :label="item.label" :key="item.value" :disabled="disabled">
            </Radio>
        </RadioGroup>
    </div>
</template>
<script>
    export default {
        name:'RadioButton',
        props:{
            list:{
                type:Array,
                default:[]
            },
            disabled: {
                type: Boolean,
                required: false,
                default: false
            }
        },
        data () {
            return {
                selectedData: ''
            }
        },
        watch:{
            // "selectedData"(newValue){
            //     this.$emit("getRadioData", this.selectedData);
            // }
        },
        methods:{
            getSelecteedData(){
                if(this.selectedData){
                    // document.getElementsByClassName("radioButton")[0].parentNode.lastChild.innerHTML='';
                }
                this.$emit("getRadioData", this.selectedData);
            }
        }
    }
</script>
<style lang="less">
.radioButton{
    .ivu-radio-wrapper{
        margin-right: 25px;
    }

}
</style>