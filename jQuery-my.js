/**
 * Created by 13288 on 2018/5/10.
 */

    // 步骤
    // 1-创建一个沙箱环境,防止污染全局变量;
    // 2-选择器功能,将传入的任意选择器添加到伪数组中;
    // 3-设置一个原型对象,以便于$或则jQuery可以直接使用其中的方法
            //3.1-原型对象中添加一个混入式继承方法,以便于可以模块化添加方法

(function(window) {
    //jQuery构造函数
    function jQuery(selector) {
    //返回init的实例对象
        return new init(selector)
    }

    //在jQuery原型中添加属性或者方法,顺便给原型设置一个简单点的名字
    jQuery.fn = jQuery.prototype = {
        name : 'zs',
        extend : function(obj) {
            for(var k in obj ) {
                this[k] = obj[k];
            }
        }
    }

//----------------------------------------以下是模块化添加方法的区域,闲人莫进---------------------------------
    //模块化添加方法
//类名操作模块
    jQuery.fn.extend({
        //添加类名方法
        addClass : function(cname) {
            //隐式迭代
            for(var i = 0; i < this.length; i++) {
                this[i].classList.add(cname);
            }
            //返回当前元素,以便于链式编程
            return this
        },

        //移除类名方法
        removeClass : function(cname) {
          for(var i = 0; i < this.length; i++) {
              this[i].classList.remove(cname);
          }
            return this
        },

        //判断类名方法
        hasClass : function(cname) {
            //获取第一个匹配元素的值
           return this[0].classList.contains(cname);
        },//由于只能返回一个,故此方法不能链式编程

        //切换类名的方法
        toggleClass : function(cname) {
            //切换类名的显示与隐藏
            for(var i = 0; i < this.length; i++) {
                this[i].classList.toggle(cname)
            }
            return this
        }
    })

//内容操作模块
    jQuery.fn.extend({

    })


//----------------------------------------以上是模块化添加方法的区域,闲人莫进---------------------------------


    //将init构造函数的原型指向jQuery的原型,以便于init的实例对象能够直接使用原型中的方法
    init.prototype = jQuery.fn = jQuery.prototype;

    //创建一个init构造函数,由jQuery返回出去init的实例对象并且暴露给外界
    function init(selector) {
        //将传入进来的选择器全部加入到一个伪数组中,便于使用
        var elements = document.querySelectorAll(selector);
        //遍历elements
        for(var i = 0; i < elements.length; i++) {
            this[i] = elements[i]
        }
        //设置长度
        this.length = elements.length
    }

    //将数据暴露给外界
    window.jQuery = window.$ = jQuery;
})(window)