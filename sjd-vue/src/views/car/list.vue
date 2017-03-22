<template>
    <div class="container car-list">
        <page-header title="车辆列表" leftArrow="true" @leftClick="$router.go(-1)"></page-header>
        <main class="main">
            <div class="card-list">
                <div class="card" v-for="(item, index) in list" @click="onCardClick(item.carId)">
                    <h3 class="xbig-font">{{item.brandName + item.seriesName}}({{item.carColor}})</h3>
                    <p class="gray-font big-font">{{item.carNo}}</p>
                    <img src="../../assets/images/car.jpg" alt="">
                    <div class="hr"></div>
                    <p class="left-font orange-font xbig-font" v-if="item.isDefault">
                        <i class="iconfont">&#xe721;</i>
                        当前车辆
                    </p>
                    <p class="left-font xbig-font" @click.stop="onSelect(index, item.carId)" v-else>
                        <i class="iconfont">&#xe720;</i>
                        设置为默认车辆
                    </p>
                </div>
            </div>
            <loading v-show="isLoading"></loading>
            <empty v-show="isEmpty"></empty>
        </main>
        <footer class="footer">
            <button class="btn" @click="onAddBtnClick">添加车辆</button>
        </footer>
    </div>
</template>

<script>
    import pageHeader from "../../components/page-header.vue";
    import loading from "../../components/loading.vue";
    import empty from "../../components/empty.vue";
    import { ajaxGet } from "../../util.js";
    import { MessageBox, Toast } from 'mint-ui';
    export default {
        components: {
            pageHeader,
            loading,
            empty
        },
        data() {
            return {
                isLoading: true,
                list: []
            }
        },
        mounted() {
            this.loadData();
        },
        methods: {
            loadData() {
                this.isLoading = true;
                ajaxGet("driver/car/page").then(data => {
                    this.list = data.content;
                    this.isLoading = false;
                });
            },
            onSelect(index, carId) {
                ajaxGet("driver/car/default", {
                    carId: carId
                }).then(data => {
                    if(data.status === "SUCCESS") {
                        Toast("设置默认车辆成功");
                        this.list.forEach((obj, i) => {
                            if(i == index) {
                                obj.isDefault = true;
                            } else {
                                obj.isDefault = false;
                            }
                        });
                    } else {
                        Toast(data.msg);
                    }
                });
            },
            onCardClick(id) {
                this.$router.push({
                    name: 'car/detail',
                    params: {
                        id: id 
                    }
                });
            },
            onAddBtnClick() {
                this.$router.push({
                    name: 'car/add'
                });
            }
        },
        computed: {
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