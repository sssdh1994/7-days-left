//achievement.js
const util = require('../../utils/util.js')

Page({
  data: {
    achievements: [],
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
    console.log('click')
  },
  onLoad: function () {
    this.setData({
      achievements: (wx.getStorageSync('logs') || []).map(item => {
        return util.formatTime(new Date(item))
      })
    })
  }
})