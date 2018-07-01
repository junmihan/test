sap.ui.define([
	"sap/m/MessageBox",
	'sap/m/MessageToast',
	"sap/ui/core/mvc/Controller"
	], function (MessageBox, MessageToast, Controller) {
	"use strict";
	return Controller.extend("sap.ui.demo.walkthrough.controller.Setting", {
		onConfirm: function(oEvent){
			if(this.onpasswordInputModifyConfirmChange() & this.onpasswordModifyChange() & this.onuserNameModifyChange()){
				if(this.byId("passwordModify").getValue()==this.byId("passwordInputModifyConfirm").getValue()){
					//updata messsage
					
					var response=200;
					switch(response){
					case 200:
						MessageBox.success(
								"修改成功"
						);
						break;
					case 400:
						MessageBox.error(
								"用户名重复"
						);
						this.byId("userNameModify").setValueState("Error");
						this.byId("userNameModify").setValueStateText("用户名重复");
						this.byId("userNameModify").focus();
						break;
					case 500:
						MessageBox.error(
								"服务器错误"
						);
					}
				}
				else {
					MessageBox.error(
							"两次输入的密码不同"
					);
					this.byId("passwordInputModifyConfirm").setValueState("Error");
					this.byId("passwordInputModifyConfirm").focus();
				}
			}
		},
		onCancel: function(oEvent){
			this.byId("userNameModify").setValue("");
			this.byId("userNameModify").setValueState("None");
			this.byId("passwordModify").setValue("");
			this.byId("passwordModify").setValueState("None");
			this.byId("passwordInputModifyConfirm").setValue("");
			this.byId("passwordInputModifyConfirm").setValueState("None");
		},
		onuserNameModifyChange: function(oEvent){
			var UserName=this.byId("userNameModify");
			if(!UserName.getValue()){
				UserName.setValueState("Error");
				UserName.setValueStateText("用户名不能为空");
				UserName.focus();
				return false;
			}
			else {
				UserName.setValueState("None");
				return true;
			}
		},
		onpasswordModifyChange: function(oEvent){
			var Password=this.byId("passwordModify");
			if(!Password.getValue()){
				Password.setValueState("Error");
				Password.setValueStateText("密码不能为空");
				Password.focus();
				return false;
			}
			else {
				Password.setValueState("None");
				return true;
			}
		},
		onpasswordInputModifyConfirmChange: function(oEvent){
			var PasswordConfirm=this.byId("passwordInputModifyConfirm");
			if(!PasswordConfirm.getValue()){
				PasswordConfirm.setValueState("Error");
				PasswordConfirm.setValueStateText("密码不能为空");
				PasswordConfirm.focus();
				return false;
			}
			else {
				PasswordConfirm.setValueState("None");
				return true;
			}
		}
	});
});