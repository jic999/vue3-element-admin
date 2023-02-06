<script setup>
import { computed, reactive, ref } from 'vue'
import 'element-plus/es/components/message/style/css'
import { ElMessage } from 'element-plus'
import TheIcon from '@/components/icon/TheIcon.vue'
import { $message } from '@/utils/feedback'

const param = {
  label: '表头',
  value: '值',
  options: [], // 可选
  // stringInput | numberInput | selector | cascader | radio | checkBoxGroup | checkBox | singleImgUpload
  type: '表单类型',
  attrs: {}, // 表单属性
}
const props = defineProps({
  formData: {
    type: Object,
    required: true,
  },
  action: {
    type: String,
    required: true,
  },
  reqCreate: {
    type: Function,
    required: true,
  },
  reqUpdate: {
    type: Function,
    required: true,
  },
})
const emit = defineEmits(['handleCancel', 'refresh'])
const form = computed(() => props.formData)
function getParams() {
  const params = {}
  for (let key in form.value) {
    params[key] = form.value[key].value
  }
  return params
}
function handleSave() {
  switch (props.action) {
    case 'create':
      props.reqCreate(getParams()).then((res) => {
        $message.success(res.msg)
        emit('refresh')
        emit('handleCancel')
      })
      break
    case 'update':
      props.reqUpdate(getParams()).then((res) => {
        $message.success(res.msg)
        emit('refresh')
        emit('handleCancel')
      })
      break
    default:
      console.error('error action!')
  }
}
/* 单图上传 */
let curSingleImgKey = ''
function pickSingleImg(key) {
  curSingleImgKey = key
}
function singleImgChange(file, files) {
  // 将图片转为 ArrayBuffer
  const reader = new FileReader()
  reader.readAsArrayBuffer(file.raw)
  reader.onload = () => {
    form.value[curSingleImgKey].value = reader.result
    ElMessage({
      type: 'success',
      message: '上传成功',
      icon: h(TheIcon, { icon: 'ep:success-filled', size: 14 }),
    })
  }
  // 隐藏上传按钮
  if (files.length > 0) {
    document.querySelector(`.${curSingleImgKey} .el-upload.el-upload--picture-card`).style.display = 'none'
  }
}
function singleImgRemove(file, files) {
  // 显示上传按钮
  if (files.length === 1) {
    document.querySelector(`.${curSingleImgKey} .el-upload.el-upload--picture-card`).style.display = 'flex'
  }
}
</script>

<template>
  <el-form ref="smart-form" :model="form" label-width="auto" :disabled="action === 'view'" v-bind="$attrs">
    <template v-for="(item, key) in form" :key="key">
      <el-form-item :label="item.label">
        <!--字符输入-->
        <template v-if="item.type === 'StringInput'">
          <el-input v-model="form[key].value" v-bind="item.attrs" />
        </template>
        <!--数字输入-->
        <template v-else-if="item.type === 'NumberInput'">
          <el-input-number v-model="form[key].value" v-bind="item.attrs" />
        </template>
        <!--选择器  -->
        <template v-else-if="item.type === 'Selector'">
          <el-select v-model="form[key].value" v-bind="item.attrs">
            <el-option v-for="option in item.options" :key="option.label" :label="option.label" :value="option.value" />
          </el-select>
        </template>
        <!--级联选择器-->
        <template v-else-if="item.type === 'Cascader'">
          <el-cascader v-model="form[key].value" :options="item.options" v-bind="item.attrs" />
        </template>
        <!--单选框-->
        <template v-else-if="item.type === 'Radio'">
          <el-radio-group v-model="form[key].value" v-bind="item.attrs">
            <el-radio
              v-for="option in item.options"
              :key="option.value"
              :label="option.value"
              v-bind="item.attrs?.attrs"
            >
              {{ option.label }}
            </el-radio>
          </el-radio-group>
        </template>
        <!--多选框 / 绑定Array-->
        <template v-else-if="item.type === 'Checkbox'">
          <el-checkbox-group v-model="form[key].value" v-bind="item.attrs">
            <el-checkbox
              v-for="option in item.options"
              :key="option.label"
              :label="option.label"
              v-bind="item.attrs?.attrs"
            >
              {{ option.label }}
            </el-checkbox>
          </el-checkbox-group>
        </template>
        <!--单图上传-->
        <template v-else-if="item.type === 'SingleImg'">
          <el-upload
            ref="singleImgUpload"
            class="single-img-upload"
            :class="key"
            list-type="picture-card"
            :auto-upload="false"
            :before-remove="singleImgRemove"
            :on-change="singleImgChange"
            :limit="1"
            v-bind="item.attrs"
            @click="pickSingleImg(key)"
          >
            <span style="font-size: 24px">+</span>
          </el-upload>
        </template>
      </el-form-item>
    </template>
  </el-form>
  <div v-if="action !== 'view'" class="form-footer">
    <div>
      <el-button type="primary" @click="handleSave()">提交</el-button>
      <el-button plain @click="$emit('handleCancel')">取消</el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.form-footer {
  display: flex;
  justify-content: end;
  align-items: center;
  margin-top: 24px;
}
</style>
