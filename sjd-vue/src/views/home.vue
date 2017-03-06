<template>
    <div class="container home">
        <header class="header">
            <div class="left"></div>
            <div class="title">首页</div>
            <div class="right"></div>
        </header>
        <main class="main">
            <div class="user">
                <div class="info">
                    <span class="face"><i class="iconfont">&#xe602;</i></span>
                    <span class="name">司机名字</span>
                </div>
                <div class="report">
                    <div>
                        <p class="score">80</p>
                        <p class="text">服务分</p>
                    </div>
                    <div>
                        <p class="score">4.94</p>
                        <p class="text">评价星级</p>
                    </div>
                </div>
            </div>
            <ul class="cell-list">
                <li @click="onTripClick">
                    <span class="left"><i class="iconfont big-font">&#xe8a1;</i></span>
                    <span class="center">我的行程<span class="count">23</span></span>
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
            <div class="btn">开始听单</div>
        </footer>
    </div>
</template>

<script>
    export default {
        methods: {
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
                this.$router.push({
                    name: 'login/login'
                });
            },
            onRegisterClick() {
                this.$router.push({
                    name: 'login/register'
                });
            }
        }
    }
</script>