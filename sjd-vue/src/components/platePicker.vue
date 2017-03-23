<template>
    <div :class="['right-page', {open: plateOpen}]">
        <ul class="cell-list">
            <li v-for="item in plateData" @click="onPlateSelect(item)">{{item}}</li>
        </ul>
    </div>
</template>
<script>
    export default {
        props: ['plateOpen'],
        data() {
            return {
                plateData: ["辽", "闽", "津", "蒙", "鄂", "苏", "渝", "黑", "宁", "川", "冀", "赣", "云", "陕", "新", "琼", "皖", "鲁", "晋", "湘", "桂", "藏", "吉", "沪", "青", "贵", "豫", "京", "粤", "浙", "甘"]
            }
        },
        methods: {
            onPlateSelect(item) {
                this.$emit("select", item);
            }
        }
    }
</script>