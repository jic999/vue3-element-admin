<script setup>
import SubMenu from '@/components/layout/sider/components/SubMenu.vue'
import { useRoute, useRouter } from 'vue-router'
import { onBeforeMount, onMounted, ref } from 'vue'

const router = useRouter()
const route = useRoute()
const menus = router.options.routes.filter((route) => route.name && !route.isHidden)
menus.sort((a, b) => (a.meta?.order ?? 0) - (b.meta?.order ?? 0))
const defaultActive = ref(route.name)
</script>

<template>
  <el-menu :default-active="defaultActive" class="el-menu-vertical-demo" :unique-opened="true">
    <SubMenu v-for="menu in menus" :key="menu.path" :menu="menu" />
  </el-menu>
</template>

<style lang="scss" scoped>
.el-menu {
  --el-menu-bg-color: transparent;
  border: none;
}
</style>
