// pages/three/three.js
var appserver = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    studata: []
  },

  btnclick: function (event) {

    console.log("按钮被点击");

    var that = this;

    console.log("按钮点击name---->" + that.data.username);

    //微信小程序点击向服务器端发起查询图片的请求
    wx.request({
      url: appserver.globalData.server +'/query',
      data: { "username": that.data.username },  // username 是自己定义的
      header: { "content-type": "application/json" },
      success: function (response) {
        console.log(response.data.userInfo);

        var imgpath = response.data.userInfo;  //接收python 传来的值

        that.setData({ userInfo: imgpath, flog: true })  //设置前台页面的值

      }
    });
  },

  nameinput: function (event) {
    console.log(event);
    console.log(event.detail.value);
    var name = event.detail.value;

    var that = this;
    that.setData({ username: name })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: appserver.globalData.server +'/stulist',
      method: "GET",
      header: { "content-type": "application/json" },
      success: function (response) {
        console.log(response);
        that.setData({ studata: response.data.studatas })
      }
    })
  },

  clickphone: function (event) {

    console.log(event.currentTarget.dataset.phone);
    var phonenumber = event.currentTarget.dataset.phone;
    wx.makePhoneCall({
      phoneNumber: phonenumber,
      success: function (res) {
        console.log("拨打成功！");
      },
      fail: function (res) {
        console.log("拨打失败！");
      }
    })
  },

  clickemail: function (event) {
    console.log(event.currentTarget.dataset.email);

    var emails = event.currentTarget.dataset.email;
    wx.navigateTo({
      url: '../email/email?mailnum=' + emails,
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