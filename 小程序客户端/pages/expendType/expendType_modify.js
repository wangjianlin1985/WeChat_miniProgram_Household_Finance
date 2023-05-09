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

  //提交服务器修改支出类型信息
  formSubmit: function (e) {
    var self = this
    var formData = e.detail.value
    var url = config.basePath + "api/expendType/update"
    utils.sendRequest(url, formData, function (res) {
      wx.stopPullDownRefresh();
      wx.showToast({
        title: '修改成功',
        icon: 'success',
        duration: 500
      })

      //服务器修改成功返回列表页更新显示为最新的数据
      var pages = getCurrentPages()
      var expendTypelist_page = pages[pages.length - 2];
      var expendTypes = expendTypelist_page.data.expendTypes
      for(var i=0;i<expendTypes.length;i++) {
        if(expendTypes[i].expendTypeId == res.data.expendTypeId) {
          expendTypes[i] = res.data
          break
        }
      }
      expendTypelist_page.setData({expendTypes:expendTypes})
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

