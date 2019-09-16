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
    let compare = function(a,b){
      return a.leftdays - b.leftdays
    }
    this.achievements = wx.getStorageSync('achievements') || []
    let today = new Date().getTime()
    this.achievements.map(item => item.leftdays = Math.floor(((item.targetdate - today) / 1000 / 60 / 60 / 24) + 1))
    this.achievements = this.achievements.filter(item => item.leftdays < 0)
    this.achievements.map(item => item.leftdays = - item.leftdays)
    console.log(this.leftdays)
    this.achievements.sort(compare)
    this.setData({
      achievements: this.achievements
    })
  }
})