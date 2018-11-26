$(function(){
    var app=new Vue({
        el:"#app",
        data:{
            page:1,
            pagesize:2,
            fansnumber:null,
            isfansvisits:null,
            notfansvisits:null,
            visitData:[],
            username:getQueryStringByName('creator')
        },
        methods:{
            getFsDetails:function(){
                var that=this;
                $.ajax({
                    url:URL+'/app/fans/fanspage',
                    type:"get",
                    dataType:'json',
                    data:{
                        username:this.username,
                        page:this.page,
                        pagesize:this.pagesize
                    },
                    success:function(data){
                        console.log(data);
                        if(data.state>=0){
                            that.fansnumber=data.numberData.fansnumber;
                            that.isfansvisits=data.numberData.isfansvisits;
                            that.notfansvisits=data.numberData.notfansvisits;
                            that.dataLength=data.visitsData.length;
                            for (var i=0;i<data.visitsData.length;i++){
                                that.visitData.push(data.visitsData[i]);
                            }
                            that.visitsTotal=data.visitsTotal;
                        }
                    }
                });
            },
            downCallback:function(){
                this.page=1;
                this.visitData=[];
                this.getFsDetails();
                mescroll.endSuccess();
            },
            upCallback:function(){
                this.page+=1;
                var that=this;
                // if(this.page<=Math.ceil(this.visitsTotal/ this.pagesize)){
                     $.ajax({
                         url:URL+'/app/fans/fanspage',
                         type:"get",
                         dataType:'json',
                         data:{
                             username:this.username,
                             page:this.page,
                             pagesize:this.pagesize
                         },
                         success:function(data){
                             console.log(data);
                             if(data.state>=0){
                                 that.dataLength=data.visitsData.length;
                                 for (var i=0;i<data.visitsData.length;i++){
                                     that.visitData.push(data.visitsData[i]);
                                 }
                                 //that.visitsTotal=data.visitsTotal;
                                // console.log(that.visitData.length)
                                 mescroll.endBySize(this.dataLength*this.page, this.visitsTotal);
                                 if (that.visitData.length>=that.visitsTotal){
                                     $(".mescroll-upwarp").css("visibility","visible");
                                     $(".upwarp-progress").hide();
                                     $(".upwarp-tip").html("--End--");
                 
                                 }
                             }
                         }
                     });
            },
            transTime:function(longTime) {
                var day = new Date(longTime); //将毫秒转化为当前日期
                var year = day.getFullYear();
                var month = day.getMonth()+1;
                var date = day.getDate();
                var hour = day.getHours();
                var minutes = day.getMinutes();
                var seconds = day.getSeconds();
                if(month<10){
                    month = "0"+month;
                }
                if(date<10){
                    date = "0"+date;
                }
                if(hour<10){
                    hour = "0"+hour;
                }
                if(minutes<10){
                    minutes = "0"+minutes;
                }
                if(seconds<10){
                    seconds = "0"+seconds;
                }
                var newDay = year+"/"+month+"/"+date+"/"+hour+":"+minutes

                return newDay;
            },
            toContentAccess:function(){
                window.location.href="./html/contentAccess.html?creator="+this.username;
            },
            toUersAccess:function(item){
                window.location.href="./html/userAccessDetails.html?id="+item.id+"&creator="+this.username;
            },
            toContentDetails:function(item){
                window.location.href="./html/contentDetails.html?cid="+item.cid;
            }
        },
        created:function(){
            this.getFsDetails();
            var that=this;
            setTimeout(function(){
                    mescroll = new MeScroll("mescroll", { //第一个参数"mescroll"对应上面布局结构div的id
                    //如果您的下拉刷新是重置列表数据,那么down完全可以不用配置,具体用法参考第一个基础案例
                    //解析: down.callback默认调用mescroll.resetUpScroll(),而resetUpScroll会将page.num=1,再触发up.callback
                    down: {
                        auto:false,
                        callback: that.downCallback //下拉刷新的回调,别写成downCallback(),多了括号就自动执行方法了
                    },
                    up: {
                        callback: that.upCallback , //上拉加载的回调
                        auto:false,
                        offset:30,
                        isBounce: true //如果您的项目是在iOS的微信,QQ,Safari等浏览器访问的,建议配置此项.解析(必读)
                    }
                });
            },500);
           
              
           
           
        }
    });
});