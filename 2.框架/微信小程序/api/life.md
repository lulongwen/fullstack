# 小程序生命周期


onLoad 只加载一次
onShow 每次进入都加载

onReachBottom 滚动到底部触发，组件内无法使用
		设置 true 只触发一次，后面的值相同，不会再触发，observer监听的属性不改变
		解决：用随机数
		加载更多数据的判断技巧
		锁的概念解决重复加载数据的问题
			if(this.loading) return
			this.loading = true

			ajax this.loading = false
