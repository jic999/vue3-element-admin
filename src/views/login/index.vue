<script setup>
import { reactive } from 'vue'
import { $message } from '@/utils/feedback'
import { useRouter } from 'vue-router'

const router = useRouter()
const loginParams = reactive({
  username: '',
  password: '',
  isRemember: false,
})
function login() {
  if (!(loginParams.username && loginParams.password)) return $message.warning('请输入用户名和密码')
  $message.success('登陆成功')
  router.push('/')
}
</script>

<template>
  <div class="login-view flex-center">
    <section class="login-box">
      <div class="login-box__left">
        <div class="login-box__img"></div>
      </div>
      <div class="login-box__right">
        <div class="login-box__title flex-center">Vue3 Element Admin</div>
        <div class="login-box__form">
          <el-form-item>
            <el-input
              v-model="loginParams.username"
              class="login-box__input"
              size="large"
              placeholder="admin"
              style="margin-bottom: 24px"
            />
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="loginParams.password"
              class="login-box__input"
              size="large"
              type="password"
              placeholder="123456"
            />
          </el-form-item>
          <el-checkbox v-model="loginParams.isRemember" label="记住我" style="margin-top: 12px" />
        </div>
        <div class="login-box__remember"></div>
        <el-button class="login-box__btn" type="primary" size="large" @click="login()">登录</el-button>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.login-view {
  width: 100vw;
  height: 100vh;
  padding-bottom: 4%;
}
.login-box {
  display: flex;
  width: 660px;
  height: 400px;
  padding: 16px;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  &__left {
    width: 50%;
    height: 100%;
    padding: 24px 16px;
  }
  &__img {
    width: 100%;
    height: 100%;
    background: center/cover url('https://template.qszone.com/assets/login_banner.6e96327c.webp');
  }
  &__right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 50%;
    height: 100%;
    padding: 24px 16px;
  }
  &__title {
    height: 20%;
    font-size: 22px;
    color: #666;
  }
  &__input {
    height: 48px;
  }
  &__btn {
    height: 48px;
  }
}
</style>
