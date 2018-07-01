sap.ui.define([
	"sap/m/MessageToast",
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/json/JSONModel'
	], function(MessageToast,Controller,JSONModel) {
	'use strict';
	return Controller.extend('sap.ui.demo.walkthrough.controller.sendInformation', {
		getData: function(result){
			this.getView().setModel(new sap.ui.model.json.JSONModel(result));
		},
		onSend: function(oEvent){
			var title=this.byId("title").getValue();
			var content=this.byId("content").getValue();
			if(title){
				if(content){
					//send information and request for flag
					MessageToast.show("发送信息成功");
					this.onCanel();
				}
				else {
					MessageToast.show("输入标题为空");
				}
			}
			else {
				MessageToast.show("输入内容为空");
			}
		},
		onCanel: function(oEvent){
			this.getView().getParent().getParent().byId("managePage").to(this.getView().getParent().getParent().byId("mainManagePage"),"flip");
		}
	});
});