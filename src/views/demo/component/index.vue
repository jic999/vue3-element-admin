<script setup>
import SmartForm from '@/components/crud/form/SmartForm.vue'
import { ElUpload } from 'element-plus'
import { ref } from 'vue'
import { $message } from '@/utils/feedback/index'
import req from '@/api/request'

const $form = ref({})
const formData = {
  avatar: {
    type: 'SingleImg',
    label: '头像',
    value: null,
  },
}
function logFormData() {
  console.log($form.value.getForm())
}
const $imageUpload = ref({})
const isLoading = ref(false)
function handleCommit() {
  isLoading.value = true
  $imageUpload.value
    .submit()
    .then(({ code, data }) => {
      if (code === 0) {
        $message.success('上传成功')
        console.log(data)
      }
    })
    .catch((errMsg) => {
      $message.warning(errMsg)
    })
    .finally(() => (isLoading.value = false))
}
</script>

<template>
  <!-- <h1>1 SmartForm</h1>
  <SmartForm ref="$form" :form-data="formData" :req-create="() => 0" />
  <el-button @click="logFormData()">打印数据</el-button>
  <br />
  <h2>2 ImageUpload</h2> -->
  <ImageUpload ref="$imageUpload" action="http://localhost:1112/upload/images" :limit="4" />
  <el-button :loading="isLoading" @click="handleCommit">提交</el-button>
</template>

<style lang="scss" scoped></style>
