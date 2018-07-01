//获取应用实例
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    select:[],  //所有文章
    hot: [],   //热门文章
    allEssay:false,  //标识是否是所有文章
    num: 1 //标识已将请求到的文章数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //加载此页面时，请求数据（一次只请求10篇文章，之后到底后再继续请求），之后即使在重新进入页面也不会刷新数据，只能通过下拉刷新刷新数据
    this.setData({
      num: 1
    })
    var that = this;
    console.log(that.data.num);
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    //向服务器请求数据
    wx.request({
      url: 'https://www.wexinhaohan.xyz/index',
      method: 'POST',
      data: {
        beginNumber: that.data.num,
        needCount: 10
      },
      success: function (res) {
        console.log(res.data);
        that.num += 10;
        var result = res.data.datas;
        var result2 = res.data.finish;
        that.setData({
          select: result,
          allEssay: result2
        });
        //请求到文章后，在请求热门文章
        wx.request({
          url: 'https://www.wexinhaohan.xyz/popularArticle',
          method: 'POST',
          data: {
          },
          success: function (res) {
            console.log(res.data);
            var result = res.data.datas;
            that.setData({
              hot: result,
            });
            //两个数据均请求成功后完成加载
            wx.hideLoading();
          }
        })
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
    //下拉刷新时，重新请求数据，并重置已经请求到的文章数
    this.setData({
      num: 1
    })
    var that = this;
    console.log(that.data.num);
    wx.request({
      url: 'https://www.wexinhaohan.xyz/index',
      method: 'POST',
      data: {
        beginNumber: that.data.num,
        needCount: 10
      },
      success: function (res) {
        console.log(res.data);
        that.num += 10;
        var result = res.data.datas;
        var result2 = res.data.finish;
        that.setData({
          select: result,
          allEssay: result2
        });
        wx.request({
          url: 'https://www.wexinhaohan.xyz/popularArticle',
          method: 'POST',
          data: {
          },
          success: function (res) {
            console.log(res.data);
            var result = res.data.datas;
            that.setData({
              hot: result,
            });
            wx.stopPullDownRefresh();
          }
        })
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    //到底后，继续向服务器请求数据
    if(!this.data.allEssay){
      var that = this;
      wx.request({
        url: 'https://www.wexinhaohan.xyz/index',
        method: 'POST',
        data: {
          beginNumber: that.data.num,
          needCount: 10
        },
        success: function (res) {
          console.log(res.data);
          that.setData({
            num: that.data.num+10
          })
          var result = res.data.datas;
          var result2 = res.data.finish;
          var temp = that.data.select;
          console.log(temp);
          temp = temp.concat(result);
          console.log(temp);
          that.setData({
            select: temp,
            allEssay: result2
          })
        }
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
   
  },
  onDetail: function(e){
    //表示文章id，进入文章详情界面
    app.appData.select= e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../detail/detail'
    })
  }
})
