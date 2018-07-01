sap.ui.define([
	"sap/m/MessageToast",
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/json/JSONModel'
	], function(MessageToast,Controller,JSONModel) {
	'use strict';
	return Controller.extend('sap.ui.demo.walkthrough.controller.sendTabel', {
		getData: function(result){
			this.getView().setModel(new sap.ui.model.json.JSONModel(result));
		}
	});
});