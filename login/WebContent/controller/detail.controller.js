sap.ui.define([
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/json/JSONModel'
	], function(Controller,JSONModel) {
	'use strict';
	return Controller.extend('sap.ui.demo.walkthrough.controller.detail', {
		getData: function(studentId){
			//request for information
			var result={
					studentId: "2016220302006",
					name: "王子涵",
					college: "信息与软件工程学院",
					major: "嵌入式",
					phoneNumber: "15520791013",
					label: ""
			};
			this.getView().setModel(new sap.ui.model.json.JSONModel(result));
		},
		onReturnToManagePage: function(oEvent){
			oEvent.getSource().getParent().getParent().getParent().getParent().getParent().getParent().byId("managePage").to(oEvent.getSource().getParent().getParent().getParent().getParent().getParent().getParent().byId("mainManagePage"),"flip");
		},
		onChangeDetailInformation: function(oEvent){
			oEvent.getSource().getParent().getParent().getParent().getParent().getParent().getParent().byId("changeStudentDetailMessage").getController().getData(this.getView().getModel().getData());
			oEvent.getSource().getParent().getParent().getParent().getParent().getParent().getParent().byId("managePage").to(oEvent.getSource().getParent().getParent().getParent().getParent().getParent().getParent().byId("changeStudentDetailMessage"));
		}
	});
});