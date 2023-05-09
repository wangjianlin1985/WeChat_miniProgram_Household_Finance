var utils = require("../../utils/common.js")
var config = require("../../utils/config.js")

Page({
  /**
   * 页面的初始数据
   */
  data: {
    incomeTypeId: 0, //收入类别id
    incomeTypeName: "", //收入类别名称
    loadingHide: true,
    loadingText: "网络操作中。。",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (params) {
    var self = this
    var incomeTypeId = params.incomeTypeId
    var url = config.basePath + "api/incomeType/get/" + incomeTypeId
    utils.sendRequest(url, {}, function (incomeTypeRes) {
      wx.stopPullDownRefresh()
      self.setData({
        incomeTypeId: incomeTypeRes.data.incomeTypeId,
        incomeTypeName: incomeTypeRes.data.incomeTypeName,
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

