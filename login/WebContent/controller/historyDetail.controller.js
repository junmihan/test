sap.ui.define([
    'sap/ui/core/mvc/Controller',
	'sap/ui/model/json/JSONModel'
], function(Controller,JSONModel) {
    'use strict';
    return Controller.extend('sap.ui.demo.walkthrough.controller.historyDetail', {
        getdata: function(title){
        	//request for history record
        	var result={
        			title:"asd",
        			content:"asddddddddddddddasddddddddddddddasddddddddddddddasddddddddddddddasddddddddddddddasddddddddddddddasddddddddddddddasddddddddddddddasddddddddddddddasddddddddddddddasddddddddddddddasddddddddddddddasddddddddddddddasddddddddddddddasddddddddddddddasddddddddddddddasddddddddddddddasddddddddddddddasddddddddddddddasddddddddddddddasdddddddddddddd",
        			receive: [{Text: "123",Label: "12"},{Text: "123",Label: "12"},{Text: "123",Label: "12"}],
        			notReceive: [{Text: "123",Label: "12"}]
        	}
        	this.getView().setModel(new sap.ui.model.json.JSONModel(result));
        	this.getView().getModel().getData().choose=this.getView().getModel().getData().notReceive;
        	this.getView().getModel().refresh();
        },
        onBack: function(){
        	this.getView().getParent().getParent().getParent().byId("historyPage").getController().getdata();
        	this.getView().getParent().getParent().getParent().byId("navContainer").to(this.getView().getParent().getParent().getParent().byId("historyPage"));
        },
        onNotReceive: function(){
        	this.getView().getModel().getData().choose=this.getView().getModel().getData().notReceive;
        	this.getView().getModel().refresh();
        },
        onReceive: function(){
        	this.getView().getModel().getData().choose=this.getView().getModel().getData().receive;
        	this.getView().getModel().refresh();
        }
    });
});