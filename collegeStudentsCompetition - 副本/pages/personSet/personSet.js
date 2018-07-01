//index.js
//获取应用实例
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    logged: false,
    userInfo: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    //对用户名字，头像进行赋值
    this.setData({
      logged: app.appData.logged,
      userInfo: app.appData.userInfo
    })
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

  },
  myStar: function(){
    //进入我的收藏的页面，对登录状态进行判断
    var flag = app.appData.logged;
    if (flag) {
    wx.navigateTo({
      url: '../star/star'
      })
    }
    else {
      wx.showModal({
        title: '请先登录',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../authorization/authorization'
            })
          }
        }
      })
    }
  },
  myEssay: function(){
    //进入我的文章的页面，对登录状态进行判断
    var flag=app.appData.logged;
    if(flag){
      wx.navigateTo({
        url: '../essay/essay'
      })
    }
    else {
      wx.showModal({
        title: '请先登录',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../authorization/authorization'
            })
          }
        }
      })
    }
  },
  login: function(){
    if(!this.data.logged){
       wx.navigateTo({
        url: '../authorization/authorization',
      })
    }
  },
  myMessage: function(e){
    //进入我的信息的页面，对登录状态进行判断
    var flag = app.appData.logged;
    if(flag){
      wx.navigateTo({
        url: '../message/message'
      })
    }
    else {
      wx.showModal({
        title: '请先登录',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../authorization/authorization'
            })
          }
        }
      })
    }
  },
  onSendEssay: function () {
    //进入发送文章的页面，对登录状态进行判断
    var flag = app.appData.logged;
    if (flag) {
      wx.navigateTo({
        url: '../sendEssay/sendEssay'
      })
    }
    else {
      wx.showModal({
        title: '请先登录',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../authorization/authorization'
            })
          }
        }
      })
    }
  }
})
