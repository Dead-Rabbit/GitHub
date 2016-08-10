"use strict";
angular.module("task50App", ["ngAnimate", "ngCookies", "ngResource", "ngRoute", "ngSanitize", "ngTouch"]).config(["$routeProvider", function(a) {
	a.when("/", {
		templateUrl: "views/main.html",
		controller: "MainCtrl",
		controllerAs: "main"
	}).when("/about", {
		templateUrl: "views/about.html",
		controller: "AboutCtrl",
		controllerAs: "about"
	}).when("/createnew", {
		templateUrl: "views/createnew.html",
		controller: "CreateNewCtrl",
		controllerAs: "createnew"
	}).when("/newpage", {
		templateUrl: "views/newpage.html",
		controller: "NewPageCtrl",
		controllerAs: "newpage"
	}).otherwise({
		redirectTo: "/"
	})
}]), angular.module("task50App").service("domGet", function() {
	var a = {
		select: function(a) {
			return document.querySelector(a)
		},
		selectAll: function(a) {
			return document.querySelectorAll(a)
		},
		selectC: function(a) {
			return angular.element(document.querySelector(a))
		},
		selectAllC: function(a) {
			return angular.element(document.querySelectorAll(a))
		}
	};
	return a
});
var json1 = {
		records: [{
			id: 1,
			title: "让覃小夫做十个俯卧撑",
			time: "2016/7/26",
			state: "发布中"
		}, {
			id: 9,
			title: "让覃小夫做十个俯卧撑",
			time: "2016/7/26",
			state: "未发布"
		}, {
			id: 2,
			title: "十万个为什么之nomor为什么那么帅",
			time: "2016/7/26",
			state: "已发布"
		}, {
			id: 3,
			title: "nomor's blog",
			time: "2016/7/26",
			state: "已发布"
		}, {
			id: 4,
			title: "让覃小夫做十个俯卧撑",
			time: "2016/7/26",
			state: "已发布"
		}, {
			id: 5,
			title: "十万个为什么之nomor为什么那么帅",
			time: "2016/7/26",
			state: "已发布"
		}, {
			id: 6,
			title: "nomor's blog",
			time: "2016/7/26",
			state: "已发布"
		}]
	},
	wholeModule = angular.module("task50App");
wholeModule.controller("MainCtrl", function() {
	this.awesomeThings = ["HTML5 Boilerplate", "AngularJS", "Karma"]
}), wholeModule.controller("MainCtrl", ["$scope", "domGet", function(a, b) {
	a.json = json1.records;
	var c = NaN,
		d = [];
	a.checkBoxCtr = function(c, e, f) {
		var g = b.selectAll("label div input");
		if(f || "checked" === f ? (d.every(function(a) {
				return a !== c
			}) || c >= 0) && d.push(c) : d.forEach(function(a, b) {
				a === c && d.splice(b, 1)
			}), "last" === e) {
			var h;
			if(e = g.length - 1, f || "checked" === f)
				for(h = 0; e + 1 > h; h++) g[h].parentNode.className = "chagechecked", a.checkBoxCtr(-1, h, !0), d = a.json.map(function(a) {
					return a.id
				});
			else
				for(h = 0; e + 1 > h; h++) g[h].parentNode.className = "nocheck", a.checkBoxCtr(-1, h, !1), d.length = 0
		}
	}, a.deletThisItem = function(a) {
		b.selectC(".topcover").css("display", "block"), b.selectC(".cover").css("display", "block"), c = a
	}, a.confirmClick = function(e) {
		e && (a.json.forEach(function(b, d) {
			b.id === c && a.json.splice(d, 1)
		}), d.forEach(function(a, b) {
			a === c && d.splice(b, 1)
		})), b.selectC(".topcover").css("display", "none"), b.selectAllC(".topcover").eq(1).css("display", "none"), b.selectC(".cover").css("display", "none")
	}, a.deletAllChecked = function() {
		0 !== d.length ? (b.selectAllC(".topcover").eq(1).css("display", "block"), b.selectC(".cover").css("display", "block")) : window.alert("您没有选择任何项目")
	}, a.deletAllCheckedSure = function() {
		a.json = a.json.filter(function(a) {
			return d.every(function(b) {
				return b !== a.id
			})
		}), d.length = 0, a.confirmClick(!1)
	}
}]), angular.module("task50App").controller("AboutCtrl", function() {
	this.awesomeThings = ["HTML5 Boilerplate", "AngularJS", "Karma"]
}), angular.module("task50App").controller("CreateNewCtrl", function() {
	this.awesomeThings = ["HTML5 Boilerplate", "AngularJS", "Karma"]
});
var json2 = {
		title: "点击输入标题",
		questionbank: []
	},
	wholeModule1 = angular.module("task50App");
