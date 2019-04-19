
<!--局部样式-->
<style scoped>
    .viewLogin {

    }
    .loginForm {
        width: 320px;
    }
</style>

<!--全局局部覆盖样式-->
<style>

</style>

<template>
    <div class="viewLogin">
        <el-form
            class="loginForm"
            label-position="left">
            <el-form-item>
                <el-input
                    placeholder="昵称/手机号/邮箱/账户"
                    clearable
                    v-model="account">
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-input
                    placeholder="请输入密码"
                    clearable
                    type="password"
                    v-model="password">
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "viewLogin",
        props: {

        },
        data () {
            return {
                //#region 页面对象
                //#endregion

                //#region 页面内容绑定数据
                    account: "",
                    password: "",
                //#endregion

                //#region 页面样式绑定数据
                //#endregion
            };
        },
        watch: {

        },
        computed: {
            //#region 常量计算属性
            //#endregion

            //#region 数据转换计算属性
            //#endregion

            //#region 样式计算属性
            //#endregion
        },
        methods: {
            //#region 页面事件方法
            //#endregion

            //#region 业务逻辑方法
            //#endregion

            //#region 接口访问方法
            //#endregion

            //#region 数据转换方法
            //#endregion

            //#region 自动样式方法
            //#endregion

            //#region 其他方法
            //#endregion
        },
        created () {

        },
        mounted () {

        },
        components: {

        },
    };
</script>