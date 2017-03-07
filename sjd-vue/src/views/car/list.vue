<template>
    <div class="container car-list">
        <page-header title="车辆列表" leftArrow="true" @leftClick="$router.go(-1)"></page-header>
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
    import pageHeader from "../../components/page-header.vue";
    export default {
        components: {
            pageHeader
        },
        methods: {
            onAddBtnClick() {
                this.$router.push({
                    name: 'car/add'
                });
            }
        }
    }
</script>