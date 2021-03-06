Page({

  /**
   * 页面的初始数据
   */
  data: {
    key:'',
    data:'',
    dialog:{
      title:'',
      content:'',
      hidden: true
    }
  },
  keyChange:function(e){
    this.data.key = e.detail.value
  },
  dateChange:function(e){
    this.data.data = e.detail.value
  },

 setStorage :function(){
   var key = this.data.key
   var data = this.data.data
   if(key.length === 0){
     this.setData({
       key:key,
       data:data,
       'dialog.hidden':false,
       'dialog.title':'保存数据失败',
       'dialog.content':'key不能为空'
     })
   }else{
     wx.setStorage({
       key,
       data
     });
     this.setData({
       key:key,
       data:data,
       'dialog.hidden':false,
       'dialog.content':'存储数据成功'
     })
   }
 },

 getStorage: function(){
    var key = this.data.key,
        data = this.data.data
    var storageData
    if(key.length === 0){
      this.setData({
        key: key,
        data: data,
        'dialog.hidden':false,
        'dialog.title':'读取数据失败',
        'dialog.content':'key不能为空'
      })
    }else{
      storageData = wx.getStorageSync(key)
      if(storageData === ""){
        this.setData({
          key: key,
          data: data,
          'dialog.hidden': false,
          'dialog.title': '读取数据失败',
          'dialog.content': '找不到key对应的数据'
        })
      } else{
        this.setData({
          key: key,
          data: data,
          'dialog.hidden': false,
          'dialog.title': '读取数据成功',
          'dialog.content': "data:'"+storageData + "'"
        })
      }
    }
  },
  clearStorage:function(){
    wx.clearStorageSync()
    this.setData({
      key:'',
      data:'',
      'dialog.hidden':false,
      'dialog.title':'清除数据成功',
      'dialog.content':''
    })
  },
  getAllStorage:function(){
    wx.getStorageInfo({
      success: function(res) {
        console.log('获取所有缓存数据',res);
      },
    })
  },
  confirm:function(){
    this.setData({
      'dialog.hidden':true,
      'dialog.title':'',
      'dialog.content':''
    })
  }

})