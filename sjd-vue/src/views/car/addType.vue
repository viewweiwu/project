<template>
    <div class="container">
        <page-header title="申请新增车型" leftArrow="true" @leftClick="$router.go(-1)"></page-header>
        <main>
            <div class="tip">
                <p>请准确填写您爱车的品牌和车型</p>
                <p>以方便通过审核</p>
            </div>
            <ul class="cell-list cell-input">
                <input-cell label="品牌" placeholder="例：大众" type="text" @input="onBrandInput" max="20"></input-cell>
                <input-cell label="型号" placeholder="例：帕萨特" type="text" @input="onTypeInput" max="20"></input-cell>
            </ul>
            <button class="btn" @click="onSubmitBtnClick">提交申请</button>
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
                brand: "",
                type: ""
            }
        },
        methods: {
            onBrandInput(value) {
                this.brand = value;
            },
            onTypeInput(value) {
                this.type = value;
            },
            onSubmitBtnClick() {
                this.$router.go(-2);
            }
        }
    }
</script>
<style lang="less">
    @import "../../assets/less/cell-input";
    .tip {
        margin: @space * 2;
        color: @font-gray;
        text-align: center;
    }
</style>