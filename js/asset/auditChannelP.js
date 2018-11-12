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
                $.examinationThrough($(this),1)
            }) 
            $("#tb_departments").on("click", "button#refused",function(){//审核拒绝
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
                    shopType: 'C'
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
                    title: "名称"
                },{
                    field: "shopType",
                    title: "身份"
                },{
                    field: "leaderPhone",
                    title: "手机号"
                },{
                    field: "createtime",
                    title: "注册日期"
                },{
                    field: "market",
                    title: "市场经理",
                    align: 'center',
                    valign: 'middle',
                    formatter: that.showMarket
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
                result += "<button type='button' storeId='"+row.id+"' dataType='"+row.shopId+"' id='through' class='btn btn-success'><a href='javascript:;'  title='通过'>通过</a></button>";
                result += "<button type='button' storeId='"+row.id+"' dataType='"+row.shopId+"' id='refused' class='btn btn-danger'><a href='javascript:;'  title='拒绝'>拒绝</a></button>";
                result += "<button type='button' dataType='"+row.shopId+"' id='checkInfo' class='btn btn-info'><a href='javascript:;' title='详情'>详情</a></button>";
            return result;
        },
        showMarket(value, row, index){
            var result = "";
            if(row.market == null || row.market == ""){
                result += "<p>--</p>";
            }else{
                result += "<p href='javascript:;' title='查看'>"+row.market+"</p>";
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