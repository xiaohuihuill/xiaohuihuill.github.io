<template>
    <!--password路由页html-->
    <div class="view">
        <!--面包屑导航-->
        <div class="head">
            <a href="#">主页</a>&nbsp;&gt;&nbsp;
            <a href="#">重置密码</a>
        </div>
        <div class="biaoge">
            <div class="table-password">
                <form>
                    <div class="form-group">
                        <label for="exampleInputPassword1">原密码 :</label>
                        <input type="password" class="form-control align" id="exampleInputPassword1" placeholder="输入密码">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">新密码 :</label>
                        <input type="password" class="form-control align" id="exampleInputPassword1" placeholder="输入密码">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">确认密码 :</label>
                        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="输入密码">
                    </div>
                    <div class="submit">
                        <button class="btn btn-default" type="submit">确认</button>
                    </div>

                </form>

            </div>
        </div>
    </div>
</template>
<script>
export default {
    methods: {

    }
}
</script>
<style lang="scss">
@import '../sass/password.scss'
</style>



