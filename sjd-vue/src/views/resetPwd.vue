<template>
    <div class="container">
        <page-header title="修改密码" leftArrow="true" @leftClick="$router.go(-1)"></page-header>
        <main>
            <ul class="cell-list cell-input">
                <input-cell label="原密码" type="text" @input="onOldPwdInput" max="20"></input-cell>
                <input-cell label="新密码" type="text" @input="onNewPwdInput" max="20"></input-cell>
                <input-cell label="重复新密码" placeholder="再输入一次新密码" type="text" @input="onReNewPwdInput" max="20"></input-cell>
            </ul>
            <button class="btn" @click="onSubmit">确定</button>
        </main>
    </div>
</template>

<script>
    import inputCell from "../components/inputCell.vue";
    import pageHeader from "../components/pageHeader.vue";
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
                newPwd: "",
                reNewPwd: ""
            }
        },
        methods: {
            onSubmit() {
                if(this.validate()) {
                    ajaxPost("driver/password/modify", {
                        oldPassword: this.oldPwd,
                        newPassword: this.newPwd
                    }).then(data => {
                        if(data.status === "SUCCESS") {
                            // this.$router.go(-1);
                            Toast("修改密码成功");
                        } else {
                            this.toast(data.msg);
                        }
                    });
                }
            },
            toast(msg) {
                Toast({
                    message: msg,
                    position: 'middle',
                    duration: 3000
                });
            },
            validate() {
                let result = true;
                if(this.oldPwd.trim() === "") {
                    this.toast("原密码不能为空");
                    result = false;
                } else if (this.newPwd.trim() === "") {
                    this.toast("新密码不能为空");
                    result = false;
                } else if (this.newPwd.trim() !== this.reNewPwd.trim()) {
                    this.toast("两次新密码不一致");
                    result = false;
                } else if (this.oldPwd.trim().length < 4 || this.newPwd.trim().length < 4 || this.reNewPwd.trim().length < 4) {
                    this.toast("密码长度不能小于 4 位");
                    result = false;
                }
                return result;
            },
            onOldPwdInput(value) {
                this.oldPwd = value;
            },
            onNewPwdInput(value) {
                this.newPwd = value;
            },
            onReNewPwdInput(value) {
                this.reNewPwd = value;
            }
        }
    }
</script>

<style lang="less">
    @import "../assets/less/cell-input";
</style>