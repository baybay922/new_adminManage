;$(function () {
    //#endregion
    var listCover = [],
        videoList = [],
        imgvideoCover = [],
        bannerImgList =[];
    var _init = function(){//初始化函数
        var that = this;
            that.tansfre()
            that.getProducType()
            $("#supplierName").on("input propertychange",function(){
                var val = $(this).val();
                that.autoCompletion(val)
            })
            $("#classification").on("change",function(){
                var val = $(this).val();
                that.selectProducType(val)
            })
            
    }
    _init.prototype = {  
        tansfre(){//事件函数
            var that = this;
            that.plugLibrary();
            that.uploader($("#listCover"), $("#coverList"), $(".listCover"),$ ("#imgListCover"), 1, listCover)
            that.uploader($("#videoList"), $("#videoLsit"), $(".videoList"),$ ("#imgvideoList"), 3, videoList)
            that.uploader($("#videoCover"), $("#videoListCover"), $(".videoCover"),$ ("#imgvideoCover"), 3, imgvideoCover)
            that.uploader($("#productBanner"), $("#bannerList"), $(".productBanner"),$ ("#bannerImgList"), 5, bannerImgList)
            $("#submitbtn").on("click",function(){
                console.log(videoList)
            })
        },
        plugLibrary(){//第三方库
            var that = this;
            //#编辑器
            Simditor.locale = 'zh-CN';//设置中文
            var editor = new Simditor({
                textarea: $('#editor'),  //textarea的id
                placeholder: '这里输入文字...',
                toolbar:  ['title', 'bold', 'italic', 'underline', 'strikethrough', 'color', '|', 'ol', 'ul', 'blockquote', 'code', 'table', '|', 'link', 'image', 'hr', '|', 'indent', 'outdent'], //工具条都包含哪些内容
                pasteImage: true,//允许粘贴图片
                defaultImage: '../../images/example.png',//编辑器插入的默认图片，此处可以删除
                upload : {
                    url : 'richtext_img_upload.do', //文件上传的接口地址
                    params: null, //键值对,指定文件上传接口的额外参数,上传的时候随文件一起提交
                    fileKey: 'upload_file', //服务器端获取文件数据的参数名
                    connectionCount: 3,
                    leaveConfirm: '正在上传文件'
                }
            })
            //editor.getValue()
            
            
        },
        uploader(el, drag, prompt, imgList, imgLen, arr){//上传照片
            var that = this;
            //#endregion
            var uploader = WebUploader.create({
                auto:true,
                // swf文件路径
                swf: BASE_URL + '/js/Uploader.swf',
                // 文件接收服务端。
                server: ENV_LIST[0].baseUrl+'/th3rdAliyunOss/uploadfile',
                // 选择文件的按钮。可选。
                // 内部根据当前运行是创建，可能是input元素，也可能是flash.
                pick: el,
                // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
                resize: false,
                fileNumLimit: imgLen,
                dnd:drag,
                disableGlobalDnd:true,
                accept: {//照片类型
                    title: 'Images',
                    extensions: 'mp4,flv,gif,jpg,jpeg,bmp,png',
                }
            });
            uploader.on( 'fileQueued', function( file ) {//上传照片初始化生成dom结构，但未上传到服务器
                swal({
                    title: '',
                    text: '正在上传，请稍后...', 
                    showConfirmButton: false 
                })
                    
                var $li=$("<li id=" + file.id +">"
                            +"<img src='"+file.name+"' alt=''>"
                            +"<span class='removeBtn'></span>"
                        +"</li>"),
                $img = $li.find('img');
                $(imgList).append($li);
                uploader.makeThumb( file, function( error, src ) {
                    if ( error ) {
                        $img.replaceWith('<span>不能预览</span>');
                        return;
                    }
                    $img.attr( 'src', src );
                } );
            });
            uploader.on( 'uploadSuccess', function( file, response ) {//上传成功
                $(".sweet-overlay,.sweet-alert").remove();
                arr.push(response.data);
                that.updateStatus(el, arr, imgLen, prompt)
                removeFile(file)
            });
            function removeFile(file){
                var lis = $(imgList).find("li"),
                    spans = lis.find("span")
                for(let i=0;i<lis.length;i++){
                    spans[i].onclick = function(num){
                        return function(){
                            delete [ file.id ];
                            uploader.reset();//删除后照片地址重置
                            $(this).parent().remove();
                            var ind = $(this).parent().index();
                                arr.splice(ind, 1);
                            if(num == 0){
                                $(el).show();
                                $(prompt).find($(".coverPrompt")).removeClass("coverPrompt_cur")
                                $(prompt).find("div.imgSize").html("")
                            }else{
                                $(el).show();
                                $(prompt).find("div.imgSize").html("可上"+imgLen+"传张，已经上传"+num+"张");
                            }
                        }
                    }(i)
                } 
            } 
        },
        updateStatus(el, arr, imgLen, prompt){//判断元素显示隐藏
            var that = this;
            var arrLen = arr.length;
            $(prompt).find("div.imgSize").html("可上"+imgLen+"传张，已经上传"+arrLen+"张");
            if(arrLen >= 0 && arrLen !== imgLen){
                $(el).show();
                $(prompt).find($(".coverPrompt")).addClass("coverPrompt_cur")
            }else{
                $(el).hide();
                $(prompt).find($(".coverPrompt")).addClass("coverPrompt_cur")
            }
        },
        autoCompletion(val){ //#搜索自动补全
            var url = ENV_LIST[0].baseUrl+'/shop/product/info?findByName='+val+'';
            $.ajax({
                type:"get",
                url:url,
                contentType: "application/json;charset=UTF-8",
                success:function(res){
                    if(res.flag == 20000){
                        $("#supplierName").bsSuggest({
                            indexId: 0, //作为data-id的值
                            indexKey: 1, //作为input输入框的内容
                            data:{
                                'value':res.data
                            }
                        });
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
        getProducType(){//获取一级下拉框数据
            var secondary,
                url = ENV_LIST[0].baseUrl+"/productType/productTypes"
                $.ajax({
                    type:"post",
                    url:url,
                    contentType: "application/json;charset=UTF-8",
                    success:function(res){
                        if(res.flag == 20000){
                            var result = "";
                            $.each(res.data.typesInfoList, (item, val)=>{
                                result += "<option id='"+val.productType+"'>"+val.producTypeName+"</option>";
                            })
                            $("#classification").append(result)
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
        selectProducType(val){//第二级选择
            if(val == "none"){
                $("#secondary").html("<option id='none'>请选择</option>")
            }else{
                var secondary,
                url = ENV_LIST[0].baseUrl+"/productType/productTypes"
                $.ajax({
                    type:"post",
                    url:url,
                    contentType: "application/json;charset=UTF-8",
                    success:function(res){
                        if(res.flag == 20000){
                            for(var i=0;i<res.data.typesInfoList.length;i++){
                                if (val == res.data.typesInfoList[i].producTypeName) {
                                    secondary = res.data.typesInfoList[i].labelsInfos;
                                }
                            }
                            // //遍历二级数据,并取出二级数据,追加到二级对象中
                            var result = "";
                            for (var i=0; i<secondary.length; i++) {
                                result +='<option id="'+secondary[i].labelType+'">'+secondary[i].labelName+'</option>' 
                            }
                            $("#secondary").html(result)


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
            }
            
        }
    }
    return new _init();
});