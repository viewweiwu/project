<template>
    <div class="star orange-font">
        <i class="iconfont big-font" v-for="item in fullCount">&#xe70b;</i>
        <i class="iconfont big-font" v-for="item in halfCount">&#xe709;</i>
    </div>
</template>
<script>
    export default {
        props: ['score'],
        computed: {
            "fullCount"() {
                let flag = false;
                let score = this.score * 10 % 10;
                if(score >= 8) {
                    flag = true;
                }
                return Math.floor(this.score) + (flag ? 1 : 0);
            },
            "halfCount"() {
                let flag = false;
                let score = this.score * 10 % 10;
                if(score > 2 && score < 8) {
                    flag = true;
                }
                return flag ? 1 : 0;
            }
        }
    }
</script>