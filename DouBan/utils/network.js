
// 导入 globalUrls 类
import { globalUrls } from "urls.js"


// 定义类 network
const network = {
  // 电影
  getMovieList: function (params) {
    params.type = "movie";
    this.getItemList(params);
  },

  // 电视剧
  getTVList: function (params) {
    params.type = "tv";
    this.getItemList(params);
  },

  // 综艺
  getShowList: function (params) {
    params.type = "show";
    this.getItemList(params);
  },

  // 首页列表
  getItemList: function (params) {
    var url = "";
    if (params.type == "movie") {
      url = globalUrls.movieList;
    } else if (params.type == "tv") {
      url = globalUrls.tvList;
    } else if (params.type == "show") {
      url = globalUrls.showList;
    } else { 
    
    }
    var count = params.count ? params.count : 7;
    // 发起网络请求
    wx.request({
      // 设置请求url
      url: url,
      // 设置请求参数
      data: {
        count: count
      },
      // 请求成功回调
      success: function(res) {
        var items = res.data.subject_collection_items;
        var itemCount = items.length;
        var left = itemCount%3;
        if (left === 2) {
          items.push(null);
        }
        if (params && params.success) {
          params.success(items);
        }
      }
    })
  },
  
  // 详情
  getItemDetail: function(params) {
    var type = params.type;
    var id = params.id;
    var url = "";
    if (type === "movie") {
      url = globalUrls.movieDetail + id;
    } else if (type === "tv") {
      url = globalUrls.tvDetail + id;
    } else if (type === "show") {
      url = globalUrls.showDetail + id;
    } else {

    }
    wx.request({
      url: url,
      success: function(res) {
        var item = res.data;
        if (params.success) {
          params.success(item);
        }
      }
    })
  },
  
  // 标签
  getItemTags: function(params) {
    var type = params.type;
    var id = params.id;
    var url = "";
    if (type === "movie") {
      url = globalUrls.movieTags(id);
    } else if (type === "tv") {
      url = globalUrls.tvTags(id);
    } else if (type === "show") {
      url = globalUrls.showTags(id);
    } else {

    }
    wx.request({
      url: url,
      success: function(res) {
        var tags = res.data.tags;
        if (params.success) {
          params.success(tags)
        }
      }
    })
  },

  // 评论
  getItemComments: function(params) {
    var type = params.type;
    var id = params.id;
    var start = params.start;
    var count = params.count;
    var url = "";
    if (type === "movie") {
      url = globalUrls.movieComments(id,start,count);
    } else if (type === "tv") {
      url = globalUrls.tvComments(id,start,count);
    } else if (type === "show") {
      url = globalUrls.showComments(id,start,count);
    } else {

    }
    wx.request({
      url: url,
      success: function(res){
        var comment = res.data;
        if (params.success) {
          params.success(comment); 
        }
      }
    })
  },

  // 搜索
  getSearch: function(params) {
    var q = params.q;
    var url = globalUrls.searchUrl(q);
    wx.request({
      url: url,
      success: function(res){
        var subjects = res.data.subjects;
        if (params.success) {
          params.success(subjects);
        }
      }
    })
  }
}

// 导出构造器 network，导出后外部调用者通过 `import {network} from "../../utils/network.js"` 导入后可用：
export { network }