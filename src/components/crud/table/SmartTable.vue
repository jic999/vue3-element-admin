<script setup>
import { onBeforeMount, ref, watch } from 'vue'
import TheIcon from '@/components/icon/TheIcon.vue'
import { $message } from '@/utils/feedback'

const props = defineProps({
  getData: {
    type: Function,
    required: true,
  },
  columns: {
    type: Array,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  handleCreate: {
    type: Function,
    default: undefined,
  },
  isPagination: {
    type: Boolean,
    default: false,
  },
  tableAttrs: {
    type: Object,
    default: undefined,
  },
  paginationAttrs: {
    type: Object,
    default: undefined,
  },
})

const isLoading = ref(true)

const tableData = ref([])
async function handleQuery() {
  try {
    isLoading.value = true
    const { code, data } = await props.getData(pageInfo.value)
    if (0 !== code) throw new Error()
    if (props.isPagination) {
      pageInfo.value.total = data.total
      tableData.value = data.records
    } else {
      tableData.value = data
    }
  } catch (error) {
    $message.error('请求失败，请稍后再试')
  } finally {
    isLoading.value = false
  }
}
function handleSearch(isInit = false) {
  if (isInit) pageInfo.value.keyword = ''
  pageInfo.value.pageNo = 1
  handleQuery()
}

/*------------分页------------*/
const pageInfo = ref({
  pageNo: 1,
  pageSize: 10,
  keyword: '',
  total: 0,
})
watch(
  [() => pageInfo.value.pageNo, () => pageInfo.value.pageSize],
  () => {
    handleQuery()
  },
  { deep: true }
)
/*------------------------*/
onBeforeMount(() => {
  handleQuery()
})
defineExpose({
  handleQuery,
  handleSearch,
})
</script>

<template>
  <el-card shadow="never">
    <template #header>
      <div class="table-header">
        <div class="table-header__title">{{ title }}管理</div>
        <div class="table-header__search">
          <el-input v-model.lazy="pageInfo.keyword" class="table-header__input" />
          <el-button class="table-header__button" type="primary" @click="handleSearch()">搜索</el-button>
          <el-button class="table-header__button" plain @click="handleSearch(1)">重置</el-button>
        </div>
        <div>
          <el-button v-if="handleCreate" type="primary" @click="handleCreate()">
            <template #icon>
              <TheIcon icon="ep:plus" />
            </template>
            新增{{ title }}
          </el-button>
        </div>
      </div>
    </template>
    <template #default>
      <el-table v-loading="isLoading" :data="tableData" stripe style="width: 100%" v-bind="tableAttrs">
        <template v-for="item in columns" :key="item.label">
          <el-table-column v-bind="item">
            <template v-if="item.render" #default="{ row, column, $index }">
              <component :is="item.render(row, column, $index)" />
            </template>
          </el-table-column>
        </template>
      </el-table>
      <div v-if="isPagination" class="table-footer">
        <el-pagination
          v-model:current-page="pageInfo.pageNo"
          v-model:page-size="pageInfo.pageSize"
          :page-sizes="[10, 15, 20, 25]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageInfo.total"
          background
          small
          v-bind="paginationAttrs"
        />
      </div>
    </template>
  </el-card>
</template>

<style lang="scss" scoped>
.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  &__title {
    font-size: 20px;
  }
  &__search {
    display: flex;
  }
  &__input {
    display: flex;
    width: 240px;
  }
  &__button {
    margin-left: 8px;
  }
}
.table-footer {
  display: flex;
  justify-content: end;
  margin-top: 16px;
}
</style>
