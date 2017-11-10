//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    time:'',
    canIUse: wx.canIUse('button.open-type.getUserInfo') //判断小程序的API，回调，参数，组件等是否在当前版本可用。
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')  
    var that = this  
    //调用应用实例的方法获取全局数据  
    app.getUserInfo(function(userInfo){  
      //更新数据  
      that.setData({  
        userInfo:userInfo  
      })  
    })  ;

    var now = new Date();
    var hour = now.getHours();
    console.log(hour)
    if (hour<2) {
      that.setData({time:"可以睡觉喽，据可靠统计早睡会瘦哦"})
    }else if(hour<5){
      that.setData({time:"还可以睡一会哦"})
    }else if(hour<10){
      that.setData({time:"早上好"})
    }else if(hour<12){
      that.setData({time:"中午好"})
    }
  }
})
