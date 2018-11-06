// pages/four/four.js
var appserver = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "",
    tomail: "",
    content: ""
  },

  shuru: function (event) {
    console.log(event)
    var titleValue = event.detail.value;
    console.log(titleValue);
    var that = this;
    that.setData({ title: titleValue });
  },
  contentclick: function (event) {
    var that = this;
    var contentvalue = event.detail.value;
    console.log(contentvalue);
    that.setData({ content: contentvalue });
  },

  btncss: function (event) {
    var that = this;

    console.log(that.data.title, that.data.content, that.data.tomail)


    wx.request({
      url: appserver.globalData.server +'/sendMail',
      data: { "mailtitle": that.data.title, "mailcn": that.data.content, "tomailnum": that.data.tomail },
      metho: "get",
      header: { "content-type": "application/json" },
      success: function (resp) {
        console.log("发送成功！")
      },
      fail: function (resp) {
        console.log("发送失败！")
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var mailNum = options.mailnum;
    console.log("接收到的邮箱为:", mailNum);
    var that = this;
    that.setData({ tomail: mailNum });

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