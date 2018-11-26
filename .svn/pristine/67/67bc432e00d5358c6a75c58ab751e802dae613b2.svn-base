$(function(){
    var app=new Vue({
        el:'#app',
        data:{
            userAccessList:null,
            fansId:null,
            watch_number:null,
            watch_length:null,
            visitsdata:null,
        },
        methods:{
            getUserAccessList:function(){
                var that=this;
                $.ajax({
                    url:URL+'/app/fans/fansdetails',
                    type:'get',
                    dataType:'json',
                    data:{
                        id:getQueryStringByName('id'),
                        username:getQueryStringByName('creator')
                    },
                    success:function(data){
                        console.log(data);
                        if(data.state>=0){
                            that.fansID=data.fansData.fansID;
                            that.watch_number=data.fansData.watch_number;
                            that.watch_length=data.fansData.watch_length;
                            that.visitsdata=data.visitsData;
                        }
                    },
                    error:function(err){
                        console.log(err);
                    }
                });
            },
            back:function(){
                window.history.go(-1);
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
            }
        },
        created:function(){
            this.getUserAccessList();
            setTimeout(function(){
                var leftScrolla = new IScroll(".itemContainer", {
                    scrollX: true,
                    freeScroll: true ,
                    click:true,
                    tap:true
                });
            },500);
        }
    });
});