<template>
    <div class="container">
        <header class="header">
            <div class="left" @click="$router.go(-1)">
                <i class="iconfont">&#xe660;</i>
            </div>
            <div class="title">注册</div>
            <div class="right"></div>
        </header>
        <main>
            <p class="cell-title">车辆信息</p>
            <ul class="cell-list cell-input">
                <li>
                    <label>城市</label>
                    <div class="text">111</div>
                    <i class="iconfont arrow-right">&#xe65f;</i>
                </li>
                <li>
                    <label>车牌号</label>
                    <div class="plate">
                        <span class="plate-select">浙</span>
                        <input placeholder="请输入车牌号">
                    </div>
                </li>
                <li>
                    <label>车型</label>
                    <div class="text">111</div>
                    <i class="iconfont arrow-right">&#xe65f;</i>
                </li>
                <li>
                    <label>车主姓名</label>
                    <input class="text" type="text" placeholder="请输入车主姓名">
                </li>
                <li>
                    <label>车辆注册日期</label>
                    <div class="text">2016-05-03</div>
                    <i class="iconfont arrow-right">&#xe65f;</i>
                </li>
            </ul>
            <p class="cell-title">个人信息</p>
            <ul class="cell-list cell-input">
                <li>
                    <label>司机姓名</label>
                    <input class="text" type="text" placeholder="请输入司机姓名">
                </li>
                <li>
                    <label>身份证</label>
                    <input class="text" type="text" placeholder="请输入身份证">
                </li>
                <li>
                    <label>初次领取驾照日期</label>
                    <div class="text">2017-03-01</div>
                    <i class="iconfont arrow-right">&#xe65f;</i>
                </li>
            </ul>
            <button class="btn">提交</button>
        </main>
    </div>
</template>