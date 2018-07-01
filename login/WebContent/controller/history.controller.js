sap.ui.define([
    'sap/ui/core/mvc/Controller',
	'sap/ui/model/json/JSONModel'
], function(Controller,JSONModel) {
    'use strict';
    return Controller.extend('sap.ui.demo.walkthrough.controller.history', {
        getdata: function(){
        	//request for history record
        	var result={
        			history: [
        				{flag:true,title: "a",numOfReceive: "125",allNum: "125",time: "2017-10-24 15:00"},
        				{flag:false,title: "asd",numOfReceive: "14",allNum: "100",time: "2018-10-24 10:20"},
        				{flag:true,title: "tie",numOfReceive: "45",allNum: "45",time: "2017-08-24 14:00"}
        			]
        	};
        	this.getView().setModel(new sap.ui.model.json.JSONModel(result));
        },
        onDetailReceiveCondition: function(oEvent){
        	var title=this.getView().getModel().getProperty(oEvent.getSource().getBindingContext().getPath()).title;
        	this.getView().getParent().getParent().getParent().byId("historyDetailPage").getController().getdata(title);
        	this.getView().getParent().getParent().getParent().byId("navContainer").to(this.getView().getParent().getParent().getParent().byId("historyDetailPage"));
        },
        toHistoryTabelPage: function(){
        	this.getView().getParent().getParent().getParent().byId("historyTabelPage").getController().getdata();
        	this.getView().getParent().getParent().getParent().byId("navContainer").to(this.getView().getParent().getParent().getParent().byId("historyTabelPage"));
        }
    });
});