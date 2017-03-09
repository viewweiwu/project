<template>
    <div class="container car-list">
        <page-header title="车辆列表" leftArrow="true" @leftClick="$router.go(-1)"></page-header>
        <main class="main">
            <div class="card-list">
                <div class="card" v-for="(item, index) in list" @click="onCardClick">
                    <h3 class="xbig-font">{{item.name}}({{item.color}})</h3>
                    <p class="gray-font big-font">{{item.plate}}</p>
                    <img src="../../assets/images/car.jpg" alt="">
                    <div class="hr"></div>
                    <p class="left-font orange-font xbig-font" v-if="item.isOpen">
                        <i class="iconfont">&#xe721;</i>
                        当前车辆
                    </p>
                    <p class="left-font xbig-font" @click.stop="onSelect(index)" v-else>
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
    import { MessageBox } from 'mint-ui';
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
                setTimeout(() => {
                    this.list.push({
                        name: "别克XXXXX",
                        color: "蓝色",
                        plate: "浙A·12345",
                        isOpen: true
                    },{
                        name: "别克XXXXX",
                        color: "蓝色",
                        plate: "浙A·12345",
                        isOpen: false
                    });
                    this.isLoading = false;
                }, 300);
            },
            onSelect(index) {
                this.list.forEach((obj, i) => {
                    if(i == index) {
                        obj.isOpen = true;
                    } else {
                        obj.isOpen = false;
                    }
                });
                this.postData();
            },
            postData() {
                alert("postData");
            },
            onCardClick() {
                this.$router.push({
                    name: 'car/detail'
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