<template>
    <div class="container purse">
        <page-header title="我的钱包" leftArrow="true" @leftClick="$router.go(-1)"></page-header>
        <main class="main">
            <div class="card card1">
                <div class="count">
                    <span class="green-font">23.00</span>
                </div>
                <div class="type"><i class="iconfont green-font">&#xe654;</i>已结算</div>
            </div>
            <div class="card card2">
                <div class="count">
                    <span class="orange-font">23.00</span>
                </div>
                <div class="type"><i class="iconfont orange-font">&#xe604;</i>待结算</div>
            </div>
        </main>
    </div>
</template>
<script>
    import pageHeader from "../components/page-header.vue";
    export default {
        components: {
            pageHeader
        }
    }
</script>