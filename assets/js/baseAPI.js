// 发送请求之前执行
// options：请求参数对象
// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function(options) {
    // console.log(options);
    // 在发起真正的Ajax请求之前，统一拼接请求的根路径
    options.url = 'http://ajax.frontend.itheima.net' + options.url;

    // 统一为有权限的接口，设置headers 请求头
    // indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置。如果要检索的字符串值没有出现，则该方法返回 -1
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    // 当请求结束后,判断用户的设置访问权限
    // 每次请求都会进行判断
    options.complete = function(res) {
        // 当用户身份认证失败后
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 强制清空本地 token
            localStorage.removeItem('token')
                // 强制跳转到登录页面
            location.href = '/login.html'
        }
    }

})