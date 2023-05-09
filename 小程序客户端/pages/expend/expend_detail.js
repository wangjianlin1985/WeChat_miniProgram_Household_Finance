var utils = require("../../utils/common.js")
var config = require("../../utils/config.js")

Page({
  /**
   * 页面的初始数据
   */
  data: {
    expendId: 0, //支出id
    expendTypeObj: "", //支出类型
    expendPurpose: "", //支出用途
    payWayObj: "", //支付方式
    payAccount: "", //支付账号
    expendMoney: "", //支付金额
    expendDate: "", //支付日期
    userInfoObj: "", //用户
    memo: "", //备忘信息
    loadingHide: true,
    loadingText: "网络操作中。。",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (params) {
    var self = this
    var expendId = params.expendId
    var url = config.basePath + "api/expend/get/" + expendId
    utils.sendRequest(url, {}, function (expendRes) {
      wx.stopPullDownRefresh()
      self.setData({
        expendId: expendRes.data.expendId,
        expendTypeObj: expendRes.data.expendTypeObj.expendTypeName,
        expendPurpose: expendRes.data.expendPurpose,
        payWayObj: expendRes.data.payWayObj.payWayName,
        payAccount: expendRes.data.payAccount,
        expendMoney: expendRes.data.expendMoney,
        expendDate: expendRes.data.expendDate,
        userInfoObj: expendRes.data.userInfoObj.name,
        memo: expendRes.data.memo,
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

