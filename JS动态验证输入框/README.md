# js动态验证输入框
**描述：**简单地对表单输入框的值进行动态判断验证  
**注意：**  
- 添加监听事件中动态调用内部函数问题（即应使用对象引用方法）  
- this指代当前节点时对上下文的动态使用（如this.nextSibling、this.parentNode）  
- 应简单封装插入指定节点尾部函数（灵活使用parent.insertBefore()方法）  