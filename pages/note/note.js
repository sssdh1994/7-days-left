//note.js
const util = require('../../utils/util.js')

Page({
  data: {
    categories: [
      {
        title: '前端',
        notes:[
          {notetitle:'html',notedetail:'html细节'},
          {notetitle:'js',notedetail:'js细节'},
          {notetitle:'vue',notedetail:'vue细节' },
          { notetitle: '测试测试', notedetail: 'vue细节' }
        ]
      },
      {
        title: '后端',
        notes: [
          { notetitle: 'node', notedetail: 'node细节' },
          { notetitle: 'thinkjs', notedetail: 'thinkjs细节' },
        ]
      },
      {
        title: '数据库',
        notes: [
          { notetitle: 'mysql', notedetail: 'mysql细节' },
        ]
      },
      {
        title: 'webgl',
        notes: [
          { notetitle: 'webgl', notedetail: 'webgl细节' },
        ]
      },
      {
        title: 'webgl',
      }
    ],
    nowindex:0,
    //achievements: [],
    leftTime: 0,
    something: '',
    nownote:{},
    nownotetitle:'',
    nownotedetail: '',
    showNewCaterory:false,
    newCateroryTitle:'',
  },
  //增加类目
  addCategory(){
    this.showNewCaterory = !this.showNewCaterory
    this.setData({
      showNewCaterory: this.showNewCaterory
    })
  },
  //增加类目确认
  addCategoryConfirm(){
    if (this.newCateroryTitle){
      // let param = {}
      // param.title = this.newCateroryTitle
      // this.categories.push(param)
      // wx.setStorageSync('categories', this.categories)
      // this.setData({
      //   categories: this.categories
      // })
    }
    this.showNewCaterory = !this.showNewCaterory
    this.newCateroryTitle = ''
    this.setData({
      showNewCaterory: this.showNewCaterory
    })
  },
  //增加笔记
  addNote() {
    wx.navigateTo({
      url: '../addnote/addnote',
    })
  },
  readNote() {
    wx.navigateTo({
      url: '../noteindex/noteindex',
    })
  },
  inputBind: function (e) {
    this.newCateroryTitle = e.detail.value
  },
  //点击类目
  clickIndex(index) {
    this.nowindex = index.currentTarget.dataset.index
    this.setData({
      nowindex: this.nowindex
    })
  },
  //点击笔记
  clickNote(item){
    this.nownote = item.currentTarget.dataset.item
    console.log('note界面的nownote',this.nownote)
    this.nownotetitle = item.currentTarget.dataset.item.notetitle
    this.nownotedetail = item.currentTarget.dataset.item.notedetail
    wx.navigateTo({
      url: '../noteindex/noteindex?nownotetitle=' + this.nownotetitle + '&nownotedetail=' + this.nownotedetail,
    })
  },
  onShow: function () {
    // this.categories = wx.getStorageSync('categories') || []
    // this.setData({
    //   categories: this.categories
    // })
  }
})