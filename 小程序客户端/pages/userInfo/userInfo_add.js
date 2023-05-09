var utils = require("../../utils/common.js");
var config = require("../../utils/config.js");

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
    userPhotoList: [],
    address: "", //工作地址
    loadingHide: true,
    loadingText: "网络操作中。。",
  },

  //选择出生日期
  bind_birthday_change: function (e) {
    this.setData({
      birthday: e.detail.value
    })
  },
  //清空出生日期
  clear_birthday: function (e) {
    this.setData({
      birthday: "",
    });
  },

  /*提交添加家庭成员到服务器 */
  formSubmit: function (e) {
    var self = this;
    var formData = e.detail.value;
    var url = config.basePath + "api/userInfo/add";
    utils.sendRequest(url, formData, function (res) {
      wx.stopPullDownRefresh();
      wx.showToast({
        title: '发布成功',
        icon: 'success',
        duration: 500
      })

      //提交成功后重置表单数据
      self.setData({
        user_name: "",
    password: "",
    name: "",
    sex: "",
    homeName: "",
    workName: "",
    birthday: "",
        userPhoto: "upload/NoImage.jpg",
        userPhotoList: [],
    address: "",
        loadingHide: true,
        loadingText: "网络操作中。。",
      })
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
          loadingHide: false
        });
        utils.sendUploadImage(config.basePath + "upload/image", tempFilePaths[0], function (res) {
          wx.stopPullDownRefresh()
          setTimeout(function () {
            self.setData({
              userPhoto: res.data,
              loadingHide: true
            });
          }, 200);
        });
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var token = wx.getStorageSync('authToken');
    if (!token) {
      wx.navigateTo({
        url: '../mobile/mobile',
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  }
})

