//获取应用实例
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    usrComment: '',  //用户的回复内容
    detail: {},     //此条评论的详细内容
    comment: [],   //评论下，其他用户的回复内容
    commenttarget: "",   //表示用户的评论对象
    replyTarget: '',   //表示用户的回复对象
    onFocus: false,   //代表输入框的焦点是否对准
    likeSrc: 'images/like.png', 
    likeSelectSrc: 'images/likeSelect.png',
    replyId: 0  //表示用户回复的id
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
    //请求评论详情中的全部内容
    var that=this;
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    console.log(app.appData.commentId);
    wx.request({
      url: 'https://www.wexinhaohan.xyz/commentsDetail',
      method: 'POST',
      data: {
        comment_id: app.appData.commentId
      },
      success: function (res) {
        console.log(res.data)
        var result = res.data.comment;
        var result2 = res.data.answers;
        that.setData({
          detail: result,
          comment: result2
        })
        var tempTarget = that.data.detail.comment_user_name;
        var tempReplyTarget = that.data.detail.comment_user_name;
        that.setData({
          commenttarget: tempTarget,
          replyTarget: tempReplyTarget,
          replyId: 0
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
    //当下拉刷新时重新请求所有数据，并进行显示
    var that = this;
    wx.request({
      url: 'https://www.wexinhaohan.xyz/commentsDetail',
      method: 'POST',
      data: {
        comment_id: app.appData.commentId
      },
      success: function (res) {
        console.log(res.data)
        var result = res.data.comment;
        var result2 = res.data.answers;
        that.setData({
          detail: result,
          comment: result2
        })
        var tempTarget = that.data.detail.comment_user_name;
        var tempReplyTarget = that.data.detail.comment_user_name;
        that.setData({
          commenttarget: tempTarget,
          replyTarget: tempReplyTarget,
          replyId: 0
        })
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
  onEssay: function(e){
    //根据评论中的文章显示框可以跳转到文章页面
    app.appData.select = this.data.detail.article_id;
    wx.navigateTo({
      url: '../detail/detail'
    })
  },
  onStartComment: function(e){
    //当用户点击评论的内容时，表示用户对评论进行回复，此时聚集焦点，标识回复对象
    var tempTarget = this.data.detail.comment_user_name;
    var tempReplyTarget = this.data.detail.comment_user_name;
    this.setData({
      commenttarget: tempTarget,
      onFocus: true,
      replyTarget: tempReplyTarget,
      replyId: 0
    })
  },
  onReplyComment: function(e){
    //当用户点击回复的内容时，表示用户对评论下面的回复进行回复，聚集焦点，标识回复对象
    console.log(e);
    console.log(e.currentTarget.dataset.replyid);
    var tempTarget = this.data.comment[e.currentTarget.dataset.index].passtiveUser_name;
    var tempReplyTarget = this.data.comment[e.currentTarget.dataset.index].passtiveUser_name;
    this.setData({
      commenttarget: tempTarget,
      onFocus: true,
      replyTarget: tempReplyTarget,
      replyId: e.currentTarget.dataset.replyid
    })
  },
  onSendComment: function(e){
    //当用户进行发送评论时，获取当前时间并进行转换，然后向服务器发送数据
    console.log(this.data.replyTarget);
    console.log(this.data.usrComment);
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
    console.log(app.appData.userId);
    console.log(currentdate);
    console.log(that.data.usrComment);
    console.log(app.appData.commentId);
    console.log(that.data.replyId);
    wx.request({
      url: 'https://www.wexinhaohan.xyz/answer',
      method: 'POST',
      data: {
        user_id: app.appData.userId,
        answer_post_time: currentdate,
        answer_content: that.data.usrComment,
        comment_id: app.appData.commentId,
        answer_id: that.data.replyId  
      },
      success: function (res) {
        console.log(res.data)
        wx.showToast({
          title: '发布评论成功',
          duration: 1000
        });
        that.setData({
          usrComment: ''
        });
        //发送成功后进行页面的刷新
        wx.request({
          url: 'https://www.wexinhaohan.xyz/commentsDetail',
          method: 'POST',
          data: {
            comment_id: app.appData.commentId
          },
          success: function (res) {
            console.log(res.data)
            var result = res.data.comment;
            var result2 = res.data.answers;
            that.setData({
              detail: result,
              comment: result2
            })
          }
        })
        //发送回复成功后，重置底部输入框中的默认内容
        var tempTarget = that.data.detail.comment_user_name;
        var tempReplyTarget = that.data.detail.comment_user_name;
        that.setData({
          commenttarget: tempTarget,
          replyTarget: tempReplyTarget
        })
      }
    })
  },
  onSendCommentButton: function(e){
    //操作等同于发布回复的函数，是提供两种发布评论的方式
    console.log(this.data.replyTarget);
    console.log(e.detail.value);
    console.log(this.data.replyTarget);
    console.log(this.data.usrComment);
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
    var that = this;
    console.log(app.appData.userId);
    console.log(currentdate);
    console.log(that.data.usrComment);
    console.log(app.appData.commentId);
    console.log(that.data.replyId);
    wx.request({
      url: 'https://www.wexinhaohan.xyz/answer',
      method: 'POST',
      data: {
        user_id: app.appData.userId,
        answer_post_time: currentdate,
        answer_content: that.data.usrComment,
        comment_id: app.appData.commentId,
        answer_id: that.data.replyId
      },
      success: function (res) {
        console.log(res.data)
        wx.showToast({
          title: '发布评论成功',
          duration: 1000
        });
        that.setData({
          usrComment: ''
        });
        //发送成功后进行页面的刷新
        wx.request({
          url: 'https://www.wexinhaohan.xyz/commentsDetail',
          method: 'POST',
          data: {
            comment_id: app.appData.commentId
          },
          success: function (res) {
            console.log(res.data)
            var result = res.data.comment;
            var result2 = res.data.answers;
            that.setData({
              detail: result,
              comment: result2
            })
          }
        })
        //发送回复成功后，重置底部输入框中的默认内容
        var tempTarget = that.data.detail.comment_user_name;
        var tempReplyTarget = that.data.detail.comment_user_name;
        that.setData({
          commenttarget: tempTarget,
          replyTarget: tempReplyTarget
        })
      }
    })
  },
  usrCommentChange: function (e) {
    //记录用户输入的评论内容
    console.log(e.detail.value);
    this.setData({
      usrComment: e.detail.value
    })
  }
})
