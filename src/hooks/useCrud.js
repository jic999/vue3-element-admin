import { computed, ref } from 'vue'
import { $message, $messageBox } from '@/utils/feedback'

const ACTIONS = {
  create: '新增',
  update: '编辑',
  view: '查看',
}

export default function ({ name, formData, reqDelete, refresh }) {
  const dialogVisible = ref(false)
  const dialogAction = ref('')
  const dialogTitle = computed(() => ACTIONS[dialogAction.value] + name)
  const newFormData = ref(formData)
  const initForm = {}

  for (let key in formData) {
    initForm[key] = formData[key].value
  }
  /*新增*/
  function handleCreate() {
    dialogAction.value = 'create'
    dialogVisible.value = true
    initFormData()
  }
  function handleUpdate(row) {
    dialogAction.value = 'update'
    dialogVisible.value = true
    transFormData(row)
  }
  function handleView(row) {
    dialogAction.value = 'view'
    dialogVisible.value = true
    transFormData(row)
  }
  function handleDelete(id) {
    $messageBox
      .confirm('数据删除后无法恢复，请谨慎操作', '提示', {
        type: 'warning',
        confirmButtonText: '确认',
        cancelButtonText: '取消',
      })
      .then(() => {
        reqDelete(id).then((res) => {
          $message.success(res.msg)
          refresh()
        })
      })
  }
  function transFormData(row) {
    Object.keys(row).forEach((key) => {
      newFormData.value[key].value = row[key]
    })
  }
  function initFormData() {
    Object.keys(initForm).forEach((key) => {
      newFormData.value[key].value = initForm[key]
    })
  }
  return {
    dialogVisible,
    dialogAction,
    dialogTitle,
    newFormData,
    handleCreate,
    handleUpdate,
    handleView,
    handleDelete,
  }
}
