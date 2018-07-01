sap.ui.define([
	'sap/ui/core/mvc/Controller',
	"sap/m/MessageToast",
	'sap/ui/model/json/JSONModel'
	], function(Controller,MessageToast,JSONModel) {
	'use strict';
	return Controller.extend('sap.ui.demo.walkthrough.controller.changeDetail', {
		getData: function(result){
			this.getView().setModel(new sap.ui.model.json.JSONModel(result));
		},
		onReturnToManagePage: function(oEvent){
			var id=this.getView().getModel().getData().Text;
			oEvent.getSource().getParent().getParent().getParent().getParent().getParent().getParent().byId("studentDetailMessage").getController().getData(id);
			oEvent.getSource().getParent().getParent().getParent().getParent().getParent().getParent().byId("managePage").to(oEvent.getSource().getParent().getParent().getParent().getParent().getParent().getParent().byId("studentDetailMessage"));
		},
		onChangeDetailInformation: function(oEvent){
			this.getView().getModel().getData().studentId=this.byId("inputStuId").getValue();
			this.getView().getModel().getData().name=this.byId("inputStuName").getValue();
			this.getView().getModel().getData().college=this.byId("inputStuCollege").getValue();
			this.getView().getModel().getData().major=this.byId("inputStuMajor").getValue();
			this.getView().getModel().getData().phoneNumber=this.byId("inputStuPhoneNumber").getValue();
			this.getView().getModel().refresh();
			//request for information
			MessageToast.show("修改成功");
			this.onReturnToManagePage(oEvent);
		}
	});
});