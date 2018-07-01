//index.js
//获取应用实例
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '', //用户在搜索框内输入的内容
    select: [], //符合搜索内容的文章
    allEssay: []  //所以文章
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
    //在显示页面时，获取全部文章
    var that = this;
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wx.request({
      url: 'https://www.wexinhaohan.xyz/index',
      method: 'POST',
      data: {
        beginNumber: 1,
        needCount: 500
      },
      success: function (res) {
        console.log(res.data);
        var result = res.data.datas;
        that.setData({
          allEssay: result
        });
        wx.hideLoading();
      }
    })
    //根据搜索框的内容进行判定，即使你跳转页面，搜索框内的内容也不会被清空
    if (this.data.value == '') {
      //如果搜索框的内容为空，则将搜索内容清空
      this.setData({
        select: []
      });
    }
    else {
      //如果搜索框内有内容，则对所有文章的标题与搜索内容比较，生成符合搜索内容的数组作为显示的内容
      var temp = [];
      var content = this.data.value;
      var index = 0;
      for (; index < this.data.allEssay.length; index++) {
        if (this.data.allEssay[index].article_name.includes(content)) {
          temp.push(this.data.allEssay[index])
        }
      }
      this.setData({
        select: temp
      });
    }
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
  searchInput: function(e){
    //当搜索框内输入内容时，动态判断改变显示的内容
    this.setData({
      value: e.detail.value
    });
    if (this.data.value==''){
      this.setData({
        select: []
      });
    }
    else{
      var temp=[];
      var content=this.data.value;
      var index=0;
      for(;index<this.data.allEssay.length;index++){
        if (this.data.allEssay[index].article_name.includes(content)){
          temp.push(this.data.allEssay[index])
        }
      }
      this.setData({
        select: temp
      });
    }
  },
  searchClear: function(){
    //清空搜索显示的内容
    this.setData({
      value: '',
      select: []
    })
  },
  onDetail:function(e){
    //标识文章id，并进入文章详细内容页面
    app.appData.select = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../detail/detail'
    })
  } 
})
