<template>
    <div class="container home">
        <main class="main">
            <div class="section">
                <div class="user">
                    <div class="info" @click="onInfoClick">
                        <span class="face"><i class="iconfont">&#xe602;</i></span>
                        <span class="name">{{username}}</span>
                    </div>
                    <div class="report" @click="onReportClick">
                        <div class="average orange-font">{{score | count}}</div>
                        <star :score="score"></star>
                    </div>
                </div>
                <ul class="cell-list">
                    <li @click="onTripClick">
                        <span class="left"><i class="iconfont big-font">&#xe8a1;</i></span>
                        <span class="center">我的行程</span>
                        <span class="right"><i class="iconfont">&#xe65f;</i></span>
                    </li>
                    <li @click="onPurseClick">
                        <span class="left"><i class="iconfont big-font">&#xe608;</i></span>
                        <span class="center">我的钱包</span>
                        <span class="right"><i class="iconfont">&#xe65f;</i></span>
                    </li>
                    <li @click="onCarClick">
                        <span class="left"><i class="iconfont big-font">&#xe609;</i></span>
                        <span class="center">我的车辆</span>
                        <span class="right"><i class="iconfont">&#xe65f;</i></span>
                    </li>
                </ul>
                <ul class="cell-list">
                    <li @click="onChangePwdClick">
                        <span class="left"><i class="iconfont big-font">&#xe653;</i></span>
                        <span class="center">修改密码</span>
                        <span class="right"><i class="iconfont">&#xe65f;</i></span>
                    </li>
                    <li @click="onLoginOutClick">
                        <span class="left"><i class="iconfont big-font">&#xe666;</i></span>
                        <span class="center red-font">退出登录</span>
                        <span class="right"><i class="iconfont">&#xe65f;</i></span>
                    </li>
                </ul>
            </div>
            <div :class="['layer', {open: isOpen}]" ref="layer">
                <div class="card-list">
                    <div class="card" v-for="(item, index) in order">
                        <div class="left">
                            <p>
                                <span class="label">出发地：</span>
                                <span class="text">{{item.startCityAddress}}</span>
                            </p>
                            <p>
                                <span class="label">目的地：</span>
                                <span class="text">{{item.endCityAddress}}</span>
                            </p>
                        </div>
                        <button class="btn" @click="onReceiveBtnClick(item.sn, index)">抢单</button>
                    </div>
                </div>            
            </div>
        </main>
        <footer class="footer">
            <div :class="['btn', {open: isOpen}]" @click="onBtnClick">
                <div class="range"></div>
                <div class="text">{{isOpen | toText}}</div>
            </div>
        </footer>
    </div>
</template>

<script>
    import pageHeader from "../components/pageHeader.vue";
    import star from "../components/star.vue";
    import { ajaxGet } from "../util.js";
    import { MessageBox, Toast } from 'mint-ui';
    export default {
        components: {
            pageHeader,
            star
        },
        data() {
            return {
                username: "-",
                isOpen: false,
                order: [],
                score: 0,
                timer: null,
                date: ""
            }
        },
        mounted() {
            this.getListenData();
            this.getInfoData();
        },
        methods: {
            starListen() {
                this.stopListen();
                this.timer = setInterval(() => {
                    this.getListenData();
                }, 1000);
            },
            stopListen() {
                if(this.timer != null) {
                    clearTimeout(this.timer);
                }
            },
            getListenData() {
                ajaxGet("driver/index/listen", {date: this.date}).then(data => {
                    let d = data.content;
                    this.isOpen = d.isNormal;
                    if(d.order) {
                        this.order.push(d.order[0]);
                        this.date = d.order[0].createDate;
                    }
                    if(this.timer === null && d.isNormal) {
                        this.starListen();
                    }
                });
            },
            getInfoData() {
                ajaxGet("driver/index").then(data => {
                    let d = data.content;
                    this.username = d.driverName;
                    this.score = d.score.average;
                });
            },
            onBtnClick() {
                ajaxGet("driver/index/startOrder").then(data => {
                    this.isOpen = data.content;
                    if(this.isOpen) {
                        this.starListen();
                    } else {
                        this.stopListen();
                    }
                });
            },
            onReceiveBtnClick(sn, index) {
                ajaxGet("driver/order/receive/" + sn).then(data => {
                    if(data.status === "SUCCESS") {
                        Toast("抢单成功！");
                        this.stopListen();
                        this.$router.push({
                            name: 'trip/detail',
                            params: {
                                sn: sn
                            }
                        });
                    } else {
                        Toast(data.msg);
                    }
                });
            },
            onInfoClick() {
                this.stopListen();
                this.$router.push({
                    name: 'user/info'
                });
            },
            onReportClick() {
                this.stopListen();
                this.$router.push({
                    name: 'user/report'
                });
            },
            onTripClick() {
                this.stopListen();
                this.$router.push({
                    name: 'trip/list'
                });
            },
            onPurseClick() {
                this.stopListen();
                this.$router.push({
                    name: 'purse'
                });
            },
            onCarClick() {
                this.stopListen();
                this.$router.push({
                    name: 'car/list'
                });
            },
            onChangePwdClick() {
                this.stopListen();
                this.$router.push({
                    name: 'resetPwd'
                });
            },
            onLoginOutClick() {
                MessageBox.confirm("确定要退出登录？").then(() => {
                    ajaxGet("unbind").then(() => {
                        this.$router.push({
                            name: 'login/login'
                        });
                        this.stopListen();
                    })
                }, () => {});
            },
            onRegisterClick() {
                this.$router.push({
                    name: 'login/register'
                });
                this.stopListen();
            }
        },
        filters: {
            toText(value) {
                if(value) {
                    return "听单中"
                } else {
                    return "开始听单"
                }
            },
            count(value) {
                return value.toFixed(2);
            }
        }
    }
</script>