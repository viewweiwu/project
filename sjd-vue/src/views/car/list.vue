<template>
    <div class="container">
        <header class="header">
            <div class="left" @click="$router.go(-1)">
                <i class="iconfont">&#xe660;</i>
            </div>
            <div class="title">车辆列表</div>
            <div class="right"></div>
        </header>
        <button class="btn" @click="onAddBtnClick">添加车辆</button>
    </div>
</template>

<script>
    export default {
        methods: {
            onAddBtnClick() {
                this.$router.push({
                    name: 'car/add'
                });
            }
        }
    }
</script>