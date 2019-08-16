<template>
    <div class="mInput">
        <Input 
        v-model="inputValue" 
        :type="type"  
        :placeholder="placeholder" 
        :size="size"
        :clearable="clearable"
        :disabled="disabled"
        :readonly="readonly"
        :maxlength="maxlength"
        :icon="icon"
        :rows="rows"
        :autosize="autosize"
        :number="number"
        :prefix="prefix"
        :suffix="suffix"
        :search="search"
        :enter-button="enterButton"
        :autofocus="autofocus"
        :autocomplete="autocomplete"
        :element-id="elementId"
        :spellcheck="spellcheck"
        :wrap="wrap"
        @on-enter="onEnter"
        @on-change="onChange"
        @on-blur="onBlur($event)"
        @on-focus="onFocus($event)"
        />
    </div>
</template>
<script>
    export default {
        name:'MInput',
        props:{
            type: {
                type: String,
                default() {
                    return 'text';
                }
            },
            size: {
                type: String,
            },
            placeholder: {
                type: String,
            },
            clearable: {
                type: Boolean,
                default() {
                    return false;
                }
            },
            disabled: {
                type: Boolean,
                required: false,
                default: false
            },
            readonly: {
                type: Boolean,
                default() {
                return false;
                }
            },
            maxlength: {
                type: Number,
            },
            icon: {
                type: String
            },
            rows: {
                type: Number,
                default: 2
            },
            autosize: {
                type: [ Boolean, Object ],
                default: false
            },
            number: {
                type: Boolean,
                default: false
            },
            prefix:{
                type:String
            },
            suffix:{
                type:String
            },
            search:{
                type:Boolean,
                default:false
            },
            enterButton:{
                type:[Boolean,String],
                default:false
            },
            autofocus:{
                type:Boolean,
                default:false
            },
            autocomplete:{
                type:String,
                default:'off'
            },
            elementId:{
                type:String
            },
            spellcheck:{
                type:Boolean,
                default:false
            },
            wrap:{
                type:String,
                default:'soft'
            }
            
        },
        data () {
            return {
                inputValue:''
                
            }
        },
        watch:{
            "inputValue"(newValue){
                    this.$emit("getInputValue", newValue);
                }
        },
        methods:{
            onEnter(){
                this.$emit("getInputValue", this.inputValue);
            },
            onChange(){
                this.$emit("getInputValue", this.inputValue);
            },
            onBlur(event){
                event.currentTarget.parentElement.parentElement.parentElement.classList.remove("noError")
                let errorTips=event.currentTarget.parentElement.parentElement.parentElement.getElementsByClassName("ivu-form-item-error-tip")[0];
                if(errorTips){
                    errorTips.style.visibility="visible";
                }
                this.$emit("getInputValue", this.inputValue);
            },
            onFocus(event){
            }
        }
    }
</script>
<style lang="less">
</style>