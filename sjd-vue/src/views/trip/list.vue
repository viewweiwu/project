<template>
    <div class="container trip-list">
        <page-header title="行程列表" leftArrow="true" @leftClick="$router.go(-1)"></page-header>
        <main class="main">
            <ul class="load-pnl" v-infinite-scroll="loadData" infinite-scroll-disabled="isLoading" infinite-scroll-distance="50">
                <li class="card-list" v-for="d in filterList">
                    <h3>{{d[0]}}</h3>
                    <div class="card" v-for="item in d[1]" @click="onCardClick(item.sn)">
                        <header class="header">
                            <span class="type">快</span>
                            <time class="time">{{item.date + " " + item.time}}</time>
                            <span class="state">{{item.orderStatus}}</span>
                            <span class="price">{{item.amount | currentcy}}</span>
                        </header> 
                        <p class="from">{{item.startAddress}}</p>
                        <p class="to">{{item.endAddress}}</p>
                        <div class="tag">
                            <span>{{item.productMappingName}}</span>
                        </div>
                    </div>
                </li>
                <loading v-show="isLoading"></loading>
                <empty v-show="isEmpty"></empty>
            </ul>
        </main>
    </div>
</template>
<script>
    import pageHeader from "../../components/pageHeader.vue";
    import loading from "../../components/loading.vue";
    import empty from "../../components/empty.vue";
    import { ajaxGet, formatCurrency } from "../../util.js";
    import { InfiniteScroll } from 'mint-ui';
    import Vue from "vue";
    Vue.use(InfiniteScroll);

    export default {
        components: {
            pageHeader,
            loading,
            empty
        },
        data() {
            return {
                isLoading: false,
                page: 0,
                total: 1,
                list: []
            }
        },
        mounted() {
            this.loadData();
        },
        methods: {
            onCardClick(sn) {
                this.$router.push({
                    name: 'trip/detail',
                    params: {
                        sn: sn
                    }
                });
            },
            loadData() {
                this.isLoading = true;
                this.page ++;
                ajaxGet("driver/order/list", {pageSize: 10, pageNumber: this.page}).then(data => {
                    let d = data.content;
                    this.list = this.list.concat(d.data);
                    this.page = d.pageNumber;
                    this.total = d.total;
                    this.isLoading = false;
                });
            },
            sortList(list) {
                let result = [];
                let hash = {};
                list.forEach(obj => {
                    if(hash[obj.date]) {
                        hash[obj.date].push(obj);
                    } else {
                        hash[obj.date] = [obj];
                    }
                });
                
                return Object.entries(hash);
            }
        },
        filters: {
            currentcy(value) {
                return formatCurrency(value);
            }
        },
        computed: {
            filterList() {
                return this.sortList(this.list);
            },
            isEmpty() {
                if(!this.isLoading && this.list.length == 0) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    }
</script>