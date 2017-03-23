<template>
    <div class="container register">
        <page-header title="我的车辆" leftArrow="true" @leftClick="$router.go(-1)"></page-header>
        <mt-datetime-picker ref="registerDatePicker" type="date" v-model="registerDate" @confirm="onRegisterDateConfirm"></mt-datetime-picker>
        <main class="main">
            <p class="cell-title orange-font">请准确填写车辆信息，以方便通过审核</p>
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
    import platePicker from "../../components/platePicker.vue";
    import modelPicker from "../../components/modelPicker.vue";
    import pageHeader from "../../components/pageHeader.vue";
    import { ajaxGet, ajaxPost, formatDate } from "../../util.js";
    import { Toast } from 'mint-ui';
    export default {
        components: {
            inputCell,
            platePicker,
            modelPicker,
            pageHeader
        },
        data() {
            return {
                plateFirst: "",
                plateLast: "",
                plateOpen: false,
                model: { name: "" },
                modelOpen: false,
                selectTypeData: {},
                ownerName: "",
                registerDate: "",
                registerDateText: ""
            }
        },
        mounted() {;
            let selectTypeData = JSON.parse(sessionStorage.getItem("selectTypeData"));
            this.setData();
            if(selectTypeData) {
                this.selectTypeData = selectTypeData;
                sessionStorage.removeItem("selectTypeData");
            }
            this.save();
            console.log(this.$router);
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
                    selectTypeData: this.selectTypeData,
                    plateFirst: this.plateFirst,
                    plateLast: this.plateLast,
                    model: this.model,
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
                this.model = obj['model'] || { name: "" };
                this.ownerName = obj['ownerName'] || "";
                if(obj['registerDate']) {
                    this.registerDate = new Date(obj['registerDate']);
                }
                if(obj['registerDateText']) {
                    this.registerDateText = new Date(obj['registerDateText']);
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
                    regDate: formatDate(this.registerDateText)
                }
                ajaxPost("driver/car/save", postData).then(data => {
                    if(data.status === "SUCCESS") {
                        Toast("添加车辆成功！");
                        this.$router.replace({
                            name: 'car/detail',
                            params: {
                                id: data.content
                            }
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
                } else if (this.selectTypeData.child === "") {
                    Toast("请完善车型");
                    result = false;
                } else if (this.ownerName.trim() === "") {
                    Toast("请输入姓名");
                    result = false;
                } else if (this.registerDateText=== "") {
                    Toast("请选择车辆注册日期");
                    result = false;
                }
                return result;
            },
            formatData(value) {
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
                return formatDate(value);
            }
        }
    }
</script>

<style lang="less">
    @import "../../assets/less/cell-input";
</style>