sap.ui.define([
	"sap/m/MessageToast",
	"sap/m/MessageBox",
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/json/JSONModel'
	], function(MessageToast,MessageBox,Controller,JSONModel) {
	'use strict';
	return Controller.extend('sap.ui.demo.walkthrough.controller.Management', {
		getData: function(institute) {
			//TODO Send request to server.
			var result =[{
				Text: "软件工程",
				type: "major",
				flag: false,
				classes:[{
					Text: 'class1',
					type: "class",
					flag: false,
					students: [{
						Text: '1001 A1',
						type: "student",
						Label: "学生会  青志协  工作室  ",
						flag: false
					}, {
						Text: '1002 A2',
						type: "student",
						Label: "青志协  ",
						flag: false
					}, {
						Text: '1003 A3',
						type: "student",
						Label: "学生会  ",
						flag: false
					}, {
						Text: '1004 A4',
						type: "student",
						Label: "",
						flag: false
					}]
				}, {
					Text: 'class2',
					type: "class",
					flag: false,
					students: [{
						Text: '2001 Alice',
						Label: "青志协  ",
						type: "student",
						flag: false
					}, {
						Text: '2001 Bob',
						Label: "青志协  ",
						type: "student",
						flag: false
					}]
				}, {
					Text: 'class3',
					type: "class",
					flag: false,
					students: [{
						Text: '3001 123',
						type: "student",
						Label: "",
						flag: false
					}, {
						Text: '3002 456',
						type: "student",
						Label: "",
						flag: false
					}, {
						Text: '3002 789',
						type: "student",
						Label: "",
						flag: false
					}]
				}]
			},
			{
				Text: "嵌入式",
				type: "major",
				flag: false,
				classes:[{
					Text: 'class1',
					type: "class",
					flag: false,
					students: [{
						Text: '1001 A1',
						type: "student",
						Label: "",
						flag: false
					}, {
						Text: '1002 A2',
						type: "student",
						Label: "学生会  ",
						flag: false
					}, {
						Text: '1003 A3',
						type: "student",
						Label: "",
						flag: false
					}, {
						Text: '1004 A4',
						type: "student",
						Label: "青志协  ",
						flag: false
					}]
				}, {
					Text: 'class2',
					type: "class",
					flag: false,
					students: [{
						Text: '2001 Alice',
						type: "student",
						Label: "学生会  ",
						flag: false
					}, {
						Text: '2001 Bob',
						type: "student",
						Label: "学生会  ",
						flag: false
					}]
				}, {
					Text: 'class3',
					type: "class",
					flag: false,
					students: [{
						Text: '3001 123',
						type: "student",
						Label: "",
						flag: false
					}, {
						Text: '3002 456',
						type: "student",
						Label: "",
						flag: false
					}, {
						Text: '3002 789',
						type: "student",
						Label: "青志协  ",
						flag: false
					}]
				}]
			},
			{
				Text: "信工",
				type: "major",
				flag: false,
				classes:[{
					Text: 'class1',
					type: "class",
					flag: false,
					students: [{
						Text: '1001 A1',
						type: "student",
						Label: "工作室  ",
						flag: false
					}, {
						Text: '1002 A2',
						type: "student",
						Label: "",
						flag: false
					}, {
						Text: '1003 A3',
						type: "student",
						Label: "",
						flag: false
					}, {
						Text: '1004 A4',
						type: "student",
						Label: "",
						flag: false
					}]
				}, {
					Text: 'class2',
					type: "class",
					flag: false,
					students: [{
						Text: '2001 Alice',
						type: "student",
						Label: "",
						flag: false
					}, {
						Text: '2001 Bob',
						type: "student",
						Label: "",
						flag: false
					}]
				}, {
					Text: 'class3',
					type: "class",
					flag: false,
					students: [{
						Text: '3001 123',
						type: "student",
						Label: "青志协  工作室  ",
						flag: false
					}, {
						Text: '3002 456',
						type: "student",
						Label: "学生会  ",
						flag: false
					}, {
						Text: '3002 789',
						type: "student",
						Label: "学生会  ",
						flag: false
					}]
				}]
			},
			{
				Text: "网安",
				type: "major",
				flag: false,
				classes:[{
					Text: 'class1',
					type: "class",
					flag: false,
					students: [{
						Text: '1001 A1',
						type: "student",
						Label: "",
						flag: false
					}, {
						Text: '1002 A2',
						type: "student",
						Label: "",
						flag: false
					}, {
						Text: '1003 A3',
						type: "student",
						Label: "青志协  ",
						flag: false
					}, {
						Text: '1004 A4',
						type: "student",
						Label: "青志协  ",
						flag: false
					}]
				}, {
					Text: 'class2',
					type: "class",
					flag: false,
					students: [{
						Text: '2001 Alice',
						type: "student",
						Label: "",
						flag: false
					}, {
						Text: '2001 Bob',
						type: "student",
						Label: "",
						flag: false
					}]
				}, {
					Text: 'class3',
					type: "class",
					flag: false,
					students: [{
						Text: '3001 123',
						type: "student",
						Label: "学生会  工作室  ",
						flag: false
					}, {
						Text: '3002 456',
						type: "student",
						Label: "",
						flag: false
					}, {
						Text: '3002 789',
						type: "student",
						Label: "",
						flag: false
					}]
				}]
			},
			{
				Text: "互联网",
				type: "major",
				flag: false,
				classes:[{
					Text: 'class1',
					type: "class",
					flag: false,
					students: [{
						Text: '1001 A1',
						type: "student",
						Label: "工作室  ",
						flag: false
					}, {
						Text: '1002 A2',
						type: "student",
						Label: "",
						flag: false
					}, {
						Text: '1003 A3',
						type: "student",
						Label: "",
						flag: false
					}, {
						Text: '1004 A4',
						type: "student",
						Label: "学生会  工作室  ",
						flag: false
					}]
				}, {
					Text: 'class2',
					type: "class",
					flag: false,
					students: [{
						Text: '2001 Alice',
						type: "student",
						Label: "",
						flag: false
					}, {
						Text: '2001 Bob',
						Label: "工作室  ",
						type: "student",
						flag: false
					}]
				}, {
					Text: 'class3',
					type: "class",
					flag: false,
					students: [{
						Text: '3001 123',
						type: "student",
						Label: "工作室  ",
						flag: false
					}, {
						Text: '3002 456',
						type: "student",
						Label: "",
						flag: false
					}, {
						Text: '3002 789',
						type: "student",
						Label: "工作室  ",
						flag: false
					}]
				}]
			}];
			this.getView().setModel(new sap.ui.model.json.JSONModel(result));
			// request for label
			var aLabel=["学生会","青志协","工作室"];
			this.getView().getModel().getData().Label=aLabel;
			this.getView().getModel().refresh();
		},
		onSearchStudent: function(oEvent){
			var id=this.getView().getModel().getProperty(oEvent.getSource().getBindingContext().getPath()).Text;
			this.byId("studentDetailMessage").getController().getData(id);
			this.byId("managePage").to(this.byId("studentDetailMessage"),"flip");
		},
		onClickBox: function(oEvent){
			var selectedData = this.getView().getModel().getProperty(oEvent.getSource().getBindingContext().getPath());
			if(selectedData.type=="major"){
				selectedData.classes.forEach(oclass =>{ oclass.flag = selectedData.flag;
				oclass.students.forEach(student => student.flag = selectedData.flag);});
			}
			if(selectedData.type=="class"){
				selectedData.students.forEach(student => student.flag = selectedData.flag);
				var oMajor=this.getView().getModel().getProperty(oEvent.getSource().getBindingContext().getPath().split('/').splice(0, 2).join('/'));
				oMajor.flag=(oMajor.classes.length===oMajor.classes.filter(oclass=>oclass.flag).length);
			}
			if(selectedData.type=="student"){
				var oClass = this.getView().getModel().getProperty(oEvent.getSource().getBindingContext().getPath().split('/').splice(0, 4).join('/'));
				oClass.flag = (oClass.students.length === oClass.students.filter(student => student.flag).length);
				var oMajor=this.getView().getModel().getProperty(oEvent.getSource().getBindingContext().getPath().split('/').splice(0, 2).join('/'));
				oMajor.flag=(oMajor.classes.length===oMajor.classes.filter(oclass=>oclass.flag).length);
			}
			this.getView().getModel().refresh();
		},
		onSelectAll: function(oEvent){
			this.getView().getModel().getData().forEach(oMajor => {
				oMajor.flag = true;
				oMajor.classes.forEach(oclass => {
					oclass.flag=true;
					oclass.students.forEach(student=>student.flag=true);
				});
			});
			this.getView().getModel().refresh();
		},
		onCancelAll: function(oEvent){
			this.getView().getModel().getData().forEach(oMajor => {
				oMajor.flag = false;
				oMajor.classes.forEach(oclass => {
					oclass.flag=false;
					oclass.students.forEach(student=>student.flag=false);
				});
			});
			this.getView().getModel().refresh();
		},
		onSearch: function(oEvent){
			var sQuery=oEvent.getSource().getValue();
			this.byId("searchPage").getController().getData(this.getView().getModel().getData(),sQuery);
		},
		onSelectSelected: function(oEvent){
			this.byId("searchPage").getController().getSelected(this.getView().getModel().getData());
		},
		onMenuSelectAction: function(oEvent){
			var select=oEvent.getParameter("item").getText();
			this.byId("searchPage").getController().getLabel(this.getView().getModel().getData(),select);
		},
		onAddLabel: function(){
			this.onSelectSelected();
			if(this.getView().getModel().getData().content.filter(student => student.flag).length > 0){
				if(this._oDialog)this._oDialog.destroy();
				this._oDialog = sap.ui.xmlfragment("sap.ui.demo.walkthrough.view.AddLabelDialog", this);
				this._oDialog.open();
			}
			else {
				MessageToast.show("请选择要添加标签的学生");
			}
		},
		onAddLabelDialogOk: function(){
			var Label=this._oDialog.getContent()[1].getValue();
			this.addLabelDialog(Label);
			this._oDialog.close();
		},
		onAddLabelDialogEnd: function(){
			this._oDialog.close();
		},
		addLabelDialogTextArea: function(oEvent){
			var sText = oEvent.getParameter("value");
			var parent = oEvent.getSource().getParent();
			parent.getBeginButton().setEnabled(sText.length > 0)
		},
		addLabelDialog: function(Label){
			this.getView().getModel().getData().content.forEach(student=>{
				if(student.flag==true){
					if(!(student.Label.includes(Label))){
						student.Label=student.Label+Label;
						student.Label=student.Label+"  ";
					}
				}
			});
			var flag=true;
			this.getView().getModel().getData().Label.forEach(oLabel=>{
				if(oLabel==Label)flag=false;
			});
			if(flag){
				this.getView().getModel().getData().Label.push(Label);
			}
			this.byId("searchPage").getController().onCancelAllSearch();			
			MessageToast.show("添加标签成功");
		},
		onSendMessage: function(oEvent){
			this.onSelectSelected();
			var receiver=this.getView().getModel().getData().content;
			if(receiver.length==0){
				MessageToast.show("请选择要发送的对象");
			}
			else{
				if(oEvent.getParameter("item").getText()=="发送信息"){
					this.byId("sendStudentInformation").getController().getData(receiver);
					this.byId("managePage").to(this.byId("sendStudentInformation"),"flip");
				}
				else {
					this.byId("sendStudentTabel").getController().getData(receiver);
					this.byId("managePage").to(this.byId("sendStudentTabel"),"flip");
				}
			}
		}
	});
});