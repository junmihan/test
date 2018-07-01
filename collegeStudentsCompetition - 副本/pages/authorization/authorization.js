//获取应用实例
var app=getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
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
  onGotUserInfo: function (e) {  //获取用户授权信息的函数
    console.log(e.detail.errMsg)
    console.log(e.detail.userInfo)
    console.log(e.detail.rawData)
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    if(e.detail.userInfo){
      var that=this;
      console.log(e.detail.userInfo.nickName);
      console.log(e.detail.userInfo.avatarUrl);
      //获取信息成功后向服务器发送用户信息，并在回调函数中获取用户的唯一标识用户id
      wx.request({
        url: 'https://www.wexinhaohan.xyz/user/login',
        method: 'POST',
        data: {
          user_name: e.detail.userInfo.nickName,
          user_images_url: e.detail.userInfo.avatarUrl
        },
        success: function (res) {
          console.log(res.data);
          app.appData.logged = true;
          app.appData.userInfo = e.detail.userInfo;
          app.appData.userId = res.data.user_id;
          //将用户信息以及用户id缓存在本地数据，以便实现自动登录
          try {
            wx.setStorageSync('userInfo', e.detail.userInfo);
            wx.setStorageSync('userId', app.appData.userId);
          } catch (e) {
            console.log('存储信息出错');
          }
          wx.hideLoading();
          wx.navigateBack({

          })
        }
      })
    }
  }
})