wholeModule1.controller("NewPageCtrl", function() {
	this.awesomeThings = ["HTML5 Boilerplate", "AngularJS", "Karma"]
}), wholeModule1.controller("NewPageCtrl", ["$scope", function(a) {
	a.json2 = json2, a.questionbank = json2.questionbank, a.addToJson = function(b) {
		3 !== b ? a.questionbank.push({
			question: "点击输入问题",
			typeId: b,
			answer: ["点击输入选项"]
		}) : a.questionbank.push({
			question: "点击输入问题",
			typeId: b,
			mustAnswer: !1
		})
	}, a.changeToJson = function(b, c, d, e) {
		var f = angular.element(d.target).html().trim();
		"question" === c ? a.questionbank[b].question = f : "answer" == c ? a.questionbank[b].answer[e] = f : a.json2.title = f, console.log(json2)
	}, a.addExpro = function(b) {
		a.questionbank[b].answer.push("点击输入选项")
	}, a.deleteThisExpro = function(b, c) {
		a.questionbank[b].answer.splice(c, 1)
	}, a.mustAnswerF = function(b, c) {
		3 === a.questionbank[b].typeId && (a.questionbank[b].mustAnswer = !0)
	}, a.removeFunc = function(b, c) {
		var d = a.questionbank[b];
		switch(c) {
			case "up":
				0 !== b ? (a.questionbank.splice(b, 1), a.questionbank.splice(b - 1, 0, d)) : alert("已经位于首位");
				break;
			case "down":
				b !== a.questionbank.length - 1 ? (a.questionbank.splice(b, 1), a.questionbank.splice(b + 1, 0, d)) : alert("已经位于末位");
				break;
			case "more":
				3 !== d.typeId ? a.questionbank.push({
					question: d.question,
					typeId: d.typeId,
					answer: d.answer.filter(function() {
						return !0
					})
				}) : a.questionbank.push({
					question: d.question,
					typeId: d.typeId,
					mustAnswer: !1
				});
				break;
			case "del":
				a.questionbank.splice(b, 1)
		}
	}
}]), angular.module("task50App").run(["$templateCache", function(a) {
	a.put("views/about.html", "<p>This is the about view.</p>"), a.put("views/createnew.html", '<div class="content clearfix"> <div class="sec"> <a href="#/newpage"><span>+</span>&nbsp;新建问卷</a> </div> </div>'), a.put("views/main.html", '<div class="conheader"> <ul> <li class="contitle">标题</li> <li class="contime">时间</li> <li class="constate">状态</li> <li class="conhandle">操作</li> <li class="connewfile"><a href="#/createnew"><span>+</span>&nbsp;新建问卷</a></li> </ul> </div> <div class="conbody clearfix"> <ul> <li ng-repeat="x in json" class="item" ng-init="checkedF = false"> <ul> <label ng-click="checkBoxCtr(x.id,$index,checkedF)"> <li class="contitle"> <div ng-class="{chagechecked: checkedF , nocheck: !checkedF}"> <input type="checkbox" ng-checked="all" ng-model="checkedF" class="checkedboxclass"> </div> {{x.title}} </li> <li class="contime"> {{x.time}} </li> <li ng-class="{constate : x.state == \'已发布\' , constateg : x.state == \'发布中\' ,constater: x.state == \'未发布\'}"> {{x.state}} </li> </label> <li class="conhandle"> <a href="undefined">编辑</a> <a class="delo" ng-click="deletThisItem(x.id)">删除</a> <a href="undefined">查看数据</a> </li> </ul> </li> </ul> </div> <div class="confoot"> <label ng-click="checkBoxCtr(null,\'last\',all)"> <span> <div class="chagechecked nocheck"> <input type="checkbox" ng-model="all" class="checkedboxclass"> </div> 全选 </span> </label> <a id="allselect" class="check" ng-click="deletAllChecked()">删除</a> </div> <div class="cover"></div> <div class="topcover"> <h3>提示</h3> <span ng-click="confirmClick(false)">&times;</span> <p>确认要删除此问卷？</p> <a ng-click="confirmClick(true)">确定</a> <a ng-click="confirmClick(false)" class="clf">取消</a> </div> <div class="topcover"> <h3>提示</h3> <span ng-click="confirmClick(false)">&times;</span> <p>确认要删除这些问卷吗？ 此操作无法撤回！</p> <a ng-click="deletAllCheckedSure()">确定</a> <a ng-click="confirmClick(false)" class="clf">取消</a> </div>'), a.put("views/newpage.html", '<div class="newcont clearfix"> <h2 contenteditable="true" ng-blur="changeToJson(null,\'title\',$event)"> {{ json2.title }} </h2> <div class="cons clearfix"> <div class="titles"> <div class="expro" ng-repeat=" x in questionbank track by $index" ng-init="qId = $index"> <h4>{{ "Q" + (qId+1) + " " }} <a contenteditable="true" ng-blur="changeToJson(qId,\'question\',$event)"> {{x.question}} </a> </h4> <label ng-repeat="y in x.answer track by $index" ng-class="{displayN : x.typeId !== 1}"> <div class="exproa" ng-init="aId = $index"> <input type="radio"> <a contenteditable="true" ng-blur="changeToJson(qId,\'answer\',$event,aId)"> {{y}} </a> <span ng-click="deleteThisExpro(qId,aId)">x</span> </div> </label> <label ng-repeat="y in x.answer track by $index" ng-class="{displayN : x.typeId !== 2}"> <div class="exproa"> <input type="checkbox"> <a contenteditable="true" ng-blur="changeToJson(qId,\'answer\',$event,aId)"> {{y}} </a> <span ng-click="deleteThisExpro(qId,aId)">x</span> </div> </label> <div ng-class="{displayN : x.typeId !== 3}"> <label ng-click="mustAnswerF(qId,mustcheck)"> <b><input type="checkbox" ng-model="mustcheck">此题是否必填</b> </label> <textarea>\r\n						</textarea> </div> <span ng-class="{displayN : x.typeId === 3}" class="addexproa" ng-click="addExpro(qId)">+</span> <p> <span ng-click="removeFunc(qId,&quot;up&quot;)">上移</span> <span ng-click="removeFunc(qId,&quot;down&quot;)">下移</span> <span ng-click="removeFunc(qId,&quot;more&quot;)">复用</span> <span ng-click="removeFunc(qId,&quot;del&quot;)">删除</span> </p> </div> </div> <div class="choseexpro" ng-init="ulshow = 0"> <ul ng-class="{displayN : true,displayB : ulshow === 1}"> <li ng-click="addToJson(1)"><img src="images/dx.0bd64304.png"></li> <li ng-click="addToJson(2)"><img src="images/dx2.ccea715e.png"></li> <li ng-click="addToJson(3)"><img src="images/dx3.ee4d603f.png"></li> </ul> <div ng-click="ulshow = 1"> <a><span>+</span>&nbsp;添加问题</a> </div> </div> </div> <div class="timechose"> <p>问卷截止日期</p> <div> <input type="text" name="" value="2014-04-07"> </div> <a class="saveQtn">保存问卷</a> <a class="publishQtn">发布问卷</a> </div> </div>')
}]);
