<template>
  <div class="section">
    <el-card>
      <div slot="header">
        课程名称
      </div>
      <el-tree
        :data="secitons"
        :props="defaultProps"
        :allow-drop="handleAllowDrop"
        @node-drop="handleSort"
        draggable
      >
        <div class="inner" slot-scope="{ node, data }">
          <span>{{node.label}}</span>
          <!-- section -->
          <span v-if="data.sectionName" class="actions">
            <el-button>编辑</el-button>
            <el-button>添加课时</el-button>
            <el-button>状态</el-button>
          </span>
          <!-- less -->
          <span v-else class="actions">
            <el-button>编辑</el-button>
            <el-button>上传视频</el-button>
            <el-button>状态</el-button>
          </span>
        </div>
      </el-tree>
    </el-card>

  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getSectionAndLesson } from '@/services/course-section'

export default Vue.extend({
  name: 'CourseSection',
  props: {
    courseId: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      secitons: [],
      defaultProps: {
        children: 'lessonDTOS',
        label: function (data: any) {
          return data.sectionName || data.theme
        }
      }
    }
  },

  created () {
    this.loadSection()
  },

  methods: {
    async loadSection () {
      const { data } = await getSectionAndLesson(this.courseId)
      this.secitons = data.data
    },

    handleAllowDrop (draggingNode: any, dropNode: any, type: any) {
      // console.log('拖动', draggingNode, dropNode, type)
      return type !== 'inner' && draggingNode.data.sectionId === dropNode.data.sectionId
    },

    handleSort (draggingNode: any, dropNode: any, type: any, event: any) {
      console.log('拖动', draggingNode, dropNode, type, event)
      if (draggingNode.data.lessonDTOS) {
        // 阶段
        console.log('阶段')
      } else {
        // 课时
      }
    }
  }
})
</script>

<style lang="scss" scoped>
  .inner {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
  }

  ::v-deep .el-tree-node__content {
    height: auto;
  }
</style>
