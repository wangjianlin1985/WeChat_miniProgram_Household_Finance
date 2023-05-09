var utils = require("../../utils/common.js");
var config = require("../../utils/config.js");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    noticeId: 0, //记录id
    title: "", //标题
    content: "", //内容
    addDate: "", //发布日期
    loadingHide: true,
    loadingText: "网络操作中。。",
  },

  //选择发布日期
  bind_addDate_change: function (e) {
    this.setData({
      addDate: e.detail.value
    })
  },
  //清空发布日期
  clear_addDate: function (e) {
    this.setData({
      addDate: "",
    });
  },

  /*提交添加新闻公告到服务器 */
  formSubmit: function (e) {
    var self = this;
    var formData = e.detail.value;
    var url = config.basePath + "api/notice/add";
    utils.sendRequest(url, formData, function (res) {
      wx.stopPullDownRefresh();
      wx.showToast({
        title: '发布成功',
        icon: 'success',
        duration: 500
      })

      //提交成功后重置表单数据
      self.setData({
        noticeId: 0,
    title: "",
    content: "",
    addDate: "",
        loadingHide: true,
        loadingText: "网络操作中。。",
      })
    });
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
    var token = wx.getStorageSync('authToken');
    if (!token) {
      wx.navigateTo({
        url: '../mobile/mobile',
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  }
})

