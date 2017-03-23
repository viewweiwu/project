<template>
    <div class="container">
        <page-header title="输入新密码" leftArrow="true" @leftClick="$router.go(-1)"></page-header>
        <main class="main">
            <ul class="cell-list cell-input">
                <input-cell label="新密码" type="password" @input="onNewPwdInput" max="20"></input-cell>
                <input-cell label="重复新密码" type="password" @input="onReNewPwdInput" max="20"></input-cell>
            </ul>
            <button class="btn" @click="onSubmit">完成</button>
        </main>
    </div>
</template>

<script>
    import inputCell from "../../components/inputCell.vue";
    import pageHeader from "../../components/pageHeader.vue";
    import { ajaxGet } from "../../util.js";
    import { MessageBox, Toast } from 'mint-ui';
    export default {
        components: {
            inputCell,
            pageHeader
        },
        data() {
            return {
                tel: "",
                newPwd: "",
                reNewPwd: ""
            }
        },
        mounted() {
            this.tel = this.$route.query.tel;
        },
        methods: {
            onNewPwdInput(value) {
                this.newPwd = value;
            },
            onReNewPwdInput(value){
                this.reNewPwd = value;
            },
            onSubmit() {
                this.validate() && this.postData();
            },
            postData() {
                let postData = {
                    phone: this.tel,
                    newPassword: this.newPwd
                }
                ajaxGet("password/step3", postData).then(data => {
                    if(data.status === "SUCCESS") {
                        MessageBox.alert("修改密码成功！");
                        this.$router.replace({
                            name: 'login/login',
                        });
                    } else {
                        Toast(data.msg);
                    }
                });
                this.$router.replace({
                    name: "home"
                })
            },
            validate() {
                let result = true;
                if(this.newPwd.trim() === "") {
                    Toast("新密码不能为空");
                    result = false;
                } else if (this.newPwd.trim() !== this.reNewPwd.trim()) {
                    Toast("两次新密码不一致");
                    result = false;
                } else if (this.newPwd.trim().length < 4 || this.reNewPwd.trim().length < 4) {
                    Toast("密码长度不能小于 4 位");
                    result = false;
                }
                return result;
            }
        }
    }
</script>

<style lang="less">
    @import "../../assets/less/cell-input";
</style>