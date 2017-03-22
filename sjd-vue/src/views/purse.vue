<template>
    <div class="container purse">
        <page-header title="我的钱包" leftArrow="true" @leftClick="$router.go(-1)"></page-header>
        <main class="main">
            <div class="card card1">
                <p class="count green-font">{{over | currentcy}}</p>
                <p class="type"><i class="iconfont green-font">&#xe654;</i>已结算</p>
            </div>
            <div class="card card2">
                <p class="count orange-font">{{residual | currentcy}}</p>
                <p class="type"><i class="iconfont orange-font">&#xe654;</i>待结算</p>
            </div>
        </main>
    </div>
</template>
<script>
    import pageHeader from "../components/page-header.vue";
    import { ajaxGet, formatCurrency } from "../util.js";
    export default {
        components: {
            pageHeader
        },
        data() {
            return {
                over: 0,
                residual: 0
            }
        },
        mounted() {
            ajaxGet("driver/index/myWallet").then(data => {
                let d = data.content;
                this.over = d.hasSettled;
                this.residual = d.toBeSettled;
            });
        },
        filters: {
            currentcy(value) {
                return formatCurrency(value);
            }
        }
    }
</script>