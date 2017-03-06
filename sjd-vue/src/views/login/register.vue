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
            <p class="cell-title">个人信息</p>
            <ul class="cell-list cell-input">
                <input-cell label="司机姓名" type="text" @input="onUserNameInput" max="20"></input-cell>
                <input-cell label="身份证" type="number" @input="onIdCardInput" max="18"></input-cell>
                <input-cell label="初次领取驾照日期" type="select" :selected="firstGetDateText | date" @click="$refs.firstGetDatePicker.open()"></input-cell>
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
    export default {
        components: {
            inputCell
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
                registerDateText: "",
                userName: "",
                idCard: "",
                firstGetDate: "",
                firstGetDateText: ""
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
            onUserNameInput(value) {
                this.userName = value;
                this.save();
            },
            onIdCardInput(value) {
                this.idCard = value;
                this.save();
            },
            onRegisterDateConfirm(value) {
                this.registerDateText = value;
                this.save();
            },
            onFirstGetDateConfirm(value) {
                this.firstGetDateText = value;
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
                    registerDateText: this.registerDateText,
                    userName: this.userName,
                    idCard: this.idCard,
                    firstGetDate: this.firstGetDate,
                    firstGetDateText: this.firstGetDateText
                }

                sessionStorage.setItem("registerData", JSON.stringify(obj));
            },
            setData() {
                let obj = {};
                obj = JSON.parse(sessionStorage.getItem("registerData")) || {}; 
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
                this.userName = obj['userName'] || "";
                this.idCard = obj['idCard'] || "";
                if(obj['firstGetDate']) {
                    this.firstGetDate = new Date(obj['firstGetDate']);
                }
                if(obj['firstGetDateText']) {
                    this.firstGetDateText = new Date(obj['firstGetDateText']);
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