//achievement.js
const util = require('../../utils/util.js')

Page({
  data: {
    categories:[],
    notetitle:'',
    notedetail:'',
    title:'',
    nowindex:0,
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
  inputBind :function(e){
    this.title = e.detail.value
  },
  inputBindNotetitle: function (e) {
    this.notetitle = e.detail.value
  },
  inputBindNotedetail: function (e) {
    this.notedetail = e.detail.value
  },
  
  confirm(){
    if (this.notetitle && this.notedetail && this.title){
      let tem = {}
      tem.notetitle = this.notetitle
      tem.notedetail = this.notedetail
      this.categories[this.nowindex].title = this.title
      if (!this.categories[this.nowindex].notes){
        this.categories[this.nowindex].notes = []
      }
      this.categories[this.nowindex].notes.push(tem)
      wx.setStorageSync('categories', this.categories)
      wx.navigateBack()
    }else{
      wx.showToast({
        title: '请输入相应的内容',
        icon: 'none',
        duration: 2000
      })
    }
  },
  onLoad: function (options) {
    console.log(options)
    this.title = options.title
    this.nowindex = parseInt(options.nowindex)
    this.setData({
      title: this.title,
    })
    this.categories = wx.getStorageSync('categories') || []
  }
})