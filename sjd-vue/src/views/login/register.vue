<template>
    <div class="container register">
        <page-header title="注册" leftArrow="true" @leftClick="$router.go(-1)"></page-header>
        <mt-datetime-picker ref="registerDatePicker" type="date" v-model="registerDate" @confirm="onRegisterDateConfirm"></mt-datetime-picker>
        <mt-datetime-picker ref="firstGetDatePicker" type="date" v-model="firstGetDate" @confirm="onFirstGetDateConfirm"></mt-datetime-picker>
        <main class="main">
            <div class="section">
                <p class="cell-title">车辆信息</p>
                <ul class="cell-list cell-input">
                    <li>
                        <label>车牌号</label>
                        <div class="plate">
                            <span class="plate-select" @click="plateOpen = true">{{plateFirst}}</span>
                            <input placeholder="请输入车牌号" v-model="plateLast" @input="onPlateInput" maxlength="6" ref="plate">
                            <i class="iconfont" @click="onPlateClearBtnClick" v-if="plateLast != ''">&#xe641;</i>
                        </div>
                    </li>
                    <input-cell label="车系" type="select" :selected="type" @click="onTypeClick"></input-cell>
                    <input-cell label="车型" type="select" :selected="model.name" @click="modelOpen = true"></input-cell>
                    <input-cell label="车主姓名" type="text" :default="ownerName" @input="onOwnerNameInput" max="20"></input-cell>
                    <input-cell label="车辆注册日期" type="select" :selected="registerDateText | date" @click="$refs.registerDatePicker.open()"></input-cell>
                </ul>
                <p class="cell-title">个人信息</p>
                <ul class="cell-list cell-input">
                    <input-cell label="城市" type="select" :selected="city.cityName" @click="cityOpen = true"></input-cell>
                    <input-cell label="司机姓名" type="text" :default="userName" @input="onUserNameInput" max="20"></input-cell>
                    <input-cell label="手机" type="tel" :default="tel" @input="onTelInput" max="11"></input-cell>
                    <input-cell label="密码" type="password" :default="pwd" @input="onPwdInput" max="20"></input-cell>
                    <input-cell label="重复密码" placeholder="再输入一次密码" type="password" :default="repwd" @input="onRePwdInput" max="20"></input-cell>
                    <input-cell label="身份证" type="text" :default="idCard" @input="onIdCardInput" max="18"></input-cell>
                    <!--<input-cell label="初次领取驾照日期" type="select" :selected="firstGetDateText | date" @click="$refs.firstGetDatePicker.open()"></input-cell>-->
                </ul>
            </div>
            <city-picker :cityOpen="cityOpen" @select="onCitySelect"></city-picker>
            <plate-picker :plateOpen="plateOpen" @select="onPlateSelect"></plate-picker>
            <model-picker :modelOpen="modelOpen" @select="onModelSelect"></model-picker>
        </main>
        <footer class="footer">
            <button class="btn" @click="onSubmit">完成</button>
        </footer>
    </div>
</template>

