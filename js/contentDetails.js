/**
 * Created by Administrator on 2018/3/1.
 */
$(function(){



    var app=new Vue({
        el:"#app",
        data:{
            page:1,
            pagesize:5,
            isfansvisits:null,
            notfansvisits:null,
            visitData:null,
            name:null,
            imgUrl:null
        },
        methods:{
            getFsDetails:function(){
                var that=this;
                $.ajax({
                    url:URL+'/app/fans/contentdetails',
                    type:"get",
                    dataType:'json',
                    data:{
                        cid: getQueryStringByName("cid"),
                        page:this.page,
                        pagesize:this.pagesize
                    },
                    success:function(data){
                        console.log(data);
                        if(data.state>=0){
                            that.isfansvisits=data.contentdata.isfansvisits;
                            that.notfansvisits=data.contentdata.notfansvisits;
                            that.visitData=data.visitsdata;
                            that.name=data.contentdata.name;
                            that.imgUrl=data.contentdata.imgUrl;
                            setTimeout(function(){
                                var leftScrolla = new IScroll(".detailScroll", {
                                    scrollX: true,
                                    freeScroll: true ,
                                    click:true,
                                    tap:true
                                });
                            },500);
                        }
                    }
                });
            },
            back:function () {
                window.history.back();
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
            this.getFsDetails();
        }
    })
})