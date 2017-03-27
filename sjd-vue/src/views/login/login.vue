<template>
    <div class="container login">
        <page-header title="登陆"></page-header>
        <main class="main">
            <div class="logo">
                <img src="../../assets/images/logo.jpg" alt="">
            </div>
            <ul class="cell-list cell-input">
                <input-cell label="手机" type="text" @input="onUsernameInput" max="11"></input-cell>
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
    import pageHeader from "../../components/pageHeader.vue";
    import { Toast } from 'mint-ui';
    import { ajaxPost, ajaxGet, telReg } from "../../util.js";
    import $ from 'jquery';
    import * as Cookies from 'es-cookie';
    export default {
        components: {
            inputCell,
            pageHeader
        },
        data() {
            return {
                username: "",
                password: ""
            }
        },
        mounted() {
            let username = Cookies.get('username');
            if(username) {
                this.$router.replace({
                    name: 'home'
                })
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
                this.validate() && this.login();
            },
            login() {
                // Cookies.set("_dc", "7ecfb.3..2.BHTRBB9BBvQtFxu.3.kVeehxTqHlXARGHtbZOh1macWEN8RVub22.3.CsPG8yxboqZh1gJ03MNDlMzg.1..1.");
                // this.$router.push({
                //     name: "home"
                // });
                let postData = {
                    account: this.username,
                    password: this.password
                }
                ajaxPost("login/submit", postData).then((d) => {
                    if(d.status === "SUCCESS") {
                        this.$router.push({
                            name: "home"
                        });
                    } else {
                        Toast({
                            message: d.msg,
                            position: 'middle',
                            duration: 3000
                        });
                    }
                });
            },
            validate() {
                let result = true;
                if(!telReg.test(this.username.trim())) {
                    Toast("请输入正确的手机号");
                    result = false;
                } else if (this.password.trim() === "") {
                    Toast("请输入密码");
                    result = false;
                }
                return result;
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
    .container.login {
        .logo {
            text-align: center;
            img {
                width: 50%;
            }
        }
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