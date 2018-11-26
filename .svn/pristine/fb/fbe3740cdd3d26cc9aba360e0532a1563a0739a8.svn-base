/**
 * Created by Administrator on 2018/2/7.
 */
$(function () {
    var app=new Vue({
        el:"#app",
        data:{
            userName:getQueryStringByName('creator'),
            apptoken:getQueryStringByName('apptoken'),
            id:getQueryStringByName('cid'),
            watchPass:'',
            name:null,
            describe:null,
            isPwd:null,
            isShow:true,
            productList:[],
            liveId:null,
            liveData:null,
            selectedPro:[],
            source:1,
            sendProduct:[],
            product:'',
            playurl:null,
            productlength:0
        },
        methods:{
            enterLiveDetails:function(){
                var that=this;
                $.ajax({
                    url:URL+'/app/videoRoom/details',
                    type:'get',
                    dataType:'json',
                    data:{
                        username:this.userName
                    },
                    success:function(data){
                        console.log(data);
                        if(data.state==0){
                            that.liveData=data.data;
                            if(getQueryStringByName('recommendData')){
                                var recommendData=JSON.parse(decodeURI(getQueryStringByName("recommendData")));
                                console.log(recommendData);
                                that.name=recommendData.name;
                                that.describe=recommendData.content_desc;
                                that.isPwd=recommendData.watch_type;
                                that.watchPass=recommendData.watchpass;
                            }else{
                                that.name=data.data.name;
                                that.describe=data.data.content_desc;
                                that.isPwd=data.data.watch_type;
                            }   
                            that.liveId=data.data.cid;
                            that.playurl=data.data.playurl;
                            that.getList();
                        }
                    },
                    error:function(err){
                        console.log(err);
                    }
                });
            },
            deltea:function(index){
                var that=this;
                this.selectedPro.splice(index,1);
                this.sendProduct.splice(index,1);
                that.product='';
                this.sendProduct.forEach(function(item){
                    
                  that.product+=item+',';
                  
                  });
                this.productlength=this.sendProduct.length;
                console.log(this.sendProduct);
                console.log(this.product);
            },
            // productDetails:function(){
            //     var that=this;
            //     $.ajax({
            //         url:URL+'/webapi/banner/live-particulars',
            //         type:'get',
            //         dataType:'json',
            //         data:{
            //             cid:this.id
            //         },
            //         success:function(data){
            //             console.log(data);
            //         }
            //     });
            // },
            pushlive:function(){
                window.channelsoft.loading();
                var that=this;
                listId=this.liveId;
                var fnType=this.isPwd;
                if(!this.watchPass){
                    if(this.isPwd==1){
                        fnType='';
                    }
                }
                var postData={
                    account:this.userName,
                    pwd:getQueryStringByName('pwd'),
                    playurl:this.playurl,
                    column_id:this.id,
                    title:this.name,
                    description:this.describe,
                    watchtype:fnType,
                    watchpass:this.watchPass,
                    product:this.product.substring(0,(this.product.length)-1)
                };
                $.ajax({
                    url:URL+'/webapi/livechannel/generate_update',
                    type:'post',
                    dataType:'json',
                    data:JSON.stringify(postData),
                    success:function(data){
                        console.log(data);
                        if(data.state.rc==0){
                            var postDataTwo={
                                token:getQueryStringByName('apptoken'),
                                channelid:listId
                            };
                            $.ajax({
                                url:URL+"/webapi/livechannel/start",
                                type:"post",
                                dataType:"json",
                                data:JSON.stringify(postDataTwo),
                                success:function(data){
                                    console.log(data);
                                    if(data.state.rc>=0){
                                        window.channelsoft.startPushLive2(JSON.stringify(that.liveData));
                                    }
                                },
                                error:function(err){
                                   
                                    console.log(err);
                                }
                            });

                        }else{
                            showTip(data.state.msg);
                        }
                    },
                    error:function(err){
                        console.log(err);
                    }
                })
              
                
                        
               
            },
            getList:function(){
                console.log(this.liveId);
                var that=this;
                $.ajax({
                    url:URL+"/webapi/banner/live-particulars",
                    type:"get",
                    dataType:"json",
                    data:{
                        cid:this.liveId
                    },
                    success:function(data){
                        console.log(data);
                        if(data.state.rc==0){
                            console.log(data.product_data.length)
                            for(var i=0;i<data.product_data.length;i++){
                                that.selectedPro.push(data.product_data[i]);
                            }
                            console.log(that.selectedPro);
                            that.selectedPro.forEach(function(item){
                                that.sendProduct.push(item.pid);
                            }); 
                            that.sendProduct.forEach(function(item){
                                console.log(item);
                                that.product+=item+',';
                                
                            });
                            that.productlength=that.sendProduct.length;
                        }
                    },
                    error:function(err){
                        console.log(err);
                    }
                });
            },
            changeShow:function(){
                this.isShow=!this.isShow;
                if(this.isShow){
                    $('.lookProduct').html('&#xe904;')
                }else{
                    $('.lookProduct').html('&#xe903;');
                }
            },
            back:function(){
                window.channelsoft.refreshLiveRoom();
            },
            toAddProduct:function(){
                var recommendData={
                    name:this.name,
                    content_desc:this.describe,
                    watch_type:this.isPwd,
                    watchpass:this.watchPass
                }
                window.location.href="./addRecommend.html?type="+this.source+"&creator="+getQueryStringByName('creator')+"&cid="+getQueryStringByName('cid')+"&apptoken="+getQueryStringByName('apptoken')+"&pwd="+getQueryStringByName('pwd')+"&recommendData="+JSON.stringify(recommendData);
            },
            needPassword:function(){
                this.isPwd=1;
            },
            noPassword:function(){
                this.isPwd=0;
            }
        },
        created:function(){
            this.enterLiveDetails();
            
            var that=this;
            if(getQueryStringByName('selectedProduct')){
                JSON.parse(decodeURI(getQueryStringByName('selectedProduct'))).forEach(function(item){
                    that.selectedPro.push(item);
                });
                console.log(this.selectedPro);
                
                
            }
            
           
        }
    });
    var windowHeight=document.documentElement.clientHeight;
    window.onresize=function(){
        if(document.documentElement.clientHeight<windowHeight){
            $('.startLive').hide();
        }else{
            $('.startLive').show();
        }
    }
    window.stopLive2=function(state){
        var stopData={
            channelid:listId,
            token:getQueryStringByName('apptoken')
        };
        if(state==1){
            $.ajax({
                url:URL+"/webapi/livechannel/close",
                type:"post",
                dataType:"json",
                data:JSON.stringify(stopData),
                success:function(data){
                    
                    if(data.state.rc>=0){
                        window.channelsoft.stopLiveSuccess();
                    }else{
                        window.channelsoft.closeLiveFailed();
                    }
                },
                error:function(err){
                   
                    console.log(err);
                    showTip('退出直播失败');
                    window.channelsoft.closeLiveFailed();
                }
            });
        }else if(state==0){
            $.ajax({
                url:URL+"/webapi/livechannel/pause",
                type:"post",
                dataType:"json",
                data:JSON.stringify(stopData),
                success:function(data){
                    if(data.state.rc>=0){
                        window.channelsoft.pauseLiveSuccess();
                    }
                },
                error:function(err){
                    console.log(err);
                    showTip('暂停直播失败');
                    window.channelsoft.closeLiveFailed();
                }
            });
        }
    }
});