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
    userPhoto: "upload/NoImage.jpg", //用户照片
    userPhotoUrl: "",
    userPhotoList: [],
    address: "", //工作地址
    loadingHide: true,
    loadingText: "网络操作中。。",
  },

  //选择出生日期事件
  bind_birthday_change: function (e) {
    this.setData({
      birthday: e.detail.value
    })
  },
  //清空出生日期事件
  clear_birthday: function (e) {
    this.setData({
      birthday: "",
    });
  },

  //选择用户照片上传
  select_userPhoto: function (e) {
    var self = this
    wx.chooseImage({
      count: 1,   //可以上传一张图片
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        self.setData({
          userPhotoList: tempFilePaths,
          loadingHide: false, 
        });

        utils.sendUploadImage(config.basePath + "upload/image", tempFilePaths[0], function (res) {
          wx.stopPullDownRefresh()
          setTimeout(function () {
            self.setData({
              userPhoto: res.data,
              loadingHide: true
            })
          }, 200)
        })
      }
    })
  },

  //提交服务器修改家庭成员信息
  formSubmit: function (e) {
    var self = this
    var formData = e.detail.value
    var url = config.basePath + "api/userInfo/update"
    utils.sendRequest(url, formData, function (res) {
      wx.stopPullDownRefresh();
      wx.showToast({
        title: '修改成功',
        icon: 'success',
        duration: 500
      })

      //服务器修改成功返回列表页更新显示为最新的数据
      var pages = getCurrentPages()
      var userInfolist_page = pages[pages.length - 2];
      var userInfos = userInfolist_page.data.userInfos
      for(var i=0;i<userInfos.length;i++) {
        if(userInfos[i].user_name == res.data.user_name) {
          userInfos[i] = res.data
          break
        }
      }
      userInfolist_page.setData({userInfos:userInfos})
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

