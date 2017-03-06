<template>
    <div class="container trip-detail">
        <header class="header">
            <div class="left" @click="$router.go(-1)">
                <i class="iconfont">&#xe660;</i>
            </div>
            <div class="title">订单详情</div>
            <div class="right"></div>
        </header>
        <main class="main">
            <div class="card-list">
                <h3 class="green">订单信息</h3>
                <div class="card">
                    <p>
                        <span class="label">出发地:</span>
                        <span class="text">浙江温州</span>
                    </p>
                    <p>
                        <span class="label">目的地:</span>
                        <span class="text">浙江杭州</span>
                    </p>
                </div>
                <h3>司机信息</h3>
                <div class="card">
                    <p>
                        <span class="label">司机:</span>
                        <span class="text">路人甲</span>
                    </p>
                </div>
                <h3>乘客信息</h3>
                <div class="card">
                    <p>
                        <span class="label">乘客:</span>
                        <span class="text">路人乙</span>
                    </p>
                </div>
            </div>
        </main>
    </div>
</template>
<script>
    export default {
        data() {
            return {

            }
        },
        methods: {
            onCardClick() {
                
            }
        }
    }
</script>