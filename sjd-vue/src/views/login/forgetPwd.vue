<template>
    <div class="container">
        <page-header title="验证身份" leftArrow="true" @leftClick="$router.go(-1)"></page-header>
        <main class="main">
            <ul class="cell-list cell-input">
                <input-cell label="手机" type="text" @input="onTelInput" max="20"></input-cell>
                <input-cell label="身份证" type="text" @input="onIdCardInput" max="20"></input-cell>
            </ul>
            <button class="btn" @click="onSubmitBtnClick">下一步</button>
        </main>
    </div>
</template>

<script>
    import inputCell from "../../components/inputCell.vue";
    import pageHeader from "../../components/page-header.vue";
    import { ajaxGet } from "../../util.js";
    export default {
        components: {
            inputCell,
            pageHeader
        },
        data() {
            return {
                tel: "",
                idCard: ""
            }
        },
        methods: {
            onTelInput(value) {
                this.tel = value;
            },
            onIdCardInput(value) {
                this.idCard = value;
            },
            onSubmitBtnClick() {
                ajaxGet("password/step1", {
                    phone: this.tel,
                    idCard: this.idCard
                }).then(data => {
                    if(data.status === "SUCCESS") {
                        this.$router.push({
                            name: "login/forgetPwd2"
                        })
                        Toast("发送验证码成功");
                    } else {
                        this.toast(data.msg);
                    }
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
</style>