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

  //提交服务器修改收入类型信息
  formSubmit: function (e) {
    var self = this
    var formData = e.detail.value
    var url = config.basePath + "api/incomeType/update"
    utils.sendRequest(url, formData, function (res) {
      wx.stopPullDownRefresh();
      wx.showToast({
        title: '修改成功',
        icon: 'success',
        duration: 500
      })

      //服务器修改成功返回列表页更新显示为最新的数据
      var pages = getCurrentPages()
      var incomeTypelist_page = pages[pages.length - 2];
      var incomeTypes = incomeTypelist_page.data.incomeTypes
      for(var i=0;i<incomeTypes.length;i++) {
        if(incomeTypes[i].incomeTypeId == res.data.incomeTypeId) {
          incomeTypes[i] = res.data
          break
        }
      }
      incomeTypelist_page.setData({incomeTypes:incomeTypes})
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

