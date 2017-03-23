<template>
    <div class="container user-report">
        <page-header title="服务评价" leftArrow="true" @leftClick="$router.go(-1)"></page-header>
        <main class="main">
            <div class="top">
                <p class="tip">近期服务评价平均星级</p>
                <div class="average orange-font">{{score.average | count}}</div>
                <star :score="score.average"></star>
                
            </div>
            <div class="center">
                <div class="title">
                    <p>您当前各方面都很棒,</p>
                    <p>请继续保持哦！</p>
                </div>
                <ul class="list">
                    <li>
                        <rank :size="score.tidy"></rank>
                        <rank size="100" class="gray"></rank>
                        <div class="text">干净无异味</div>
                    </li>
                    <li>
                        <rank :size="score.safety"></rank>
                        <rank size="100" class="gray"></rank>
                        <div class="text">安全又平稳</div>
                    </li>
                    <li>
                        <rank :size="score.courtesy"></rank>
                        <rank size="100" class="gray"></rank>
                        <div class="text">安静有礼貌</div>
                    </li>
                    <li>
                        <rank :size="score.navigation"></rank>
                        <rank size="100" class="gray"></rank>
                        <div class="text">认路会导航</div>
                    </li>
                </ul>
                <div class="instr">
                    <div class="left">
                        <span class="rank"></span>
                        <span class="text">您的分数</span>
                    </div>
                    <div class="right">
                        <span class="rank gray"></span>
                        <span class="text">优秀司机平均分</span>
                    </div>
                </div>
            </div>
            <div class="bottom">
                <h2>您累计的评论星级</h2>
                <ul class="list">
                    <li>
                        <rank :starCount="5" :size="five"></rank>
                        <div class="text orange-font">{{detail[5]}}单</div>
                    </li>
                    <li>
                        <rank :starCount="4" :size="four"></rank>
                        <div class="text orange-font">{{detail[4]}}单</div>
                    </li>
                    <li>
                        <rank :starCount="3" :size="three"></rank>
                        <div class="text orange-font">{{detail[3]}}单</div>
                    </li>
                    <li>
                        <rank :starCount="2" :size="two"></rank>
                        <div class="text orange-font">{{detail[2]}}单</div>
                    </li>
                    <li>
                        <rank :starCount="1" :size="one"></rank>
                        <div class="text orange-font">{{detail[1]}}单</div>
                    </li>
                </ul>
            </div>
        </main>
    </div>
</template>
<script>
    import pageHeader from "../../components/pageHeader.vue";
    import star from "../../components/star.vue";
    import rank from "../../components/rank.vue";
    import { ajaxGet } from "../../util.js";
    import $ from 'jquery';
    export default {
        components: {
            pageHeader,
            star,
            rank
        },
        data() {
            return {
                detail: {
                    1: 0,
                    2: 0,
                    3: 0,
                    4: 0,
                    5: 0
                },
                score: {
                    tidy: 0,
                    safety: 0,
                    courtesy: 0,
                    navigation: 0,
                    average: 0
                }
            }
        },
        mounted() {
            ajaxGet("driver/index").then(data => this.filterData(data.content));
        },
        methods: {
            filterData(d) {
                this.score.average = d.score.average;
                this.score.tidy = parseInt(d.score.tidy * 20);
                this.score.safety = parseInt(d.score.safety * 20);
                this.score.courtesy = parseInt(d.score.courtesy * 20);
                this.score.navigation = parseInt(d.score.navigation * 20);
                this.detail = d.detail;
            }
        },
        computed: {
            total() {
                let result = 0;
                Object.values(this.detail).forEach(obj => result += obj);
                return result;
            },
            one() {
                return this.detail[1] / this.total * 100;
            },
            two() {
                return this.detail[2] / this.total * 100;
            },
            three() {
                return this.detail[3] / this.total * 100;
            },
            four() {
                return this.detail[4] / this.total * 100;
            },
            five() {
                return this.detail[5] / this.total * 100;
            }
        },
        filters: {
            count(value) {
                return value.toFixed(2);
            }
        }
    }
</script>