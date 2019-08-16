<template>
  <a href="javascript:;" :class="['hover-aa',collapsed?'hover-bb':'']">
    <div @click="handleChange" type="text" :class="['sider-trigger-right', collapsed ? 'collapsed' : '']">
      <Icon :type="icon" v-show="collapsed" size="10"/>
      <Icon :type="icon" :size="size" v-show="!collapsed" class="col-icon"/>
    </div>
  </a>
</template>
<script>
export default {
  name: 'siderTriggerRight',
  props: {
    collapsed: Boolean,
    icon: {
      type: String,
      default: 'ios-arrow-back'
    },
    size: {
      type: Number,
      default: 10
    }
  },
  methods: {
    handleChange () {
      this.$emit('on-change', !this.collapsed)
    }
  }
}
</script>
<style lang="less">
@import "./sider-trigger-right.less";
</style>
