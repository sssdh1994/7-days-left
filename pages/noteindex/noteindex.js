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
  },
  getAcievementList(){
    console.log(wx.getStorageSync('achievements'))
  },
  setAcievementList(){
    wx.setStorageSync('achievements', achievements)
  },
  delete(){
    this.categories[this.nowindex].notes.splice(this.noteindex,1)
    this.categories = wx.setStorageSync('categories', this.categories)
    wx.navigateBack()
  },
  onLoad: function (options) {
    this.nowindex = options.nowindex
    this.nownotetitle = options.nownotetitle
    this.nownotedetail = options.nownotedetail
    this.noteindex = options.noteindex
    this.setData({
      nownotetitle: this.nownotetitle,
      nownotedetail: this.nownotedetail
    })
    this.categories = wx.getStorageSync('categories') || []
  }
})