<script>
    import inputCell from "../../components/inputCell.vue";
    import cityPicker from "../../components/cityPicker.vue";
    import platePicker from "../../components/platePicker.vue";
    import modelPicker from "../../components/modelPicker.vue";
    import pageHeader from "../../components/pageHeader.vue";
    import { ajaxGet, ajaxPost, telReg, idCardReg, plateReg, formatDate } from "../../util.js";
    import { MessageBox, Toast } from 'mint-ui';
    export default {
        components: {
            inputCell,
            cityPicker,
            platePicker,
            modelPicker,
            pageHeader
        },
        data() {
            return {
                city: {cityName: ""},
                cityOpen: false,
                plateFirst: "",
                plateLast: "",
                plateOpen: false,
                model: {name: ""},
                modelOpen: false,
                selectTypeData: {},
                ownerName: "",
                registerDate: "",
                registerDateText: "",
                userName: "",
                tel: "",
                pwd: "",
                repwd: "",
                idCard: "",
                firstGetDate: "",
                firstGetDateText: ""
            }
        },
        mounted() {;
            let selectTypeData = JSON.parse(sessionStorage.getItem("selectTypeData"));
            this.setData()
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
            onTelInput(value) {
                this.tel = value;
                this.save();
            },
            onPwdInput(value) {
                this.pwd = value;
                this.save();
            },
            onRePwdInput(value) {
                this.repwd = value;
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
            onModelSelect(value) {
                this.model = value;
                this.modelOpen = false;
                this.save();
            },
            onTypeClick() {
                this.$router.push({
                    name: 'car/select'
                });
            },
            onSubmit() {
                this.validate().then(data => data && this.postData());
            },
            save() {
                let obj = {};
                obj = {
                    city: this.city,
                    selectTypeData: this.selectTypeData,
                    plateFirst: this.plateFirst,
                    plateLast: this.plateLast,
                    model: this.model,
                    ownerName: this.ownerName,
                    registerDate: this.registerDate,
                    registerDateText: this.registerDateText,
                    userName: this.userName,
                    tel: this.tel,
                    pwd: this.pwd,
                    repwd: this.repwd,
                    idCard: this.idCard,
                    firstGetDate: this.firstGetDate,
                    firstGetDateText: this.firstGetDateText
                }

                sessionStorage.setItem("registerData", JSON.stringify(obj));
            },
            setData() {
                let obj = {};
                obj = JSON.parse(sessionStorage.getItem("registerData")) || {}; 
                this.city = obj['city'] || {cityName: ""};
                this.selectTypeData = obj['selectTypeData'] || "";
                this.plateFirst = obj['plateFirst'] || "";
                this.plateLast = obj['plateLast'] || "";
                this.model = obj['model'] || {name: ""};
                this.ownerName = obj['ownerName'] || "";
                if(obj['registerDate']) {
                    this.registerDate = new Date(obj['registerDate']);
                }
                if(obj['registerDateText']) {
                    this.registerDateText = new Date(obj['registerDateText']);
                }
                this.userName = obj['userName'] || "";
                this.tel = obj['tel'] || "";
                this.pwd = obj['pwd'] || "";
                this.repwd = obj['repwd'] || "";
                this.idCard = obj['idCard'] || "";
                if(obj['firstGetDate']) {
                    this.firstGetDate = new Date(obj['firstGetDate']);
                }
                if(obj['firstGetDateText']) {
                    this.firstGetDateText = new Date(obj['firstGetDateText']);
                }
            },
            postData() {
                let postData = {
                    no: this.plateFirst + this.plateLast,
                    color: this.selectTypeData.child,
                    regDate: formatDate(this.registerDateText),
                    series_id: this.selectTypeData.parentId,
                    carOwnerName : this.ownerName,
                    model_id: this.model.id,
                    regDate: formatDate(this.registerDateText),
                    
                    name: this.userName,
                    phone: this.tel,
                    password: this.pwd,
                    idCard : this.idCard,
                    city_id: this.city.cityId
                }
                ajaxPost("register/submit", postData).then(data => {
                    if(data.status === "SUCCESS") {
                        MessageBox.alert("注册成功！");
                        this.$router.replace({
                            name: 'login/login',
                        });
                    } else {
                        Toast(data.msg);
                    }
                });
            },
            async validate() {
                let d = await ajaxGet("common/isExits", {no: this.plateFirst + this.plateLast});
                let result = true;
                if (d.content) {
                    Toast("已经存在该车辆");
                    result = false;
                } else if (this.plateFirst === "" || this.plateLast === "" ||　this.plateLast.length !== 6) {
                    Toast("请完善车牌号");
                    result = false;
                } else if (!plateReg.test(this.plateFirst + this.plateLast)) {
                    Toast("请输入正确的车牌号");
                    result = false;
                } else if (this.selectTypeData === "") {
                    Toast("请选择车系");
                    result = false;
                } else if (this.model.name === "") {
                    Toast("请选择车型");
                    result = false;
                } else if (this.ownerName.trim() === "") {
                    Toast("请输入车主姓名");
                    result = false;
                } else if (this.registerDateText === "") {
                    Toast("请选择车辆注册日期");
                    result = false;
                } else if (this.city.cityName === "") {
                    Toast("请选择城市");
                    result = false;
                } else if (this.userName.trim() === "") {
                    Toast("请输入司机姓名");
                    result = false;
                } else if (!telReg.test(this.tel.trim())) {
                    Toast("请输入正确的手机号");
                    result = false;
                } else if (this.pwd.trim() === "") {
                    Toast("请输入密码");
                    result = false;
                } else if (this.pwd.trim() !== this.repwd.trim()) {
                    Toast("两次密码不一致");
                    result = false;
                } else if (!idCardReg.test(this.idCard.trim())) {
                    Toast("请输入正确的身份证");
                    result = false;
                }
                return result;
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