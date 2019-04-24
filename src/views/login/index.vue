
<!--局部样式-->
<style scoped>
    .viewLogin {

    }
    .loginForm {
        width: 240px;
    }
    .loginButton {
        margin-right: 10px;
    }
    .loginWarp {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>

<!--全局局部覆盖样式-->
<style>
    .viewLogin .el-checkbox__label {
        font-weight: normal;
    }
</style>

<template>
    <div class="viewLogin">
        <el-form
            class="loginForm"
            label-position="left">
            <el-form-item>
                <el-input
                    placeholder="昵称/手机号/邮箱"
                    clearable
                    v-model="account"
                    @clear="handleClear">
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-input
                    placeholder="请输入密码"
                    clearable
                    type="password"
                    v-model="password"
                    @clear="handleClear">
                </el-input>
            </el-form-item>
            <el-form-item>
                <div class="loginWarp">
                    <div>
                        <el-button
                            type="primary"
                            class="loginButton"
                            @click="handleLoginClick">
                            登录
                        </el-button>
                        <router-link
                            to="/register">
                            注册
                        </router-link>
                    </div>
                    <el-checkbox
                        v-model="rmbPwd">
                        记住密码
                    </el-checkbox>
                </div>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import hash from "../../utils/hash";
    import { Base64 } from "js-base64";
    import api from "../../api";

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
                    rmbPwd: false,
                //#endregion

                //#region 页面样式绑定数据
                //#endregion
            };
        },
        watch: {
            "$route": {
                handler: "handleRouteChange",
                immediate: true,
            },
            rmbPwd (nv) {
                if (nv) {
                    this.handleSaveAP();
                }
            },
            // account (nv) {
            //     if (this.rmbPwd) {
            //         this.handleSaveAP();
            //     }
            // },
            // password (nv) {
            //     if (this.rmbPwd) {
            //         this.handleSaveAP();
            //     }
            // },
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
                        localStorage.setItem("jmpUrl", this.jmpUrl);
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
                handleSaveAP () {
                    if (this.account && this.password) {
                        let loginInfo = {
                            account: this.account,
                            password: this.password,
                        };
                        let base64Str = this.base64Encode(loginInfo);
                        localStorage.setItem("loginInfo", base64Str);
                    }
                },
                handleClear () {
                    localStorage.removeItem("loginInfo");
                },
            //#endregion

            //#region 业务逻辑方法
                // 登录验证
                async b_login () {
                    let params = {
                        account: this.account,
                        password: hash.SHA256(this.password),
                    };
                    // if (!isNaN(Number(params.account))) {
                    //     params.account = this.accountNum(params.account);
                    // }
                    let result = await api.userLogin(params);
                    if (result) {
                        if (result.status) {
                            this.jmpUrl = localStorage.getItem("jmpUrl");
                            if (this.jmpUrl) {
                                location.assign(`${ this.jmpUrl }?t=${ encodeURIComponent(result.data.token) }`);
                            }
                            else {
                                this.$message({
                                    type: "error",
                                    message: "无效跳转地址",
                                });
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
                // 尝试填充记忆的登录信息
                b_tryFillLoginInfo () {
                    let base64Str = localStorage.getItem("loginInfo");
                    if (base64Str) {
                        let loginInfo = this.base64Decode(base64Str);
                        this.account = loginInfo.account;
                        this.password = loginInfo.password;
                    }
                },
            //#endregion

            //#region 接口访问方法
            //#endregion

            //#region 数据转换方法
                // base64序列化
                base64Encode (obj) {
                    let jsonStr = JSON.stringify(obj);
                    let base64Str = Base64.encode(jsonStr);
                    return base64Str;
                },
                // base64反序列化
                base64Decode (str) {
                    let jsonStr = Base64.decode(str);
                    let jsonObj = JSON.parse(jsonStr);
                    return jsonObj;
                },
                // 账户字符串转数字
                accountNum (str) {
                    return Math.floor(Number(str) - 10000).toString();
                },
            //#endregion

            //#region 自动样式方法
            //#endregion

            //#region 其他方法
            //#endregion
        },
        created () {

        },
        mounted () {
            this.b_tryFillLoginInfo();
        },
        components: {

        },
    };
</script>