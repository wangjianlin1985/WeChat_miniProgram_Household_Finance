var utils = require("../../utils/common.js")
var config = require("../../utils/config.js")

Page({
  /**
   * 页面的初始数据
   */
  data: {
    incomeId: 0, //收入id
    incomeTypeObj_Index: "0", //收入类型
    incomeTypes: [],
    incomeFrom: "", //收入来源
    payWayObj_Index: "0", //支付方式
    payWays: [],
    payAccount: "", //收入账号
    incomeMoney: "", //收入金额
    incomeDate: "", //收入日期
    userObj_Index: "0", //用户
    userInfos: [],
    memo: "", //备注
    loadingHide: true,
    loadingText: "网络操作中。。",
  },

  //选择收入日期事件
  bind_incomeDate_change: function (e) {
    this.setData({
      incomeDate: e.detail.value
    })
  },
  //清空收入日期事件
  clear_incomeDate: function (e) {
    this.setData({
      incomeDate: "",
    });
  },

  //收入类型修改事件
  bind_incomeTypeObj_change: function (e) {
    this.setData({
      incomeTypeObj_Index: e.detail.value
    })
  },

  //支付方式修改事件
  bind_payWayObj_change: function (e) {
    this.setData({
      payWayObj_Index: e.detail.value
    })
  },

  //用户修改事件
  bind_userObj_change: function (e) {
    this.setData({
      userObj_Index: e.detail.value
    })
  },

  //提交服务器修改收入信息信息
  formSubmit: function (e) {
    var self = this
    var formData = e.detail.value
    var url = config.basePath + "api/income/update"
    utils.sendRequest(url, formData, function (res) {
      wx.stopPullDownRefresh();
      wx.showToast({
        title: '修改成功',
        icon: 'success',
        duration: 500
      })

      //服务器修改成功返回列表页更新显示为最新的数据
      var pages = getCurrentPages()
      var incomelist_page = pages[pages.length - 2];
      var incomes = incomelist_page.data.incomes
      for(var i=0;i<incomes.length;i++) {
        if(incomes[i].incomeId == res.data.incomeId) {
          incomes[i] = res.data
          break
        }
      }
      incomelist_page.setData({incomes:incomes})
      setTimeout(function () {
        wx.navigateBack({})
      }, 500) 
    })
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
        incomeTypeObj_Index: 1,
        incomeFrom: incomeRes.data.incomeFrom,
        payWayObj_Index: 1,
        payAccount: incomeRes.data.payAccount,
        incomeMoney: incomeRes.data.incomeMoney,
        incomeDate: incomeRes.data.incomeDate,
        userObj_Index: 1,
        memo: incomeRes.data.memo,
      })

      var incomeTypeUrl = config.basePath + "api/incomeType/listAll" 
      utils.sendRequest(incomeTypeUrl, null, function (res) {
        wx.stopPullDownRefresh()
        self.setData({
          incomeTypes: res.data,
        })
        for (var i = 0; i < self.data.incomeTypes.length; i++) {
          if (incomeRes.data.incomeTypeObj.incomeTypeId == self.data.incomeTypes[i].incomeTypeId) {
            self.setData({
              incomeTypeObj_Index: i,
            });
            break;
          }
        }
      })
      var payWayUrl = config.basePath + "api/payWay/listAll" 
      utils.sendRequest(payWayUrl, null, function (res) {
        wx.stopPullDownRefresh()
        self.setData({
          payWays: res.data,
        })
        for (var i = 0; i < self.data.payWays.length; i++) {
          if (incomeRes.data.payWayObj.payWayId == self.data.payWays[i].payWayId) {
            self.setData({
              payWayObj_Index: i,
            });
            break;
          }
        }
      })
      var userInfoUrl = config.basePath + "api/userInfo/listAll" 
      utils.sendRequest(userInfoUrl, null, function (res) {
        wx.stopPullDownRefresh()
        self.setData({
          userInfos: res.data,
        })
        for (var i = 0; i < self.data.userInfos.length; i++) {
          if (incomeRes.data.userObj.user_name == self.data.userInfos[i].user_name) {
            self.setData({
              userObj_Index: i,
            });
            break;
          }
        }
      })
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
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

})

