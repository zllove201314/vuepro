<template>
  <div class="create-menu">
    <el-card class="box-card">
      <createOrEdit :isEdit="true" />
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import createOrEdit from './components/createOrEdit.vue'
export default Vue.extend({
  name: 'MenuEdit',
  components: {
    createOrEdit
  },
  data () {
    return {}
  }
})
</script>

<style lang="scss" scoped>

</style>
