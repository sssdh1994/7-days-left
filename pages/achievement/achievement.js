//achievement.js
const util = require('../../utils/util.js')

Page({
  data: {
    achievements: [
      {
        title:'考四级',
        leftdays:66
      },
      {
        title: '学会游泳',
        leftdays: 60
      },
      {
        title: '考六级',
        leftdays: 365
      }
    ],
    //achievements: [],
    leftTime:0,
    something:'',
  },
  getAcievementList(){
    console.log(wx.getStorageSync('achievements'))
  },
  setAcievementList(){
    wx.setStorageSync('achievements', achievements)
  },
  clickMe() {
    wx.navigateTo({
      url: '../addachievement/addachievement',
    })
  },
  onShow: function () {
    this.achievements = wx.getStorageSync('achievements') || []
    this.setData({
      achievements: this.achievements
    })
  }
})