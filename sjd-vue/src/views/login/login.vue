<template>
    <div class="container login">
        <header class="header">
            <div class="left"></div>
            <div class="title">登陆</div>
            <div class="right"></div>
        </header>
        <main class="main">
            <ul class="cell-list cell-input">
                <input-cell label="登录名" type="text" @input="onUsernameInput" max="20"></input-cell>
                <input-cell label="密码" type="password" @input="onPasswordInput" max="20"></input-cell>
            </ul>
            <button class="btn" @click="onLoginBtnClick">登录</button>
            <div class="btns">
                <div class="left" @click="onForgetPwdBtnClick">忘记密码</div>
                <div class="right" @click="onRegisterBtnClick">新用户注册</div>
            </div>
        </main>
    </div>
</template>

<script>
    import inputCell from "../../components/inputCell.vue";
    export default {
        components: {
            inputCell
        },
        data() {
            return {
                username: "",
                password: ""
            }
        },
        methods: {
            onUsernameInput(value) {
                this.username = value;
            },
            onPasswordInput(value) {
                this.password = value;
            },
            onLoginBtnClick() {
                this.$router.push({
                    name: "home"
                })
            },
            onForgetPwdBtnClick() {
                this.$router.push({
                    name: 'login/forgetPwd'
                });
            },
            onRegisterBtnClick() {
                this.$router.push({
                    name: 'login/register'
                });
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
    .container.login {
        .btns {
            color: @orange;
            margin: @space;
            overflow: hidden;
            .left {
                float: left;
            }
            .right {
                float: right;
            }
        }
    }
</style>