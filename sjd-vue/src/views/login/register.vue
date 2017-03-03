<template>
    <div class="container register">
        <header class="header">
            <div class="left" @click="$router.go(-1)">
                <i class="iconfont">&#xe660;</i>
            </div>
            <div class="title">注册</div>
            <div class="right"></div>
        </header>
        <mt-datetime-picker ref="registerDatePicker" type="date" v-model="registerDate" @confirm="onRegisterDateConfirm"></mt-datetime-picker>
        <mt-datetime-picker ref="firstGetDatePicker" type="date" v-model="firstGetDate" @confirm="onFirstGetDateConfirm"></mt-datetime-picker>
        <main class="main">
            <p class="cell-title">车辆信息</p>
            <ul class="cell-list cell-input">
                <li @click="cityOpen = true">
                    <label>城市</label>
                    <div class="text" v-show="city != ''">{{city}}</div>
                    <div class="placeholder" v-show="city == ''">请选择城市</div>
                    <i class="iconfont arrow-right">&#xe65f;</i>
                </li>
                <li>
                    <label>车牌号</label>
                    <div class="plate">
                        <span class="plate-select" @click="plateOpen = true">{{plateFirst}}</span>
                        <input placeholder="请输入车牌号" v-model="plateLast" @input="onPlateInput" maxlength="6">
                    </div>
                </li>
                <li @click="onTypeClick">
                    <label>车型</label>
                    <div class="text" v-show="type != ''">{{type}}</div>
                    <div class="placeholder" v-show="type == ''">请选择车型</div>
                    <i class="iconfont arrow-right">&#xe65f;</i>
                </li>
                <li>
                    <label>车主姓名</label>
                    <input class="text" type="text" placeholder="请输入车主姓名" v-model="ownerName" @input="onOwnerNameInput" maxlength="20">
                </li>
                <li @click="$refs.registerDatePicker.open()">
                    <label>车辆注册日期</label>
                    <div class="text">{{registerDateText | date}}</div>
                    <i class="iconfont arrow-right">&#xe65f;</i>
                </li>
            </ul>
            <p class="cell-title">个人信息</p>
            <ul class="cell-list cell-input">
                <li>
                    <label>司机姓名</label>
                    <input class="text" type="text" placeholder="请输入司机姓名" v-model="userNmae" @input="save()" maxlength="20">
                </li>
                <li>
                    <label>身份证</label>
                    <input class="text" type="text" placeholder="请输入身份证">
                </li>
                <li @click="$refs.firstGetDatePicker.open()">
                    <label>初次领取驾照日期</label>
                    <div class="text">{{firstGetDateText | date}}</div>
                    <i class="iconfont arrow-right">&#xe65f;</i>
                </li>
            </ul>
            <button class="btn">提交</button>
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
    </div>
</template>

<script>
    export default {
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
                registerDate: null,
                registerDateText: null,
                userNmae: "",
                idCard: "",
                firstGetDate: null,
                firstGetDateText: null,
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
            onRegisterDateConfirm(value) {
                this.registerDateText = value;
                this.save();
            },
            onFirstGetDateConfirm(value) {
                this.firstGetDateText = value;
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
            onPlateInput() {
                this.save();
            },
            onOwnerNameInput() {
                this.save();
            },
            onTypeClick() {
                this.$router.push({
                    name: 'select'
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
                    registerDateText: this.registerDateText,
                }

                sessionStorage.setItem("registerData", JSON.stringify(obj));
            },
            setData() {
                let obj = {};
                obj = JSON.parse(sessionStorage.getItem("registerData")) || {}; 
                this.city = obj['city'];
                this.selectTypeData = obj['selectTypeData'];
                this.plateFirst = obj['plateFirst'];
                this.plateLast = obj['plateLast'];
                this.ownerName = obj['ownerName'];
                this.registerDate = new Date(obj['registerDate']);
                this.registerDateText = new Date(obj['registerDateText']);
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
                if(value === null) return "";
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