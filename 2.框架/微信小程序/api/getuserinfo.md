# getUserInfo 用户授权



open-data显示用户信息，静默信息，拿不到用户信息
	已授权，再点击不会弹窗确认授权
	js 需要用户授权，弹窗确认

getUserInfo 不能弹窗
opensetting判断用户是否授权

wx.getSetting({}),成功的情况下取得data.authSetting['scope.userInfo']
