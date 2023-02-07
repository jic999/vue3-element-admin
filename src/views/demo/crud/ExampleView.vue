<script setup>
import SmartCrud from '@/components/crud/SmartCrud.vue'
import userApi from '@/api/user/index'
import { h } from 'vue'
import { ElButton, ElSwitch } from 'element-plus'
import { renderIcon } from '@/utils/common/icon'

const $crud = ref({})
const columns = [
  { label: 'id', prop: 'id', width: 150 },
  { label: '姓名', prop: 'name', width: 150 },
  {
    label: '性别',
    prop: 'gender',
    width: 150,
    render(row) {
      return h('span', { innerText: row.gender ? '男' : '女' })
    },
  },
  { label: '年龄', prop: 'age', width: 150 },
  { label: '省份', prop: 'province', width: 200 },
  {
    label: '是否vip',
    prop: 'isVip',
    width: 120,
    render(row, column, index) {
      return h(ElSwitch, { modelValue: row.isVip === 1 })
    },
  },
  { label: '个人介绍', prop: 'description', width: 250, showOverflowTooltip: true },
  {
    label: '操作',
    prop: 'actions',
    width: 232,
    fixed: 'right',
    render(row, column, index) {
      return h('div', { style: 'display: flex; justify-content: space-between;' }, [
        h(
          ElButton,
          { type: 'primary', size: 'small', onClick: () => $crud.value.handleView(row) },
          { default: () => '查看', icon: () => renderIcon('ep:view', { size: 14 }) }
        ),
        h(
          ElButton,
          { type: 'warning', size: 'small', onClick: () => $crud.value.handleUpdate(row) },
          { default: () => '编辑', icon: () => renderIcon('ep:edit', { size: 14 }) }
        ),
        h(
          ElButton,
          { type: 'danger', size: 'small', onClick: () => $crud.value.handleDelete(row.id) },
          { default: () => '删除', icon: () => renderIcon('ep:delete', { size: 14 }) }
        ),
      ])
    },
  },
]
const formData = {
  id: {
    label: 'id',
    value: '',
    type: 'StringInput',
    attrs: {
      disabled: true,
      placeholder: 'auto',
    },
  },
  name: {
    label: '姓名',
    value: null,
    type: 'StringInput',
    rules: {
      required: true,
      message: '请输入姓名',
      trigger: 'blur',
    },
  },
  gender: {
    label: '性别',
    value: null,
    type: 'Radio',
    options: [
      {
        label: '男',
        value: 1,
      },
      {
        label: '女',
        value: 0,
      },
    ],
    rules: {
      required: true,
      message: '请选择性别',
    },
  },
  age: {
    label: '年龄',
    value: null,
    type: 'NumberInput',
    rules: {
      required: true,
      message: '请输入年龄',
      trigger: 'blur',
    },
  },
  province: {
    label: '省份',
    value: null,
    type: 'StringInput',
    rules: {
      required: true,
      message: '请输入省份',
      trigger: 'blur',
    },
  },
  isVip: {
    label: '是否Vip',
    value: null,
    type: 'Radio',
    options: [
      {
        label: '是',
        value: 1,
      },
      {
        label: '否',
        value: 0,
      },
    ],
    rules: {
      required: true,
      message: '请选择是否vip',
    },
  },
  description: {
    label: '个人介绍',
    value: null,
    type: 'StringInput',
    attrs: {
      type: 'textarea',
      autosize: { minRows: 3, maxRows: 5 },
    },
  },
}

import { reactive, ref } from 'vue'

const formSize = ref('default')
const ruleFormRef = ref()
const ruleForm = reactive({
  name: 'Hello',
  region: '',
  count: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})

const rules = reactive({
  name: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  region: [
    {
      required: true,
      message: 'Please select Activity zone',
      trigger: 'change',
    },
  ],
  count: [
    {
      required: true,
      message: 'Please select Activity count',
      trigger: 'change',
    },
  ],
  date1: [
    {
      type: 'date',
      required: true,
      message: 'Please pick a date',
      trigger: 'change',
    },
  ],
  date2: [
    {
      type: 'date',
      required: true,
      message: 'Please pick a time',
      trigger: 'change',
    },
  ],
  type: [
    {
      type: 'array',
      required: true,
      message: 'Please select at least one activity type',
      trigger: 'change',
    },
  ],
  resource: [
    {
      required: true,
      message: 'Please select activity resource',
      trigger: 'change',
    },
  ],
  desc: [{ required: true, message: 'Please input activity form', trigger: 'blur' }],
})
</script>

<template>
  <SmartCrud ref="$crud" title="用户" :api="userApi" :columns="columns" :form-data="formData" is-pagination />
</template>

<style lang="scss" scoped></style>
