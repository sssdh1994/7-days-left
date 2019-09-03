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
  clickIndex(index){
    let that = this
    let temIndex = index.currentTarget.dataset.index
    wx.showModal({
      title: '提示',
      content: '你要删除事迹：' + this.achievements[temIndex].title+'吗？',
      success(res) {
        if (res.confirm) {
          that.achievements.splice(temIndex,1)
          that.setData({
            achievements: that.achievements
          })
          that.achievements.map(item => delete item.leftdays)
          wx.setStorageSync('achievements', that.achievements)
        } else if (res.cancel) {
          //donothing
        }
      }
    })
    console.log(temIndex)
    console.log(this.achievements)
  },
  onShow: function () {
    let compare = function(a,b){
      return a.leftdays - b.leftdays
    }
    this.achievements = wx.getStorageSync('achievements') || []
    let today = new Date().getTime()
    this.achievements.map(item => item.leftdays = Math.floor(((item.targetdate - today) / 1000 / 60 / 60 / 24) + 1))
    console.log(this.leftdays)
    this.achievements.sort(compare)
    this.setData({
      achievements: this.achievements
    })
  }
})