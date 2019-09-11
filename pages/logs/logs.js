//note.js
const util = require('../../utils/util.js')

Page({
  data: {
    achievements: [
      {
        title: '考四级',
        leftdays: 66
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
    leftTime: 0,
    something: '',
  },
  readNote() {
    wx.switchTab({
      url: '../note/note',
    })
  },
  readAchievement() {
    wx.switchTab({
      url: '../achievement/achievement',
    })
  },
  clickIndex(index) {

  },
  onShow: function () {

  }
})