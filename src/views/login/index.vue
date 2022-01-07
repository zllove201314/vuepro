<template>
  <div class="login">
    <el-form
    ref="form"
    class="login-form"
    :model="form"
    label-width="80px"
    label-position="top"
    >
      <el-form-item label="手机号">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.region"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" class="login-btn">立即创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'LoginIndex',
  data () {
    return {
      form: {
        name: '',
        region: '',
        desc: ''
      }
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    }
  }
})
</script>

<style lang='scss' scoped>
  .login {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .login-form {
    background: #fff;
    padding: 20px;
    width: 320px;
    border-radius: 5px;
  }
  .login-btn {
    width: 100%;
  }
</style>
