//获取应用实例
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail:{},  //文章的内容
    comment: "",  //用户发表的评论
    allComment: [],  //文章下面的所有评论
    starSrc: 'images/star.png', 
    starSelectSrc: 'images/starSelect.png',
    likeSrc: 'images/like.png',
    likeSelectSrc: 'images/likeSelect.png'
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
    //页面显示时，向服务器请求数据
    console.log(app.appData.select);
    console.log(app.appData.userId);
    var that=this;
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wx.request({
      url: 'https://www.wexinhaohan.xyz/detail', 
      method: 'POST',
      data: {
        article_id: app.appData.select,
        user_id: app.appData.userId
      },
      success: function (res) {
        console.log(res.data)
        var result =res.data;
        var result2=res.data.comment;
        //获取文章内容以及文章下面的评论
        that.setData({
          detail: result,
          allComment: result2
        })
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
    //下拉刷新时重新请求数据
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    console.log(app.appData.select);
    console.log(app.appData.userId);
    var that = this;
    wx.request({
      url: 'https://www.wexinhaohan.xyz/detail',
      method: 'POST',
      data: {
        article_id: app.appData.select,
        user_id: app.appData.userId
      },
      success: function (res) {
        console.log(res.data)
        var result = res.data;
        var result2 = res.data.comment;
        //为数据附上新值
        that.setData({
          detail: result,
          allComment: result2
        })
        wx.hideLoading();
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
  onComment: function(){
    //进入评论列表，会对用户的登录进行判断
    var flag=app.appData.logged;
    if(flag){
      wx.navigateTo({
        url: '../comment/comment'
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
  onStar: function(e){
    //对文章进行收藏，会对用户做是否登录的判断
    var flag=app.appData.logged;
    if(flag){
      //做出是收藏还是取消收藏的判断
      if (e.target.dataset.star==false){
        var tempDetail=this.data.detail;
        tempDetail.isCollection=true;
        this.setData({
          detail: tempDetail
        })
        //向服务器发出收藏的通知
        wx.request({
          url: 'https://www.wexinhaohan.xyz/user/collection',
          method: 'POST',
          data: {
            user_id: app.appData.userId,
            article_id: app.appData.select,
          },
          success: function (res) {
            console.log(res);
            wx.showToast({
              title: '收藏成功',
              duration: 1000
            })
          }
        })
      }
      else {
        //若为取消收藏则向服务器发出取消收藏的通知
        var tempDetail = this.data.detail;
        tempDetail.isCollection = false;
        this.setData({
          detail: tempDetail
        })
        wx.request({
          url: 'https://www.wexinhaohan.xyz/user/unCollection',
          method: 'POST',
          data: {
            user_id: app.appData.userId,
            article_id: app.appData.select,
          },
          success: function (res) {
            console.log(res);
            wx.showToast({
              title: '取消收藏',
              duration: 1000
            })
          }
        })
      }
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
  onLike: function(e){
    //点赞与取消点赞的函数，功能，实现方法与收藏类似
    var flag=app.appData.logged;
    if(flag){
      if (e.target.dataset.like == false) {
        var tempDetail = this.data.detail;
        tempDetail.isPraise = true;
        this.setData({
          detail: tempDetail
        })
        wx.request({
          url: 'https://www.wexinhaohan.xyz/user/articlePraise',
          method: 'POST',
          data: {
            user_id: app.appData.userId,
            article_id: app.appData.select,
          },
          success: function (res) {
            console.log(res.data);
            wx.showToast({
              title: '已点赞',
              duration: 1000
            })
          }
        })
      }
      else {
        var tempDetail = this.data.detail;
        tempDetail.isPraise = false;
        this.setData({
          detail: tempDetail
        })
        wx.request({
          url: 'https://www.wexinhaohan.xyz/user/unArticlePraise',
          method: 'POST',
          data: {
            user_id: app.appData.userId,
            article_id: app.appData.select,
          },
          success: function (res) {
            console.log(res);
            wx.showToast({
              title: '取消点赞',
              duration: 1000
            })
          }
        })
      }
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
  onSendComment: function(e){
    //发送评论的函数，会对登录状态进行判断
    var flag=app.appData.logged;
    if(flag){
      console.log(e.detail.value);
      //记录出当前时间
      var date = new Date();
      var seperator1 = "-";
      var seperator2 = ":";
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      var hour = date.getHours();
      var minute = date.getMinutes();
      var second = date.getSeconds();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      if (hour >= 0 && hour <= 9) {
        hour = "0" + hour;
      }
      if (minute >= 0 && minute <= 9) {
        minute = "0" + minute;
      }
      if (second >= 0 && second <= 9) {
        second = "0" + second;
      }
      var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        + " " + hour + seperator2 + minute
        + seperator2 + second;
      var that=this;
      //向服务器发送数据
      wx.request({
        url: 'https://www.wexinhaohan.xyz/user/articleComment',
        method: 'POST',
        data: {
          user_id: app.appData.userId,
          article_id: app.appData.select,
          comment_content: e.detail.value,
          comment_post_time: currentdate
        },
        success: function (res) {
          console.log(res.data);
          //发送成功后情况评论内容，跳转到评论列表界面
          wx.showToast({
            title: '发布评论成功',
            duration: 1000
          });
          that.setData({
            comment: ""
          });
          wx.navigateTo({
            url: '../comment/comment'
          })
        }
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
  onCommentDetail: function(e){
    //进入评论详情的列表，会对登录进行判断
    var flag = app.appData.logged;
    if (flag) {
      //标识评论id，进入评论详情的界面
      console.log(e.currentTarget.dataset.index);
      app.appData.commentId = e.currentTarget.dataset.index;
      wx.navigateTo({
        url: '../commentDetail/commentDetail'
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
