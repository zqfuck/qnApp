$(function(){
    var qualityState;
    var headPic = '';
    var nickName = '';
    var introduce = '';
    var quality=getQueryStringByName('quality');
    if(qualityState){
        quality=qualityState;
    }
    if(quality==1){
        $('#Standard').addClass('active');
    }else if(quality==2){
        $('#hd').addClass('active');
    }else if(quality==3){
        $('#superClear').addClass('active');
    }
    
  
    var creater=getQueryStringByName('creator');
    function getQueryStringByName(name){
        var result = location.search.match(new RegExp("[\?\&]" + name+ "=([^\&]+)","i"));

        if(result == null || result.length < 1){

            return "";

        }

         return result[1];
    };

    $.ajax({
       // url:URL+'/app/setting/personage',
        url:'http://livetapi.v114.com/app/setting/personage',
        type:"get",
        dataType:'json',
        data:{
            username:creater
        },
        success:function(data){
            console.log(data)
            if (data.state.rc==0){
                if (data.data.nickname){
                    nickName = data.data.nickname
                    $("#host-name").html(data.data.nickname);
                }else {
                    nickName = creater;
                    $("#host-name").html(creater);
                };
                if(data.data.headimg.length>0){
                    headPic = data.data.headimg;
                    $("#headPic").prop("src",data.data.headimg);
                }
                if(data.data.summary.length>0){
                    introduce = data.data.summary;
                    $("#host-intro").html(data.data.summary);
                }
            }
        },
        error:function(err){
            $('#host-name').html(creater);
            console.log(err);
        }
    })


    $('.back').click(function(){
        window.history.go(-1);
    })
    $('.host').click(function(){
        window.location.href="./html/changeInfo.html?nickname="+nickName+"&headpic="+headPic+"&introduce="+introduce+"&creator="+creater;
    });
    $('#changePassword').click(function(){
        window.location.href="./html/changePassword.html?creator="+creater;
    });
    $('#liveSetting').click(function(){
        window.location.href="./html/settingClarity.html?quality="+quality;
    });
    $('#about').click(function(){
        window.location.href="./html/about.html";
    });
    $('#confirmChange').click(function(){
        if(!$('#oldPassword').val()){
            showTip('请输入密码');
            return;
        }
        if(!$('#newPassword').val()){
            showTip('请输入新密码');
            return;
        }
        if(!$('#confrimPassword').val()){
            showTip('请确认密码');
            return;
        }
        var old_pass=$('#oldPassword').val();
        var new_pass=$('#newPassword').val();
        var re_pass=$('#confrimPassword').val();
        var postData={
            username:creater,
            old_pass:old_pass,
            new_pass:new_pass,
            re_pass:re_pass
        }
        $.ajax({
            url:URL+'/app/manager/resetpass',
            type:"post",
            dataType:'json',
            data:JSON.stringify(postData),
            success:function(data){
                if(data.rc==0){
                    showTip(data.msg);
                    $('#oldPassword').val('');
                    $('#newPassword').val('');
                    $('#confrimPassword').val('');
                   showTip('密码修改成功'); 
                }else{
                    showTip(data.msg);
                }
            },
            error:function(err){
                console.log(err);
            }
        })
    });
    $('#saveChange').click(function(){
        var state=1;
        if($('#Standard').hasClass('active')){
            state=1;
        }else if($('#hd').hasClass('active')){
            state=2;
        }else if($('#superClear').hasClass('active')){
            state=3;
        }
        console.log(state);
        showTip('设置成功');
        qualityState=state;
        window.channelsoft.videoQuality(state);
    });
    $('.settingClarity span').click(function(){
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
       
    });
    $('.loginOut').click(function(){
        //window.location.href="./login.html";
        
        //showTip('注销');
        window.channelsoft.loginOut();
    });
    $('#productDetails').click(function(){
        $('.aboutDetails').css('display','none');
        $('#website').css('display','block');
        $('#website').attr('src','http://www.v114.com');
    });
    $('#productTel').click(function(){
        window.channelsoft.phoneCall('01088822000');
    });
})