//achievement.js
const util = require('../../utils/util.js')

Page({
  data: {
    achievements: [],
    oneachievement:{},
    leftTime:0,
    something:'',
    title:'',
    targetdate: new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate(),
    leftdays:0,
    nownote:{},
    nownotetitle: '',
    nownotedetail: '',
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
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    console.log('e', e)
    this.targetdate = new Date(e.detail.value).getTime()
    let today = new Date().getTime()
    this.leftdays = Math.floor(((this.targetdate - today)/1000/60/60/24)+1)
    console.log(this.leftdays)
    this.setData({
      targetdate: e.detail.value,
      leftdays: this.leftdays
    })
  },
  confirm(){
    if (!this.title){
      wx.showToast({
        title: '请输入新事迹',
        icon: 'none',
        duration: 2000
      })
    }else{
      this.oneachievement = {}
      this.oneachievement.title = this.title
      this.oneachievement.targetdate = this.targetdate
      this.achievements.push(this.oneachievement)
      wx.setStorageSync('achievements', this.achievements)
      wx.switchTab({
        url: '../achievement/achievement'
      })
    }
  },
  onLoad: function (options) {
    this.nownotetitle = options.nownotetitle
    this.nownotedetail = options.nownotedetail
    this.setData({
      nownotetitle: this.nownotetitle,
      nownotedetail: this.nownotedetail
    })
    // this.achievements = wx.getStorageSync('achievements') || []
    // this.leftdays = 0
  }
})