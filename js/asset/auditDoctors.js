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
            $("#tb_departments").on("click", "button#checkInfo",function(){
                that.checkUersInfo($(this))
            }) 
            $("#tb_departments").on("click", "button#through",function(){//审核通过
                that.examinationThrough($(this))
            }) 
            $("#tb_departments").on("click", "button#refused",function(){//审核拒绝
                that.examinationRefused($(this))
            }) 
            //#endregion
            $("#tb_departments").on("click","a#content",function(){//查看简介
                var introductions = $(this).attr("dataType");
                swal({
                    title: '',
                    text: introductions 
                })
            })
            $("#tb_departments").on("click","a#qualification",function(){//查看医师资格证书
                var imgUrls = $(this).attr("dataType");
                $.showImg(imgUrls)
            })
            $("#tb_departments").on("click","a#homePages",function(){//查看医师执业证书
                var imgUrls = $(this).attr("dataType");
                $.showImg(imgUrls)
            })
            $("#tb_departments").on("click","a#honors",function(){//查看荣誉证书
                var imgUrls = $(this).attr("dataType");
                $.showImg(imgUrls)
            })
            $("#tb_departments").on("click","a#imgUrl",function(){//查看头像
                var imgUrls = $(this).attr("dataType");
                $.showImg(imgUrls)
            })
            
        },
        getData(){//获取数据
            swal({
                title: '',
                text: '正在加载，请稍后...', 
                showConfirmButton: false 
            })
            var that = this,
                url = ENV_LIST[0].baseUrl+"/doctor/app/aduit/doctorList"
            $.ajax({
                type:"get",
                url:url,
                contentType: "application/json;charset=UTF-8",
                success:function(res){
                    console.log(res.data[0])
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
                        field: "duty",
                        title: "职务"
                    },{
                        field: "workWire",
                        title: "从医年限"
                    },{
                        field: "education",
                        title: "学历"
                    },{
                        field: "content",
                        title: "医生简介",
                        align: 'center',
                        valign: 'middle',
                        formatter: that.introduction
                    },{
                        field: "qualification",
                        title: "医师资格证书",
                        align: 'center',
                        valign: 'middle',
                        formatter: that.qualification
                    },{
                        field: "homePages",
                        title: "医师执业证书",
                        align: 'center',
                        valign: 'middle',
                        formatter: that.practice
                    },{
                        field: "honors",
                        title: "荣誉证书",
                        align: 'center',
                        valign: 'middle',
                        formatter: that.honors
                    },{
                        field: "imgUrl",
                        title: "头像",
                        align: 'center',
                        valign: 'middle',
                        formatter: that.portrait
                    },{
                        field: "createtime",
                        title: "地区"
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
                result += "<button type='button' dataType='"+row.doctorId+"' id='through' class='btn btn-success'><a href='javascript:;'  title='通过'>通过</a></button>";
                result += "<button type='button' dataType='"+row.doctorId+"' id='refused' class='btn btn-danger'><a href='javascript:;'  title='拒绝'>拒绝</a></button>";
                result += "<button type='button' dataType='"+row.doctorId+"' id='checkInfo' class='btn btn-info'><a href='javascript:;' title='详情'>详情</a></button>";
            return result;
        },
        introduction(value, row, index){//查看简介
            var result = "";
            if(row.content == null){
                result += "<p>--</p>";
            }else{
                result += "<a href='javascript:;' dataType='"+row.content+"' id='content' title='查看'>查看</a>";
            }
            return result;
        },
        qualification(value, row, index){//医师资格证书
            var result = "";
            if(row.qualification == null){
                result += "<p>--</p>";
            }else{
                result += "<a href='javascript:;' dataType='"+row.qualification+"' id='qualification' title='查看'>查看</a>";
            }
            return result;
        },
        practice(value, row, index){//医师执业证书
            var result = "";
            if(row.homePages == null){
                result += "<p>--</p>";
            }else{
                result += "<a href='javascript:;' dataType='"+row.homePages+"' id='homePages' title='查看'>查看</a>";
            }
            return result;
        },
        honors(value, row, index){//荣誉证书
            var result = "";
            if(row.honors == null){
                result += "<p>--</p>";
            }else{
                result += "<a href='javascript:;' dataType='"+row.honors+"' id='honors' title='查看'>查看</a>";
            }
            return result;
        },
        portrait(value, row, index){//头像
            var result = "";
            if(row.imgUrl == null){
                result += "<p>--</p>";
            }else{
                result += "<a href='javascript:;' dataType='"+row.imgUrl+"' id='imgUrl' title='查看'>查看</a>";
            }
            return result;
        },
        examinationThrough(that){
            var doctorId = that.attr("dataType"),
                url = ENV_LIST[0].baseUrl+"/shop/all/checkShop";
                console.log(doctorId)
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
                        "doctorId":doctorId,
                        "findAduit":1
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
            var doctorId = that.attr("dataType"),
                url = ENV_LIST[0].baseUrl+"/shop/all/checkShop";
            swal({ 
                title: "请输入拒绝原因！", 
                text: "",
                type: "input", 
                showCancelButton: true, 
                closeOnConfirm: false, 
                confirmButtonText: "确定", 
                cancelButtonText: "取消",
                animation: "slide-from-top", 
                inputPlaceholder: "为啥？到底为啥？" 
                },
                function(inputValue){ 
                if (inputValue === false) return false; 
                    
                if (inputValue === "") { 
                    swal.showInputError("为啥？是因为我不够漂亮么？");
                    return false;
                } 
                $.ajax({
                    type:"post", 
                    url:url,
                    data:JSON.stringify({
                        "doctorId":doctorId,
                        "findAduit":2
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