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
                    <span class="face"><i class="iconfont">&#xe606;</i></span>
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
                    <span class="left"><i class="iconfont">&#xe6c0;</i></span>
                    <span class="center">我的行程</span>
                    <span class="right"><i class="iconfont">&#xe65f;</i></span>
                </li>
                <li @click="onPurseClick">
                    <span class="left"><i class="iconfont">&#xe6c0;</i></span>
                    <span class="center">我的钱包</span>
                    <span class="right"><i class="iconfont">&#xe65f;</i></span>
                </li>
                <li @click="onCarClick">
                    <span class="left"><i class="iconfont">&#xe6c0;</i></span>
                    <span class="center">我的车辆</span>
                    <span class="right"><i class="iconfont">&#xe65f;</i></span>
                </li>
            </ul>
            <ul class="cell-list">
                <li @click="onChangePwdClick">
                    <span class="left"><i class="iconfont">&#xe6c0;</i></span>
                    <span class="center">修改密码</span>
                    <span class="right"><i class="iconfont">&#xe65f;</i></span>
                </li>
                <li @click="onLoginOutClick">
                    <span class="left"><i class="iconfont">&#xe6c0;</i></span>
                    <span class="center red-font">退出登录</span>
                    <span class="right"><i class="iconfont">&#xe65f;</i></span>
                </li>
                <li @click="onRegisterClick">
                    <span class="left"><i class="iconfont">&#xe6c0;</i></span>
                    <span class="center red-font">注册</span>
                    <span class="right"><i class="iconfont">&#xe65f;</i></span>
                </li>
            </ul>
            
        </main>
        <footer class="footer">
            <button class="btn">开始听单</button>
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
                    name: 'changePwd'
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