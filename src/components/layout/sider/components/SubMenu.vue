<script setup>
import { useRouter } from 'vue-router'

defineProps({
  menu: {
    type: Object,
    default: undefined,
  },
})

const router = useRouter()
function menuChange(name) {
  router.push({ name })
}
</script>

<template>
  <template v-if="!menu.isHidden">
    <!-- 多级菜单 -->
    <template v-if="!menu.isSingle">
      <el-sub-menu v-if="menu.children" :index="menu.name">
        <template #title>
          <TheIcon :icon="menu.meta?.icon" :size="16" />
          <span>{{ menu.meta?.title }}</span>
        </template>
        <sub-menu v-for="menuItem in menu.children" :key="menuItem.name" :menu="menuItem"></sub-menu>
      </el-sub-menu>
      <el-menu-item v-else :index="menu.name" @click="menuChange(menu.name)">
        <TheIcon :icon="menu.meta?.icon" :size="16" />
        <template #title>{{ menu.meta?.title }}</template>
      </el-menu-item>
    </template>
    <!-- 单级菜单 -->
    <el-menu-item v-else :index="menu.name" @click="menuChange(menu.name)">
      <TheIcon :icon="menu.meta?.icon" :size="16" />
      <template #title>{{ menu.meta?.title }}</template>
    </el-menu-item>
  </template>
</template>

<style lang="scss" scoped>
@mixin menu-item__before {
  &::before {
    content: '';
    width: 3px;
    height: 100%;
    background: var(--el-color-primary);
    position: absolute;
    left: 0;
  }
}
@mixin menu-item {
  position: relative;
  height: 42px;
  margin-top: 6px;
  border-radius: 4px;
  overflow: hidden;
  &:hover {
    background: #f4f4f4;
    @include menu-item__before;
  }
}
.el-sub-menu {
  &:deep(.el-sub-menu__title) {
    @include menu-item;
  }
  &.is-active :deep(.el-sub-menu__title) {
    color: var(--el-color-primary-dark-2);
  }
}
.el-menu-item {
  @include menu-item;
  &.is-active {
    color: var(--el-color-primary-dark-2);
    background: var(--el-color-primary-light-9) !important;
    @include menu-item__before;
  }
}
</style>
