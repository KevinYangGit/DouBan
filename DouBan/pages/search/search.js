// pages/search/search.js
import {network} from "../../utils/network.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'searched',
      success: function(res) {
        console.log(res)
        var data = res.data;
        that.setData({
          histories: data
        })
      },
    })
  },

  // 输入框输入事件
  onSearchInputEvent: function(event) {
    var that = this;
    var value = event.detail.value;
    if (!value || value === "") {
      that.setData({
        subjects: null
      });
      return;
    }
    network.getSearch({
      q: value,
      success: function(subjects){
        that.setData({
          subjects: subjects
        })
      }
    })
  },

  // 选中某一条搜索结果
  onItemTapEvent: function(event) {
    var that = this;
    var id = event.currentTarget.dataset.id;
    var title = event.currentTarget.dataset.title;
    var histories = that.data.histories;
    if (!histories) {
      histories = [];
    }
    var isExisted = false;
    for (var index=0; index<histories.length;index++) {
      var movie = histories[index];
      if (movie.id === id) {
        isExisted = true;
        break;
      }
    }
    if (!isExisted) {
      histories.push({ title: title, id: id })
      wx.setStorage({
        key: 'searched',
        data: histories,
        success: function () {
          console.log("保存成功！");
        }
      })
    }
    
    // 页面跳转
    wx.navigateTo({
      url: "/pages/detail/detail?type=movie&id="+id,
    })
  },

  clearEvent: function() {
    var that = this;
    wx.removeStorage({
      key: 'searched',
      success: function(res) {
        console.log("删除成功!");
        that.setData({
          histories: null
        });
      },
    });
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