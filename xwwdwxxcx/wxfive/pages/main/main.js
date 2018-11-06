// pages/main/main.js
var appserver=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lunboimg:[],
    imgicon:""
  },
  clicklogin:function(event){
     var that=this;
     wx.navigateTo({
       url: '../login/login',
     })
  },
  clickzhuce:function(event){
    var that = this;
    wx.navigateTo({
      url: '../zhuce/zhuce',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that=this;
      
      wx.request({
        url: appserver.globalData.server+'/main',
        header:{"content-type":"application/json"},      
        success:function(eve){
        console.log(eve.data.lunboimg);
          var lunboimgs = eve.data.lunboimg;
          var imgicon = eve.data.smallicon;
          that.setData({ "lunboimg": lunboimgs});
          that.setData({ "imgicon": imgicon});
        }
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
      
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})