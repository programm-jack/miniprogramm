//index.js
//获取应用实例
const db=wx.cloud.database()
var app = getApp();
Page({
  data: {
    msgData:[],
    datalist:"",
  },
  changeInputValue1(ev){
    this.setData({
      inputVal1:ev.detail.value
    })
  },
  changeInputValue(ev){
    this.setData({
      inputVal:ev.detail.value
    })
  },
//删除留言
  DelMsg(ev){
    var n=ev.target.dataset.index;
    var list = this.data.msgData;
    list.splice(n,1);
    this.setData({
      msgData:list
    });
  },
//添加留言
  addMsg(){
    var list = this.data.msgData;
    list.push({
      msg:this.data.inputVal
    });
    //添加
    db.collection("liuyan").add({
      data:{
        content:this.data.inputVal,
        author:this.data.inputVal1
      },success:res=>{  
        console.log("添加成功",res)
      },fail:res=>{
        console.log("添加失败",res)
      }
    })


    //更新
    this.setData({
      msgData:list,
      inputVal:'',
      inputVal1:''
    });
  },
})
