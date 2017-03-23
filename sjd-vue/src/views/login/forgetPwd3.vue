<template>
    <div class="container">
        <page-header title="输入新密码" leftArrow="true" @leftClick="$router.go(-1)"></page-header>
        <main class="main">
            <ul class="cell-list cell-input">
                <input-cell label="新密码" type="password" @input="onPasswordInput" max="4"></input-cell>
            </ul>
            <button class="btn" @click="onSubmitBtnClick">完成</button>
        </main>
    </div>
</template>

<script>
    import inputCell from "../../components/inputCell.vue";
    import pageHeader from "../../components/pageHeader.vue";
    export default {
        components: {
            inputCell,
            pageHeader
        },
        data() {
            return {
                password: ""
            }
        },
        methods: {
            onPasswordInput(value) {
                this.password = value;
            },
            onSubmitBtnClick() {
                this.$router.push({
                    name: "home"
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