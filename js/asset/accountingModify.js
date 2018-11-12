;$(function () {
    //#endregion
    var nodata = '<div class="nodata">'
                    +'<img src="../../images/nodata.png" alt="">'
                    +'<p>暂无数据</p>'
                +'</div>';
    var _init = function(){//初始化函数
            this.tansfre()
    }
    _init.prototype = {
        data:[],
        tansfre(){//事件函数
            var _this = this;
            _this.getData();
            $("#tb_departments").on("click", "button#through",function(){
                _this.examinationThrough($(this))
            }) 
            $("#tb_departments").on("click", "button#refused",function(){
                _this.examinationRefused($(this))
            }) 
        },
        getData(){//获取数据
            swal({
                title: '',
                text: '正在加载，请稍后...', 
                showConfirmButton: false 
              })
            var _this = this,
                url = ENV_LIST[0].baseUrl+"/shop/web/accountPeriod/shops"
            $.ajax({
                type:"get",
                url:url,
                contentType: "application/json;charset=UTF-8",
                dataType:"json",
                success:function(res){
                    if(res.flag == 20000){
                        for(var i=0;i<res.data.list.length;i++){
                            _this.data.push(res.data.list[i])
                        }
                        _this.invoking();
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
            var _this = this;
            $("#tb_departments").bootstrapTable({
                data:_this.data,
                pagination: true,                   //是否显示分页（*）
                sortable: true,                     //是否启用排序
                sortOrder: "desc",                  //排序方式
                striped : true,                     // 是否显示行间隔色
                sidePagination: "client",           //分页方式：client客户端分页，server服务端分页（*）
                pageNumber: 1,                      //初始化加载第一页，默认第一页,并记录
                pageSize: 10,                        //每页的记录行数（*）
                pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）
                search: true,                       //显示搜索框
                showRefresh: true,                  //是否显示刷新按钮
                minimumCountColumns: 2,             //最少允许的列数 
                columns:[
                    {
                        field: "shopName",
                        title: "名称"
                    },{
                        field: "shopType",
                        title: "身份类型"
                    },{
                        field: "phone",
                        title: "手机号码"
                    },{
                        field: "accountPeriod",
                        title: "当前生效帐期"
                    },{
                        field: "bountyPrice",
                        title: "当前生效奖金"
                    },{
                        field: "remark",
                        title: "市场经理"
                    },{
                        field: "option",
                        title: "操作",
                        width: 300,
                        align: 'center',
                        valign: 'middle',
                        formatter: _this.actionFormatter
                    }
                ]
            })
        },
        actionFormatter(value, row, index){//操作栏的格式化
            var result = "";
                result += "<button type='button' dataType='"+row.shopId+"' id='through' class='btn btn-success'><a href='javascript:;'  title='修改帐期'>修改帐期</a></button>";
                result += "<button type='button' dataType='"+row.shopId+"' id='refused' class='btn btn-success'><a href='javascript:;'  title='修改奖金'>修改奖金</a></button>";
            return result;

        },
        examinationThrough(that){//修改帐期
            var shopId = that.attr("dataType"),
                _this = this,
                url = ENV_LIST[0].baseUrl+"/shop/web/update/accountPeriod";
            swal({ 
                title: "请输入修改帐期的天数！", 
                text: "",
                type: "input", 
                showCancelButton: true, 
                closeOnConfirm: false, 
                confirmButtonText: "确定", 
                cancelButtonText: "取消",
                animation: "slide-from-top", 
                inputPlaceholder: "把帐期写在这！" 
                },
                function(inputValue){ 
                if (inputValue === false) return false; 
                    
                if (inputValue === "") { 
                    swal.showInputError("没帐期可不行～");
                    return false;
                } 
                $.ajax({
                    type:"put", 
                    url:url,
                    data:JSON.stringify({
                        "shopId": ""+shopId+"",
                        "accountPeriod": ""+inputValue+"",
                    }),
                    contentType: "application/json;charset=UTF-8",
                    dataType:"json",
                    success:function(res){
                        console.log(res)
                        if(res.flag == 20000){
                            swal({
                                title:"干得漂亮！",
                                text:"修改帐期已完成",
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
        examinationRefused(that){//修改奖金
            var shopId = that.attr("dataType"),
                _this = this,
                url = ENV_LIST[0].baseUrl+"/shop/web/update/bountyPrice";
            swal({ 
                title: "请输入修改奖金的比例！", 
                text: "",
                type: "input", 
                showCancelButton: true, 
                closeOnConfirm: false, 
                confirmButtonText: "确定", 
                cancelButtonText: "取消",
                animation: "slide-from-top", 
                inputPlaceholder: "把钱写在这！" 
                },
                function(inputValue){ 
                if (inputValue === false) return false; 
                    
                if (inputValue === "") { 
                    swal.showInputError("没钱可不行～");
                    return false;
                } 
                $.ajax({
                    type:"put", 
                    url:url,
                    data:JSON.stringify({
                        "shopId": ""+shopId+"",
                        "bountyPrice": ""+inputValue+"",
                    }),
                    contentType: "application/json;charset=UTF-8",
                    dataType:"json",
                    success:function(res){
                        console.log(res)
                        if(res.flag == 20000){
                            swal({
                                title:"干得漂亮！",
                                text:"有钱了，我有钱了不知道该怎么花",
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