<template>
    <div class="container">
        <page-header title="输入验证码" leftArrow="true" @leftClick="$router.go(-1)"></page-header>
        <main class="main">
            <ul class="cell-list cell-input">
                <input-cell label="验证码" type="text" @input="onCodeInput" max="4"></input-cell>
            </ul>
            <button class="btn" @click="onSubmit">下一步</button>
        </main>
    </div>
</template>

<script>
    import inputCell from "../../components/inputCell.vue";
    import pageHeader from "../../components/pageHeader.vue";
    import { ajaxGet } from "../../util.js";
    import { Toast } from 'mint-ui';
    export default {
        components: {
            inputCell,
            pageHeader
        },
        data() {
            return {
                tel: "",
                code: ""
            }
        },
        mounted() {
            this.tel = this.$route.query.tel;
        },
        methods: {
            onCodeInput(value) {
                this.code = value;
            },
            onSubmit() {
                this.postData();
            },
            postData() {
                let postData = {
                    phone: this.tel,
                    vcode: this.code
                }
                ajaxGet("password/step2", postData).then(data => {
                    if(data.status === "SUCCESS") {
                        this.$router.push({
                            name: "login/forgetPwd3",
                            query: {
                                tel: this.tel
                            }
                        })
                        Toast("验证码验证成功");
                    } else {
                        Toast(data.msg);
                    }
                });
            }
        }
    }
</script>

<style lang="less">
    @import "../../assets/less/cell-input";
</style>