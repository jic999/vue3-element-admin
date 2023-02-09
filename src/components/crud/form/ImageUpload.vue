<script setup>
import { ElUpload } from 'element-plus'
import { $message } from '@/utils/feedback/index'
import req from '@/api/request'

const props = defineProps({
  action: {
    type: String,
    required: true,
  },
  limit: {
    type: Number,
    default: 1,
  },
  autoUpload: {
    type: Boolean,
    default: false,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    default: 'image',
  },
  // 当同一页面中使用多个该组件 需要为每个组件设置不同的className 否则上传按钮的显示与隐藏会出错
  className: {
    type: String,
    default: 'image-upload',
  },
})

let imgList = []
function submit() {
  if (imgList.length === 0) return new Promise((res, rej) => rej('请选择图片'))
  const form = new FormData()
  imgList.forEach((item) => form.append('image', item.raw))
  return req.post(props.action, form)
}
function handleChange(file, files) {
  imgList = files
  if (imgList.length >= props.limit) {
    document.querySelector(`.${props.className} .el-upload--picture-card`).style.display = 'none'
  }
}
function handleRemove(file, files) {
  if (files.length < props.limit) {
    document.querySelector(`.${props.className} .el-upload--picture-card`).style.display = 'flex'
  }
}
function handleSuccess() {
  $message.success('上传成功')
}

defineExpose({
  submit,
})
</script>

<template>
  <div>
    <el-upload
      ref="$upload"
      :class="className"
      :action="action"
      list-type="picture-card"
      :name="name"
      :on-success="handleSuccess"
      :on-change="handleChange"
      :on-remove="handleRemove"
      :auto-upload="autoUpload"
      :multiple="multiple"
      :limit="limit"
    >
      <span style="font-size: 24px">+</span>
    </el-upload>
  </div>
</template>

<style lang="scss" scoped></style>
