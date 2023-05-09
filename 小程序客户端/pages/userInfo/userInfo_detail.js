var utils = require("../../utils/common.js")
var config = require("../../utils/config.js")

Page({
  /**
   * 页面的初始数据
   */
  data: {
    user_name: "", //亲友账号
    password: "", //登录密码
    name: "", //姓名
    sex: "", //性别
    homeName: "", //家庭关系
    workName: "", //职业
    birthday: "", //出生日期
    userPhotoUrl: "", //用户照片
    address: "", //工作地址
    loadingHide: true,
    loadingText: "网络操作中。。",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (params) {
    var self = this
    var user_name = params.user_name
    var url = config.basePath + "api/userInfo/get/" + user_name
    utils.sendRequest(url, {}, function (userInfoRes) {
      wx.stopPullDownRefresh()
      self.setData({
        user_name: userInfoRes.data.user_name,
        password: userInfoRes.data.password,
        name: userInfoRes.data.name,
        sex: userInfoRes.data.sex,
        homeName: userInfoRes.data.homeName,
        workName: userInfoRes.data.workName,
        birthday: userInfoRes.data.birthday,
        userPhoto: userInfoRes.data.userPhoto,
        userPhotoUrl: userInfoRes.data.userPhotoUrl,
        address: userInfoRes.data.address,
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

