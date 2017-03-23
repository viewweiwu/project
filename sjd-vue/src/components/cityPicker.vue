<template>
    <div :class="['right-page', {open: cityOpen}]">
        <ul class="cell-list">
            <li v-for="item in cityData" @click="onCitySelect(item)">{{item.cityName}}</li>
        </ul>
    </div>
</template>
<script>
    import { ajaxGet } from "../util.js";
    export default {
        props: ['cityOpen'],
        data() {
            return {
                cityData: []
            }
        },
        mounted() {
            this.getCityData();
        },
        methods: {
            getCityData() {
                ajaxGet("common/city").then(data => {
                    this.cityData = data.content;
                })
            },
            onCitySelect(item) {
                this.$emit("select", item);
            }
        }
    }
</script>