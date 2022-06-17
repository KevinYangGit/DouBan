// components/searchbar/searchbar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isnavigator: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 输入框正在输入
    onInputEvent: function(event) {
      var value = event.detail.value;
      var detail = {"value": value};
      var options = {};
      // 主动触发事件
      this.triggerEvent("searchinput",detail,options);
    }
  }
})
