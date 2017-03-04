<template>
    <div class="container">
        <header class="header">
            <div class="left">
            </div>
            <div class="title">登陆</div>
            <div class="right"></div>
        </header>
        <main class="main">
            <ul class="cell-list cell-input">
                <li>
                    <label>登录名</label>
                    <input class="text" type="text" placeholder="请输入登录名" v-model="username" maxlength="20">
                    <i class="iconfont" @click="username = ''" v-if="username != ''">&#xe641;</i>
                </li>
                <li>
                    <label>密码</label>
                    <input class="text" type="password" placeholder="请输入登录名" v-model="password" maxlength="20"
                     ref="password">
                    <i class="iconfont"  @touchstart.prevent="onStart" @touchend="onEnd" v-if="password != ''">&#xe71f;</i>
                    <i class="iconfont" @click.stop="password = ''" v-if="password != ''">&#xe641;</i>
                </li>
            </ul>
            <button class="btn">登录</button>
        </main>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                username: "",
                password: ""
            }
        },
        methods: {
            onStart() {
                this.$refs.password.type = "text";
            },
            onEnd() {
                this.$refs.password.type = "password";
            }
        }
    }
</script>

<style lang="less">
    @import "../../assets/less/cell-input";
    .cell-input {
        label {
            width: @size;
        }
    }
</style>