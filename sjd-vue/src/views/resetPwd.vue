<template>
    <div class="container">
        <page-header title="修改密码" leftArrow="true" @leftClick="$router.go(-1)"></page-header>
        <main>
            <ul class="cell-list cell-input">
                <input-cell label="旧密码" type="text" @input="onOldPwdInput" max="20"></input-cell>
                <input-cell label="新密码" type="text" @input="onNewPwdInput" max="20"></input-cell>
            </ul>
            <button class="btn">确定</button>
        </main>
    </div>
</template>

<script>
    import inputCell from "../components/inputCell.vue";
    import pageHeader from "../components/page-header.vue";
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