<template>
    <div class="rank">
        <div class="stars"><i class="iconfont" v-for="item in starCount">&#xe70b;</i></div>
        <div class="size" :style="w"></div>
    </div>
</template>

<script>
    export default {
        props: ["starCount", "size"],
        computed: {
            w() {
                return {
                    width: (this.size || 0) + "%"
                };
            }
        }
    }
</script>