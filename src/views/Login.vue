<template>
    <div class="login">
        <div class="loginTop">
            <img src="@/assets/app.png">
            <span>欢迎登陆</span>
        </div>
        <div class="loginContent">
            <input type="text" class="username" name="username" placeholder="请输入手机号" v-model="username">
            <input type="password" class="password" name="password" placeholder="请输入密码" v-model="password">
            <button class="btn" @click="login">登录</button>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'Login',
  components: {
  },
  setup() {
    let username = ref('');
    let password = ref('');
    const store = useStore();

    const login = () => {
        store.dispatch('getLogin', {username: username.value, password: password.value})
    }
    return{
        username,
        password,
        login,
    }
  }
}
</script>

<style lang="less" scoped>
.login {
    width: 100%;
    height: 16.23rem;
    background-color: #da1515;
    display: flex;
    flex-direction: column;
    align-items: center;
    .loginTop {
        height: 6rem;
        line-height: 6rem;
        color: #fff;
        font-size: .6rem;
        img {
            width: .8rem;
            margin-right: 0.4rem;
            height: 0.8rem;
            vertical-align: middle;
        }
    }
    .loginContent {
        display: flex;
        flex-direction: column;
        align-items: center;
        input {
            width: 4.5rem;
            height: 0.8rem;
            margin-bottom: 0.4rem;
        }
        button {
            width: 4.5rem;
            height: 0.8rem;
        }
    }
}
</style>