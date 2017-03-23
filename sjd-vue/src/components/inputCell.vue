<template>
    <li @click="onClick">
        <label>{{label}}</label>
        <template v-if="this.type !== 'select'">
            <input :placeholder="tip" type="text" v-model="value" @input="onInput" :maxlength="max" ref="input">
            <i class="iconfont big-font" @click="onPasswordClick" v-if="type == 'password'">&#xe60d;</i>
            <i class="iconfont" @click.stop="onClearBtnClick" v-if="value != ''">&#xe641;</i>
        </template>
        <template v-if="this.type === 'select'">
            <div class="text" v-show="selected != ''">{{selected}}</div>
            <div class="placeholder" v-show="selected == ''">{{tip}}</div>
            <i class="iconfont">&#xe65f;</i>
        </template>
    </li>
</template>

<script>
    export default {
        props: ['label', 'type', 'max', 'selected', 'placeholder', 'default'],
        data() {
            return {
                value: ''
            }
        },
        mounted() {
            if(this.type != "select"){
                this.$refs.input.type = this.type;
            }
        },
        watch: {
            default(value) {
                this.value = value;
            }
        },
        methods: {
            onInput() {
                this.$emit("input", this.value);
            },
            onClearBtnClick() {
                this.value = "";
                this.$refs.input.focus();
                this.$emit("input", this.value);
            },
            onClick() {
                this.$emit("click");
            },
            onPasswordClick() {
                let target = this.$refs.input;
                target.type = target.type == "text" ? "password" : "text";
                target.focus();
            }
        },
        computed: {
            tip() {
                if(this.placeholder) {
                    return this.placeholder;
                }
                return "请" + (this.type == 'select' ? '选择' : '输入') + this.label;    
            }
        }
    }
</script>