//获取应用实例
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      select:[]  
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
    //进入该页面时，向服务器请求数据
    var that=this;
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wx.request({
      url: 'https://www.wexinhaohan.xyz/user/myArticle', 
      method: 'POST',
      data: {
        user_id: app.appData.userId
      },
      success: function (res) {
        console.log(res.data);
        that.setData({ 
          select: res.data.datas
        });
        wx.hideLoading();
      }
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
    //下拉时，重新向服务器请求数据
    var that = this;
    wx.request({
      url: 'https://www.wexinhaohan.xyz/user/myArticle',
      method: 'POST',
      data: {
        user_id: app.appData.userId
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          select: res.data.datas
        });
        wx.stopPullDownRefresh();
      }
    })
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
  onDetail: function(e){
    //进入文章详情的界面，标识文章id，进入文章详情页面
    app.appData.select = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../detail/detail'
    })
  }
})
