;$(function () {
    //#endregion
    var nodata = '<div class="nodata">'
                    +'<img src="../../images/nodata.png" alt="">'
                    +'<p>暂无数据</p>'
                +'</div>';
    var _init = function(){
            this.tansfre()
    }
    _init.prototype = {
        data:[],
        tansfre(){//事件函数
            var that = this;
            that.invoking();
            that.getData(2);
            $("button[name='refresh']").on("click",function(){//刷新页面
                window.location.reload()
            })
            $("#tb_departments").on("click", "button#checkInfo",function(){//查看详情
                that.checkUersInfo($(this))
            })
            $("#tb_departments").on("click","a#checkBusiness",function(){//查看营业执照
                var imgUrls = $(this).attr("dataType");
                $.showImg(imgUrls)
            })
            $("#tb_departments").on("click","a#checkLicense",function(){//查看许可证
                var imgUrls = $(this).attr("dataType");
                $.showImg(imgUrls)
            })
            $("#tb_departments").on("click", "button#through",function(){
                $.examinationThrough($(this),1)
            }) 
            $("#tb_departments").on("click", "button#refused",function(){
                $.examinationRefused($(this),99)
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
                    shopType: 'P'
                }),
                success:function(res){
                    $('#tb_departments').bootstrapTable('removeAll');
                    if(res.flag == 20000){
                        $('#tb_departments').bootstrapTable('append', res.data);
                        $(".sweet-overlay,.sweet-alert").remove();
                    }else{
                        $(".panel-body").html(nodata)
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
                        field: "shopName",
                        title: "机构名称"
                    },{
                        field: "shopShortName",
                        title: "机构简称"
                    },{
                        field: "leaderPhone",
                        title: "负责人手机号"
                    },{
                        field: "businessLicense",
                        title: "营业执照",
                        align: 'center',
                        valign: 'middle',
                        formatter: that.businessFormatter
                    },{
                        field: "practiceLicense",
                        title: "执业许可证",
                        align: 'center',
                        valign: 'middle',
                        formatter: that.licenseFormatter
                    },{
                        field: "market",
                        title: "市场经理"
                    },{
                        field: "serviceAddressCity",
                        title: "地区"
                    },{
                        field: "createtime",
                        title: "注册日期"
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
                result += "<button type='button' dataType='"+row.shopId+"' id='through' class='btn btn-success'><a href='javascript:;'  title='审批'>审批</a></button>";
                result += "<button type='button' dataType='"+row.shopId+"' id='refused' class='btn btn-danger'><a href='javascript:;'  title='审批'>审批</a></button>";
                result += "<button type='button' dataType='"+row.shopId+"' id='checkInfo' class='btn btn btn-info'><a href='javascript:;'  title='详情'>详情</a></button>";
            return result;
        },
        checkUersInfo(that){//查看用户详情
            var shopId = that.attr("dataType");
            location.href='../../pages/users/institutionsInfo.html?shopId='+shopId+'';
        },
        businessFormatter(value, row, index){
            var result = "";
                result += "<a href='javascript:;' dataType='"+row.businessLicense+"' id='checkBusiness' title='查看'>查看</a>";
            return result;
        },
        licenseFormatter(value, row, index){
            var result = "";
                result += "<a href='javascript:;' dataType='"+row.practiceLicense+"' id='checkLicense' title='查看'>查看</a>";
            return result;
        }
        
    }
    return new _init();
});