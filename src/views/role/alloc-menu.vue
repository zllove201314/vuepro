<template>
  <div class="alloc-menu">
    <el-card>
      <div slot="header">
        <span>分配权限</span>
        <el-tree
          ref="menu-tree"
          :data="menus"
          node-key="id"
          :default-checked-keys="checkedKeys"
          :props="defaultProps"
          show-checkbox
          default-expand-all
        >
        </el-tree>
      </div>
       <div>
      <el-button @click="onSave" >保存</el-button>
      <el-button>清空</el-button>
    </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getMenuNodeList, allocateRoleMenus, getRoleMenus } from '@/services/menu'
import { Tree } from 'element-ui'

export default Vue.extend({
  name: 'AllocMenu',
  props: {
    roleId: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      menus: [],
      defaultProps: {
        children: 'subMenuList',
        label: 'name'
      },
      checkedKeys: []
    }
  },

  created () {
    this.loadNodeMenu()
    this.loadRoleMenu()
  },

  methods: {
    async loadNodeMenu () {
      const { data } = await getMenuNodeList()
      this.menus = data.data
    },
    async onSave () {
      const menuIdList = (this.$refs['menu-tree'] as Tree).getCheckedKeys()
      console.log(this.checkedKeys)
      const { data } = await allocateRoleMenus({
        roleId: this.roleId,
        menuIdList
      })
      console.log(data)
      // this.$message.success('操作成功')
      // this.$router.back()
    },
    async loadRoleMenu () {
      // 角色对应的菜单
      const { data } = await getRoleMenus(this.roleId)
      this.getCheckedKeys(data.data)
    },
    getCheckedKeys (menus: any) {
      menus.forEach((menu: any) => {
        if (menu.selected) {
          this.checkedKeys = [...this.checkedKeys, menu.id] as any
        }
        if (menu.subMenuList) {
          this.getCheckedKeys(menu.subMenuList)
        }
      })
    }
  }
})
</script>

<style lang='scss' scoped>

</style>
