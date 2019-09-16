//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    achievements: [],
    //achievements: [],
    leftTime: 0,
    motto: '做一个,自律的人',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onShow: function () {
    let compare = function (a, b) {
      return a.leftdays - b.leftdays
    }
    this.achievements = wx.getStorageSync('achievements') || []
    let today = new Date().getTime()
    this.achievements.map(item => item.leftdays = Math.floor(((item.targetdate - today) / 1000 / 60 / 60 / 24) + 1))
    this.achievements = this.achievements.filter(item => item.leftdays >= 0)
    this.achievements.sort(compare)
    let tem = this.achievements[0]
    this.achievements = []
    this.achievements.push(tem)
    this.setData({
      achievements: this.achievements
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
