$(function(){
    var app=new Vue({
        el:'#app',
        data:{
            contentList:[],
            page:1,
            pagesize:8,
            visitsTotal:null,
            dataLength:null
        },
        methods:{
            getContentList:function(){
                var that=this;
                $.ajax({
                    url:URL+'/app/fans/contentstatistics',
                    type:'get',
                    dataType:'json',
                    data:{
                        username:getQueryStringByName('creator'),
                        page:this.page,
                        pagesize:this.pagesize
                    },
                    success:function(data){
                        console.log(data);
                        if(data.state>=0){
                            data.data.forEach(function(item){
                                that.contentList.push(item);
                                that.visitsTotal=data.total;
                            });
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
            toContentAccess:function(item){
                window.location.href="../html/contentDetails.html?cid="+item.cid;
            },
            downCallback:function(){
                this.page=1;
                this.contentList=[];
                this.getContentList();
                mescroll.endSuccess();
            },
            upCallback:function(){
                this.page+=1;
                var that=this;
                // if(this.page<=Math.ceil(this.visitsTotal/ this.pagesize)){
                    $.ajax({
                        url:URL+'/app/fans/contentstatistics',
                        type:'get',
                        dataType:'json',
                        data:{
                            username:getQueryStringByName('creator'),
                            page:this.page,
                            pagesize:this.pagesize
                        },
                        success:function(data){
                            console.log(data);
                            if(data.state==0){
                                console.log(data.data.length);
                                that.dataLength=data.data.length;
                                data.data.forEach(function(item){
                                    that.contentList.push(item);
                                });
                                mescroll.endBySize(this.dataLength*this.page, this.visitsTotal);
                                if (that.contentList.length>=that.visitsTotal){
                                    console.log(123);
                                    $(".mescroll-upwarp").css("visibility","visible");
                                    $(".upwarp-progress").hide();
                                    $(".upwarp-tip").html("--End--");
                
                                }
                            }
                            
                        },
                        error:function(err){
                            console.log(err);
                        }
                    });
            }
        },
        created:function(){
            var that=this;
            this.getContentList();
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