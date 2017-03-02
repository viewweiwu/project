<template>
    <div class="container">
        <header class="header">
            <div class="left" @click="$router.go(-1)">
                <i class="iconfont">&#xe660;</i>
            </div>
            <div class="title">添加车型</div>
            <div class="right"></div>
        </header>

        <main>
            <ul class="cell-list">
                <li>品牌</li>
                <li>型号</li>
            </ul>
            <button class="btn">确定</button>
        </main>
    </div>
</template>