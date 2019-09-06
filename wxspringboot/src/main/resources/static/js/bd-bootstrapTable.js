/**
 * 通用js方法封装处理
 * Copyright (c) 2018 boot
 */
(function ($) {
	$.extend({
		// 表格封装处理
		table: {
			// 初始化表格参数
			init: function(options) {
				var height = $(window).height();
				$.table._option = options;
				$.table._params = $.common.isEmpty(options.queryParams) ? $.table.queryParams : options.queryParams;
				_contentType = $.common.isEmpty(options.contentType) ? "application/json;charset=utf-8" : options.contentType;
				_sortName = $.common.isEmpty(options.sortName) ? "" : options.sortName;
				_sortOrder = $.common.isEmpty(options.sortOrder) ? "asc" : options.sortOrder;
				_pagination = $.common.isEmpty(options.pagination) ? true : options.pagination;
				_striped = $.common.isEmpty(options.striped) ? true : options.striped;
				_search = $.common.isEmpty(options.search) ? false : options.search;
				_escape = $.common.isEmpty(options.escape) ? false : options.escape;
				_showRefresh = $.common.isEmpty(options.showRefresh) ? true : options.showRefresh; 
				_showColumns = $.common.isEmpty(options.showColumns) ? true : options.showColumns;
				_showToggle = $.common.isEmpty(options.showToggle) ? false : options.showToggle;
				_showExport = $.common.isEmpty(options.showExport) ? true : options.showExport;
				_responseHandler = $.common.isEmpty(options.responseHandler) ? $.table.responseHandler : options.responseHandler;
				_height = $.common.isEmpty(options.height)?undefined : options.height;
				_toolbar = $.common.isEmpty(options.toolbar)?'#toolbar' : options.toolbar;
				_rowStyle = $.common.isEmpty(options.rowStyle)?{} : options.rowStyle;
				$('#'+options.id).bootstrapTable({
					url: options.url,                                   // 请求后台的URL（*）
					contentType: _contentType,   						// 编码类型
					method: 'post',                                     // 请求方式（*）
					cache: false,                                       // 是否使用缓存
					striped: _striped,                                  // 是否显示行间隔色
					sortable: true,                                     // 是否启用排序
					sortStable: true,                                   // 设置为 true 将获得稳定的排序
					sortName: _sortName,                                // 排序列名称
					sortOrder: _sortOrder,                              // 排序方式  asc 或者 desc
					height:_height,										// 高度
					pagination: _pagination,   							// 是否显示分页（*）
					pageNumber: 1,                                      // 初始化加载第一页，默认第一页
					pageSize: 10,                                       // 每页的记录行数（*）
					pageList: [10, 25, 50],                             // 可供选择的每页的行数（*）
					escape: _escape,                                    // 转义HTML字符串
					iconSize: 'outline',                                // 图标大小：undefined默认的按钮尺寸 xs超小按钮sm小按钮lg大按钮
					toolbar: _toolbar,                                	// 指定工作栏
					sidePagination: "server",                           // 启用服务端分页
					search: _search,           							// 是否显示搜索框功能
					showRefresh: _showRefresh, 							// 是否显示刷新按钮
					showColumns: _showColumns, 							// 是否显示隐藏某列下拉框
					minimumCountColumns: 2,
					showToggle: _showToggle,   							// 是否显示详细视图和列表视图的切换按钮
					showExport: _showExport,   							// 是否支持导出文件
					queryParams: $.table._params,                       // 传递参数（*）
					columns: options.columns,                           // 显示列信息（*）
					responseHandler: _responseHandler,             		// 回调函数
					rowStyle:_rowStyle
				});
			},
			
			// 请求获取数据后处理回调函数
			responseHandler: function(res) {
				if (res.code == 0||res.code == "000000") {
					return {
						"total": res.data.total,//总页数
						"rows": res.data.rows   //数据
					};
				} else {
					layer.msg(res.msg);
					return {
						"total": 0,//总页数
						"rows": []  //数据 };
					}
				}
			},
			
		},
		// 通用方法封装处理
		common: {
			// 判断字符串是否为空
			isEmpty: function (value) {
				if (value == null || this.trim(value) == "") {
					return true;
				}
				return false;
			},
			// 判断一个字符串是否为非空串
			isNotEmpty: function (value) {
				return !$.common.isEmpty(value);
			},
			// 是否显示数据 为空默认为显示
			visible: function (value) {
				if ($.common.isEmpty(value) || value == true) {
					return true;
				}
				return false;
			},
			// 空格截取
			trim: function (value) {
				if (value == null) {
					return "";
				}
				return value.toString().replace(/(^\s*)|(\s*$)|\r|\n/g, "");
			},
			// 指定随机数返回
			random: function (min, max) {
				return Math.floor((Math.random() * max) + min);
			},
			startWith: function(value, start) {
				var reg = new RegExp("^" + start);
				return reg.test(value)
			},
			endWith: function(value, end) {
				var reg = new RegExp(end + "$");
				return reg.test(value)
			}
		}
	})
})(jQuery);

function formatterTextLong(value, row, index) {
	if(value)return"<div class='ellipsisText' title='"+value+"'>"+value+"</div>"
}

function formatteryyyymmddhhmmss(value, row, index) {
	return value.substring(0,4)+"-"+value.substring(4,6)+"-"+value.substring(6,11)+":"+value.substring(11,13)+":"+value.substring(13,15)
}

function formatterSF(value, row, index) {
	value==0?value='否':value='是'
	return value
}

function formatterYW(value, row, index) {
	value==0?value='无':value='有'
	return value
}

function formatterOperation(value, row, index){
	return [
	        '<button class="layui-btn layui-btn-xs layui-btn-primary btn-show"><i class="layui-icon">&#xe615;</i> 详情</button>',
	        '<button class="layui-btn layui-btn-xs layui-btn-primary btn-edit"><i class="layui-icon">&#xe642;</i> 编辑</button>',
	        '<button class="layui-btn layui-btn-xs layui-btn-primary btn-del"><i class="layui-icon">&#xe640;</i> 删除</button>'
	    ].join('');
}