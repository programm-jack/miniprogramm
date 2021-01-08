// pages/sign_in/sign_in.js
const db=wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude: 23.12808,
    longitude: 113.11111,
    sign_in_state:"", 
    state:""
  },
sign_in:function(){
  // wx.showLoading({
  //   title: 'loading...',
  // })
  let that =this
  let time =new Date()
  let year = time.getFullYear()
  let month = time.getMonth()+1
  let day = time.getDate()
  let hour = time.getHours()
  let minutes =time.getMinutes()
  let second = time.getSeconds()

  if(hour<10){
    that.setData({
      sign_in_state:"未迟到"
    })
    wx.showToast({
      title:"签到成功" ,
      icon: 'success',
      duration: 2000//持续的时间
    })
  }else{
    that.setData({
      sign_in_state:"迟到"
    })
    wx.showToast({
      title: '已迟到',
      icon: 'none',
      duration: 2000//持续的时间
    })
       sign_in_state:"迟到"
  }
  
  db.collection("sign_in").add({
    data:{
      latitude: this.data.latitude,
      longitude: this.data.longitude,
      date:year+'-'+month+'-'+day,
      time:hour+'-'+minutes+'-'+second,
      sign_in_state:that.data.sign_in_state
    },success:res=>{  
      
      console.log("签到成功",res)
      wx.hideloading()
      wx.showToast({
        title: '签到成功',
      })
    },fail:res=>{
      console.log("签到失败",res)
    }
  })

},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that =this
    wx.getSetting({
      success (res) {
        console.log(res.authSetting)
        wx.getLocation({
          type: 'wgs84',
          success (res) {
          console.log(res)
          that.setData({
           latitude: res.latitude,
           longitude: res.latitude
          })
          }
         })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})