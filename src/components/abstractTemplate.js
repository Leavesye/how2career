import Vue from "vue";

export default function(name) {
  return Vue.component(name, {
    render: function(createElem) {
      if (this.template) {
        // 函数模式  则 template 中必须返回 vNode 对象
        // 特别注意
        // 1 . 若为函数模式  template 需要绑定 this 指针 ，如  template : function(){}.bind(this), 或者使用 es6 函数块  template : () => {} , 推荐后者
        // 2 . 若需要使用 jsx 语法 , 则参数名不可声明为 h ，由于 babel 插件会自行转换 ，若声明为 h 则会将函数覆盖 导致一些问题， 建议写法  template : ( createElem , data ) => { ... }
        if (typeof this.template == "function") {
          return this.template(createElem, this.data);
        }
        // vnode 模式  直接进行渲染
        else if (typeof this.template == "object") {
          return this.template;
        }
      }
      return;
    },
    props: ["template", "data"]
  });
}
