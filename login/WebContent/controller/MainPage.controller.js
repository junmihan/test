sap.ui.define([
    'sap/ui/core/mvc/Controller'
], function(Controller) {
    'use strict';
    return Controller.extend('sap.ui.demo.walkthrough.controller.MainPage', {
        onInstituteSelect: function(oEvent) {
            var institute = oEvent.getSource().getText();
            this.byId('navContainer').to(this.byId('managePage'));
            this.byId('managePage').getController().getData(institute);
        },
        onSettingSelect: function(oEvent) {
            this.byId('navContainer').to(this.byId('settingPage'));
        },
        onHistorySelect: function(oEvent){
        	this.byId('navContainer').to(this.byId('historyPage'));
        	this.byId('historyPage').getController().getdata();
        }
    });
});