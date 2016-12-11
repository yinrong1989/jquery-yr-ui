//分页插件
/**
2016-12-11 @yinrong
**/
(function($){
	var ms = {
		init:function(obj,args){
			return (function(){
				obj.append($("<div></div>").addClass("pageBox_left"));
				obj.append($("<ul></ul>").addClass("pageBox_right"));
				ms.fillLeftHtml(obj,args);
				ms.fillRightHtml(obj,args);
				ms.bindEvent(obj,args);
			})();
		},
		//填充html
		fillRightHtml:function(parentObj,args){
			var obj=parentObj.find(".pageBox_right");
			return (function(){
				obj.empty();
				//上一页
				if(args.current > 1){
					obj.append('<li><a  class="prevPage"><</a></li>');
				}else{
					obj.remove('.prevPage');
					obj.append('<li><a class="disabled"><</a></li>');
				}
				//中间页码
				if(args.current != 1 && args.current >= 4 && args.pageCount != 4){
					obj.append('<li><a  class="page">'+1+'</a></li>');
				}
				if(args.current-2 > 2 && args.current <= args.pageCount && args.pageCount > 5){
					obj.append('<li>...</li>');
				}
				var start = args.current -2,end = args.current+2;
				if((start > 1 && args.current < 4)||args.current == 1){
					end++;
				}
				if(args.current > args.pageCount-4 && args.current >= args.pageCount){
					start--;
				}
				for (;start <= end; start++) {
					if(start <= args.pageCount && start >= 1){
						if(start != args.current){
							obj.append('<li><a  class="page">'+ start +'</a></li>');
						}else{
							obj.append('<li><a class="active">'+ start +'</a></li>');
						}
					}
				}
				if(args.current + 2 < args.pageCount - 1 && args.current >= 1 && args.pageCount > 5){
					obj.append('<li>...</li>');
				}
				if(args.current != args.pageCount && args.current < args.pageCount -2  && args.pageCount != 4){
					obj.append('<li><a  class="page">'+args.pageCount+'</a></li>');
				}
				//下一页
				if(args.current < args.pageCount){
					obj.append('<li><a  class="nextPage">></a></li>');
				}else{
					obj.remove('.nextPage');
					obj.append('<li><a class="disabled">></a></li>');
				}


				//GO

					obj.append('<li><input type="text" class="input_page" value="'+args.current+'"><li>');

					obj.append('<li><a class="goPage">Go</a></li>');

			})();
		},
        fillLeftHtml:function(parentObj,args){
			var obj=parentObj.find(".pageBox_left");
			return(function(){
		    if(obj){
				obj.empty();
				obj.append("  <p>共 <em>" +args.pageCount+ " </em> 页</p>");
				obj.append("  <p><em> "+args.pageTotal+" </em> 条记录</p>");
			}
			})();
		},
		//绑定事件
		bindEvent:function(obj,args){
			return (function(){
				obj.on("click","a.page",function(){
					var current = parseInt($(this).text());
					ms.fillRightHtml(obj,{"current":current,"pageCount":args.pageCount});
					if(typeof(args.pageClick)=="function"){
						args.pageClick(current);
					}
				});
				//上一页
				obj.on("click","a.prevPage",function(){
					var current = parseInt(obj.find("li>a.active").text());
					ms.fillRightHtml(obj,{"current":current-1,"pageCount":args.pageCount});
					if(typeof(args.pageClick)=="function"){
						args.pageClick(current-1);
					}
				});
				//下一页
				obj.on("click","a.nextPage",function(){
					var current = parseInt(obj.find("li>a.active").text());
					ms.fillRightHtml(obj,{"current":current+1,"pageCount":args.pageCount});
					if(typeof(args.pageClick)=="function"){
						args.pageClick(current+1);
					}
				});
				//Go
				obj.on("click","a.goPage",function(){
					var go_page = parseInt(obj.find("li>.input_page").val());
					if(go_page&&go_page<args.pageCount){
						ms.fillRightHtml(obj,{"current":go_page,"pageCount":args.pageCount});
						if(typeof(args.go_page)=="function"){
							args.go_page(go_page);
						}
					}else if(go_page>args.pageCount){
						if(typeof(args.outPageWarn)==="function"){
							args.outPageWarn();
						}else if(typeof(args.outPageWarn)==="string"){
							alert(args.outPageWarn);
						}else{
                          alert("超出页码范围");
						}
					}

				});


			})();
		}
	}
	$.fn.createPage = function(options){
		var args = $.extend({
			pageCount : 10,
			current : 1,
			pageTotal:10,
			pageClick : function(){},
			go_page:function(){}
		},options);
		ms.init(this,args);
	}
})(jQuery);
