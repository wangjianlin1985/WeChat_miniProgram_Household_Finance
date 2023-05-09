var utils = require("../../utils/common.js")
var config = require("../../utils/config.js")

Page({
  /**
   * 页面的初始数据
   */
  data: {
    expendTypeId: 0, //支出类型id
    expendTypeName: "", //支出类型名称
    loadingHide: true,
    loadingText: "网络操作中。。",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (params) {
    var self = this
    var expendTypeId = params.expendTypeId
    var url = config.basePath + "api/expendType/get/" + expendTypeId
    utils.sendRequest(url, {}, function (expendTypeRes) {
      wx.stopPullDownRefresh()
      self.setData({
        expendTypeId: expendTypeRes.data.expendTypeId,
        expendTypeName: expendTypeRes.data.expendTypeName,
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

