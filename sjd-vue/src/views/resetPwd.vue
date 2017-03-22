<template>
    <div class="container">
        <page-header title="修改密码" leftArrow="true" @leftClick="$router.go(-1)"></page-header>
        <main>
            <ul class="cell-list cell-input">
                <input-cell label="原密码" type="text" @input="onOldPwdInput" max="20"></input-cell>
                <input-cell label="新密码" type="text" @input="onNewPwdInput" max="20"></input-cell>
            </ul>
            <button class="btn" @click="onSubmit">确定</button>
        </main>
    </div>
</template>

<script>
    import inputCell from "../components/inputCell.vue";
    import pageHeader from "../components/page-header.vue";
    import { Toast } from 'mint-ui';
    import { ajaxPost } from "../util.js";
    export default {
        components: {
            inputCell,
            pageHeader
        },
        data() {
            return {
                oldPwd: "",
                newPwd: ""
            }
        },
        methods: {
            onSubmit() {
                if(this.validate()) {
                        this.toast("密码不能为空");
                    return;
                }
                ajaxPost("driver/password/modify", {
                    oldPassword: this.oldPwd,
                    newPassword: this.newPwd
                }).then(data => {
                    if(data.status === "SUCCESS") {
                        this.$router.go(-1);
                        Toast("修改密码成功");
                    } else {
                        this.toast(data.msg);
                    }
                });
            },
            toast(msg) {
                Toast({
                    message: msg,
                    position: 'middle',
                    duration: 3000
                });
            },
            validate() {
                return this.oldPwd.trim() === "" || this.newPwd.trim() === "";
            },
            onOldPwdInput(value) {
                this.oldPwd = value;
            },
            onNewPwdInput(value) {
                this.newPwd = value;
            }
        }
    }
</script>

<style lang="less">
    @import "../assets/less/cell-input";
</style>