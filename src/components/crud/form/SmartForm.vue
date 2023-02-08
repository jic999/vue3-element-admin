<script setup>
import { computed, reactive, ref, toRefs, watch } from 'vue'
import { $message } from '@/utils/feedback'

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
// 将绑定值转为 { key: value } 否则表单验证无效
const form = ref(transFormData())
const isLoading = ref(false)
const $form = ref({})
// * 为减小性能消耗 只监听fromData的value
const formCopy = computed(() => transFormData())
// * formData改变后 对 form和验证结果进行更新
watch(formCopy, (val) => {
  form.value = transFormData()
  // 每次切换action后 重置表单验证结果
  $form.value.resetFields()
})
function transFormData() {
  const newForm = {}
  for (let key in props.formData) {
    newForm[key] = props.formData[key].value
  }
  return newForm
}

async function handleCommit() {
  const passValidate = await $form.value.validate()
  if (!passValidate) return
  isLoading.value = true
  const actions = {
    create: () => props.reqCreate(form.value),
    update: () => props.reqUpdate(form.value),
  }
  try {
    isLoading.value = true
    const { code, data, msg } = await actions[props.action]()
    if (code === 0) {
      emit('refresh')
      $message.success(msg)
      emit('handleCancel')
    } else {
      throw new Error('请求失败')
    }
  } catch (error) {
    $message.error('请求失败，请稍后再试')
  } finally {
    isLoading.value = false
  }
}

/*------------表单相关------------*/
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
    form.value[curSingleImgKey] = reader.result
    $message.success('上传成功')
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
  <el-form ref="$form" :model="form" label-width="auto" :disabled="action === 'view'" v-bind="$attrs">
    <template v-for="(item, key) in formData" :key="key">
      <el-form-item :label="item.label" :prop="key" :rules="item.rules">
        <!--字符输入-->
        <template v-if="item.type === 'StringInput'">
          <el-input v-model="form[key]" v-bind="item.attrs" />
        </template>
        <!--数字输入-->
        <template v-else-if="item.type === 'NumberInput'">
          <el-input-number v-model="form[key]" v-bind="item.attrs" />
        </template>
        <!--选择器  -->
        <template v-else-if="item.type === 'Selector'">
          <el-select v-model="form[key]" v-bind="item.attrs">
            <el-option v-for="option in item.options" :key="option.label" :label="option.label" :value="option.value" />
          </el-select>
        </template>
        <!--级联选择器-->
        <template v-else-if="item.type === 'Cascader'">
          <el-cascader v-model="form[key]" :options="item.options" v-bind="item.attrs" />
        </template>
        <!--单选框-->
        <template v-else-if="item.type === 'Radio'">
          <el-radio-group v-model="form[key]" v-bind="item.attrs">
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
          <el-checkbox-group v-model="form[key]" v-bind="item.attrs">
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
      <el-button type="primary" :loading="isLoading" @click="handleCommit()">提交</el-button>
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
