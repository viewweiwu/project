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
                return Math.floor(this.score);
            },
            "halfCount"() {
                return this.score * 10 % 10 > 0 ? 1 : 0;
            }
        }
    }
</script>