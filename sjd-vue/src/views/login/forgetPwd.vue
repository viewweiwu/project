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
                this.$router.push({
                    name: "login/forgetPwd2"
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