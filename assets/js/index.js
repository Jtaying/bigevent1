$(function() {
    getUserInfo()
        // 点击按钮,实现退出功能
    $('#btnLogout').on('click', function() {
        // 提示用户是否退出
        layer.confirm('确定退出登录？', { icon: 3, title: '提示' }, function(index) {
            //  清空本地存储中的token
            localStorage.removeItem('token');
            // 重新跳转到登陆页面
            // location.href="/url" 当前页面打开URL页面
            location.href = '/login.html';
            layer.close(index)
        })
    })
})

// 注：只有登录了才能获取token信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token')||''
        // },
        success(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')

            }
            renderAvatar(res.data)
        }
    })
}
// 渲染用户头像
function renderAvatar(user) {
    // 获取昵称或用户名
    var name = user.nickname || user.username;
    //    设置欢迎文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
        //    按需渲染用户的头像
    if (user.user_pic == null) {
        // 渲染图片头像并且显示头像
        $('.layui-nav-img')
            .attr('src', user.user_pic)
            .show();
        $('.text-avatar').hide() //隐藏文字头像
    } else {
        // 渲染文本头像
        $('.layui-nav-img').hide() //隐藏图片头像
        var first = name[0].toUpperCase(); //获取用户名的第一个首字母并设置大写  toUpperCase() 设置大写
        // 、显示文字头像的显示内容，并显示
        $('.text-avatar')
            .html(first)
            .show()
    }
}