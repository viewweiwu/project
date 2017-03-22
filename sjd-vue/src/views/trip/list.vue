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
    import pageHeader from "../../components/page-header.vue";
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
            // let d = [{
            //     "startAddress": "北京首都机场2号航站楼", // 开始地址
            //     "amount": 112.5, //已支付 
            //     "sn": "201703038769614",//订单编号
            //     "time": "09:04", //时间
            //     "productMappingName": "接机", // 类型
            //     "endAddress": "北京火车站",//结束地址
            //     "date": "03-03",// 月日
            //     "orderStatus": "已派单" //订单状态 
            // },
            // {
            //     "startAddress": "中国农业银行(深圳梅龙支行)",
            //     "amount": 115.4,
            //     "sn": "201703034212514",
            //     "time": "08:53",
            //     "productMappingName": "送机",
            //     "endAddress": "深圳宝安国际机场新航站楼",
            //     "date": "03-02",
            //     "orderStatus": "待派单"
            // },{
            //     "startAddress": "中国农业银行(深圳梅龙支行)",
            //     "amount": 115.4,
            //     "sn": "201703034212514",
            //     "time": "08:53",
            //     "productMappingName": "送机",
            //     "endAddress": "深圳宝安国际机场新航站楼",
            //     "date": "03-01",
            //     "orderStatus": "待派单"
            // },{
            //     "startAddress": "中国农业银行(深圳梅龙支行)",
            //     "amount": 115.4,
            //     "sn": "201703034212514",
            //     "time": "08:53",
            //     "productMappingName": "送机",
            //     "endAddress": "深圳宝安国际机场新航站楼",
            //     "date": "03-02",
            //     "orderStatus": "待派单"
            // }];
            // this.list = this.filterList(d);
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