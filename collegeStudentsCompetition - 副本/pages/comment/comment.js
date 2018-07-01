//获取应用实例
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comment:[],  //所有的评论内容
    usrComment:'',  //用户的评论内容
    detail: {},     //用户对于文章的点赞，收藏判断
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
    console.log(app.appData.select);
    console.log(app.appData.userId);
    var that = this;
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    //向服务器请求页面的所有数据
    wx.request({
      url: 'https://www.wexinhaohan.xyz/detail',
      method: 'POST',
      data: {
        article_id: app.appData.select,
        user_id: app.appData.userId
      },
      success: function (res) {
        console.log(res.data);
        var result = res.data.comment;
        var result2 = res.data;
        //获取评论的内容，和所有回复的内容
        that.setData({
          comment: result,
          detail: result2
        })
        wx.hideLoading();
      }
    });
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
    console.log(app.appData.select);
    console.log(app.appData.userId);
    var that = this;
    //当用户下拉刷新时重新请求数据并进行显示
    wx.request({
      url: 'https://www.wexinhaohan.xyz/detail',
      method: 'POST',
      data: {
        article_id: app.appData.select,
        user_id: app.appData.userId
      },
      success: function (res) {
        console.log(res.data);
        var result = res.data.comment;
        var result2 = res.data;
        that.setData({
          comment: result,
          detail: result2
        })
        wx.stopPullDownRefresh();
      }
    });
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
  onSendComment: function (e) {
    console.log(e.detail.value);
    //获取当前的时间，并将其转换为标准的格式   2017-12-24 10:12:02
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
    //向服务器发送用户的评论
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
        wx.hideLoading();
        //发送成功后显示提示框并重新进行页面的加载
        wx.showToast({
          title: '发布评论成功',
          duration: 1000
        });
        that.setData({
          usrComment: ""
        });
        console.log(app.appData.select);
        console.log(app.appData.userId);
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
            console.log(res.data);
            var result = res.data.comment;
            var result2 = res.data;
            that.setData({
              comment: result,
              detail: result2
            })
            wx.hideLoading();
          }
        });
      }
    })
  },
  onStarThis: function (e) {
    //收藏与取消收藏文章的函数，根据页面绑定的数据判定用户是收藏还是取消收藏，并作出不同操作
    if (e.target.dataset.star == false) {
      //当用户操作为收藏时，重新设定数据并向服务器发送用户完成收藏操作的信息
      var tempDetail = this.data.detail;
      tempDetail.isCollection = true;
      this.setData({
        detail: tempDetail
      })
      wx.request({
        url: 'https://www.wexinhaohan.xyz/user/collection',
        method: 'POST',
        data: {
          user_id: app.appData.userId,
          article_id: app.appData.select,
        },
        success: function (res) {
          console.log(res);
          //显示提示框
          wx.showToast({
            title: '收藏成功',
            duration: 1000
          })
        }
      })
    }
    else {
      //当用户操作为取消收藏时，设定数据，并向服务器发送用户取消收藏的信息
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
          //显示取消收藏的提示框
          wx.showToast({
            title: '取消收藏',
            duration: 1000
          })
        }
      })
    }
  },
  onLikeThis: function (e) {
    //点赞与取消点赞的函数
    if (e.target.dataset.like == false) {
      //判断用户的操作为点赞时，设定数据，并向服务器发送用户点赞的信息
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
          console.log(res);
          wx.showToast({
            title: '已点赞',
            duration: 1000
          })
        }
      })
    }
    else {
      //判断用户的操作为取消点赞时，设定数据，并向服务器发送用户点赞的信息
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
  },
  onCommentDetail: function(e){
    //表示评论的id并转向评论详情页面
    console.log(e.currentTarget.dataset.index);
    app.appData.commentId = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '../commentDetail/commentDetail'
    })
  }
})
