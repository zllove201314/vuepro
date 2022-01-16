<template>
  <div class="role">
    <el-form :label-position="labelPosition" label-width="80px" :model="role">
      <el-form-item label="名称">
        <el-input v-model="role.code"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-input v-model="role.name"></el-input>
      </el-form-item>
      <el-form-item label="活动形式">
        <el-input v-model="role.description"></el-input>
      </el-form-item>
      <el-form-item>
    <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { createOrUpdate } from '@/services/role'

export default Vue.extend({
  name: 'RoleCreateOrEdit',
  data () {
    return {
      role: {
        name: '',
        code: '',
        description: ''
      },
      labelPosition: 'top'
    }
  },
  methods: {
    async onSubmit () {
      const { data } = await createOrUpdate(this.role)
      this.$message.success(data.mesg)
      this.$emit('success')
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
