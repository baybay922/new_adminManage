;$(function () {
    var _init = function(){
            this.tansfre()
    }
    _init.prototype = {
        data:[],
        tansfre(){//事件函数
            var that = this;
            that.invoking();
            that.getData();
            $("button[name='refresh']").on("click",function(){//刷新页面
                window.location.reload()
            })
            $("#tb_departments").on("click","a#showUrl",function(){//查看环境照片
                var imgUrls = $(this).attr("dataType");
                $.showImg(imgUrls)
            })
            $("#tb_departments").on("click","button#through",function(){//上架
               that.onlineShelves($(that))
            })
            
            
        },
        getData(){//获取数据
            swal({
                title: '',
                text: '正在加载，请稍后...', 
                showConfirmButton: false 
            })
            var that = this,
                url = ENV_LIST[0].baseUrl+"/product/listpc"
            $.ajax({
                type:"post",
                url:url,
                data:JSON.stringify({
                    "isOnline": 1,
                    "isOpen": 0
                }),
                contentType: "application/json;charset=UTF-8",
                success:function(res){
                    console.log(res)
                    $('#tb_departments').bootstrapTable('removeAll');
                    if(res.flag == 20000){
                        $('#tb_departments').bootstrapTable('append', res.data);
                        $(".sweet-overlay,.sweet-alert").remove();
                    }else{
                        swal({
                            title:'',
                            text:res.msg,
                            type: 'warning',
                            timer:3000,
                            showConfirmButton: false 
                        })
                    }
                   
                },
                error:function() {
                    swal({
                        title:"",
                        text: '数据加载失败，请稍后再试', 
                        showConfirmButton: true 
                    })
                }
            });
        },
        invoking(){//第三方方法调用
            var that = this;
            $("#tb_departments").bootstrapTable({
                data:that.data,
                pagination: true,                   //是否显示分页（*）
                striped : true,                     // 是否显示行间隔色
                sidePagination: "client",           //分页方式：client客户端分页，server服务端分页（*）
                pageNumber: 1,                      //初始化加载第一页，默认第一页,并记录
                pageSize: 10,                        //每页的记录行数（*）
                pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）
                search: true,                       //显示搜索框
                resetSearch:"请输入搜索内容",
                showRefresh: true,                  //是否显示刷新按钮
                minimumCountColumns: 2,             //最少允许的列数 
                columns:[
                    {
                        field: "productName",
                        title: "产品名称"
                    },{
                        field: "showUrl",
                        title: "产品封面图",
                        align: 'center',
                        valign: 'middle',
                        formatter: that.coverImg
                    },{
                        field: "shopName",
                        title: "供应商"
                    },{
                        field: "updatetime",
                        title: "上架日期"
                    },{
                        field: "option",
                        title: "操作",
                        align: 'center',
                        valign: 'middle',
                        formatter: that.actionFormatter
                    }
                ]
            })
        },
        actionFormatter(value, row, index){//操作栏的格式化
            var result = "";
                result += "<button type='button' dataType='"+row.productId+"' id='through' class='btn btn-success'><a href='javascript:;'  title='上架'>上架</a></button>";
                result += "<button type='button' dataType='"+row.productId+"' id='preview' class='btn btn-primary'><a href='javascript:;'  title='预览'>预览</a></button>";
            return result;
        },
        coverImg(value, row, index){//产品封面
            var result = "";
            if(row.showUrl == null){
                result += "<p>--</p>";
            }else{
                result += "<a href='javascript:;' dataType='"+row.showUrl+"' id='showUrl' title='查看'>查看</a>";
            }
            return result;
        },
        onlineShelves(that){//上架
            var productId = that.attr("dataType"),
                url = ENV_LIST[0].baseUrl+"/product/updatestatus";
                swal({ 
                    title: "确定把次产品下架吗？", 
                    text: "请认真得审查产品资料信息！", 
                    type: "warning",
                    showCancelButton: true, 
                    confirmButtonText: "确定", 
                    cancelButtonText: "取消",
                    closeOnConfirm: false
                    },
                function(){
                    $.ajax({
                        type:"post", 
                        url:url,
                        data:JSON.stringify({
                            "isOnline": 0,
                            "isOpen": 0,
                            "productId": productId
                        }),
                        contentType: "application/json;charset=UTF-8",
                        dataType:"json",
                        success:function(res){
                            if(res.flag == 20000){
                                swal({
                                    title:"干得漂亮！",
                                    text:"产品下架已完成",
                                    type:"success",
                                    timer:2000
                                })
                                setTimeout(()=>{
                                    window.location.reload()
                                },2000)
                            }else{
                                swal({
                                    title:'',
                                    text:res.msg,
                                    type: 'warning',
                                    timer:3000,
                                    showConfirmButton: false 
                                })
                            }
                        },
                        error:function() {
                            swal({
                                title:"",
                                text: '数据加载失败，请稍后再试', 
                                showConfirmButton: true 
                            })
                        }
                    });
                });  
        }

    }
    return new _init();
});