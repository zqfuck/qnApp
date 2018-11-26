$("body").append("<script language='javascript' src='sdk/webim.js?v=1'></script>");
$("body").append("<script language='javascript' src='sdk/json2.js'></script>");
$("body").append("<script language='javascript' src='js/demo_base.js'></script>");
$("body").append("<script language='javascript' src='js/demo_group_notice.js'></script>");
       //帐号模式，0-表示独立模式，1-表示托管模式
    var accountMode = 0;

    //官方 demo appid,需要开发者自己修改（托管模式）
    var sdkAppID = 1400047237;
    var accountType = 18561;

    var avChatRoomId = '';//'5a9836733d348e0c2ce1f3da41b86c34';  //默认房间群ID，群类型必须是直播聊天室（AVChatRoom），这个为官方测试ID(托管模式)

    if (webim.Tool.getQueryString("groupid")) {
        avChatRoomId = webim.Tool.getQueryString("groupid");//用户自定义房间群id
    }

    var selType = webim.SESSION_TYPE.GROUP;
    var selToID = avChatRoomId;//当前选中聊天id（当聊天类型为私聊时，该值为好友帐号，否则为群号）
    var selSess = null;//当前聊天会话

    //默认群组头像(选填)
    var selSessHeadUrl = 'img/2017.jpg';


    //当前用户身份
    var loginInfo = {
        'sdkAppID': sdkAppID, //用户所属应用id,必填
        'appIDAt3rd': sdkAppID, //用户所属应用id，必填
        'accountType': accountType, //用户所属应用帐号类型，必填
        'identifier': null, //当前用户ID,必须是否字符串类型，选填
        'identifierNick': "null", //当前用户昵称，选填
        'userSig': null, //当前用户身份凭证，必须是字符串类型，选填
        'headurl': 'img/2016.gif'//当前用户默认头像，选填
    };
    //监听（多终端同步）群系统消息方法，方法都定义在demo_group_notice.js文件中
    //注意每个数字代表的含义，比如，
    //1表示监听申请加群消息，2表示监听申请加群被同意消息，3表示监听申请加群被拒绝消息等
    var onGroupSystemNotifys = {
        //"1": onApplyJoinGroupRequestNotify, //申请加群请求（只有管理员会收到,暂不支持）
        //"2": onApplyJoinGroupAcceptNotify, //申请加群被同意（只有申请人能够收到,暂不支持）
        //"3": onApplyJoinGroupRefuseNotify, //申请加群被拒绝（只有申请人能够收到,暂不支持）
        //"4": onKickedGroupNotify, //被管理员踢出群(只有被踢者接收到,暂不支持)
        "5": onDestoryGroupNotify, //群被解散(全员接收)
        //"6": onCreateGroupNotify, //创建群(创建者接收,暂不支持)
        //"7": onInvitedJoinGroupNotify, //邀请加群(被邀请者接收,暂不支持)
        //"8": onQuitGroupNotify, //主动退群(主动退出者接收,暂不支持)
        //"9": onSetedGroupAdminNotify, //设置管理员(被设置者接收,暂不支持)
        //"10": onCanceledGroupAdminNotify, //取消管理员(被取消者接收,暂不支持)
        "11": onRevokeGroupNotify, //群已被回收(全员接收)
        "255": onCustomGroupNotify//用户自定义通知(默认全员接收)
    };


    //监听连接状态回调变化事件
    var onConnNotify = function (resp) {
        switch (resp.ErrorCode) {
            case webim.CONNECTION_STATUS.ON:
                //webim.Log.warn('连接状态正常...');
                break;
            case webim.CONNECTION_STATUS.OFF:
                webim.Log.warn('连接已断开，无法收到新消息，请检查下你的网络是否正常');
                break;
            default:
                webim.Log.error('未知连接状态,status=' + resp.ErrorCode);
                break;
        }
    };


    //监听事件
    var listeners = {
        "onConnNotify": onConnNotify, //选填
        "jsonpCallback": jsonpCallback, //IE9(含)以下浏览器用到的jsonp回调函数,移动端可不填，pc端必填
        "onBigGroupMsgNotify": onBigGroupMsgNotify, //监听新消息(大群)事件，必填
        "onMsgNotify": onMsgNotify,//监听新消息(私聊(包括普通消息和全员推送消息)，普通群(非直播聊天室)消息)事件，必填
        "onGroupSystemNotifys": onGroupSystemNotifys, //监听（多终端同步）群系统消息事件，必填
        "onGroupInfoChangeNotify": onGroupInfoChangeNotify//监听群资料变化事件，选填
    };

    var isAccessFormalEnv = true;//是否访问正式环境

    if (webim.Tool.getQueryString("isAccessFormalEnv") == "false") {
        isAccessFormalEnv = false;//访问测试环境
    }

    var isLogOn = true;//是否在浏览器控制台打印sdk日志

    //其他对象，选填
    var options = {
        'isAccessFormalEnv': isAccessFormalEnv,//是否访问正式环境，默认访问正式，选填
        'isLogOn': isLogOn//是否开启控制台打印日志,默认开启，选填
    };

    var curPlayAudio = null;//当前正在播放的audio对象

    var openEmotionFlag = false;//是否打开过表情

    if (accountMode == 1) {//托管模式
        //判断是否已经拿到临时身份凭证
        if (webim.Tool.getQueryString('tmpsig')) {
            if (loginInfo.identifier == null) {
                webim.Log.info('start fetchUserSig');
                //获取正式身份凭证，成功后会回调tlsGetUserSig(res)函数
                TLSHelper.fetchUserSig();
            }
        } else {//未登录,无登录态模式
            //sdk登录
            sdkLogin();
        }
    } else {//独立模式
      //  $('#login_dialog').show();
        //sdkLogin();
    }
    if(/debug/gi.test(location.hash)){
        document.write('<script src="http://sdklog.isd.com/js/vconsole.min.js"></scr'+'ipt>');
    }

    function colseLogin(){
        $('#login_dialog').hide();
   }

