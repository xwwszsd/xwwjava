/*
*下拉框模糊搜索和动态绑定数据
* */


/***
 *
 * @param param  入参
 * @param url    获取动态数据的url
 * @param id     页面展示的id
 */
function selectFindData (param,url,id) {
  $.ajax({
    type: 'post',
    url: url,
    contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
    dataType:   "json",
    data: param,
    success: function (data) {
      console.log(data);
      if(data.code=="000000"&&data.data!=null) {
        $("#"+id).html("");
        $("#"+id).append('<option  value="">请选择</option>');
        $.each(data.data, function (i, item) {
          var tempId = '<option  value="' + item.value + '">' + item.text + '</option>';
          $("#"+id).append(tempId);
        });
        console.log($("#"+id).html());
        // 更新 。 这一步很重要
        $('#'+id).selectpicker('refresh');

      }
      //var tempIdStr = '<option  value="">选择</option>';

    }
  });
}

/**
 * 刷新   下拉框模糊搜索和动态绑定数据
 * @param id
 */
function updateBootstrapselect(id) {
  $('#'+id).selectpicker('refresh');
}

/**
 * 设置选中
 * @param id
 * @param value
 */
function setBootstrapselect(id,value) {
  $('#'+id).selectpicker('val', value);
}