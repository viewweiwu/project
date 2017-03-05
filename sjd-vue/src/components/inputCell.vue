<template>
    <li @click="onClick">
        <label>{{label}}</label>
        <template v-if="this.type != 'select'">
            <input :placeholder="placeholder" type="text" v-model="value" @input="onInput" :maxlength="max" ref="input">
            <i class="iconfont" @touchstart="onStart" @touchend="onEnd" v-if="type == 'password'">&#xe71e;</i>
            <i class="iconfont" @click.stop="onClearBtnClick" v-if="value != ''">&#xe641;</i>
        </template>
        <template v-if="this.type == 'select'">
            <div class="text" v-show="selected != ''">{{selected}}</div>
            <div class="placeholder" v-show="selected == ''">{{placeholder}}</div>
            <i class="iconfont">&#xe65f;</i>
        </template>
    </li>
</template>

<script>
    export default {
        props: ['label', 'type', 'max', 'selected'],
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
            onStart() {
                this.$refs.input.type="text";
            },
            onEnd() {
                this.$refs.input.type="password";
            }

        },
        computed: {
            placeholder() {
                return "请" + (this.type == 'select' ? '选择' : '输入') + this.label;    
            }
        }
    }
</script>