<template>
    <header class="header">
        <div class="left" @click="onLeftClick"><i class="iconfont" v-if="leftArrow">&#xe660;</i>{{left}}</div>
        <div class="title" @click="onTitleClick">{{title}}</div>
        <div class="right" @click="onRightClick">{{right}}<i class="iconfont" v-if="rightArrow">&#xe65f;</i></div>
    </header>
</template>
<script>
    export default {
        props: ['left', 'title', 'right', 'leftArrow', 'rightArrow'],
        methods: {
            onLeftClick() {
                this.$emit("leftClick");
            },
            onTitleClick() {
                this.$emit("titleClick");
            },
            onRightClick() {
                this.$emit("rightClick");
            }
        }
    }
</script>