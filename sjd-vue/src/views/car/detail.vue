<template>
    <div class="container car-detail">
        <page-header title="车辆详情" leftArrow="true" @leftClick="$router.go(-1)"></page-header>
        <main class="main">
            <div class="card">
                <p>
                    <i class="iconfont green-font">&#xe607;</i>
                </p>
                <p class="xbig-font green-font">审核成功</p>
                <p class="gray-font">行驶证通过</p>
            </div>
            <div class="card">
                <h3 class="xbig-font">{{brandName + seriesName}}({{carColor}})</h3>
                <p class="gray-font">{{carNo}}</p>
                <div class="hr"></div>
                <div class="list">
                    <div>
                        <span class="label">所在地</span>
                        <span class="text">{{cityName}}</span>
                    </div>
                    <div>
                        <span class="label">车主姓名</span>
                        <span class="text">{{driverName}}</span>
                    </div>
                    <div>
                        <span class="label">车辆注册日期</span>
                        <span class="text">{{regDate}}</span>
                    </div>
                </div>
            </div>
        </main>
        <footer class="footer">
            <button class="btn" @click="onDelBtnClick">删除此车</button>
        </footer>
    </div>
</template>
<script>
    import pageHeader from "../../components/page-header.vue";
    import { ajaxGet } from "../../util.js";
    import { MessageBox, Toast } from 'mint-ui';
    export default {
        components: {
            pageHeader
        },
        data() {
            return {
                carNo: "-",
                checkStatus: "待审核",
                seriesName: "",
                regDate: "-",
                cityName: "-",
                carColor: "-",
                brandName: "-",
                driverName: "-"
            }
        },
        mounted() {
            this.getData();
        },
        methods: {
            getData() {
                ajaxGet("driver/car/detail", {carId: this.$route.params.id}).then(data => {
                    let d = data.content;
                    this.carNo = d.carNo;
                    this.checkStatus = d.checkStatus;
                    this.seriesName = d.seriesName;
                    this.regDate = d.regDate;
                    this.cityName = d.cityName;
                    this.carColor = d.carColor;
                    this.brandName = d.brandName;
                    this.driverName = d.driverName;
                });
            },
            onDelBtnClick() {
                MessageBox.confirm("确定要删除这辆车？").then(() => {
                    ajaxGet("driver/car/delete", {carId: this.$route.params.id}).then(data => {
                        if(data.status === "SUCCESS") {
                            Toast("删除成功");
                            this.$router.go(-1);
                        } else {
                            Toast(data.msg);
                        }
                    });
                }, () => {});
            }
        }
    }
</script>