<template>
<div id="search-header">
	<div class="back" onclick="javascript:window.history.go(-1);" >
		<i class="iconfont icon-fanhui"></i>
	</div>
	<div class="search">
		<input type="text" ref='texts' v-focus placeholder="音乐  视频  歌词  电台" v-model='val' />
		<div class="del" v-if='del' @click='delVal'>
			<i class="iconfont icon-x"></i>
		</div>
	</div>
</div>
</template>

<script>
export default {
	data(){
		return {
			del:false,
			val:""
		}
	},
	directives: {
	  focus: {
	    inserted: function (el) {
	      el.focus();
	    }
	  }
	},
	watch:{
		val:{
			handler:function(old,news){
				//console.log('监控后旧的值为'+old);
				//子组件点击之后改变值 当值改变时 就重新发起请求
				
				if(this.val){
					this.del = true ;
					//每一次监控都更新数据
					this.$emit('update:sendVal',{
						msg:this.val,
						show:true
					});
				}else {
					this.del = false ;
					//每一次监控都更新数据
					this.$emit('update:sendVal',{
						msg:"",
						show:false
					});
				}
			},
			deep: true
		}
	},
	methods:{
		delVal(){
			//清空数据
			this.val = "" ;
			//输入框获得焦点
			this.$refs.texts.focus();
		}
	}
}
</script>

<style>
</style>