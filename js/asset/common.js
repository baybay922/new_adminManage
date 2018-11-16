//所有使用调用方式为$.fn();fn为函数名

/*
* 请求地址
*/
const ENV_LIST = [
    {
        //开发环境
        baseUrl: 'https://api4tst.duojia369.com',
    }
]

/*
* 获取URL参数
* @param name 参数
* @return
*/

jQuery.GetUrlParam = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

/*
* 相册
* @param  imgUrls 参数
*/
jQuery.showImg = function(imgUrls){
    var result='<div class="swiper-carousel" id="swiper-carousel">'
                    +'<div class="close" id="close"></div>'
                    +'<div class="swiper-container">'
                        +'<div class="swiper-wrapper">',        
        imgUrl = imgUrls.split(",");
    for(var i=0;i<imgUrl.length;i++){
        result += '<div class="swiper-slide">'
                    +'<img data-src="'+imgUrl[i]+'" class="swiper-lazy">'
                    +'<div class="swiper-lazy-preloader"></div>'
                +'</div>'
    }
    result+='</div>'
            +'<div class="swiper-pagination"></div>'
            +'<div class="swiper-button-prev"></div>'
            +'<div class="swiper-button-next"></div>'
        +'</div>'
    +'</div>';
    $("body").append(result); 
    setTimeout(() => {//确保dom已加载完成，不会抱not find swiper-container
        new Swiper ('.swiper-container', {
            autoplay:3000,
            effect : 'fade',
            fadeEffect: {
              crossFade: true,
            },
            lazy: {
                loadPrevNext: true,
            },
            loop: true, // 循环模式选项
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
          })        
    }, 200);
    $("body").on("click","div#close",function(){//删除查看照片
        $("#swiper-carousel").remove();
    })
}
/*
* 用户审批通过
* @param  that genre 参数
*/
jQuery.examinationThrough = function(that,genre){
    var shopId = that.attr("dataType"),
        url = ENV_LIST[0].baseUrl+"/shop/all/checkShop";
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
                "remark": "",
                "shopId": ""+shopId+"",
                "status":genre
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
}
/*
* 用户审批拒绝
* @param  that genre 参数
*/
jQuery.examinationRefused = function(that, genre){//审批拒绝
    var shopId = that.attr("dataType"),
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
        inputPlaceholder: "不说出个理由今天打死你！？到底不说出个理由今天打死你！？" 
        },
        function(inputValue){ 
        if (inputValue === false) return false; 
            
        if (inputValue === "") { 
            swal.showInputError("不说出个理由今天打死你！？是因为我不够漂亮么？");
            return false;
        } 
        $.ajax({
            type:"post", 
            url:url,
            data:JSON.stringify({
                "remark": ""+inputValue+"",
                "shopId": ""+shopId+"",
                "status":genre
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
