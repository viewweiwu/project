<template>
    <div class="container car-list">
        <header class="header">
            <div class="left" @click="$router.go(-1)">
                <i class="iconfont">&#xe660;</i>
            </div>
            <div class="title">车辆列表</div>
            <div class="right"></div>
        </header>
        <main class="main">
            <div class="card-list">
                <div class="card">
                    <h2>别克·GL8(蓝色)</h2>
                    <h3>浙A·12345</h3>
                    <img src="../../assets/images/car.jpg" alt="">
                    <div class="hr"></div>
                    <p>
                        <i class="iconfont">&#xe654;</i>
                        当前车辆
                    </p>
                </div>
            </div>
        </main>
        <footer class="footer">
            <button class="btn" @click="onAddBtnClick">添加车辆</button>
        </footer>
    </div>
</template>

<script>
    export default {
        methods: {
            onAddBtnClick() {
                this.$router.push({
                    name: 'car/add'
                });
            }
        }
    }
</script>