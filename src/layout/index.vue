<template>
  <el-container>
    <el-aside width="200px">
      <AppSide />
    </el-aside>
    <el-container>
      <el-header>
        <AppHeader />
      </el-header>
      <el-main>
        <!-- 子路由出口 -->
        <router-view />
      </el-main>
    </el-container>
</el-container>
</template>

<script lang="ts">
import Vue from 'vue'
import AppSide from './components/app-side.vue'
import AppHeader from './components/app-header.vue'
export default Vue.extend({
  name: 'layoutIndex',
  components: {
    AppSide,
    AppHeader
  }
})
</script>

<style lang="scss" scoped>
.el-container {
  min-height: 100vh;
  min-width: 980px;
}

.el-aside {
  background: red;
}

.el-header {
  background: pink;
}

.el-main {
  background: #fffff0;
}

</style>
