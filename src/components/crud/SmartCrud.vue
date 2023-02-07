<script setup>
import { computed, ref } from 'vue'
import SmartTable from '@/components/crud/table/SmartTable.vue'
import SmartForm from '@/components/crud/form/SmartForm.vue'
import useCrud from '@/hooks/useCrud'

const props = defineProps({
  formData: {
    type: Object,
    required: true,
  },
  columns: {
    type: Array,
    required: true,
  },
  api: {
    type: Object,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  isPagination: {
    type: Boolean,
    default: false,
  },
  tableAttrs: {
    type: Object,
    default: undefined,
  },
  formAttrs: {
    type: Object,
    default: undefined,
  },
  paginationAttrs: {
    type: Object,
    default: undefined,
  },
})
const columns = computed(() => props.columns)
/*表格相关*/
function getData(pageInfo) {
  return props.isPagination ? props.api.reqPage(pageInfo) : props.api.reqList(pageInfo)
}
const $table = ref({})
/*表单相关*/
const { dialogVisible, dialogTitle, dialogAction, newFormData, handleCreate, handleView, handleUpdate, handleDelete } =
  useCrud({
    name: props.title,
    formData: props.formData,
    reqDelete: props.api.reqDelete,
    refresh: () => $table.value?.handleQuery(),
  })
function toggleDialog() {
  dialogVisible.value = !dialogVisible.value
}
defineExpose({
  handleView,
  handleUpdate,
  handleDelete,
})
</script>

<template>
  <el-dialog v-model="dialogVisible" style="width: 600px">
    <template #header>
      <div style="font-size: 18px" @click="toggleDialog">{{ dialogTitle }}</div>
    </template>
    <SmartForm
      :form-data="newFormData"
      :action="dialogAction"
      :req-create="api.reqCreate"
      :req-update="api.reqUpdate"
      v-bind="formAttrs"
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
    :is-pagination="isPagination"
    :table-attrs="tableAttrs"
    :pagination-attrs="paginationAttrs"
  />
</template>

<style lang="scss" scoped></style>
