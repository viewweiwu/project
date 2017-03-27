<template>
    <div class="container trip-detail">
        <page-header title="订单详情" leftArrow="true" @leftClick="$router.go(-1)"></page-header>
        <main :class="['main', {'no-footer': !hasBtn}]">
            <div class="card-list">
                <h3 class="green">订单信息</h3>
                <div class="card">
                    <p>
                        <span class="label">同程订单号:</span>
                        <span class="text">{{d.tcOrderId | empty}}</span>
                    </p>
                    <p>
                        <span class="label">航班号:</span>
                        <span class="text">{{d.flt | empty}}</span>
                    </p>
                    <p>
                        <span class="label">预估价:</span>
                        <span class="text">{{d.amount | empty | currentcy}}</span>
                    </p>
                    <p>
                        <span class="label">出发地:</span>
                        <span class="text">{{d.startAddress | empty}}</span>
                    </p>
                    <p>
                        <span class="label">目的地:</span>
                        <span class="text">{{d.endAddress | empty}}</span>
                    </p>
                    <p>
                        <span class="label">出发时间:</span>
                        <span class="text">{{d.departureTime | empty}}</span>
                    </p>
                    <p>
                        <span class="label">代理商:</span>
                        <span class="text">{{d.agentName | empty}}</span>
                    </p>
                    <p>
                        <span class="label">订单状态:</span>
                        <span class="text big-font orange-font">{{d.orderStatus | empty}}</span>
                    </p>
                </div>
                <h3>司机信息</h3>
                <div class="card">
                    <p>
                        <span class="label">司机:</span>
                        <span class="text">{{d.driverName | empty}}</span>
                    </p>
                </div>
                <h3>乘客信息</h3>
                <div class="card">
                    <p>
                        <span class="label">乘客:</span>
                        <span class="text">{{d.passengerName | empty}}</span>
                    </p>
                    <p>
                        <span class="label">手机:</span>
                        <span class="text">{{d.passengerMobile | empty}}</span>
                    </p>
                </div>
            </div>
        </main>
        <footer class="footer" v-if="hasBtn" v-show="d.orderStatusEN === 'DRIVER_RECEIVE'">
            <button class="btn" @click="onBtnClick">司机就位</button>
        </footer>
        <footer class="footer" v-if="hasBtn" v-show="d.orderStatusEN === 'DRIVER_REACH'">
            <button class="btn" @click="onBtnClick">开始行程</button>
        </footer>
        <footer class="footer" v-if="hasBtn" v-show="d.orderStatusEN === 'DRIVERING'">
            <button class="btn" @click="onBtnClick">进入导航</button>
        </footer>
        <footer class="footer" v-if="hasBtn" v-show="false">
            <button class="btn" @click="onBtnClick">完成订单</button>
        </footer>
    </div>
</template>
<script>
    import pageHeader from "../../components/pageHeader.vue";
    import { ajaxGet, formatCurrency } from "../../util.js";
    import { MessageBox, Toast } from 'mint-ui';
    export default {
        components: {
            pageHeader
        },
        data() {
            return {
                sn: "",
                d: {}
            }
        },
        mounted() {
            this.sn = this.$route.params.sn;
            this.getData();
        },
        methods: {
            getData() {
                ajaxGet("driver/order/detail/" + this.sn).then(data => this.d = data.content);
            },
            onBtnClick() {
                if(this.d.orderStatusEN === 'DRIVER_RECEIVE') {
                    this.receive();
                } else if (this.d.orderStatusEN === 'DRIVER_REACH') {
                    this.reach();
                } else if (this.d.orderStatusEN === 'DRIVERING') {
                    this.drivering();
                }
            },
            receive() {
                MessageBox.confirm('已经就位?').then(action => {
                    ajaxGet('driver/order/driverReady/' + this.sn).then(data => {
                        if(data.status === 'SUCCESS') {
                            Toast("司机已就位");
                            this.getData();
                        } else {
                            Toast(data.msg);
                        }
                    });
                }, () => {});
            },
            reach() {
                MessageBox.confirm('是否要开始行程?').then(action => {
                    ajaxGet('driver/order/driving/' + this.sn).then(data => {
                        if(data.status === 'SUCCESS') {
                            MessageBox.alert('已经开始行程，请点击下方【进入导航】按钮，开始导航。');
                            this.getData();
                        } else {
                            MessageBox.alert('操作成功');
                        }
                    })
                }, () => {});
            },
            drivering() {
                this.$router.push({
                    name: "trip/map",
                    query: {
                        startLng: this.d.startLng,
                        startLat: this.d.startLat,
                        endLng: this.d.endLng,
                        endLat: this.d.endLat,
                        sn: this.sn
                    }
                });
            }
        },
        computed: {
            hasBtn() {
                let hash = {
                    "DRIVER_RECEIVE": true,
                    "DRIVER_REACH": true,
                    "DRIVERING": true
                }
                return hash[this.d.orderStatusEN];
            }
        },
        filters: {
            empty(value) {
                return value || "-";
            },
            currentcy(value) {
                return formatCurrency(value);
            }
        }
    }
</script>