
<!--局部样式-->
<style scoped>
    .viewRegister {

    }
    .loginForm {
        width: 320px;
    }
    .svgImageWarp {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
    }
    .svgImage {
        height: 50px;
        margin-right: 10px;
    }
</style>

<!--全局局部覆盖样式-->
<style>

</style>

<template>
    <div class="viewRegister">
        <el-form
            class="loginForm"
            label-position="top"
            :model="user">
            <el-form-item
                label="昵称">
                <el-input
                    placeholder="请输入您的昵称"
                    clearable
                    v-model="user.nickname">
                </el-input>
            </el-form-item>
            <el-form-item
                label="性别">
                <el-radio v-model="user.gender" :label="1">男</el-radio>
                <el-radio v-model="user.gender" :label="2">女</el-radio>
            </el-form-item>
            <el-form-item
                label="请输入密码">
                <el-input
                    placeholder="请输入密码"
                    clearable
                    type="password"
                    v-model="user.password">
                </el-input>
            </el-form-item>
            <el-form-item
                label="请再次输入密码">
                <el-input
                    placeholder="请再次输入密码"
                    clearable
                    type="password"
                    v-model="rePassword">
                </el-input>
            </el-form-item>
            <el-form-item
                label="手机">
                <el-input
                    placeholder="请输入您的手机号码"
                    clearable
                    v-model="user.phone">
                </el-input>
            </el-form-item>
            <el-form-item
                label="邮箱">
                <el-input
                    placeholder="请输入您的邮箱账号"
                    clearable
                    v-model="user.email">
                </el-input>
            </el-form-item>
            <el-form-item
                label="验证码">
                <div class="svgImageWarp">
                    <div
                        class="svgImage"
                        v-html="svgImage">
                    </div>
                    <refreshButton
                        v-if="user.captcha.uid"
                        @click="handleRefreshClick">
                    </refreshButton>
                </div>
                <el-input
                    placeholder="请输入验证码"
                    clearable
                    v-model="user.captcha.code">
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button
                    @click="handleRegClick"
                    type="primary">
                    注册
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import api from "../../api";
    import refreshButton from "../../components/refreshButton";
    import jsSHA from "jssha";
    import hash from "../../utils/hash";

    export default {
        name: "viewRegister",
        props: {

        },
        data () {
            return {
                //#region 页面对象
                //#endregion

                //#region 页面内容绑定数据
                    user: {
                        nickname: "",
                        password: "",
                        gender: 1,
                        phone: "",
                        email: "",
                        captcha: {
                            uid: "",
                            code: "",
                        },
                    },
                    rePassword: "",
                    svgImage: "",
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
                handleRegClick () {
                    this.b_registerUser();
                },
                handleRefreshClick () {
                    this.b_updateCAPTCHA();
                },
            //#endregion

            //#region 业务逻辑方法
                async b_registerUser () {
                    let user = JSON.parse(JSON.stringify(this.user));
                    user.password = hash.SHA256(user.password);
                    let result = await api.registerUser(user);
                    if (result) {
                        if (result.status) {
                            let account = result.data.account;
                            this.$alert("您已经注册成功，点击确定登录系统", "注册成功", {
                                showClose: false,
                                confirmButtonText: "确定",
                                callback: action => {
                                    this.$router.push("/login");
                                }
                            });
                        }
                        else {
                            this.$message({
                                type: "error",
                                message: result.message,
                            });
                            this.b_newCAPTCHA();
                        }
                    }
                },
                async b_newCAPTCHA () {
                    let result = await api.newCAPTCHA();
                    if (result) {
                        this.user.captcha.uid = result.uid;
                        this.svgImage = result.svgImage;
                    }
                },
                async b_updateCAPTCHA () {
                    let params = {
                        uid: this.user.captcha.uid,
                    };
                    let result = await api.updateCAPTCHA(params);
                    if (result) {
                        this.svgImage = result.svgImage;
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
            this.b_newCAPTCHA();
        },
        components: {
            refreshButton,
        },
    };
</script>