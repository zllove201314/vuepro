<template>
  <div class="header">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar shape="square" :size="30" :src="user.portrait || 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'"></el-avatar>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>{{user.userName}}</el-dropdown-item>
        <el-dropdown-item
          divided
          @click.native="headleLogout"
        >退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { getUserInfo } from '@/services/user'
import store from '@/store'
import Vue from 'vue'

export default Vue.extend({
  name: 'appHeader',
  data () {
    return {
      user: {}
    }
  },
  created () {
    this.loadUserInfo()
    this.loadUserInfo()
    this.loadUserInfo()
  },
  methods: {
    async loadUserInfo () {
      const { data } = await getUserInfo()
      // console.log('0000', data)
      this.user = data.content
    },

    headleLogout () {
      this.$store.commit('setUser', null)

      this.$router.push({
        name: 'login'
      })
    }
  }
})
</script>

<style lang="scss" scoped>
  .header {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .el-dropdown-link {
    display: flex;
    align-items: center;
  }
</style>
