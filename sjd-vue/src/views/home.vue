<template>
    <div class="container home">
        <main class="main">
            <div class="user">
                <div class="info" @click="onInfoClick">
                    <span class="face"><i class="iconfont">&#xe602;</i></span>
                    <span class="name">司机名字</span>
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
    import pageHeader from "../components/page-header.vue";
    import star from "../components/star.vue";
    import { MessageBox } from 'mint-ui';
    export default {
        components: {
            pageHeader,
            star
        },
        data() {
            return {
                isOpen: false,
                score: 4.5
            }
        },
        methods: {
            onBtnClick() {
                this.isOpen = !this.isOpen;
            },
            onInfoClick() {
                this.$router.push({
                    name: 'user/info'
                });
            },
            onReportClick() {
                this.$router.push({
                    name: 'user/report'
                });
            },
            onTripClick() {
                this.$router.push({
                    name: 'trip/list'
                });
            },
            onPurseClick() {
                this.$router.push({
                    name: 'purse'
                });
            },
            onCarClick() {
                this.$router.push({
                    name: 'car/list'
                });
            },
            onChangePwdClick() {
                this.$router.push({
                    name: 'resetPwd'
                });
            },
            onLoginOutClick() {
                MessageBox.confirm("确定要退出登录？").then(() => {
                    this.$router.push({
                        name: 'login/login'
                    });
                }, () => {});
            },
            onRegisterClick() {
                this.$router.push({
                    name: 'login/register'
                });
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