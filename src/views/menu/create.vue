<template>
  <div class="create-menu">
    <el-card class="box-card">
      <createOrEdit />
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import createOrEdit from './components/createOrEdit.vue'
export default Vue.extend({
  name: 'MenuCreate',
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
