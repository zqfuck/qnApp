/**
 * Created by Administrator on 2018/2/1.
 */
$(function () {
    $("#loginBtn").click(function () {
        $('.loading').css('display','block');
        var name = $("#name").val();
        var pass = $("#pass").val();
        if(name==''||name==null||name==undefined){
            showTip('请输入用户名');
            return;
        };
        if(pass==''||pass==null||pass==undefined){
            showTip('请输入密码');
            return;
        };
        var data = {
            account:name,
            pwd:pass
        };
        $.ajax({
            url: URL + '/internal/usergroup/login',
            type: "post",
            dataType: "json",
            data: JSON.stringify(data),
            error: function (data) {
                console.log(data);
                showTip(data.msg);
            },
            success: function (data) {
                console.log(data);
                if(data.state.rc>=0){
                    var appid = data.result.enterprises[0].appid;
                    data = {appid:appid};
                    $.ajax({
                        url: URL + '/webapi/account/authorize',
                        type: "post",
                        dataType: "json",
                        data: JSON.stringify(data),
                        error: function (data) {
                            console.log(data);
                            showTip(data.msg);
                        },
                        success: function (data) {
                            console.log(data);
                            if(data.state.rc==0){
                                var token = data.result.token;
                                var passWord=$('#pass').val();
                                var mdPwd=$.md5(passWord);
                                $('.loading').css('display','none');
                                onLogin(token,name,mdPwd);
                                showTip('登陆成功');
                            }else {
                                showTip(data.state.msg);
                                $('.loading').css('display','none');
                            }
                        }
                    });
                }else {
                    showTip(data.state.msg);
                    $('.loading').css('display','none');
                }
            }
        });
    })
    //安卓js交互
    
    function onLogin(tokenString,nameString,mdPwd){
        window.channelsoft.onToken(tokenString,nameString,mdPwd);
    };
    function onLogin(tokenString,nameString,mdPwd){
        window.channelsoft.onToken(tokenString,nameString,mdPwd);
    };
    window.autoInput=function(_name){
          $("#name").val(''+_name); 
     };

})


























