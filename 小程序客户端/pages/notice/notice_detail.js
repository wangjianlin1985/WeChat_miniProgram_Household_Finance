var utils = require("../../utils/common.js")
var config = require("../../utils/config.js")

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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (params) {
    var self = this
    var noticeId = params.noticeId
    var url = config.basePath + "api/notice/get/" + noticeId
    utils.sendRequest(url, {}, function (noticeRes) {
      wx.stopPullDownRefresh()
      self.setData({
        noticeId: noticeRes.data.noticeId,
        title: noticeRes.data.title,
        content: noticeRes.data.content,
        addDate: noticeRes.data.addDate,
      })
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  }

})

