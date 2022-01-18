<template>
  <div class="list">
    <el-card class="box-card">
      <!-- <span>筛选搜索</span> -->
      <el-form ref="form" :model="form">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            :disabled="loading"
          >查询搜索</el-button>
          <el-button
            :disabled="loading"
          >重置</el-button>
        </el-form-item>
      </el-form>
    <el-button @click="handleAdd">添加角色</el-button>
      <el-table
        :data="roles"
        style="width: 100%">
        <el-table-column
          type="index"
          label="编号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="description"
          label="地址">
        </el-table-column>
        <el-table-column
          label="操作"
          min-width="180">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)">删除</el-button>
            <el-button
              size="mini"
              @click="$router.push({
                name: 'alloc-menu',
                params: {
                  roleId: scope.row.id
                }
              })">添加菜单</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog
      title="添加角色"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <CreateOrEdit
        @success="onSuccess"
      />
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CreateOrEdit from './createOrEdit.vue'
import { getRoles } from '@/services/role'

export default Vue.extend({
  name: 'RoleList',
  components: {
    CreateOrEdit
  },
  data () {
    return {
      roles: [],
      dialogVisible: false,
      loading: false,
      form: {
        current: 1,
        size: 50,
        name: ''
      } // 查询条件
    }
  },

  created () {
    this.loadRoles()
  },

  methods: {
    handleEdit (row: any) {
      console.log(row)
    },
    handleDelete (row: any) {
      console.log(row)
    },
    async loadRoles () {
      const { data } = await getRoles(this.form)
      this.roles = data.data.records
    },
    handleAdd () {
      this.dialogVisible = true
    },
    // 子组件添加成功
    onSuccess () {
      this.dialogVisible = false
      this.loadRoles()
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
