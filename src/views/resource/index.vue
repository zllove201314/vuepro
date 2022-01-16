<template>
  <div class="resource">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form ref="form" :model="form" :inline="true">
          <el-form-item prop="name" label="资源名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item prop="url" label="url">
            <el-input v-model="form.url"></el-input>
          </el-form-item>
          <el-form-item prop="categoryId" label="资源分类">
            <el-select
              v-model="form.categoryId"
              placeholder="请选择资源分类"
              clearable
            >
              <el-option
                :label="item.name"
                :value="item.id"
                v-for="item in resourceCategories"
                :key="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit" :disabled="loading">查询搜索</el-button>
            <el-button @click="onRest" :disabled="loading">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table
        :data="resoures"
        style="width: 100%"
        v-loading="loading"
      >
        <el-table-column
          type="index"
          label="编号"
          min-width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          min-width="180">
        </el-table-column>
        <el-table-column
          prop="description"
          label="描述"
          min-width="180">
        </el-table-column>
        <el-table-column
          prop="url"
          label="url"
          min-width="180">
        </el-table-column>
      </el-table>
      <!--
        total 总记录数
        page-size 每页大小
       -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :disabled="loading"
        :current-page="form.current"
        :page-sizes="[5, 10, 20, 30]"
        :page-size="form.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount">
      </el-pagination>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getResourcePages } from '@/services/resource'
import { getResourceCategory } from '@/services/resource-category'
import { Form } from 'element-ui'

export default Vue.extend({
  name: 'ResourceIndex',
  data () {
    return {
      resoures: [],
      form: {
        name: '',
        url: '',
        current: 1, // 每页大小
        size: 5, // 每页条数
        categoryId: null // 资源分类
      },
      totalCount: 0, // 总条数
      resourceCategories: [], // 资源分类
      loading: true
    }
  },

  created () {
    this.loadResource()
    this.loadResourceCategory()
  },

  methods: {
    async loadResource () {
      this.loading = true
      const { data } = await getResourcePages(this.form)
      this.resoures = data.data.records
      this.totalCount = data.data.total
      this.loading = false
    },
    async loadResourceCategory () {
      const { data } = await getResourceCategory()
      this.resourceCategories = data.data
    },
    onSubmit () { // 提交
      // console.log('submit!')
      this.form.current = 1
      this.loadResource()
    },
    onRest () {
      (this.$refs.form as Form).resetFields()
      this.form.current = 1
      this.loadResource()
    },
    handleSizeChange (val: number) {
      this.form.size = val
      this.form.current = 1
      this.loadResource()
    },
    handleCurrentChange (val: number) {
      this.form.current = val
      this.loadResource()
    }
  }
})
</script>

<style lang='scss' scoped>

</style>
