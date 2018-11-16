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
            /*
            * 事件代理方式，为了避免加载dom出错
            */ 
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
            $("#tb_departments").on("click","a#photoImg",function(){//查看医生头像
                var imgUrls = $(this).attr("dataType");
                $.showImg(imgUrls)
            })
            $("#tb_departments").on("click","a#doctorImgList",function(){//查看医师执业证书
                var imgUrls = $(this).attr("dataType");
                $.showImg(imgUrls)
            })
            $("#tb_departments").on("click","a#doctorSummary",function(){//查看简介
                var doctorSummary = $(this).attr("dataType");
                swal({
                    title:'',
                    text:doctorSummary 
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
                    "shopType": "D",
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
                        title: "医生姓名"
                    },{
                        field: "photoImg",
                        title: "头像",
                        align: 'center',
                        valign: 'middle',
                        formatter: that.checkHeadImg
                    },{
                        field: "doctorImgList",
                        title: "荣誉证书",
                        align: 'center',
                        valign: 'middle',
                        formatter: that.honoraryCertificate
                    },{
                        field: "doctorProjects",
                        title: "擅长项目"
                    },{
                        field: "doctorSummary",
                        title: "医生简介",
                        align: 'center',
                        valign: 'middle',
                        formatter: that.introduction
                    },{
                        field: "date",
                        title: "操作日期"
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
        checkHeadImg(value, row, index){//查看头像
            var result = "";
            if(row.photoImg == null){
                result += "<p>--</p>";
            }else{
                result += "<a href='javascript:;' dataType='"+row.photoImg+"' id='photoImg' title='查看'>查看</a>";
            }
            return result;
        },
        actionFormatter(value, row, index){//操作栏的格式化
            var result = "";
                result += "<button type='button' dataType='"+row.shopId+"' id='through' class='btn btn-success'><a href='javascript:;'  title='通过'>通过</a></button>";
                result += "<button type='button' dataType='"+row.shopId+"' id='refused' class='btn btn-danger'><a href='javascript:;'  title='拒绝'>拒绝</a></button>";
            return result;
        },
        introduction(value, row, index){//查看简介
            var result = "";
            if(row.doctorSummary == null){
                result += "<p>--</p>";
            }else{
                result += "<a href='javascript:;' dataType='"+row.doctorSummary+"' id='doctorSummary' title='查看'>查看</a>";
            }
            return result;
        },
        honoraryCertificate(value, row, index){//荣誉证书
            var result = "";
            if(row.doctorImgList == null){
                result += "<p>--</p>";
            }else{
                result += "<a href='javascript:;' dataType='"+row.doctorImgList+"' id='doctorImgList' title='查看'>查看</a>";
            }
            return result;
        },
        doctorProjects(value, row, index){//医师执业证书
            var result = "";
            if(row.doctorProjects == null){
                result += "<p>--</p>";
            }else{
                result += "<a href='javascript:;' dataType='"+row.doctorProjects+"' id='hospitalImgList' title='查看'>查看</a>";
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