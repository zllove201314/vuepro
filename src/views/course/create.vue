<template>
  <div class="create">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-steps :active="active" simple>
        <el-step
          :title="item.title"
          v-for="(item, index) in steps"
          :key="index"
          icon="el-icon-edit"
          @click.native="active = index"
        ></el-step>
      </el-steps>
      </div>
      <el-form>
        <div v-show="active===0">
          基本信息
        </div>
        <div v-show="active===1">
          <el-form-item label="课程封面">
            <CourseImage v-model="course.courseListImg" />
          </el-form-item>
          <el-form-item label="解锁封面">
            <CourseImage v-model="course.courseImgUrl"/>
          </el-form-item>
        </div>
        <div v-show="active===2">
          销售信息
        </div>
        <div v-show="active===3">
          秒杀活动
        </div>
        <div v-show="active===4">
          课程详情
          <el-form-item>
            <el-button >保存</el-button>
          </el-form-item>
        </div>
      </el-form>
      <el-button v-if="active>=0 && active<4" style="margin-top: 12px;" @click="active++">下一步</el-button>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CourseImage from './components/CourseImage.vue'

export default Vue.extend({
  name: 'CreateCourse',
  components: {
    CourseImage
  },
  data () {
    return {
      active: 1,
      steps: [
        { title: '基本信息' },
        { title: '课程封面' },
        { title: '销售信息' },
        { title: '秒杀活动' },
        { title: '课程详情' }
      ],
      imageUrl: '', // 预览图片地址
      course: {
        // id: 0,
        courseName: '',
        brief: '',
        teacherDTO: {
          // id: 0,
          // courseId: 0,
          teacherName: '',
          teacherHeadPicUrl: '',
          position: '',
          description: ''
        },
        courseDescriptionMarkDown: '',
        price: 0,
        discounts: 0,
        priceTag: '',
        discountsTag: '',
        isNew: true,
        isNewDes: '',
        courseListImg: '',
        courseImgUrl: '',
        sortNum: 0,
        previewFirstField: '',
        previewSecondField: '',
        status: 0, // 0：未发布，1：已发布
        sales: 0,
        activityCourse: false, // 是否开启活动秒杀
        activityCourseDTO: {
          // id: 0,
          // courseId: 0,
          beginTime: '',
          endTime: '',
          amount: 0,
          stock: 0
        },
        autoOnlineTime: ''
      }
    }
  },
  methods: {
  }
})
</script>

<style lang="scss" scoped>
  .el-step {
    cursor: pointer;
  }
</style>
