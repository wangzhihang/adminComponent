<template>
    <div class="checkBox">
        <div style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;">
            <Checkbox
                :indeterminate="indeterminate"
                :value="checkAll"
                @on-change="handleCheckAll">全选</Checkbox>
        </div>
        <Checkbox-group v-model='checkAllGroup' @on-change="checkAllGroupChange">
            <Checkbox v-for="item in list" :label="item.label" :key="item.value" :disabled="disabled"></Checkbox>
        </Checkbox-group>
    </div>
</template>
<script>
    export default {
        name:'CheckBox',
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
                indeterminate: true,
                checkAll: false,
                checkAllGroup: []
            }
        },
        watch:{
            // "checkAllGroup"(newValue){
            //     this.$emit("getCheckBoxData", this.checkAllGroup);
            // }
        },
        methods:{
            checkAllGroupChange(data){
                if (data.length === this.list.length) {
                    this.indeterminate = false;
                    this.checkAll = true;
                    // document.getElementsByClassName("checkBox")[0].parentNode.lastChild.innerHTML='';
                } else if (data.length > 0) {
                    this.indeterminate = true;
                    this.checkAll = false;
                    // document.getElementsByClassName("checkBox")[0].parentNode.lastChild.innerHTML='';
                } else {
                    this.indeterminate = false;
                    this.checkAll = false;
                }
                // this.checkAllGroup=data;
                this.$emit("getCheckBoxData", data);
            },
            handleCheckAll () {
                if (this.indeterminate) {
                    this.checkAll = false;
                } else {
                    this.checkAll = !this.checkAll;
                }
                this.indeterminate = false;

                if (this.checkAll) {
                    this.list.forEach(item => {
                        this.checkAllGroup.push(item.value)
                    })
                    // document.getElementsByClassName("checkBox")[0].parentNode.lastChild.innerHTML='';
                } else {
                    this.checkAllGroup = [];
                }
                this.$emit("getCheckBoxData", this.checkAllGroup);
            }
        }
    }
</script>
<style lang="less">
.checkBox{
    .ivu-checkbox-wrapper{
        margin-right: 25px;
    }

}
</style>