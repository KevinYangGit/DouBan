// pages/list/list.js
import { network } from "../../utils/network.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: {
      type: String,
      value: ""
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    // 提示框
    wx.showLoading({
      title: '正在加载中...',
    })
    var title = "";
    var type = options.type;
    if (type === "movie") {
      // 电影
      title = "电影";
      network.getMovieList({
        success: function(movies){
          that.setData({
            items: movies,
            type: type
          });
          // 移除提示框
          wx.hideLoading();
        },
        count: 1000
      })
    } else if (type === "tv") {
      //电视剧
      title = "电视剧";
      network.getTVList({
        success: function(tvs) {
          that.setData({
            items: tvs,
            type: type
          });
          // 移除提示框
          wx.hideLoading();
        },
        count: 1000
      })
    } else {
      // 综艺
      title = "综艺";
      network.getShowList({
        success: function(shows) {
          that.setData({
            items: shows,
            type: type
          });
          // 移除提示框
          wx.hideLoading();
        },
        count: 1000
      })
    }

    // 设置导航栏标题
    wx.setNavigationBarTitle({
      title: title,
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