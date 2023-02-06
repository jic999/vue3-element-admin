<script setup>
import { reactive, ref } from 'vue'

const formData = reactive({
  name: {
    label: '姓名',
    value: '',
  },
  age: {
    label: '年龄',
    value: null,
  },
  school: {
    label: '学校',
    value: null,
    options: [
      {
        label: '武汉大学',
        value: 1001,
      },
      {
        label: '华中科技大学',
        value: 1002,
      },
      {
        label: '武汉理工大学',
        value: 1003,
      },
      {
        label: '华中师范大学',
        value: 1004,
      },
    ],
  },
  class: {
    label: '班级',
    value: null,
    options: [
      {
        label: '大一',
        value: '大一',
        children: [
          {
            label: '一班',
            value: 201,
          },
          {
            label: '二班',
            value: 202,
          },
          {
            label: '三班',
            value: 203,
          },
          {
            label: '四班',
            value: 204,
          },
        ],
      },
      {
        label: '大二',
        value: '大二',
        children: [
          {
            label: '一班',
            value: 301,
          },
          {
            label: '二班',
            value: 302,
          },
          {
            label: '三班',
            value: 303,
          },
          {
            label: '四班',
            value: 304,
          },
        ],
      },
      {
        label: '大三',
        value: '大三',
        children: [
          {
            label: '一班',
            value: 401,
          },
          {
            label: '二班',
            value: 402,
          },
          {
            label: '三班',
            value: 403,
          },
          {
            label: '四班',
            value: 404,
          },
        ],
      },
      {
        label: '大四',
        value: '大四',
        children: [
          {
            label: '一班',
            value: 501,
          },
          {
            label: '二班',
            value: 502,
          },
          {
            label: '三班',
            value: 503,
          },
          {
            label: '四班',
            value: 504,
          },
        ],
      },
    ],
  },
  profession: {
    label: '专业',
    value: null,
    options: [
      {
        label: '计算机科学与技术',
        value: 91,
      },
      {
        label: '软件工程',
        value: 92,
      },
      {
        label: '网络工程',
        value: 93,
      },
    ],
  },
  hobby: {
    label: '爱好',
    value: [],
    options: [
      {
        label: '唱歌',
        value: false,
      },
      {
        label: '跳舞',
        value: false,
      },
      {
        label: 'rap',
        value: false,
      },
      {
        label: '篮球',
        value: false,
      },
    ],
  },
  permission: {
    label: '权限',
    value: [],
    options: [
      {
        label: '权限A',
        value: false,
      },
      {
        label: '权限B',
        value: false,
      },
      {
        label: '权限C',
        value: false,
      },
      {
        label: '权限D',
        value: false,
      },
    ],
  },
  avatar: {
    label: '头像',
    value: null,
  },
})

const handleChange = (value) => {
  console.log(value)
}

function radioChange(val) {
  console.log(formData.profession.value)
}
function checkBoxChange() {
  console.log(formData.hobby.value)
}
function singleCheckBoxChange() {
  console.log(formData.permission.options)
}

/* 单图上传 */
function imgChange(file, files) {
  console.log('imgChange')
  if (files.length > 0) {
    document.querySelector('.el-upload.el-upload--picture-card').style.display = 'none'
  }
  console.log(file)
  const reader = new FileReader()
  reader.readAsArrayBuffer(file.raw)
  reader.onload = () => {
    console.log(reader)
  }
  console.log(files)
}
function beforeRemove(file, files) {
  console.log('--- imgRemove ---')
  console.log(file)
  console.log(files.length)
  if (files.length === 1) {
    document.querySelector('.el-upload.el-upload--picture-card').style.display = 'flex'
  }
}
const singleImgUpload = ref('singleImgUpload')
function commitSingleImg() {
  console.log(singleImgUpload)
}
</script>

<template>
  <el-form :model="formData" label-width="100px">
    <!--字符输入-->
    <el-form-item :label="formData.name.label">
      <el-input v-model="formData.name.value" />
    </el-form-item>
    <!--数字输入-->
    <el-form-item :label="formData.age.label">
      <el-input-number v-model="formData.age.value" />
    </el-form-item>
    <!--选择器-->
    <el-form-item :label="formData.school.label">
      <el-select v-model="formData.school.value">
        <el-option
          v-for="option in formData.school.options"
          :key="option.value"
          :label="option.label"
          :value="option.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <!--级联选择器-->
    <el-form-item :label="formData.class.label">
      <el-cascader
        v-model="formData.class.value"
        :options="formData.class.options"
        @change="handleChange(formData.class.value)"
      />
    </el-form-item>
    <!--单选框-->
    <el-form-item :label="formData.profession.label">
      <el-radio-group v-model="formData.profession.value">
        <el-radio
          v-for="option in formData.profession.options"
          :key="option.value"
          :label="option.value"
          @change="radioChange(option.value)"
          >{{ option.label }}</el-radio
        >
      </el-radio-group>
    </el-form-item>
    <!--多选框/组合(not Boolean) -->
    <el-form-item :label="formData.hobby.label">
      <el-checkbox-group v-model="formData.hobby.value" @change="checkBoxChange()">
        <el-checkbox v-for="option in formData.hobby.options" :key="option.label" :label="option.label">
          {{ option.label }}
        </el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <!--多选框/单独(Boolean)-->
    <el-form-item :label="formData.permission.label">
      <el-checkbox
        v-for="option in formData.permission.options"
        :key="option.label"
        v-model="option.value"
        :label="option.value"
        @change="singleCheckBoxChange()"
      >
        {{ option.label }}
      </el-checkbox>
    </el-form-item>
    <!--单图上传-->
    <el-form-item :label="formData.avatar.label">
      <el-upload
        ref="singleImgUpload"
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        list-type="picture-card"
        :auto-upload="false"
        accept="image/*"
        :before-remove="beforeRemove"
        :on-change="imgChange"
        :limit="1"
      >
        <span style="font-size: 20px">+</span>
      </el-upload>
      <el-button @click="commitSingleImg()">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<style lang="scss" scoped></style>
