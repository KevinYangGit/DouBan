// pages/detail/detail.js
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
    console.log(options);
    var that = this;
    var type = options.type;
    var id = options.id;
    that.setData({
      type: type,
      id: id
    })
    // 详情
    network.getItemDetail({
      type: type,
      id: id,
      success: function(item) {

        console.log(item)
        var genres = item.genres;
        genres = genres.join("/");
        item.genres = genres;

        var actors = item.actors;
        var actornames = [];
        if (actors.length > 3) {
          actors = actors.slice(0, 3);
        }
        for (var index=0; index<actors.length; index++) {
          var actor = actors[index];
          actornames.push(actor.name);
        }
        actornames = actornames.join("/");
        var director = "";
        if (item.directors.length > 0) {
          director = item.directors[0].name;
        }
        var authors = director + "(导演) /" + actornames;
        item.authors = authors;
        
        that.setData({
          item: item
        });
      }
    });
    // 标签
    network.getItemTags({
      type: type,
      id: id,
      success: function (tags) {
        that.setData({
          tags: tags
        })
      }
    });
    // 评论
    network.getItemComments({
      type: type,
      id: id,
      success: function (comment) {
        that.setData({
          comment: comment
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
    // 滚动到顶部
    wx.pageScrollTo({
      scrollTop: 0,
    })
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