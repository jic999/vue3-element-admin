<script setup>
import { h, ref } from 'vue'
import SmartTable from '@/components/crud/table/SmartTable.vue'
import { ElButton, ElSwitch } from 'element-plus'
import { renderIcon } from '@/utils/common/icon'
import SmartForm from '@/components/crud/form/SmartForm.vue'
import useCrud from '@/hooks/useCrud'
import userApi from '@/api/user/index'

/*表格相关*/
function getData(pageInfo) {
  return userApi.reqPage(pageInfo)
}
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
      trigger: ['blur'],
      message: '请输入书体名称',
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
  },
  age: {
    label: '年龄',
    value: null,
    type: 'NumberInput',
  },
  province: {
    label: '省份',
    value: null,
    type: 'StringInput',
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
  },
  description: {
    label: '个人介绍',
    value: null,
    type: 'StringInput',
    attrs: {
      type: 'textarea',
      autosize: { minRows: 3 },
    },
  },
}
const $table = ref({})
/*表单相关*/
const { dialogVisible, dialogTitle, dialogAction, newFormData, handleCreate, handleView, handleUpdate, handleDelete } =
  useCrud({
    name: '用户',
    formData,
    reqDelete: userApi.reqDelete,
    refresh: () => $table.value?.handleQuery(),
  })
function toggleDialog() {
  dialogVisible.value = !dialogVisible.value
}
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
          { type: 'primary', size: 'small', onClick: () => handleView(row) },
          { default: () => '查看', icon: () => renderIcon('ep:view', { size: 14 }) }
        ),
        h(
          ElButton,
          { type: 'warning', size: 'small', onClick: () => handleUpdate(row) },
          { default: () => '编辑', icon: () => renderIcon('ep:edit', { size: 14 }) }
        ),
        h(
          ElButton,
          { type: 'danger', size: 'small', onClick: () => handleDelete(row.id) },
          { default: () => '删除', icon: () => renderIcon('ep:delete', { size: 14 }) }
        ),
      ])
    },
  },
]
</script>

<template>
  <el-dialog v-model="dialogVisible" style="width: 600px">
    <template #header>
      <div style="font-size: 18px" @click="toggleDialog">{{ dialogTitle }}</div>
    </template>
    <SmartForm
      :form-data="newFormData"
      :action="dialogAction"
      :req-create="userApi.reqCreate"
      :req-update="userApi.reqUpdate"
      @refresh="$table.handleQuery"
      @handle-cancel="toggleDialog"
    />
  </el-dialog>
  <SmartTable
    ref="$table"
    :get-data="getData"
    :columns="columns"
    title="用户"
    :handle-create="handleCreate"
    :is-pagination="true"
  />
</template>

<style lang="scss" scoped></style>
