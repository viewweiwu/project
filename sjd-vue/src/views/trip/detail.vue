<template>
    <div class="container trip-list">
        <header class="header">
            <div class="left" @click="$router.go(-1)">
                <i class="iconfont">&#xe660;</i>
            </div>
            <div class="title">订单详情</div>
            <div class="right"></div>
        </header>
        <main class="main">
            <div class="card-list">
                <h3>02月13日</h3>
                <div class="card" @click="onCardClick">
                    <header class="header">
                        <span class="type">快</span>
                        <time class="time">02:33</time>
                        <span class="state">已支付</span>
                        <span class="price">￥22</span>
                    </header> 
                    <p class="from">浙江杭州</p>
                    <p class="to">北京王府井</p>
                    <div class="tag">
                        <span>接机</span>
                    </div>
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