//--------开始执行--------------------------------------------------------

    var BaseIP='http://liveapi.v114.com';

    // http://api.live.v114.com
//当前用户身份
    var channelsoftCfg = {
        'getUserSigApi': BaseIP+'/internal/usergroup/getusersig' ,//用户所属应用id,必填
        'getHistoryApi': BaseIP+'/msg/history/list'
    };
  // $(document).ready(function(){
    // var userid="jin2017";
    // var usersig="eJxlj01vgkAURff8CsKWpp0PBrGJCyPVNmpJ0UB1Q8gwmicVJzCMqOl-r0WTkvRtz7nv5l4M0zSt5WzxmHJ*qAuVqJMUlvlsWsh6*INSQpakKqFl9g*KRkIpknSjRNlCzBgjCHUdyEShYAN3YwcFQbjXEaosT9qW2wfnGqeei7yuAtsWzl8*Rm-j*um1cuVXQNf26X1xjnw92trhbJqvVw2JvGDFZRjmTTzBQxjG4x22JWb9qZ5AHX3G87PtV31OtI-coHfkJavEHqlIHweDTqWCvbhPQo5Hmes5HapFWcGhaIXrHIYJRb9nGd-GDy9CXMA_";
    //    $('#login_dialog').hide();
    //       independentLogin(userid,usersig);
   // });

    var mGroupId='';

     $(document).ready(function(){
  //测试获取htpp传入的参数
 
   //  $('#login_dialog').hide();//登陆对话框隐藏
   //  $('#video-discuss-form').hide();
        // $('.video-discuss').hide();//点赞  发消息隐藏
        // makeToast('nihaoo');
        //测试对外接口   js初始化立即执行
    //  var myuserid='songlk';//GetQueryString("my_var");//'tw20171';

    // mGroupId ='e9fc4c97e4fe0629955a4c0d8dda789a';
     //测试：后期注释   让native触发
   // initDanmu(myuserid,mGroupId);

  //----发送消息接口
// setTimeout(function() {
//                     //解析频道信息
//                   onSendMsgTxt('88888888888');
//                  }, 3000);//5s后自动拉取到历史
     });

// http://livetapi.v114.com/comment?tid=e9fc4c97e4fe0629955a4c0d8dda789a&nickname=songlk
 // <!-- http://192.168.8.107:8002/tencentdanmu/jh_customed.html -->

//get the http param
function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}
// http://10.130.42.4:8002/tencentdanmu/index.html

//"tw2017"
//'5a9836733d348e0c2ce1f3da41b86c34';


