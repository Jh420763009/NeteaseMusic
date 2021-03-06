# NeteaseMusic
这是我用vue2.0写的仿网易云音乐APP 觉得好的给个Star或Fork
## 技术栈
Vue + Vuex + VueRouter + flexible + axios + sass 

### 一些不足
ios机制下第一次必须暂停后才能播放。  
浏览器头部自带高度,导致滑动黑色渐变溢出,这是浏览器问题，APP不会有这个情况。  
mv播放模块还没做好,后期有时间会更新。  
 
### 感谢
首先感谢[Binaryify大神](https://github.com/Binaryify/NeteaseCloudMusicApi)的免费API

### 心得
1.该项目可以保证没有借鉴其他音乐APP项目,本人自己琢磨文档和一些文章写出来的。  
2.更加深入地体验到了Vue组件化的便利之处,加深了我对组件化的理解。   
3.整个项目架构的编排统一,但也看起来会比较复杂,文件较多。  
4.vue过滤器,全局方法,模块导出导入,Vuex搭配等的使用越加熟练。 
 
### 难点
1.个人认为该项目的难点在于如何做到组件化的有序编排,以及播放列表的所播放歌曲的index的处理。
2.项目数据过大,需按需加载等其他优化方式,各种登录条件等加大了难度,JSON数据处理很复杂。 
3.整个项目前期文件过大编排杂乱，好比我前期把共有组件写在子组件里面,后面改正过去。  
 
### 启动
启动前要下载[NodeJs项目](https://github.com/Binaryify/NeteaseCloudMusicApi),安装依赖后启动服务器

### 一部分截图
![1](https://github.com/ShuHongXie/IMG/blob/master/1.png "1")
![2](https://github.com/ShuHongXie/IMG/blob/master/2.png "2")
![3](https://github.com/ShuHongXie/IMG/blob/master/3.png "3")
![4](https://github.com/ShuHongXie/IMG/blob/master/4.png "4")
![5](https://github.com/ShuHongXie/IMG/blob/master/5.png "5")
![6](https://github.com/ShuHongXie/IMG/blob/master/6.png "6")
![7](https://github.com/ShuHongXie/IMG/blob/master/7.png "7")
![9](https://github.com/ShuHongXie/IMG/blob/master/9.png "9")
![11](https://github.com/ShuHongXie/IMG/blob/master/11.png "11")
![12](https://github.com/ShuHongXie/IMG/blob/master/12.png "12")
![13](https://github.com/ShuHongXie/IMG/blob/master/13.png "13")
![14](https://github.com/ShuHongXie/IMG/blob/master/14.png "14")
![15](https://github.com/ShuHongXie/IMG/blob/master/15.png "15")
![16](https://github.com/ShuHongXie/IMG/blob/master/16.png "16")
![18](https://github.com/ShuHongXie/IMG/blob/master/18.png "18")
![20](https://github.com/ShuHongXie/IMG/blob/master/20.png "20")

 
