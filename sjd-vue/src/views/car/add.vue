<template>
    <div class="container register">
        <page-header title="我的车辆" leftArrow="true" @leftClick="$router.go(-1)"></page-header>
        <mt-datetime-picker ref="registerDatePicker" type="date" v-model="registerDate" @confirm="onRegisterDateConfirm"></mt-datetime-picker>
        <main class="main">
            <p class="cell-title orange-font">请准确填写车辆信息，以方便通过审核</p>
            <ul class="cell-list cell-input">
                <input-cell label="城市" type="select" :selected="city" @click="cityOpen = true"></input-cell>
                <li>
                    <label>车牌号</label>
                    <div class="plate">
                        <span class="plate-select" @click="plateOpen = true">{{plateFirst}}</span>
                        <input placeholder="请输入车牌号" v-model="plateLast" @input="onPlateInput" maxlength="6" ref="plate">
                        <i class="iconfont" @click="onPlateClearBtnClick" v-if="plateLast != ''">&#xe641;</i>
                    </div>
                </li>
                <input-cell label="车型" type="select" :selected="type" @click="onTypeClick"></input-cell>
                <input-cell label="车主姓名" type="text" @input="onOwnerNameInput" max="20"></input-cell>
                <input-cell label="车辆注册日期" type="select" :selected="registerDateText | date" @click="$refs.registerDatePicker.open()"></input-cell>
            </ul>
            <div :class="['right-page', {open: cityOpen}]">
                <ul class="cell-list">
                    <li v-for="item in cityData" @click="onCitySelect(item)">{{item}}</li>
                </ul>
            </div>
            <div :class="['right-page', {open: plateOpen}]">
                <ul class="cell-list">
                    <li v-for="item in plateData" @click="onPlateSelect(item)">{{item}}</li>
                </ul>
            </div>
        </main>
        <footer class="footer">
            <button class="btn">提交</button>
        </footer>
    </div>
</template>

<script>
    import inputCell from "../../components/inputCell.vue";
    import pageHeader from "../../components/page-header.vue";
    export default {
        components: {
            inputCell,
            pageHeader
        },
        data() {
            return {
                city: "",
                cityOpen: false,
                cityData: [],
                plateFirst: "",
                plateLast: "",
                plateOpen: false,
                plateData: [],
                selectTypeData: {},
                ownerName: "",
                registerDate: "",
                registerDateText: ""
            }
        },
        mounted() {;
            let selectTypeData = JSON.parse(sessionStorage.getItem("selectTypeData"));
            this.setData()
            this.cityData = ["北京", "上海", "浙江", "钓鱼岛"];
            this.plateData = ["浙", "京"];
            if(selectTypeData) {
                this.selectTypeData = selectTypeData;
                sessionStorage.removeItem("selectTypeData");
            }
            this.save();
        },
        methods: {
            onPlateInput() {
                this.plateLast = this.plateLast.toUpperCase();
                this.save();
            },
            onPlateClearBtnClick() {
                this.plateLast = '';
                this.$refs.plate.focus();
                this.save();
            },
            onOwnerNameInput(value) {
                this.ownerName = value;
                this.save();
            },
            onRegisterDateConfirm(value) {
                this.registerDateText = value;
                this.save();
            },
            onCitySelect(value) {
                this.city = value;
                this.cityOpen = false;
                this.save();
            },
            onPlateSelect(value) {
                this.plateFirst = value;
                this.plateOpen = false;
                this.save();
            },
            onTypeClick() {
                this.$router.push({
                    name: 'car/select'
                });
            },
            save() {
                let obj = {};
                obj = {
                    city: this.city,
                    selectTypeData: this.selectTypeData,
                    plateFirst: this.plateFirst,
                    plateLast: this.plateLast,
                    ownerName: this.ownerName,
                    registerDate: this.registerDate,
                    registerDateText: this.registerDateText
                }

                sessionStorage.setItem("addCarData", JSON.stringify(obj));
            },
            setData() {
                let obj = {};
                obj = JSON.parse(sessionStorage.getItem("addCarData")) || {}; 
                this.city = obj['city'] || "";
                this.selectTypeData = obj['selectTypeData'] || "";
                this.plateFirst = obj['plateFirst'] || "";
                this.plateLast = obj['plateLast'] || "";
                this.ownerName = obj['ownerName'] || "";
                if(obj['registerDate']) {
                    this.registerDate = new Date(obj['registerDate']);
                }
                if(obj['registerDateText']) {
                    this.registerDateText = new Date(obj['registerDateText']);
                }
            }
        },
        computed: {
            type() {
                if(!this.selectTypeData['content']) {
                    return "";
                }
                return this.selectTypeData['content'] + " " + this.selectTypeData['parent'] + " " + this.selectTypeData['child'];
            }
        },
        filters: {
            date(value) {
                if(value === "") return "";
                let result = "";
                let year = value.getFullYear();
                let month = value.getMonth() + 1;
                let day = value.getDate();

                if(month < 10) {
                    month = "0" + month;
                }
                if(day < 10) {
                    day = "0" + day;
                }

                result = year + " - " + month + " - " + day;
                return result;
            }
        }
    }
</script>

<style lang="less">
    @import "../../assets/less/cell-input";
</style>