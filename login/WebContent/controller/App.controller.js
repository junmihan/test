sap.ui.define([
	"sap/m/MessageBox",
	"sap/m/MessageToast",
	"sap/ui/core/mvc/Controller"
	], function (MessageBox, MessageToast, Controller) {
	"use strict";
	return Controller.extend("sap.ui.demo.walkthrough.controller.App", {
		onCancel: function(oEvent){
			this.byId("userNameInput").setValue("");
			this.byId("userNameInput").setValueState("None");
			this.byId("passwordInput").setValue("");
			this.byId("passwordInput").setValueState("None");
		},

		onlogin: function(oEvent){
			if(this.onPasswordChange() & this.onUserNameChange()){
				//TODO Send request.
				var mockResponseCode = 200;

				switch (mockResponseCode) {
				case 200:
					// Success
					MessageToast.show("登录成功");
					this.byId("myApp").to(this.byId("mainPage"),"flip");
					break;
				case 400:
					// Username or password is wrong
					break;
				case 500:
					// Server internal error
					MessageBox.error(
							"服务器错误"
					);
				}
			}
		},

		onUserNameChange: function(oEvent){
			var userName=this.byId("userNameInput");
			if(!userName.getValue()){
				userName.setValueState("Error");
				userName.setValueStateText("用户名不能为空");
				userName.focus();
				return false;
			}
			else {
				userName.setValueState("None");
				return true;
			}
		},

		onPasswordChange: function(oEvent){
			var password=this.byId("passwordInput");
			if(!password.getValue()){
				password.setValueState("Error");
				password.setValueStateText("密码不能为空");
				password.focus();
				return false;
			}
			else {
				password.setValueState("None");
				return true;
			}
		}
	});
});