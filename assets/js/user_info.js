$(function() {
    const form = layui.form;
    var layer = layui.layer;
    form.verify({
        nickname(value) {
            if (value.length > 6 || value.length < 1) {
                return '昵称长度必须在1~6个字符'
            }
        }
    })
    initUserInfo();
    // 获取用户的基本信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success(res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！')
                }
                console.log(res);
                // 调用form.val() ,快速为表单赋值
                form.val('formUserInfo', res.data)
            }
        })
    }
    // 重置表单数据
    $('#btnReSet').on('click', function(e) {
        // 阻止表单的默认重置行为
        e.preventDefault();
        // 获取用户的最新数据，重新渲染到页面
        initUserInfo();

    })

    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败！')
                }
                layer.msg('更新用户信息成功！');
                // 调用父页面中的方法，重新渲染用户的头像和用户的信息
                window.parent.getUserInfo();
            }
        })


    })
})