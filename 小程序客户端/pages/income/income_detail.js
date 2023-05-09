var utils = require("../../utils/common.js")
var config = require("../../utils/config.js")

Page({
  /**
   * 页面的初始数据
   */
  data: {
    incomeId: 0, //收入id
    incomeTypeObj: "", //收入类型
    incomeFrom: "", //收入来源
    payWayObj: "", //支付方式
    payAccount: "", //收入账号
    incomeMoney: "", //收入金额
    incomeDate: "", //收入日期
    userObj: "", //用户
    memo: "", //备注
    loadingHide: true,
    loadingText: "网络操作中。。",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (params) {
    var self = this
    var incomeId = params.incomeId
    var url = config.basePath + "api/income/get/" + incomeId
    utils.sendRequest(url, {}, function (incomeRes) {
      wx.stopPullDownRefresh()
      self.setData({
        incomeId: incomeRes.data.incomeId,
        incomeTypeObj: incomeRes.data.incomeTypeObj.incomeTypeName,
        incomeFrom: incomeRes.data.incomeFrom,
        payWayObj: incomeRes.data.payWayObj.payWayName,
        payAccount: incomeRes.data.payAccount,
        incomeMoney: incomeRes.data.incomeMoney,
        incomeDate: incomeRes.data.incomeDate,
        userObj: incomeRes.data.userObj.name,
        memo: incomeRes.data.memo,
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

