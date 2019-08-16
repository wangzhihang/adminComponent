<template>
  <div class="tables-add-outer">
    <div>
      <Input :placeholder="placeholder"  class="tables-edit-input"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TablesAdd',
  props: {
      placeholder:String
  },
  computed: {
  },
  methods: {
  }
}
</script>

<style lang="less">
.tables-edit-input{
    width: ~"calc(100% - 60px)";
}
</style>
