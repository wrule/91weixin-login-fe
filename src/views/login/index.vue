
<!--局部样式-->
<style scoped>
    .viewLogin {

    }
    .loginForm {
        width: 240px;
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
                <el-button
                    type="primary"
                    @click="handleLoginClick">
                    登录
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import hash from "../../utils/hash";
    import api from "../../api";
import { setTimeout } from 'timers';

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
                    jmpUrl: "",
                //#endregion

                //#region 页面样式绑定数据
                //#endregion
            };
        },
        watch: {
            "$route": {
                handler: "handleRouteChange",
                immediate: true,
            }
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
                handleRouteChange (nv) {
                    if (nv.query.jmp) {
                        this.jmpUrl = nv.query.jmp;
                        console.log(this.jmpUrl);
                    }
                },
                handleLoginClick () {
                    if (!this.account) {
                        this.$message({
                            type: "warning",
                            message: "请输入登录名称",
                        });
                        return;
                    }
                    if (!this.password) {
                        this.$message({
                            type: "warning",
                            message: "请输入登录密码",
                        });
                        return;
                    }
                    this.b_login();
                },
            //#endregion

            //#region 业务逻辑方法
                async b_login () {
                    let params = {
                        account: this.account,
                        password: hash.SHA256(this.password),
                    };
                    let result = await api.userLogin(params);
                    if (result) {
                        if (result.status) {
                            if (this.jmpUrl) {
                                location.assign(`${ this.jmpUrl }?t=${ encodeURIComponent(result.data.token) }`);
                            }
                            else {

                            }
                        }
                        else {
                            this.$message({
                                type: "error",
                                message: result.message, 
                            });
                        }
                    }
                },
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
            console.log(encodeURIComponent("http://www.baidu.com/"));
        },
        components: {

        },
    };
</script>