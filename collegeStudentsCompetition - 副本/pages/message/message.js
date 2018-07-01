//index.js
//获取应用实例
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comment: []
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
    //请求关于评论和回复的数据
    var that=this;
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wx.request({
      url: 'https://www.wexinhaohan.xyz/user/myMessage',
      method: 'POST',
      data: {
        user_id: app.appData.userId
      },
      success: function (res) {
        console.log(res.data);
        //对评论，回复进行合并，并根据时间进行排序
        var temp1=res.data.datas;
        var temp2=res.data.comments
        var temp3 = [];
        if(temp1.length==0){
          temp3=temp2;
        }
        else if(temp2.length==0){
          temp3=temp1;
        }
        else {
          var index1 = 0;
          var index2 = 0;
          console.log(temp1.length);
          console.log(temp2.length);
          while (true) {
            if (temp1[index1].answer_post_time > temp2[index2].answer_post_time) {
              temp3.push(temp1[index1]);
              console.log(temp1.length);
              console.log(temp2.length);
              index1++;
              if(index1==temp1.length){
                for(;index2<temp2.length;index2++){
                  temp3.push(temp2[index2]);
                }
                break;
              }
            }
            else {
              temp3.push(temp2[index2]);
              console.log(temp1.length);
              console.log(temp2.length);
              index2++;
              if(index2==temp2.length){
                for (; index1 < temp1.length; index1++) {
                  temp3.push(temp1[index1]);
                }
                break;
              }
            }
          }
        }
        console.log(temp3);
        //合并，排序后进行赋值
        that.setData({
          comment: temp3
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
    //下拉刷新，功能，实现流程类似于显示时的函数
    var that = this;
    wx.request({
      url: 'https://www.wexinhaohan.xyz/user/myMessage',
      method: 'POST',
      data: {
        user_id: app.appData.userId
      },
      success: function (res) {
        console.log(res.data);
        //对请求的数据进行排序
        var temp1 = res.data.datas;
        var temp2 = res.data.comments
        var temp3 = [];
        if (temp1.length == 0) {
          temp3 = temp2;
        }
        else if (temp2.length == 0) {
          temp3 = temp1;
        }
        else {
          var index1 = 0;
          var index2 = 0;
          while (true) {
            if (temp1[index1].answer_post_time > temp2[index2].answer_post_time) {
              temp3.push(temp1[index1]);
              index1++;
              if (index1 == temp1.length) {
                temp3.concat(temp2);
                break;
              }
            }
            else {
              temp3.push(temp2[index2]);
              index2++;
              if (index2 == temp2.length) {
                temp3.concat(temp1);
                break;
              }
            }
          }
        }
        that.setData({
          comment: temp3
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
  onCommentDetail:function(e){
    //点击回复的地方会进入评论详情，此时标识评论id
    console.log(e.currentTarget.dataset.commentid);
    app.appData.commentId = e.currentTarget.dataset.commentid;
    wx.navigateTo({
      url: '../commentDetail/commentDetail'
    })
  },
  onEssay: function(e){
    //点击评论的地方会进入文章详情，此时标识文章id
    console.log(e.currentTarget.dataset.essayid);
    app.appData.select = e.currentTarget.dataset.essayid;
    wx.navigateTo({
      url: '../detail/detail'
    })
  }
})
