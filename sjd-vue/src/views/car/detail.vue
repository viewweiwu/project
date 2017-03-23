<template>
    <div class="container car-detail">
        <page-header title="车辆详情" leftArrow="true" @leftClick="$router.go(-1)"></page-header>
        <main class="main">
            <div class="card" v-if="d.checkStatus === 'NORMAL'">
                <p>
                    <i class="iconfont green-font">&#xe607;</i>
                </p>
                <p class="xbig-font green-font">审核通过</p>
                <p class="gray-font">恭喜您，该车通过了审核！</p>
            </div>
            <div class="card" v-if="d.checkStatus === 'WAIT'">
                <p>
                    <i class="iconfont orange-font">&#xe682;</i>
                </p>
                <p class="xbig-font orange-font">正在审核</p>
                <p class="gray-font">该车正在审核中...</p>
            </div>
            <div class="card" v-if="d.checkStatus === 'FAIL'">
                <p>
                    <i class="iconfont red-font">&#xe630;</i>
                </p>
                <p class="xbig-font red-font">审核失败</p>
                <p class="gray-font">理由：{{d.checkReason | empty}}</p>
                <p class="gray-font">抱歉，该车没有通过审核。</p>
            </div>
            <div class="card">
                <h3 class="xbig-font">{{(d.brandName + d.seriesName) | empty}}({{d.carColor | empty}})</h3>
                <p class="gray-font">{{d.carNo | empty}}</p>
                <div class="hr"></div>
                <div class="list">
                    <div>
                        <span class="label">车主姓名</span>
                        <span class="text">{{(d.carOwnerName || d.driverName) | empty}}</span>
                    </div>
                    <div>
                        <span class="label">车型</span>
                        <span class="text">{{d.modelName | empty}}</span>
                    </div>
                    <div>
                        <span class="label">车辆注册日期</span>
                        <span class="text">{{d.regDate | empty}}</span>
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
    import pageHeader from "../../components/pageHeader.vue";
    import { ajaxGet } from "../../util.js";
    import { MessageBox, Toast } from 'mint-ui';
    export default {
        components: {
            pageHeader
        },
        data() {
            return {
                d: {}
            }
        },
        mounted() {
            this.getData();
        },
        methods: {
            getData() {
                ajaxGet("driver/car/detail", {carId: this.$route.params.id}).then(data => {
                    this.d = data.content;
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
        },
        filters: {
            empty(value) {
                return value || "-";
            }
        }
    }
</script>