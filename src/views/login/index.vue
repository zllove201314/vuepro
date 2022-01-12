<template>
  <div class="login">
    <el-form
    ref="form"
    class="login-form"
    :rules="rules"
    :model="form"
    label-width="80px"
    label-position="top"
    >
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码"  prop="password">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" class="login-btn" :loading="isLoading">立即创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { login } from '@/services/user'
import { Form } from 'element-ui'

export default Vue.extend({
  name: 'LoginIndex',
  data () {
    return {
      form: {
        phone: '18201288771',
        password: '111111'
      },
      isLoading: false,
      rules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1\d{10}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '请输入6-15个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async onSubmit () {
      try {
        await (this.$refs.form as Form).validate()
        this.isLoading = true
        const { data } = await login(this.form)

        if (data.state !== 1) {
          this.$message.error(data.message)
        } else {
          // 用户信息保存到vuex中
          this.$store.commit('setUser', data.content)
          this.$router.push(this.$route.query.redicrect as string || '/')
          // 登陆成功
          this.$message.success('登陆成功')
        }
        // 关闭loading
        this.isLoading = false
      } catch (err) {
        console.log('登陆失败', err)
      }
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
