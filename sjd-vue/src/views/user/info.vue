<template>
    <div class="container user-info">
        <page-header title="个人信息" leftArrow="true" @leftClick="$router.go(-1)"></page-header>
        <main class="main">
            <ul class="cell-list">
                <li>
                    <span class="label">姓名</span>
                    <span class="text">{{name}}</span>
                </li>
                <li>
                    <span class="label">手机号</span>
                    <span class="text">{{tel}}</span>
                </li>
                <li>
                    <span class="label">所在城市</span>
                    <span class="text">{{city}}</span>
                </li>
                <li>
                    <span class="label">代理商</span>
                    <span class="text">{{agent}}</span>
                </li>
                <li>
                    <span class="label">身份证</span>
                    <span class="text">{{idCard}}</span>
                </li>
            </ul>
        </main>
    </div>
</template>
<script>
    import pageHeader from "../../components/pageHeader.vue";
    import { ajaxGet } from "../../util.js";
    export default {
        components: {
            pageHeader
        },
        data() {
            return {
                name: "-",
                tel: "-",
                city: "-",
                agent: "-",
                idCard: "-"
            }
        },
        mounted() {
            this.getData();
        },
        methods: {
            getData() {
                ajaxGet("driver/profile/info").then(data => {
                    let d = data.content;
                    this.name = d.name;
                    this.tel = d.mobile;
                    this.city = d.cityName;
                    this.agent = d.agentName;
                    this.idCard = d.idCard;
                });
            }
        }
    }
</script>