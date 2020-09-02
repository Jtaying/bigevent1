$(function() {
    $('#link_reg').on('click', function() {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    $('#link_login').on('click', function() {
        $('.login-box').show();
        $('.reg-box').hide();
    })

    var form = layui.form;
    var layer = layui.layer;
    // 通过  form.verify() 函数自定义校验规则
    form.verify({
        // 自定义了一个叫做pwd校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须为6到12位 ，且不能出现空格'],
        // 校验两次密码是否一致
        // 下段代码和上段代码 分别代表不同的方式
        repwd: function(value) {
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败,则return一个提示消息即可
            // 属性选择器 一定要有空格！！！！！
            var pwd = $('.reg-box [name=password]').val();
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }
    })

    // 注册用户
    $('#form_reg').on('submit', function(e) {
            // 阻止默认的提交行为
            e.preventDefault();
            // 发起ajax的post请求
            // var data = {
            //     // 属性选择器 一定要有空格！！！！！
            //     username: $('#form_reg [name=username]').val(),
            //     password: $('#form_reg [name=password]').val()
            // }
            // 获取所有属性名为name的属性值
            var data = $(this).serialize();
            // console.log(data);
            $.post('/api/reguser', data, function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功，请登录！')
                    // 模拟人的点击行为  跳转到登录页面
                $('#link_login').click()
            })
        })
        // 登录 
    $('#form_login').submit(function(e) {
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            type: 'POST',
            // 快速获取表单中的数据
            data: $(this).serialize(),
            success(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                    // 将服务器返回的用户唯一标识保存到本地存储
                localStorage.setItem('token', res.token);
                // 跳转到后台主页
                location.href = '/index.html'
            }
        })
    })


})