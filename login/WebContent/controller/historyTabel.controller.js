sap.ui.define([
    'sap/ui/core/mvc/Controller',
	'sap/ui/model/json/JSONModel'
], function(Controller,JSONModel) {
    'use strict';
    return Controller.extend('sap.ui.demo.walkthrough.controller.historyTabel', {
        getdata: function(){
        	//request for history record
        	
        },
        onHistoryPage: function(){
        	this.getView().getParent().getParent().getParent().byId("historyPage").getController().getdata();
        	this.getView().getParent().getParent().getParent().byId("navContainer").to(this.getView().getParent().getParent().getParent().byId("historyPage"));
        }
    });
});