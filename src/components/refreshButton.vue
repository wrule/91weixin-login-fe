
<!--局部样式-->
<style scoped>
    .refreshButton {
        display: inline-block;
        width: 28px;
        height: 28px;
        border-radius: 28px;
        background-color: #eee;
        transition: background-color 0.3s;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }
    .refreshButton:hover {
        background-color: #ddd;
    }
    .refreshButton i {
        font-size: 18px;
    }
</style>

<!--全局局部覆盖样式-->
<style>

</style>

<template>
    <div
        class="refreshButton"
        @click="handleClick">
        <i class="el-icon-refresh"></i>
    </div>
</template>

<script>
    export default {
        name: "refreshButton",
        props: {

        },
        data () {
            return {
                //#region 页面对象
                //#endregion

                //#region 页面内容绑定数据
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
                handleClick () {
                    this.$emit("click");
                },
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