//对外api   native->js  param::userid用户id  groupid群组id
//js-obj::channelsoft
function channelSoftLogin(userid,groupid){//
    //alert("channelSoftLogin");
    avChatRoomId=groupid;
    selToID=groupid;
     login(userid);
}

function login(userid){
    getUserSig(userid,function(usersig){
       console.log("usersig获取成功="+usersig);
        // alert('userid'+userid);
         //alert('usersig'+usersig);
         independentLogin(userid,usersig);
         setTimeout(function() {
                    //解析频道信息
                      getHistory(mGroupId);
                }, 500);//5s后自动拉取到历史

    });
}

//http-api-getusersig   获取usersig
function getUserSig(myaccount,afterGetUserSig){
     console.log("--------1getUserSig" );
    var URL=channelsoftCfg.getUserSigApi;
        $.ajax({
                    url : URL,
                    type : 'post',
                    //contentType: "application/json;charset=utf-8",
                    data : JSON.stringify({"account":myaccount}),
                    dataType : "json",
                    success : function(result) {
                       console.log("--------success::"+JSON.stringify(result));//转化为string
                    //   var parsedJson = JSON.parse(result);//转化为object
                    var userSig=result.result.userSig;
                         afterGetUserSig(userSig);
                    },
                    error:function(msg){
                       console.log("-----------error!!!!!!!!");
                    }
              });
 }
//获取历史
function getHistory(_topicid){
    console.log('--------------->getHistory');
    $.ajax({
                    url : channelsoftCfg.getHistoryApi,
                    type : 'GET',
                    //contentType: "application/json;charset=utf-8",
                    data : {
                         topicid:_topicid,
                         page:1,
                         pagesize:20,
                         type:1
                         //
                    },
                    dataType : "json",
                    success : function(result) {
                       console.log("--------getHistory success::"+JSON.stringify(result));//
                             var Rows=result.data .reverse();//逆序;
                              $.each( Rows, function (index, item) {
                                      var msgobj=item;
                                      console.log(msgobj.msg+"  "+ msgobj.fromaccount);
                                    appenDanmuHistory(msgobj.fromaccount, msgobj.msg);
                                });
                    },
                    error:function(msg){
                       console.log("-----------getHistory error!!!!!!!!"+JSON.stringify(msg));
                    }
              });

}
// view追加列表
function appenDanmuHistory(_nikename ,_msg){
     var ul, li, paneDiv, textDiv, nickNameSpan, contentSpan;
         ul = document.getElementById("video_sms_list");
     var maxDisplayMsgCount = 10;
    //var opacityStep=(1.0/4).toFixed(2);
    var opacityStep = 0.1;
    var opacity;
    var childrenLiList = $("#video_sms_list").children();
    if (childrenLiList.length == maxDisplayMsgCount) {
        $("#video_sms_list").children(":first").remove();
        for (var i = 0; i < maxDisplayMsgCount; i++) {
            opacity = opacityStep * (i + 1) + 0.1;
            $('#video_sms_list').children().eq(i).css("opacity", opacity);
        }
    }
    li = document.createElement("li");
    paneDiv = document.createElement("div");
    paneDiv.setAttribute('class', 'video-sms-pane');
    textDiv = document.createElement("div");
    textDiv.setAttribute('class', 'video-sms-text');
    nickNameSpan = document.createElement("span");

      var colorList = ['red', 'green', 'blue', 'org'];
    var index = Math.round(_nikename.length % colorList.length);
    var color = colorList[index];
    nickNameSpan.setAttribute('class', 'user-name-' + color);
    nickNameSpan.innerHTML =  _nikename;
    contentSpan = document.createElement("span");
    nickNameSpan.removeAttribute("hidden");
     contentSpan.innerHTML = _msg;

      textDiv.appendChild(nickNameSpan);
    textDiv.appendChild(contentSpan);

    paneDiv.appendChild(textDiv);
    li.appendChild(paneDiv);
    ul.appendChild(li);
}




// -----js调用native
initTcDanmu=function(userid,topicid){
     //执行登陆 -获取sig-sdk登陆-获取历史
     //alert(typeof topicid);
    //alert('initTcDanmu');
     channelSoftLogin(userid,topicid);
}



// / initDanmu(myuserid,mGroupId);
 
//                     //解析频道信息
//  onSendMsgTxt('88888888888');
//                  












