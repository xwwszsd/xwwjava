var userUtil = function() {
	return {
		getLoginUser : function (){
			var user
			$.ajax({
				type : 'post',
				data : {},
				url : '/getLoginUser',
				async : false,
				cache : false,
				success : function(data) {
					user=data
				},
				error : function(e) {

				}
			});
			return user;
        }
	};
}();

var ajaxUtil = function() {
	return {
		ajax : function (url,sendData){
			var returnData
			$.ajax({
				type : 'post',
				data : sendData,
				url : url,
				async : false,
				cache : false,
				success : function(data) {
					if(data.code=='000000'){
						returnData=data.data
					}else{
						layer.msg(data.msg)
					}
				},
				error : function(e) {
					layer.msg(e)
				}
			});
			return returnData;
        }
	};
}();

var dateUtil = function() {
	return {
		//日期计算方法
		addTime : function (date, delay) {
			var year = parseInt(date.substring(0, 4));	// 获取年
		    var month = parseInt(date.substring(5, 7));	// 获取月
		    var day = parseInt(date.substring(8, 10));	// 获取日
		    if (delay.endWith("M")) {					// 处理月份加
		    	delayTime = parseInt(delay.substring(0,delay.length-1))		// 获取要加的月数
		        var newyear = year
		        var newmonth = month + delayTime;
		        var newday = day;
			    if (newmonth > 12) {								// 月份加后大于12
			        var newyear = newyear + 1;
			        var newmonth = newmonth - 12;
			    }
			    newday = this.adjustNewDay(newyear, newmonth, newday);
			    newmonth = this.formatSmallNum(newmonth);
			    newday = this.formatSmallNum(newday);
			    var newdate = newyear + "" + newmonth + "" + newday;		// 组装新日期
		    }
		    if (delay.endWith("D")) {					// 处理天数加
		    	delayTime = parseInt(delay.substring(0,delay.length-1))		// 获取要加的天数
		    	var newdate = this.recursionDays(year,month,day,delayTime);		// 通过递归方式计算delayTime天后的日期
		    }
		    return newdate;
		},
		recursionDays : function (year, month, day, delayTime) {
			var newyear = year;
			var newmonth = month;
			var newday = day + delayTime;
			if(newday<=0){
				newday=30+newday
				newmonth=newmonth-1
				if(newmonth==0){
					newmonth=12
					newyear=newyear-1
				}
			}
			var newmonthdays = this.getMonthMaxDays(year, month);
			if(newday<=newmonthdays){
				newmonth = this.formatSmallNum(newmonth)
				newday = this.formatSmallNum(newday)
				return newyear + "-" + newmonth + "-" + newday
			} else {
				newmonthdays = this.getMonthMaxDays(year, month);	// 目标月最大天数
				newmonth = month + 1;
				newdelay = newday - newmonthdays;
				newday = 0;
				if (newmonth>12) {
					newyear = newyear + 1;
					newmonth = newmonth - 12;
				}
				return this.recursionDays(newyear, newmonth, newday, newdelay)
			}
		},
		getMonthMaxDays : function (newyear, month) {
		    var newmonthdays = 31;
		    if (this.monthbs[month-1]<1) {
		        if (month!=2) {
		            newmonthdays = 30
		        } else {
		            if ((newyear % 4 == 0) && (newyear % 100 != 0 || newyear % 400 == 0)) {		// 二月时判断是否为闰年
		                newmonthdays = 29
		            } else {
		                newmonthdays = 28
		            }
		        }
		    }
		    return newmonthdays;
		},
		adjustNewDay : function (newyear, newmonth, newday) {
		    var newAdjustedDay = newday;
		    if (this.monthbs[newmonth-1]<1&&newday>28) {		// 将新的日在新的月份中合理化
		        if (newmonth!=2) {							// 不是二月时
		            newAdjustedDay = 30
		        } else {
		            if ((newyear % 4 == 0) && (newyear % 100 != 0 || newyear % 400 == 0)) {		// 二月时判断是否为闰年
		                newAdjustedDay = 29
		            } else {
		                newAdjustedDay = 28
		            }
		        }
		    }
		    return newAdjustedDay;
		},
		formatSmallNum : function (num) {
		    var newnum = parseInt(num);
		    if (newnum<10) {		// 调整日小于10时的格式
		        newnum = 0 + '' + newnum;
		    }
		    return newnum
		},
		monthbs:[1,0,1,0,1,0,1,1,0,1,0,1],
		//end
		
		getNowTime : function(){
			var date = new Date();
			var yy=date.getFullYear()
			var M=this.formatSmallNum(date.getMonth()+1)
			var dd=this.formatSmallNum(date.getDate())
			var hh=this.formatSmallNum(date.getHours())
			var mm=this.formatSmallNum(date.getMinutes())
			var ss=this.formatSmallNum(date.getSeconds())
			return ''+yy+M+dd+' '+hh+mm+ss
		},
		
		formatDate1 : function(date){//yyyy-mm-dd hh:mm:ss~yyyymmdd hhmmss
			return date.substring(0,4)+date.substring(5,7)+date.substring(8,13)+date.substring(14,16)+date.substring(17,19)
		},
		formatDate2 : function(date){//yyyy-mm-dd~yyyymmdd
			return date.substring(0,4)+date.substring(5,7)+date.substring(8,10)
		},
		formatDate3 : function(value){//yyyymmdd hhmmss~yyyy-mm-dd hh:mm:ss
			return value.substring(0,4)+"-"+value.substring(4,6)+"-"+value.substring(6,11)+":"+value.substring(11,13)+":"+value.substring(13,15)
		},
		formatDate4 : function(value){//yyyymmdd hhmmss~yyyy-mm-dd
			return value.substring(0,4)+"-"+value.substring(4,6)+"-"+value.substring(6,8)
		},
		getTimeString : function(){
			var date = new Date();
			var yy=date.getFullYear()
			var M=this.formatSmallNum(date.getMonth()+1)
			var dd=this.formatSmallNum(date.getDate())
			return ''+yy+M+dd;
		}
	};
}();

String.prototype.endWith=function(endStr){
    var d=this.length-endStr.length;
    return (d>=0&&this.lastIndexOf(endStr)==d)
}



var utils = function () {
    return {
		//后台接口地址
		commonAjax : function(method, actionUrl, sendData){
			var data = null;
			jQuery.support.cors = true;
				$.ajax({
					url:actionUrl,
					type: method,
					data:sendData, 
					async : false,
					success : function(resp) {
						data = resp;
					}
				});
			return data;
		},	
		
		GetQueryString : function GetQueryString(name){
			 var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
			 var r = window.location.search.substr(1).match(reg);
			 if(r!=null)return  unescape(r[2]); return null;
		}
		
    };
}();
