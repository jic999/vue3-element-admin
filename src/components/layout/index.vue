<script setup>
import AppSide from './sider/index.vue'
import AppHeader from './header/index.vue'
</script>

<template>
  <el-container class="homepage">
    <el-aside>
      <AppSide />
    </el-aside>
    <el-container>
      <el-header>
        <AppHeader class="flex-center" />
      </el-header>
      <el-main>
        <RouterView />
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.homepage {
  width: 100%;
  height: 100%;
  position: absolute;
}
.el-aside {
  width: 210px;
  height: 100vh;
  padding: 0 4px;
  background: #fff;
  border-right: 2px solid #eee;
}
.el-header {
  height: 54px;
  padding: 0;
  background: #fff;
  border-bottom: 1px solid #eee;
}
</style>
