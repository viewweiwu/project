<template>
    <div class="container">
        <header class="header">
            <div class="left" @click="$router.go(-1)">
                <i class="iconfont">&#xe660;</i>
            </div>
            <div class="title">添加车型</div>
            <div class="right"></div>
        </header>
        <main>
            <ul class="cell-list cell-input">
                <input-cell label="品牌" type="text" @input="onBrandInput" max="20"></input-cell>
                <input-cell label="型号" type="text" @input="onTypeInput" max="20"></input-cell>
            </ul>
            <button class="btn" @click="onSubmitBtnClick">确定</button>
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
                brand: "",
                type: ""
            }
        },
        methods: {
            onBrandInput(value) {
                this.brand = value;
            },
            onTypeInput(value) {
                this.type = type;
            },
            onSubmitBtnClick() {
                this.$router.go(-2);
            }
        }
    }
</script>
<style lang="less">
    @import "../../assets/less/cell-input";
</style>