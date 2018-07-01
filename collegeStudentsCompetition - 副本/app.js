//app.js
App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    try {
      var value = wx.getStorageSync('userInfo');
      if (value) {
        this.appData.logged = true;
        this.appData.userInfo=value;
        var result = wx.getStorageSync('userId');
        this.appData.userId = result;
        console.log(value);
        console.log(result);
      }
    } catch (e) {
      this.appData.logged=false;
      this.appData.userInfo = {};
    }
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {

  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {

  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {

  },

  appData: {
    select:{},
    logged: false,
    userInfo: {},
    userId: 0,
    commentId: 0
  }
})
