<template>
    <div class="container user-info">
        <page-header title="个人信息" leftArrow="true" @leftClick="$router.go(-1)"></page-header>
        <main class="main">
            <ul class="cell-list">
                <li>
                    <span class="label">姓名</span>
                    <span class="text">路人甲</span>
                </li>
                <li>
                    <span class="label">手机号</span>
                    <span class="text">15257157169</span>
                </li>
            </ul>
        </main>
    </div>
</template>
<script>
    import pageHeader from "../../components/page-header.vue";
    export default {
        components: {
            pageHeader
        }
    }
</script>