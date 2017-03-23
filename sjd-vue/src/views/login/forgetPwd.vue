<template>
    <div class="container">
        <page-header title="验证身份" leftArrow="true" @leftClick="$router.go(-1)"></page-header>
        <main class="main">
            <ul class="cell-list cell-input">
                <input-cell label="手机" type="text" :default="tel" @input="onTelInput" max="11"></input-cell>
                <input-cell label="身份证" type="text" :default="idCard" @input="onIdCardInput" max="20"></input-cell>
            </ul>
            <button class="btn" @click="onSubmit">下一步</button>
        </main>
    </div>
</template>

<script>
    import inputCell from "../../components/inputCell.vue";
    import pageHeader from "../../components/pageHeader.vue";
    import { ajaxGet, telReg, idCardReg } from "../../util.js";
    import { Toast } from 'mint-ui';
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
            onSubmit() {
                this.validate() && this.postData();
            },
            postData() {
                ajaxGet("password/step1", {
                    phone: this.tel,
                    idCard: this.idCard
                }).then(data => {
                    if(data.status === "SUCCESS" || data.status === "VALIDATE_CODE_NO_INVALID") {
                        this.$router.push({
                            name: "login/forgetPwd2",
                            query: {
                                tel: this.tel
                            }
                        })
                        if(data.status === "VALIDATE_CODE_NO_INVALID") {
                            Toast(data.msg);
                        } else {
                            Toast("发送验证码成功");
                        }
                    } else {
                        Toast(data.msg);
                    }
                });
            },
            validate() {
                let result = true;
                if(!telReg.test(this.tel.trim())) {
                    Toast("请输入正确的手机号");
                    result = false;
                } else if (!idCardReg.test(this.idCard.trim())) {
                    Toast("请输入正确的身份证号");
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