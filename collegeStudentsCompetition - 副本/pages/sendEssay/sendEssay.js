//index.js
//获取应用实例
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:"",
    content:"",
    imageFilePaths:[]
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
  onSendEssay: function(){
    //发送文章的函数，对文章标题，内容进行判断，若不为空则开始发送。
    if(this.data.title&&this.data.content){
      wx.showLoading({
        title: '发送中',
        mask: true
      })
      //获取并格式化当前时间
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
      if (hour>=0 && hour<=9){
        hour= "0" + hour;
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
      console.log(that.data.title);
      console.log(that.data.content);
      console.log(currentdate);
      console.log(app.appData.userId);
      var essayId;
      //发送文章的标题，和内容，并获取文章的id
      wx.request({
        url: 'https://www.wexinhaohan.xyz/user/publishArticle',
        method: 'POST',
        data: {
          title: that.data.title,
          content: that.data.content,
          post_time: currentdate,
          user_id: app.appData.userId
        },
        success: function (res) {
          console.log(res.data);
          essayId = res.data.article_id;
          var tempFilePath = that.data.imageFilePaths;
          console.log(tempFilePath.length);
          console.log(essayId);
          var numOfUpload=0;
          var upLoad={};
          upLoad.i=0;
          upLoad.path = tempFilePath;
          //如果有图片上传的话，调用上传图片的函数，并将异步上传写成迭代的函数，完成同步按顺序上传
          if (tempFilePath.length>0){
          that.uploadimg(upLoad, essayId);
          }
          else {
            wx.hideLoading();
            wx.showModal({
              title: '发送文章成功',
              showCancel: false,
              success: function (res) {
                if (res.confirm || !res.cancel) {
                  wx.navigateBack({

                  })
                }
              }
            })
          }
        }
      })
    }
    else {
      wx.showToast({
        title: '标题或内容不能为空',
        icon: 'none',
        duration: 2000
      })
    }
  },
  titleChange: function(e){
    //记录文章标题的改变
    this.setData({
      title: e.detail.value
    })
  },
  contentChange: function(e){
    //记录文章内容的改变
    this.setData({
      content: e.detail.value
    })
  },
  onAddPicture: function(e){
    //调用微信chooseImage的api来完成图片的选择，并获取暂时路径
    var that=this;
    wx.chooseImage({
      count: 5,
      sizeType: 'original',
      success: function (res) {
        console.log(res);
        that.setData({
          imageFilePaths: res.tempFilePaths
        })
      }
    })

  },
  uploadimg: function (data, id) {
    //上传图片的函数，根据文章id对图片进行上传，函数为递归，来实现同步的上传实现，可以让图片按顺序存储
    var that = this;
    var i = data.i ? data.i : 0;
    console.log(data.path[i]);
    console.log(id);
    wx.uploadFile({
      url: 'https://www.wexinhaohan.xyz/upImages',
      filePath: data.path[i],
      name: 'file',
      formData: {
        'article_id': id
      },
      success: (res) => {
        i++;
        console.log(res)
        if (i == data.path.length) {
          wx.hideLoading();
          wx.showModal({
            title: '发送文章成功',
            showCancel: false,
            success: function (res) {
              if (res.confirm || !res.cancel) {
                wx.navigateBack({

                })
              }
            }
          })
        } else {
          console.log(i);
          data.i = i;
          that.uploadimg(data, id);
        }
      }
    });
  }
})
