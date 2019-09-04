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
          {notetitle:'vue',notedetail:'vue细节' }
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
      }
      ,
      {
        title: 'webgl',
        notes: [
          { notetitle: 'webgl', notedetail: 'webgl细节' },
        ]
      }
    ],
    nowindex:0,
    //achievements: [],
    leftTime: 0,
    something: '',
    nownote:{},
    nownotetitle:'',
    nownotedetail: '',
  },
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
  clickIndex(index) {
    this.nowindex = index.currentTarget.dataset.index
    this.setData({
      nowindex: this.nowindex
    })
  },
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
    
  }
})