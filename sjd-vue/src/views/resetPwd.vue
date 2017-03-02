<template>
    <div class="container">
        <header class="header">
            <div class="left" @click="$router.go(-1)">
                <i class="iconfont">&#xe660;</i>
            </div>
            <div class="title">修改密码</div>
            <div class="right"></div>
        </header>
        <main>
            <ul class="cell-list">
                <li>旧密码</li>
                <li>新密码</li>
                <li>确认密码</li>
            </ul>
            <button class="btn">确定</button>
        </main>
    </div>
</template>