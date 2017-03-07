<template>
    <div class="container user-report">
        <page-header title="服务评价" leftArrow="true" @leftClick="$router.go(-1)"></page-header>
        <main class="main">
            <div class="top">
                <p class="tip">近100单服务评价平均星级</p>
                <div class="average orange-font">4.95</div>
                <div class="star orange-font">
                    <i class="iconfont big-font">&#xe603;</i>
                    <i class="iconfont big-font">&#xe603;</i>
                    <i class="iconfont big-font">&#xe603;</i>
                    <i class="iconfont big-font">&#xe603;</i>
                    <i class="iconfont big-font">&#xe603;</i>
                </div>
                <div class="rank">
                    <div class="left">
                        <p class="count">5.00</p>
                        <p class="text">优秀司机平均星级</p>
                    </div>
                    <div class="right">
                        <p class="count">55%</p>
                        <p class="text">您的排名</p>
                    </div>
                </div>
            </div>
            <div class="center">
                <div class="title">
                    <p>您当前各方面都很棒,</p>
                    <p>请继续保持哦！</p>
                </div>
                <ul class="list">
                    <li>
                        <div class="rank">
                            <div class="size"></div>
                        </div>
                        <div class="rank gray">
                            <div class="size"></div>
                        </div>
                        <div class="text">老司机就是稳！</div>
                    </li>
                    <li>
                        <div class="rank">
                            <div class="size"></div>
                        </div>
                        <div class="rank gray">
                            <div class="size"></div>
                        </div>
                        <div class="text">老司机就是稳！</div>
                    </li>
                    <li>
                        <div class="rank">
                            <div class="size"></div>
                        </div>
                        <div class="rank gray">
                            <div class="size"></div>
                        </div>
                        <div class="text">老司机就是稳！</div>
                    </li>
                    <li>
                        <div class="rank">
                            <div class="size"></div>
                        </div>
                        <div class="rank gray">
                            <div class="size"></div>
                        </div>
                        <div class="text">老司机就是稳！</div>
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
                        <div class="rank">
                            <i class="iconfont">&#xe603;</i>
                            <i class="iconfont">&#xe603;</i>
                            <i class="iconfont">&#xe603;</i>
                            <i class="iconfont">&#xe603;</i>
                            <i class="iconfont">&#xe603;</i>
                            <div class="size"></div>
                        </div>
                        <div class="text orange-font">50单</div>
                    </li>
                    <li>
                        <div class="rank">
                            <i class="iconfont">&#xe603;</i>
                            <i class="iconfont">&#xe603;</i>
                            <i class="iconfont">&#xe603;</i>
                            <i class="iconfont">&#xe603;</i>
                            <div class="size"></div>
                        </div>
                        <div class="text orange-font">5单</div>
                    </li>
                    <li>
                        <div class="rank">
                            <i class="iconfont">&#xe603;</i>
                            <i class="iconfont">&#xe603;</i>
                            <i class="iconfont">&#xe603;</i>
                            <div class="size"></div>
                        </div>
                        <div class="text orange-font">0单</div>
                    </li>
                    <li>
                        <div class="rank">
                            <i class="iconfont">&#xe603;</i>
                            <i class="iconfont">&#xe603;</i>
                            <div class="size"></div>
                        </div>
                        <div class="text orange-font">0单</div>
                    </li>
                    <li>
                        <div class="rank">
                            <i class="iconfont">&#xe603;</i>
                            <div class="size"></div>
                        </div>
                        <div class="text orange-font">0单</div>
                    </li>
                </ul>
            </div>
        </main>
    </div>
</template>
<script>
    import pageHeader from "../../components/page-header.vue";
    export default {
        components: {
            pageHeader
        }
    }
</script>