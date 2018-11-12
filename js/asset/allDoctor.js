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
            that.getData(0);
            $("#tb_departments").on("click", "button#checkInfo",function(){
                that.checkUersInfo($(this))
            }) 
            $("#select").on("change",function(){//条件筛选
                that.data = [];
                var status = $(this).val();
                that.getData(status)
            });
            $("#tb_departments").on("click","a#identityCard",function(){//查看身份证
                var imgUrls = $(this).attr("dataType");
                $.showImg(imgUrls)
            })
            
            $("#tb_departments").on("click","a#orgImgUrls",function(){//查看医师资格证
                var imgUrls = $(this).attr("dataType");
                $.showImg(imgUrls)
            })
            $("#tb_departments").on("click","a#homePage",function(){//查看医师资格证
                var imgUrls = $(this).attr("dataType");
                $.showImg(imgUrls)
            })
            
        },
        getData(status){//获取数据
            swal({
                title: '',
                text: '正在加载，请稍后...', 
                showConfirmButton: false 
            })
            var that = this,
                url = ENV_LIST[0].baseUrl+"/shop/all/list"
            $.ajax({
                type:"POST",
                url:url,
                contentType: "application/json;charset=UTF-8",
                dataType:"json",
                data:JSON.stringify({
                    status: status,
                    shopType: 'D'
                }),
                success:function(res){
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
                        field: "workYears",
                        title: "从医年限"
                    },{
                        field: "education",
                        title: "学历"
                    },{
                        field: "leaderPhone",
                        title: "手机号"
                    },{
                        field: "createtime",
                        title: "注册日期"
                    },{
                        field: "identityCard",
                        title: "身份证照",
                        align: 'center',
                        valign: 'middle',
                        formatter: that.idCard
                    },{
                        field: "orgImgUrls",
                        title: "医师资格证书",
                        align: 'center',
                        valign: 'middle',
                        formatter: that.qualification
                    },{
                        field: "practiceLicense",
                        title: "医师执业证书",
                        align: 'center',
                        valign: 'middle',
                        formatter: that.practice
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
                result += "<button type='button' dataType='"+row.shopId+"' id='checkInfo' class='btn btn-info'><a href='javascript:;' title='查看详情'>查看详情</a></button>";
            return result;
        },
        idCard(value, row, index){//查看身份证操作栏
            var result = "";
            if(row.identityCard == null){
                result += "<p>--</p>";
            }else{
                result += "<a href='javascript:;' dataType='"+row.identityCard+"' id='identityCard' title='查看'>查看</a>";
            }
            return result;
        },
        qualification(value, row, index){//查看医师资格证书操作栏
            var result = "";
            if(row.orgImgUrls == null){
                result += "<p>--</p>";
            }else{
                result += "<a href='javascript:;' dataType='"+row.orgImgUrls+"' id='orgImgUrls' title='查看'>查看</a>";
            }
            return result;
        },
        practice(value, row, index){//查看医师执业证书操作栏
            var result = "";
            if(row.homePage == null){
                result += "<p>--</p>";
            }else{
                result += "<a href='javascript:;' dataType='"+row.homePage+"' id='homePage' title='查看'>查看</a>";
            }
            return result;
        },
        checkUersInfo(that){//查看用户详情
            var shopId = that.attr("dataType");
            location.href='../../pages/users/institutionsInfo.html?shopId='+shopId+'';
        }
    }
    return new _init();
});