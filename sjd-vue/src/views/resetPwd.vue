<template>
    <div class="container">
        <header class="header">
            <div class="left" @click="$router.go(-1)">
                <i class="iconfont">&#xe660;</i>
            </div>
            <div class="title">修改密码</div>
            <div class="right"></div>
        </header>
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
    export default {
        components: {
            inputCell
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