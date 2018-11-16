;$(function () {
    var _init = function(){
            this.tansfre()
    }
    _init.prototype = {
        data:[],
        identityCards:[],
        tansfre(){//事件函数
            var that = this;
            that.invoking();
            that.getData(2);
            $("button[name='refresh']").on("click",function(){//刷新页面
                window.location.reload()
            })
            $("#tb_departments").on("click", "button#through",function(){//审核通过
                that.examinationThrough($(this))
            }) 
            $("#tb_departments").on("click", "button#refused",function(){//审核拒绝
                that.examinationRefused($(this))
            }) 
            //#endregion
            $("#tb_departments").on("click","a#logoImg",function(){//查看logo
                var imgUrls = $(this).attr("dataType");
                $.showImg(imgUrls)
            })
            $("#tb_departments").on("click","a#hospitalImgList",function(){//查看环境照片
                var imgUrls = $(this).attr("dataType");
                $.showImg(imgUrls)
            })
            $("#tb_departments").on("click","a#hospitalSummary",function(){//查看简介
                var hospitalSummary = $(this).attr("dataType");
                swal({
                    title:'',
                    text:hospitalSummary 
                })
            })
            
        },
        getData(){//获取数据
            swal({
                title: '',
                text: '正在加载，请稍后...', 
                showConfirmButton: false 
            })
            var that = this,
                url = ENV_LIST[0].baseUrl+"/shopInfo/list/decoration"
            $.ajax({
                type:"post",
                url:url,
                data:JSON.stringify({
                    "pageNum": 0,
                    "pageSize": 10,
                    "shopType": "P",
                    "status": "1"
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
                columns:[{
                        field: "shopName",
                        title: "机构简称"
                    },{
                        field: "hospitalAddress",
                        title: "机构地址"
                    },{
                        field: "logoImg",
                        title: "机构logo",
                        align: 'center',
                        valign: 'middle',
                        formatter: that.agencyLogo
                    },{
                        field: "hospitalImgList",
                        title: "机构环境照",
                        align: 'center',
                        valign: 'middle',
                        formatter: that.environment
                    },{
                        field: "hospitalSummary",
                        title: "机构简介",
                        align: 'center',
                        valign: 'middle',
                        formatter: that.introduction
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
                result += "<button type='button' dataType='"+row.shopId+"' id='through' class='btn btn-success'><a href='javascript:;'  title='通过'>通过</a></button>";
                result += "<button type='button' dataType='"+row.shopId+"' id='refused' class='btn btn-danger'><a href='javascript:;'  title='拒绝'>拒绝</a></button>";
            return result;
        },
        introduction(value, row, index){//查看简介
            var result = "";
            if(row.hospitalSummary == null){
                result += "<p>--</p>";
            }else{
                result += "<a href='javascript:;' dataType='"+row.hospitalSummary+"' id='hospitalSummary' title='查看'>查看</a>";
            }
            return result;
        },
        agencyLogo(value, row, index){//logo
            var result = "";
            if(row.logoImg == null){
                result += "<p>--</p>";
            }else{
                result += "<a href='javascript:;' dataType='"+row.logoImg+"' id='logoImg' title='查看'>查看</a>";
            }
            return result;
        },
        environment(value, row, index){//环境照片
            var result = "";
            if(row.hospitalImgList == null){
                result += "<p>--</p>";
            }else{
                result += "<a href='javascript:;' dataType='"+row.hospitalImgList+"' id='hospitalImgList' title='查看'>查看</a>";
            }
            return result;
        },
        examinationThrough(that){
            var shopId = that.attr("dataType"),
                url = ENV_LIST[0].baseUrl+"/shopInfo/check/decoration";
            swal({ 
                title: "确定审批通过吗？", 
                text: "请认真得审核资料信息！", 
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
                        "shopId": ""+shopId+"",
                        "status": "2"
                    }),
                    contentType: "application/json;charset=UTF-8",
                    dataType:"json",
                    success:function(res){
                        if(res.flag == 20000){
                            swal({
                                title:"干得漂亮！",
                                text:"审核通过已完成",
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
        },
        examinationRefused(that){
            var shopId = that.attr("dataType"),
                url = ENV_LIST[0].baseUrl+"/shopInfo/check/decoration";
                console.log(shopId)
            swal({ 
                title: "请输入拒绝原因！", 
                text: "",
                type: "input", 
                showCancelButton: true, 
                closeOnConfirm: false, 
                confirmButtonText: "确定", 
                cancelButtonText: "取消",
                animation: "slide-from-top", 
                inputPlaceholder: "不说出个理由今天打死你！" 
                },
                function(inputValue){ 
                if (inputValue === false) return false; 
                    
                if (inputValue === "") { 
                    swal.showInputError("为什么？是因为我不够漂亮么？");
                    return false;
                } 
                $.ajax({
                    type:"post", 
                    url:url,
                    data:JSON.stringify({
                        "reason": ""+inputValue+"",
                        "shopId": ""+shopId+"",
                        "status": "3"
                    }),
                    contentType: "application/json;charset=UTF-8",
                    dataType:"json",
                    success:function(res){
                        console.log(res)

                        if(res.flag == 20000){
                            swal({
                                title:"干得漂亮！",
                                text:"审核拒绝已完成",
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