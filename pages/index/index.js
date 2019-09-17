//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    achievements: [],
    //achievements: [],
    categories:[],
    randomTitle:'',
    randomNoteTitle: '',
    randomNoteDetail: '',
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
  showRandomNote(){
    //处理笔记，随机显示一个笔记
    this.categories = wx.getStorageSync('categories') || []
    this.categories = this.categories.filter(item => item.hasOwnProperty('notes'))
    if (this.categories.length > 0){
      let randomCategoriesLength = Math.floor(Math.random() * this.categories.length)
      let randomNotesLength = Math.floor(Math.random() * this.categories[randomCategoriesLength].notes.length)
      console.log('随机数组数字',randomCategoriesLength)
      console.log('随机数组数字',randomNotesLength)
      this.randomTitle = this.categories[randomCategoriesLength].title
      this.randomNoteTitle = this.categories[randomCategoriesLength].notes[randomNotesLength].notetitle
      this.randomNoteDetail = this.categories[randomCategoriesLength].notes[randomNotesLength].notedetail
      this.setData({
        randomTitle: this.randomTitle,
        randomNoteTitle: this.randomNoteTitle,
        randomNoteDetail: this.randomNoteDetail
      })
    }
  },
  showFirstAchievement(){
    //处理事迹，只显示第一个未完成的事迹
    this.achievements = wx.getStorageSync('achievements') || []
    let today = new Date().getTime()
    this.achievements.map(item => item.leftdays = Math.floor(((item.targetdate - today) / 1000 / 60 / 60 / 24) + 1))
    this.achievements = this.achievements.filter(item => item.leftdays >= 0)
    let tem = this.achievements[0]
    this.achievements = []
    this.achievements.push(tem)
    this.setData({
      achievements: this.achievements
    })
  },
  onShow: function () {
    this.showFirstAchievement()
    this.showRandomNote()
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
