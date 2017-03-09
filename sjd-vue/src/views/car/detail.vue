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
                <h3 class="xbig-font">别克·GBL(彩色)</h3>
                <p class="gray-font">浙A12345</p>
                <div class="hr"></div>
                <div class="list">
                    <div>
                        <span class="label">所在地</span>
                        <span class="text">北京市</span>
                    </div>
                    <div>
                        <span class="label">车主姓名</span>
                        <span class="text">曹操</span>
                    </div>
                    <div>
                        <span class="label">车辆注册日期</span>
                        <span class="text">2008-08-08</span>
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
    import { MessageBox } from 'mint-ui';
    export default {
        components: {
            pageHeader
        },
        methods: {
            onDelBtnClick() {
                MessageBox.confirm("确定要删除这辆车？").then(() => {
                    alert("done")
                }, () => {
                    alert("cancel")
                });
            }
        }
    }
</script>