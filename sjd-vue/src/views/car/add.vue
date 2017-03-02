<template>
    <div class="container">
        <header class="header">
            <div class="left" @click="$router.go(-1)">
                <i class="iconfont">&#xe660;</i>
            </div>
            <div class="title">添加车辆</div>
            <div class="right"></div>
        </header>

        <main>
            <ul class="cell-list">
                <li>车牌号</li>
                <li @click="onCarTypeBtnClick">车型</li>
                <li>注册时间</li>
            </ul>
            <button class="btn">确定</button>
        </main>
    </div>
</template>
<script>
    export default {
        methods: {
            onCarTypeBtnClick() {
                this.$router.push({
                    name: 'car/select'
                });
            }
        }
    }
</script>