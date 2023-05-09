var utils = require("../../utils/common.js")
var config = require("../../utils/config.js")

Page({
  /**
   * 页面的初始数据
   */
  data: {
    expendId: 0, //支出id
    expendTypeObj_Index: "0", //支出类型
    expendTypes: [],
    expendPurpose: "", //支出用途
    payWayObj_Index: "0", //支付方式
    payWays: [],
    payAccount: "", //支付账号
    expendMoney: "", //支付金额
    expendDate: "", //支付日期
    userInfoObj_Index: "0", //用户
    userInfos: [],
    memo: "", //备忘信息
    loadingHide: true,
    loadingText: "网络操作中。。",
  },

  //选择支付日期事件
  bind_expendDate_change: function (e) {
    this.setData({
      expendDate: e.detail.value
    })
  },
  //清空支付日期事件
  clear_expendDate: function (e) {
    this.setData({
      expendDate: "",
    });
  },

  //支出类型修改事件
  bind_expendTypeObj_change: function (e) {
    this.setData({
      expendTypeObj_Index: e.detail.value
    })
  },

  //支付方式修改事件
  bind_payWayObj_change: function (e) {
    this.setData({
      payWayObj_Index: e.detail.value
    })
  },

  //用户修改事件
  bind_userInfoObj_change: function (e) {
    this.setData({
      userInfoObj_Index: e.detail.value
    })
  },

  //提交服务器修改支出信息信息
  formSubmit: function (e) {
    var self = this
    var formData = e.detail.value
    var url = config.basePath + "api/expend/update"
    utils.sendRequest(url, formData, function (res) {
      wx.stopPullDownRefresh();
      wx.showToast({
        title: '修改成功',
        icon: 'success',
        duration: 500
      })

      //服务器修改成功返回列表页更新显示为最新的数据
      var pages = getCurrentPages()
      var expendlist_page = pages[pages.length - 2];
      var expends = expendlist_page.data.expends
      for(var i=0;i<expends.length;i++) {
        if(expends[i].expendId == res.data.expendId) {
          expends[i] = res.data
          break
        }
      }
      expendlist_page.setData({expends:expends})
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
    var expendId = params.expendId
    var url = config.basePath + "api/expend/get/" + expendId
    utils.sendRequest(url, {}, function (expendRes) {
      wx.stopPullDownRefresh()
      self.setData({
        expendId: expendRes.data.expendId,
        expendTypeObj_Index: 1,
        expendPurpose: expendRes.data.expendPurpose,
        payWayObj_Index: 1,
        payAccount: expendRes.data.payAccount,
        expendMoney: expendRes.data.expendMoney,
        expendDate: expendRes.data.expendDate,
        userInfoObj_Index: 1,
        memo: expendRes.data.memo,
      })

      var expendTypeUrl = config.basePath + "api/expendType/listAll" 
      utils.sendRequest(expendTypeUrl, null, function (res) {
        wx.stopPullDownRefresh()
        self.setData({
          expendTypes: res.data,
        })
        for (var i = 0; i < self.data.expendTypes.length; i++) {
          if (expendRes.data.expendTypeObj.expendTypeId == self.data.expendTypes[i].expendTypeId) {
            self.setData({
              expendTypeObj_Index: i,
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
          if (expendRes.data.payWayObj.payWayId == self.data.payWays[i].payWayId) {
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
          if (expendRes.data.userInfoObj.user_name == self.data.userInfos[i].user_name) {
            self.setData({
              userInfoObj_Index: i,
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

