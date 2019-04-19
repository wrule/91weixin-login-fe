
<style scoped>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        width: 100%;
        height: 100%;
    }
</style>

<style>
    html, body {
        width: 100%;
        height: 100%;
        padding: 0px;
        margin: 0px;
    }
</style>



<template>
    <el-container
        id="app">
        <el-header>Header</el-header>
        <el-main>
            <router-view></router-view>
        </el-main>
    </el-container>
</template>


