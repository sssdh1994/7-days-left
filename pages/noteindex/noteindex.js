//achievement.js
const util = require('../../utils/util.js')

Page({
  data: {
    nownote:{},
    nownotetitle: '',
    nownotedetail: '',
    noteindex:0,
    categories:[],
    nowindex:0,
    nowindexTitle:'',
  },
  getAcievementList(){
    console.log(wx.getStorageSync('achievements'))
  },
  setAcievementList(){
    wx.setStorageSync('achievements', achievements)
  },
  delete(){
    let that = this
    wx.showModal({
      title: '提示',
      content: '你要删除这个笔记吗？',
      success(res) {
        if (res.confirm) {
          that.categories[that.nowindex].notes.splice(that.noteindex, 1)
          that.categories = wx.setStorageSync('categories', that.categories)
          wx.navigateBack()
        } else if (res.cancel) {
          //donothing
        }
      }
    })
  },
  onLoad: function (options) {
    this.nowindex = options.nowindex
    this.nownotetitle = options.nownotetitle
    this.nownotedetail = options.nownotedetail
    this.noteindex = options.noteindex
    this.categories = wx.getStorageSync('categories') || []
    this.setData({
      nownotetitle: this.nownotetitle,
      nownotedetail: this.nownotedetail,
      nowindexTitle: this.categories[this.nowindex].title
    })
  }
})