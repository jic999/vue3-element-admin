<script setup>
import SubMenu from '@/components/layout/sider/components/SubMenu.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const menus = router.options.routes.filter((route) => route.name && !route.isHidden)
menus.sort((a, b) => (a.meta?.order ?? 0) - (b.meta?.order ?? 0))
// TODO issue: 刷新页面后 菜单会跳转到第一栏
</script>

<template>
  <el-menu :default-active="menus[0].name" class="el-menu-vertical-demo" :unique-opened="true">
    <SubMenu v-for="menu in menus" :key="menu.path" :menu="menu" />
  </el-menu>
</template>

<style lang="scss" scoped>
.el-menu {
  --el-menu-bg-color: transparent;
  border: none;
}
</style>
