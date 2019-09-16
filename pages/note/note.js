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
    noteindex:0,
    touchStart:0,
    touchEnd:0,
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
      let param = {}
      param.title = this.newCateroryTitle
      this.categories.push(param)
      wx.setStorageSync('categories', this.categories)
      this.setData({
        categories: this.categories
      })
    }
    this.showNewCaterory = !this.showNewCaterory
    this.newCateroryTitle = ''
    this.setData({
      showNewCaterory: this.showNewCaterory
    })
  },
  //增加笔记
  addNote() {
    console.log(this.nowindex)
    if (this.nowindex === undefined) {
      wx.showToast({
        title: '请先添加一个类目',
        icon: 'none',
        duration: 2000
      })
    } else {
      this.categories = this.categories || this.data.categories
      this.nowindex = this.nowindex || this.data.nowindex
      wx.navigateTo({
        url: '../addnote/addnote?title=' + this.categories[this.nowindex].title + '&nowindex=' + this.nowindex,
      })
    }
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
    let touchTime = this.data.touchEnd - this.data.touchStart;
    this.nowindex = index.currentTarget.dataset.index
    //触碰时间小于800ms
    if (touchTime < 800){
      this.setData({
        nowindex: this.nowindex
      })
    }else{
      console.log(this.nowindex)
      let that = this
      wx.showModal({
        title: '提示',
        content: '删除这个类目吗？（包括类目下的笔记）',
        success(res) {
          if (res.confirm) {
            that.categories.splice(that.nowindex, 1)
            that.setData({
              categories: that.categories
            })
            wx.setStorageSync('categories', that.categories)
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })

    }
  },
  touchStart(e) {
    console.log('touchStart',e)
    this.setData({
      touchStart: e.timeStamp
    })
  },
  touchEnd(e){
    console.log('touchEnd', e)
    this.setData({
      touchEnd: e.timeStamp
    })
  },
  //点击笔记
  clickNote(item){
    this.nowindex = this.nowindex || 0
    this.noteindex = item.currentTarget.dataset.noteindex
    this.nownote = item.currentTarget.dataset.item
    this.nownotetitle = item.currentTarget.dataset.item.notetitle
    this.nownotedetail = item.currentTarget.dataset.item.notedetail
    wx.navigateTo({
      url: '../noteindex/noteindex?nownotetitle=' + this.nownotetitle + '&nownotedetail=' + this.nownotedetail + '&noteindex=' + this.noteindex + '&nowindex=' + this.nowindex,
    })
  },
  onShow: function () {
    this.categories = wx.getStorageSync('categories') || []
    this.setData({
      categories: this.categories
    })
  }
})