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

  //选择发布日期事件
  bind_addDate_change: function (e) {
    this.setData({
      addDate: e.detail.value
    })
  },
  //清空发布日期事件
  clear_addDate: function (e) {
    this.setData({
      addDate: "",
    });
  },

  //提交服务器修改新闻公告信息
  formSubmit: function (e) {
    var self = this
    var formData = e.detail.value
    var url = config.basePath + "api/notice/update"
    utils.sendRequest(url, formData, function (res) {
      wx.stopPullDownRefresh();
      wx.showToast({
        title: '修改成功',
        icon: 'success',
        duration: 500
      })

      //服务器修改成功返回列表页更新显示为最新的数据
      var pages = getCurrentPages()
      var noticelist_page = pages[pages.length - 2];
      var notices = noticelist_page.data.notices
      for(var i=0;i<notices.length;i++) {
        if(notices[i].noticeId == res.data.noticeId) {
          notices[i] = res.data
          break
        }
      }
      noticelist_page.setData({notices:notices})
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

