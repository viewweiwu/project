<template>
    <div class="container purse">
        <page-header title="我的钱包" leftArrow="true" @leftClick="$router.go(-1)"></page-header>
        <main class="main">
            <ul class="cell-list">
                <li>
                    <span class="left"><i class="iconfont">&#xe604;</i></span>
                    <span class="center">余额<span class="count orange-font">23.00</span><span class="orange-font">元</span></span>
                </li>
            </ul>
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