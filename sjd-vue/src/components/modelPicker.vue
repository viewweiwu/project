<template>
    <div :class="['right-page', {open: modelOpen}]">
        <ul class="cell-list">
            <li v-for="item in modelData" @click="onModelSelect(item)">{{item.name}}</li>
        </ul>
    </div>
</template>
<script>
    import { ajaxGet } from "../util.js";
    export default {
        props: ['modelOpen'],
        data() {
            return {
                modelData: []
            }
        },
        mounted() {
            this.getModelData();
        },
        methods: {
            getModelData() {
                ajaxGet("common/carModel").then(data => {
                    this.modelData = data.content;
                })
            },
            onModelSelect(item) {
                this.$emit("select", item);
            }
        }
    }
</script>