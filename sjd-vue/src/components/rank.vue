<template>
    <div class="rank">
        <i class="iconfont" v-for="item in starCount">&#xe70b;</i>
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