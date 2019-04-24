
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
                    v-model="rePassword"
                    @blur="handleRePasswordBlur">
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
                // 注册按钮点击事件
                handleRegClick () {
                    if (!this.user.nickname) {
                        this.$message({
                            type: "warning",
                            message: "请输入昵称",
                        });
                        return;
                    }
                    if (!this.user.password) {
                        this.$message({
                            type: "warning",
                            message: "请输入密码",
                        });
                        return;
                    }
                    if (this.user.password != this.rePassword) {
                        this.$message({
                            type: "warning",
                            message: "两次输入密码不一致",
                        });
                        return;
                    }
                    if (!this.user.captcha.code) {
                        this.$message({
                            type: "warning",
                            message: "请输入验证码",
                        });
                        return;
                    }
                    this.b_registerUser();
                },
                // 刷新验证码按钮点击事件
                handleRefreshClick () {
                    this.b_updateCAPTCHA();
                },
                // 重复输入密码验证事件
                handleRePasswordBlur () {
                    if (this.user.password != this.rePassword) {
                        this.$message({
                            type: "warning",
                            message: "两次输入密码不一致",
                        });
                    }
                },
            //#endregion

            //#region 业务逻辑方法
                // 注册用户逻辑
                async b_registerUser () {
                    let user = JSON.parse(JSON.stringify(this.user));
                    user.password = hash.SHA256(user.password);
                    let result = await api.registerUser(user);
                    if (result) {
                        if (result.status) {
                            let account = result.data.account;
                            this.$alert(`你已经注册成功，账户为：${ this.accountStr(account) }，点击确定登录系统`, "注册成功", {
                                showClose: false,
                                confirmButtonText: "确定",
                                callback: action => {
                                    this.$router.push("/");
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
                // 获取新的验证码
                async b_newCAPTCHA () {
                    let result = await api.newCAPTCHA();
                    if (result) {
                        this.user.captcha.uid = result.uid;
                        this.svgImage = result.svgImage;
                    }
                },
                // 更新验证码
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
                // 格式化账户字符串
                accountStr (account) {
                    return (Math.floor(Number(account)) + 10000).toString();
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
            this.b_newCAPTCHA();
        },
        components: {
            refreshButton,
        },
    };
</script>