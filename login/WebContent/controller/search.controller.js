sap.ui.define([
	"sap/m/MessageToast",
	"sap/m/MessageBox",
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/json/JSONModel'
	], function(MessageToast,MessageBox,Controller,JSONModel) {
	'use strict';
	return Controller.extend('sap.ui.demo.walkthrough.controller.search', {
		getData: function(result,searchContent){
			if(searchContent!=""){
				var aFilters =[];
				result.forEach(omajor=>{omajor.classes.forEach(oclass=>{
					oclass.students.forEach(student=>{
						if(student.Text.includes(searchContent)){
							aFilters.push(student);
						}
					})
				})})
				this.getView().getModel().getData().content=aFilters;
				this.getView().getModel().refresh();
				if(this.getView().getModel().getData().content.length>0){
					this.byId("SelectAllSearch").setEnabled(true);
					this.byId("CancelAllSearch").setEnabled(true);
					this.byId("DeleteLabel").setEnabled(false);
				}
				else{
					this.byId("SelectAllSearch").setEnabled(false);
					this.byId("CancelAllSearch").setEnabled(false);
					this.byId("DeleteLabel").setEnabled(false);
				}
			}
			else {
				var aFilters =[];
				this.getView().getModel().getData().content=aFilters;
				this.getView().getModel().refresh();
				this.byId("SelectAllSearch").setEnabled(false);
				this.byId("CancelAllSearch").setEnabled(false);
				this.byId("DeleteLabel").setEnabled(false);
			}
		},
		getLabel: function(result,searchContent){
			if(searchContent!="按标签搜索"){
				var aFilters =[];
				result.forEach(omajor=>{omajor.classes.forEach(oclass=>{
					oclass.students.forEach(student=>{
						if(student.Label.includes(searchContent)){
							aFilters.push(student);
						}
					})
				})})
				this.getView().getModel().getData().content=aFilters;
				this.getView().getModel().getData().Delete=searchContent;
				this.getView().getModel().refresh();
				if(this.getView().getModel().getData().content.length>0){
					this.byId("SelectAllSearch").setEnabled(true);
					this.byId("CancelAllSearch").setEnabled(true);
					this.byId("DeleteLabel").setEnabled(true);
				}
				else{
					this.byId("SelectAllSearch").setEnabled(false);
					this.byId("CancelAllSearch").setEnabled(false);
					this.byId("DeleteLabel").setEnabled(false);
				}
			}
			else {
				var aFilters =[];
				this.getView().getModel().getData().content=aFilters;
				this.getView().getModel().refresh();
				this.byId("SelectAllSearch").setEnabled(false);
				this.byId("CancelAllSearch").setEnabled(false);
				this.byId("DeleteLabel").setEnabled(false);
			}
		},
		getSelected: function(result){
			var aFilters =[];
			result.forEach(omajor=>{omajor.classes.forEach(oclass=>{
				oclass.students.forEach(student=>{
					if(student.flag == true){
						aFilters.push(student);
					}
				})
			})})
			this.getView().getModel().getData().content=aFilters;
			this.getView().getModel().refresh();
			if(this.getView().getModel().getData().content.length>0){
				this.byId("SelectAllSearch").setEnabled(true);
				this.byId("CancelAllSearch").setEnabled(true);
				this.byId("DeleteLabel").setEnabled(false);
			}
			else{
				this.byId("SelectAllSearch").setEnabled(false);
				this.byId("CancelAllSearch").setEnabled(false);
				this.byId("DeleteLabel").setEnabled(false);
			}
		},
		onselect: function(oEvent){
			var oData = this.getView().getModel().getData();
			oData.forEach(oMajor=>{
				oMajor.classes.forEach(oclass=>{
					oclass.flag=(oclass.students.length === oclass.students.filter(student => student.flag).length);
				})
			});
			oData.forEach(oMajor=>{
				oMajor.flag=(oMajor.classes.length===oMajor.classes.filter(oclass=>oclass.flag).length);
			});
			this.getView().getModel().refresh();
		},
		onSelectAllSearch: function(){
			this.getView().getModel().getData().content.forEach(student=>{
				student.flag=true;
			});
			var oData = this.getView().getModel().getData();
			oData.forEach(oMajor=>{
				oMajor.classes.forEach(oclass=>{
					oclass.flag=(oclass.students.length === oclass.students.filter(student => student.flag).length);
				})
			});
			oData.forEach(oMajor=>{
				oMajor.flag=(oMajor.classes.length===oMajor.classes.filter(oclass=>oclass.flag).length);
			});
			this.getView().getModel().refresh();
		},
		onCancelAllSearch: function(){
			this.getView().getModel().getData().content.forEach(student=>{
				student.flag=false;
			});
			var oData = this.getView().getModel().getData();
			oData.forEach(oMajor=>{
				oMajor.classes.forEach(oclass=>{
					oclass.flag=(oclass.students.length === oclass.students.filter(student => student.flag).length);
				})
			});
			oData.forEach(oMajor=>{
				oMajor.flag=(oMajor.classes.length===oMajor.classes.filter(oclass=>oclass.flag).length);
			});
			this.getView().getModel().refresh();
		},
		onDeleteLabelConfirm: function(oEvent){
			if(this.getView().getModel().getData().content.filter(student => student.flag).length > 0){
				if(this._oDialog)this._oDialog.destroy();
				this._oDialog = sap.ui.xmlfragment("sap.ui.demo.walkthrough.view.DeleteLabelDialog", this);
				this._oDialog.open();
			}
			else {
				MessageToast.show("请选择要删除标签的学生");
			}
		},
		onDeleteLabel: function(){
			var deleteLabel=this.getView().getModel().getData().Delete;
			deleteLabel=deleteLabel+"  ";
			this.getView().getModel().getData().content.forEach(student=>{
				if(student.flag==true){
					student.Label=student.Label.split(deleteLabel).splice(0, 2).join("");
					student.flag=false;
				}
			});
			this.getLabel(this.getView().getModel().getData(),this.getView().getModel().getData().Delete);
			if(this.getView().getModel().getData().content.length==0){
				var temp=[];
				this.getView().getModel().getData().Label.forEach(oLabel=>{
					if(oLabel!=this.getView().getModel().getData().Delete){
						temp.push(oLabel);
					}
				});
				this.getView().getModel().getData().Label=temp;
				this.getView().getModel().refresh();
			}
			var oData = this.getView().getModel().getData();
			oData.forEach(oMajor=>{
				oMajor.classes.forEach(oclass=>{
					oclass.flag=(oclass.students.length === oclass.students.filter(student => student.flag).length);
				})
			});
			oData.forEach(oMajor=>{
				oMajor.flag=(oMajor.classes.length===oMajor.classes.filter(oclass=>oclass.flag).length);
			});
			this.getView().getModel().refresh();
			MessageToast.show("删除标签成功");
		},
		onDeleteLabelDialogOk: function(){
			this.onDeleteLabel();
			this._oDialog.close();
		},
		onDeleteLabelDialogEnd: function(){
			this._oDialog.close();
		},
		onDetailInformation: function(oEvent){
			var id=this.getView().getModel().getProperty(oEvent.getSource().getBindingContext().getPath()).Text;
			this.getView().getParent().getParent().getParent().byId("studentDetailMessage").getController().getData(id);
			this.getView().getParent().getParent().getParent().byId("managePage").to(this.getView().getParent().getParent().getParent().byId("studentDetailMessage"));
		}
	});	
});