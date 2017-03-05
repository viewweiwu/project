<template>
    <div class="container">
        <header class="header">
            <div class="left" @click="$router.go(-1)">
                <i class="iconfont">&#xe660;</i>
            </div>
            <div class="title">输入验证码</div>
            <div class="right"></div>
        </header>
        <main class="main">
            <ul class="cell-list cell-input">
                <input-cell label="验证码" type="text" @input="onIdCardInput" max="4"></input-cell>
            </ul>
            <button class="btn" @click="onSubmitBtnClick">下一步</button>
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
                this.$router.push({
                    name: "login/forgetPwd3"
                })
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