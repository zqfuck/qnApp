/**
 * Created by Administrator on 2018/2/2.
 */
$(function(){
    var cid;
    var app = new Vue({
        el:"#app",
        data:{
            listMessage:[],
            recommendMsg:null
        },
        methods:{
            getList:function(){
                console.log(123);
                var that=this;
                $.ajax({
                    url:URL+"/webapi/banner/live-particulars",
                    type:"get",
                    dataType:"json",
                    data:{
                       cid:cid
                    },
                    success:function(data){
                        console.log(data);
                        if(data.state.rc==0){
                            console.log(data.product_data.length)
                            for(var i=0;i<data.product_data.length;i++){
                                that.listMessage.push(data.product_data[i]);
                            }
                            console.log(that.listMessage);
                        }
                    },
                    error:function(err){
                        console.log(err);
                    }
                })
            },
            pushRecommend:function(item,index){
                var item = JSON.stringify(item);
                //var item = item;
               // console.log(item);
                this.recommendMsg = item;
                $(".commend").show();
                $(".normal").removeClass("check").eq(index).addClass("check");
            },
            recommend:function () {
                console.log( this.recommendMsg)
                //initDanmu("songlk","5a6893de9151935bc54a5e54af984c00");
                console.log(JSON.stringify({"CMD":"RecommandProduct","product":this.recommendMsg}))
                var msg = JSON.stringify({"CMD":"RecommandProduct","product":this.recommendMsg});
                onSendMsgTxt(msg);
                $(".normal").removeClass("check");
                window.channelsoft.onSendMsgSuccess(this.recommendMsg);
            }

        },
        beforeCreate:function () {

        },
        created:function(){
            var self=this;
           
            window.initProduct=function(_cid,userid,topicid) {
                cid = _cid;
                self.getList();
                alert('topicid'+topicid);
                initTcDanmu(userid,topicid);
        };
        }
    })
})