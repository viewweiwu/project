<template>
    <div class="container">
        <header class="header">
            <div class="left" @click="$router.go(-1)">
                <i class="iconfont">&#xe660;</i>
            </div>
            <div class="title">我的钱包</div>
            <div class="right"></div>
        </header>
        <main class="main">
            <ul class="cell-list">
                <li>
                    <span class="left"><i class="iconfont">&#xe6c0;</i></span>
                    <span class="center">余额<span class="count orange-font">23.00</span><span class="orange-font">元</span></span>
                </li>
            </ul>
        </main>
    </div>
</template>

<style lang="less" scoped>
    @import "../assets/less/var";
    .cell-list {
        margin: @space;
        border: 1px solid @border-gray;
        border-radius: @space / 2;
        box-shadow: @space / 3 @space / 3 @space / 2 @border-gray;
        font-size: @big;
        i {
            vertical-align: middle;
        }
        .count {
            font-size: @xx-big;
            margin: 0 @space / 3 0 @space;
        }
    }
</style>