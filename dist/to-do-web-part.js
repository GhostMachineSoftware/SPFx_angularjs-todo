define("11090974-be6b-4380-bb37-cf1b2a07a341_0.0.1", ["angular","ng-office-ui-fabric","@microsoft/sp-core-library","@microsoft/sp-webpart-base","@microsoft/sp-property-pane","ToDoWebPartStrings"], function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_6__, __WEBPACK_EXTERNAL_MODULE_12__) { return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: external "angular"
var external__angular_ = __webpack_require__(0);
var external__angular__default = /*#__PURE__*/__webpack_require__.n(external__angular_);

// CONCATENATED MODULE: ./lib/webparts/toDo/app/app.config.js

/* harmony default export */ var app_config = (function () {
    var todoapp = external__angular_["module"]('todoapp');
    todoapp.constant('sharepointApi', '/todo/_api/');
    todoapp.constant('todoListName', 'Todo');
    todoapp.constant('hideFinishedTasks', false);
});

// CONCATENATED MODULE: ./lib/webparts/toDo/app/HomeController.js
var HomeController = /** @class */ (function () {
    function HomeController(dataService, $window) {
        this.dataService = dataService;
        this.$window = $window;
        this.isLoading = false;
        this.newItem = null;
        this.todoCollection = [];
        this.loadTodos();
    }
    HomeController.prototype.loadTodos = function () {
        var _this = this;
        this.isLoading = true;
        this.dataService.getTodos()
            .then(function (todos) {
            _this.todoCollection = todos;
        })
            .finally(function () {
            _this.isLoading = false;
        });
    };
    HomeController.prototype.todoKeyDown = function ($event) {
        var _this = this;
        if ($event.keyCode === 13 && this.newItem.length > 0) {
            $event.preventDefault();
            this.todoCollection.unshift({ id: -1, title: this.newItem, done: false });
            this.dataService.addTodo(this.newItem)
                .then(function () {
                _this.newItem = null;
                _this.dataService.getTodos()
                    .then(function (todos) {
                    _this.todoCollection = todos;
                });
            });
        }
    };
    HomeController.prototype.deleteTodo = function (todo) {
        var _this = this;
        if (this.$window.confirm('Are you sure you want to delete this todo item?')) {
            var index = -1;
            for (var i = 0; i < this.todoCollection.length; i++) {
                if (this.todoCollection[i].id === todo.id) {
                    index = i;
                    break;
                }
            }
            if (index > -1) {
                this.todoCollection.splice(index, 1);
            }
            this.dataService.deleteTodo(todo)
                .then(function () {
                _this.dataService.getTodos()
                    .then(function (todos) {
                    _this.todoCollection = todos;
                });
            });
        }
    };
    HomeController.prototype.completeTodo = function (todo) {
        var _this = this;
        todo.done = true;
        this.dataService.setTodoStatus(todo, true)
            .then(function () {
            _this.dataService.getTodos()
                .then(function (todos) {
                _this.todoCollection = todos;
            });
        });
    };
    HomeController.prototype.undoTodo = function (todo) {
        var _this = this;
        todo.done = false;
        this.dataService.setTodoStatus(todo, false)
            .then(function () {
            _this.dataService.getTodos()
                .then(function (todos) {
                _this.todoCollection = todos;
            });
        });
    };
    HomeController.$inject = ['DataService', '$window'];
    return HomeController;
}());
/* harmony default export */ var app_HomeController = (HomeController);

// CONCATENATED MODULE: ./lib/webparts/toDo/app/DataService.js
var DataService = /** @class */ (function () {
    function DataService($q, $http, sharepointApi, todoListName, hideFinishedTasks) {
        this.$q = $q;
        this.$http = $http;
        this.sharepointApi = sharepointApi;
        this.todoListName = todoListName;
        this.hideFinishedTasks = hideFinishedTasks;
    }
    DataService.prototype.getTodos = function () {
        var deferred = this.$q.defer();
        var url = this.sharepointApi + "web/lists/getbytitle('" + this.todoListName + "')/items?$select=Id,Title,Status&$orderby=ID desc";
        if (this.hideFinishedTasks === true) {
            url += "&$filter=Status ne 'Completed'";
        }
        this.$http({
            url: url,
            method: 'GET',
            headers: {
                'Accept': 'application/json;odata=nometadata'
            }
        }).then(function (result) {
            var todos = [];
            for (var i = 0; i < result.data.value.length; i++) {
                var todo = result.data.value[i];
                todos.push({
                    id: todo.Id,
                    title: todo.Title,
                    done: todo.Status === 'Completed'
                });
            }
            deferred.resolve(todos);
        });
        return deferred.promise;
    };
    DataService.prototype.addTodo = function (todo) {
        var _this = this;
        var deferred = this.$q.defer();
        var listItemEntityTypeFullName = undefined;
        this.getListItemEntityTypeFullName()
            .then(function (entityTypeName) {
            listItemEntityTypeFullName = entityTypeName;
            return _this.getRequestDigest();
        })
            .then(function (requestDigest) {
            var body = JSON.stringify({
                '__metadata': { 'type': listItemEntityTypeFullName },
                'Title': todo
            });
            _this.$http({
                url: _this.sharepointApi + "web/lists/getbytitle('" + _this.todoListName + "')/items",
                method: 'POST',
                headers: {
                    'Accept': 'application/json;odata=nometadata',
                    'Content-type': 'application/json;odata=verbose',
                    'X-RequestDigest': requestDigest
                },
                data: body
            }).then(function (result) {
                deferred.resolve();
            });
        });
        return deferred.promise;
    };
    DataService.prototype.deleteTodo = function (todo) {
        var _this = this;
        var deferred = this.$q.defer();
        this.getRequestDigest()
            .then(function (requestDigest) {
            _this.$http({
                url: _this.sharepointApi + "web/lists/getbytitle('" + _this.todoListName + "')/items(" + todo.id + ")",
                method: 'POST',
                headers: {
                    'Accept': 'application/json;odata=nometadata',
                    'X-RequestDigest': requestDigest,
                    'IF-MATCH': '*',
                    'X-HTTP-Method': 'DELETE'
                }
            }).then(function (result) {
                deferred.resolve();
            });
        });
        return deferred.promise;
    };
    DataService.prototype.setTodoStatus = function (todo, done) {
        var _this = this;
        var deferred = this.$q.defer();
        var listItemEntityTypeFullName = undefined;
        this.getListItemEntityTypeFullName()
            .then(function (entityTypeName) {
            listItemEntityTypeFullName = entityTypeName;
            return _this.getRequestDigest();
        })
            .then(function (requestDigest) {
            var body = JSON.stringify({
                '__metadata': { 'type': listItemEntityTypeFullName },
                'Status': done ? 'Completed' : 'Not started'
            });
            _this.$http({
                url: _this.sharepointApi + "web/lists/getbytitle('" + _this.todoListName + "')/items(" + todo.id + ")",
                method: 'POST',
                headers: {
                    'Accept': 'application/json;odata=nometadata',
                    'Content-type': 'application/json;odata=verbose',
                    'X-RequestDigest': requestDigest,
                    'IF-MATCH': '*',
                    'X-HTTP-Method': 'MERGE'
                },
                data: body
            }).then(function (result) {
                deferred.resolve();
            });
        });
        return deferred.promise;
    };
    DataService.prototype.getRequestDigest = function () {
        var deferred = this.$q.defer();
        this.$http({
            url: this.sharepointApi + 'contextinfo',
            method: 'POST',
            headers: {
                'Accept': 'application/json;odata=nometadata'
            }
        }).then(function (result) {
            deferred.resolve(result.data.FormDigestValue);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    DataService.prototype.getListItemEntityTypeFullName = function () {
        var deferred = this.$q.defer();
        this.$http({
            url: this.sharepointApi + "web/lists/getbytitle('" + this.todoListName + "')?$select=ListItemEntityTypeFullName",
            method: 'GET',
            headers: {
                'Accept': 'application/json;odata=nometadata'
            }
        }).then(function (result) {
            deferred.resolve(result.data.ListItemEntityTypeFullName);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    DataService.$inject = ['$q', '$http', 'sharepointApi', 'todoListName', 'hideFinishedTasks'];
    return DataService;
}());
/* harmony default export */ var app_DataService = (DataService);

// EXTERNAL MODULE: external "ng-office-ui-fabric"
var external__ng_office_ui_fabric_ = __webpack_require__(1);
var external__ng_office_ui_fabric__default = /*#__PURE__*/__webpack_require__.n(external__ng_office_ui_fabric_);

// CONCATENATED MODULE: ./lib/webparts/toDo/app/app.module.js





var app_module_todoapp = external__angular_["module"]('todoapp', [
    'officeuifabric.core',
    'officeuifabric.components'
]);
app_config();
app_module_todoapp
    .controller('HomeController', app_HomeController)
    .service('DataService', app_DataService);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: external "@microsoft/sp-core-library"
var sp_core_library_ = __webpack_require__(4);
var sp_core_library__default = /*#__PURE__*/__webpack_require__.n(sp_core_library_);

// EXTERNAL MODULE: external "@microsoft/sp-webpart-base"
var sp_webpart_base_ = __webpack_require__(5);
var sp_webpart_base__default = /*#__PURE__*/__webpack_require__.n(sp_webpart_base_);

// EXTERNAL MODULE: external "@microsoft/sp-property-pane"
var sp_property_pane_ = __webpack_require__(6);
var sp_property_pane__default = /*#__PURE__*/__webpack_require__.n(sp_property_pane_);

// CONCATENATED MODULE: ./lib/webparts/toDo/ToDoWebPart.module.scss.js
/* tslint:disable */
__webpack_require__(7);
var styles = {
    toDo: 'toDo_82f13ae6',
    loading: 'loading_82f13ae6',
    spinner: 'spinner_82f13ae6',
    spinnerCircle: 'spinnerCircle_82f13ae6',
    spinnerSpin: 'spinnerSpin_82f13ae6',
    spinnerLarge: 'spinnerLarge_82f13ae6',
    spinnerLabel: 'spinnerLabel_82f13ae6',
    label: 'label_82f13ae6',
    textField: 'textField_82f13ae6',
    underlined: 'underlined_82f13ae6',
    isActive: 'isActive_82f13ae6',
    field: 'field_82f13ae6',
    listItem: 'listItem_82f13ae6',
    listItemPrimaryText: 'listItemPrimaryText_82f13ae6',
    listItemActions: 'listItemActions_82f13ae6',
    listItemAction: 'listItemAction_82f13ae6',
    icon: 'icon_82f13ae6',
    done: 'done_82f13ae6',
    iconCheckMark: 'iconCheckMark_82f13ae6',
    iconUndo: 'iconUndo_82f13ae6',
    iconRecycleBin: 'iconRecycleBin_82f13ae6',
};
/* harmony default export */ var ToDoWebPart_module_scss = (styles);
/* tslint:enable */ 

// EXTERNAL MODULE: external "ToDoWebPartStrings"
var external__ToDoWebPartStrings_ = __webpack_require__(12);
var external__ToDoWebPartStrings__default = /*#__PURE__*/__webpack_require__.n(external__ToDoWebPartStrings_);

// EXTERNAL MODULE: external "angular"
var external__angular_ = __webpack_require__(0);
var external__angular__default = /*#__PURE__*/__webpack_require__.n(external__angular_);

// EXTERNAL MODULE: external "ng-office-ui-fabric"
var external__ng_office_ui_fabric_ = __webpack_require__(1);
var external__ng_office_ui_fabric__default = /*#__PURE__*/__webpack_require__.n(external__ng_office_ui_fabric_);

// EXTERNAL MODULE: ./lib/webparts/toDo/app/app.module.js + 3 modules
var app_module = __webpack_require__(2);

// CONCATENATED MODULE: ./lib/webparts/toDo/ToDoWebPart.js
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();








var ToDoWebPart_ToDoWebPart = /** @class */ (function (_super) {
    __extends(ToDoWebPart, _super);
    function ToDoWebPart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ToDoWebPart.prototype.render = function () {
        if (this.renderedOnce === false) {
            __webpack_require__(2);
            this.domElement.innerHTML = "\n        <div class=\"" + ToDoWebPart_module_scss.toDo + "\">\n          <div data-ng-controller=\"HomeController as vm\">\n            <div class=\"" + ToDoWebPart_module_scss.loading + "\" ng-show=\"vm.isLoading\">\n              <uif-spinner>Loading...</uif-spinner>\n            </div>\n            <div id=\"entryform\" ng-show=\"vm.isLoading === false\">\n              <uif-textfield uif-label=\"New to do:\" uif-underlined ng-model=\"vm.newItem\" ng-keydown=\"vm.todoKeyDown($event)\"></uif-textfield>\n            </div>\n            <uif-list id=\"items\" ng-show=\"vm.isLoading === false\" >\n              <uif-list-item ng-repeat=\"todo in vm.todoCollection\" uif-item=\"todo\" ng-class=\"{'" + ToDoWebPart_module_scss.done + "': todo.done}\">\n                <uif-list-item-primary-text>{{todo.title}}</uif-list-item-primary-text>\n                <uif-list-item-actions>\n                  <uif-list-item-action ng-click=\"vm.completeTodo(todo)\" ng-show=\"todo.done === false\">\n                    <i class=\"ms-Icon ms-Icon--CheckMark\" aria-hidden=\"true\"></i>\n                  </uif-list-item-action>\n                  <uif-list-item-action ng-click=\"vm.undoTodo(todo)\" ng-show=\"todo.done\">\n                    <i class=\"ms-Icon ms-Icon--RevToggleKey\" aria-hidden=\"true\"></i>\n                  </uif-list-item-action>\n                  <uif-list-item-action ng-click=\"vm.deleteTodo(todo)\">\n                    <i class=\"ms-Icon ms-Icon--Delete\" aria-hidden=\"true\"></i>\n                  </uif-list-item-action>\n                </uif-list-item-actions>\n              </uif-list-item>\n            </uif-list>\n          </div>\n        </div>";
            external__angular_["bootstrap"](this.domElement, ['todoapp']);
        }
    };
    Object.defineProperty(ToDoWebPart.prototype, "dataVersion", {
        get: function () {
            return sp_core_library_["Version"].parse('1.0');
        },
        enumerable: true,
        configurable: true
    });
    ToDoWebPart.prototype.getPropertyPaneConfiguration = function () {
        return {
            pages: [
                {
                    header: {
                        description: external__ToDoWebPartStrings_["PropertyPaneDescription"]
                    },
                    groups: [
                        {
                            groupName: external__ToDoWebPartStrings_["BasicGroupName"],
                            groupFields: [
                                Object(sp_property_pane_["PropertyPaneTextField"])('description', {
                                    label: external__ToDoWebPartStrings_["DescriptionFieldLabel"]
                                })
                            ]
                        }
                    ]
                }
            ]
        };
    };
    return ToDoWebPart;
}(sp_webpart_base_["BaseClientSideWebPart"]));
/* harmony default export */ var toDo_ToDoWebPart = __webpack_exports__["default"] = (ToDoWebPart_ToDoWebPart);


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(8);
var loader = __webpack_require__(10);

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(false);
// imports


// module
exports.push([module.i, ".toDo_82f13ae6 .loading_82f13ae6{margin:0 auto;width:6em}.toDo_82f13ae6 .loading_82f13ae6 .spinner_82f13ae6{display:inline-block;margin:10px 0}@-webkit-keyframes spinnerSpin_82f13ae6{0%{-webkit-transform:rotate(0);transform:rotate(0)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@keyframes spinnerSpin_82f13ae6{0%{-webkit-transform:rotate(0);transform:rotate(0)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}.toDo_82f13ae6 .loading_82f13ae6 .spinner_82f13ae6 .spinnerCircle_82f13ae6{margin:auto;-webkit-box-sizing:border-box;box-sizing:border-box;border-radius:50%;width:100%;height:100%;border:1.5px solid #c7e0f4;border-top-color:#0078d7;-webkit-animation:spinnerSpin_82f13ae6 1.3s infinite cubic-bezier(.53,.21,.29,.67);animation:spinnerSpin_82f13ae6 1.3s infinite cubic-bezier(.53,.21,.29,.67)}.toDo_82f13ae6 .loading_82f13ae6 .spinner_82f13ae6 .spinnerCircle_82f13ae6.spinnerLarge_82f13ae6{width:28px;height:28px}.toDo_82f13ae6 .loading_82f13ae6 .spinner_82f13ae6 .spinnerLabel_82f13ae6{color:#0078d7;margin-top:10px;text-align:center}.toDo_82f13ae6 .label_82f13ae6{padding:0;display:block;padding:5px 0}.toDo_82f13ae6 .label_82f13ae6,.toDo_82f13ae6 .textField_82f13ae6{font-family:Segoe UI WestEuropean,Segoe UI,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif;-webkit-font-smoothing:antialiased;font-size:14px;font-weight:400;-webkit-box-sizing:border-box;margin:0;-webkit-box-shadow:none;box-shadow:none;color:#333;box-sizing:border-box}.toDo_82f13ae6 .textField_82f13ae6{padding:0;margin-bottom:8px}.toDo_82f13ae6 .textField_82f13ae6.underlined_82f13ae6{border-bottom:1px solid #c8c8c8;display:table;width:100%}.toDo_82f13ae6 .textField_82f13ae6.underlined_82f13ae6:hover{border-color:#767676}.toDo_82f13ae6 .textField_82f13ae6.underlined_82f13ae6.isActive_82f13ae6,.toDo_82f13ae6 .textField_82f13ae6.underlined_82f13ae6:active{border-color:#0078d7}.toDo_82f13ae6 .textField_82f13ae6.underlined_82f13ae6 .field_82f13ae6{border:0;display:table-cell;padding-top:8px;padding-bottom:3px}.toDo_82f13ae6 .textField_82f13ae6 .label_82f13ae6{padding-right:0;padding-left:12px;margin-right:8px;font-size:14px;display:table-cell;vertical-align:top;padding-top:9px;height:32px;width:1%;white-space:nowrap;font-weight:400}.toDo_82f13ae6 .textField_82f13ae6 .field_82f13ae6{text-align:left;float:left;-webkit-box-sizing:border-box;box-sizing:border-box;margin:0;padding:0;-webkit-box-shadow:none;box-shadow:none;font-family:Segoe UI WestEuropean,Segoe UI,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif;-webkit-font-smoothing:antialiased;border:1px solid #c8c8c8;border-radius:0;font-weight:400;font-size:14px;color:#333;height:32px;padding:0 12px;width:100%;outline:0;text-overflow:ellipsis}.toDo_82f13ae6 .textField_82f13ae6 .field_82f13ae6:hover{border-color:#767676}.toDo_82f13ae6 .listItem_82f13ae6{font-family:Segoe UI WestEuropean,Segoe UI,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif;-webkit-font-smoothing:antialiased;font-size:14px;font-weight:400;-webkit-box-sizing:border-box;box-sizing:border-box;margin:0;padding:0;-webkit-box-shadow:none;box-shadow:none;padding:9px 28px 3px;position:relative;display:block}.toDo_82f13ae6 .listItem_82f13ae6:before{display:table;content:\"\";line-height:0}.toDo_82f13ae6 .listItem_82f13ae6:after{display:table;content:\"\";line-height:0;clear:both}.toDo_82f13ae6 .listItem_82f13ae6 .listItemPrimaryText_82f13ae6{font-family:Segoe UI WestEuropean,Segoe UI,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif;-webkit-font-smoothing:antialiased;font-size:21px;font-weight:100;padding-right:80px;position:relative;top:-4px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;display:block}.toDo_82f13ae6 .listItem_82f13ae6 .listItemActions_82f13ae6{max-width:80px;position:absolute;right:30px;text-align:right;top:10px}.toDo_82f13ae6 .listItem_82f13ae6 .listItemActions_82f13ae6 .listItemAction_82f13ae6{color:#a6a6a6;display:inline-block;font-size:15px;position:relative;text-align:center;top:3px;cursor:pointer;height:16px;width:16px}.toDo_82f13ae6 .listItem_82f13ae6 .listItemActions_82f13ae6 .listItemAction_82f13ae6:hover{color:#666;outline:1px solid transparent}.toDo_82f13ae6 .listItem_82f13ae6 .listItemActions_82f13ae6 .listItemAction_82f13ae6 .icon_82f13ae6{vertical-align:top}.toDo_82f13ae6 .done_82f13ae6{text-decoration:line-through}.toDo_82f13ae6 .icon_82f13ae6{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;display:inline-block;font-family:FabricMDL2Icons;font-style:normal;font-weight:400;speak:none}.toDo_82f13ae6 .icon_82f13ae6.iconCheckMark_82f13ae6:before{content:\"\\E73E\"}.toDo_82f13ae6 .icon_82f13ae6.iconUndo_82f13ae6:before{content:\"\\E7A7\"}.toDo_82f13ae6 .icon_82f13ae6.iconRecycleBin_82f13ae6:before{content:\"\\EF87\"}", ""]);

// exports


/***/ }),
/* 9 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
/**
 * An IThemingInstruction can specify a rawString to be preserved or a theme slot and a default value
 * to use if that slot is not specified by the theme.
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
// IE needs to inject styles using cssText. However, we need to evaluate this lazily, so this
// value will initialize as undefined, and later will be set once on first loadStyles injection.
var _injectStylesWithCssText;
// Store the theming state in __themeState__ global scope for reuse in the case of duplicate
// load-themed-styles hosted on the page.
var _root = (typeof window === 'undefined') ? global : window; // tslint:disable-line:no-any
var _themeState = initializeThemeState();
/**
 * Matches theming tokens. For example, "[theme: themeSlotName, default: #FFF]" (including the quotes).
 */
// tslint:disable-next-line:max-line-length
var _themeTokenRegex = /[\'\"]\[theme:\s*(\w+)\s*(?:\,\s*default:\s*([\\"\']?[\.\,\(\)\#\-\s\w]*[\.\,\(\)\#\-\w][\"\']?))?\s*\][\'\"]/g;
/** Maximum style text length, for supporting IE style restrictions. */
var MAX_STYLE_CONTENT_SIZE = 10000;
var now = function () { return (typeof performance !== 'undefined' && !!performance.now) ? performance.now() : Date.now(); };
function measure(func) {
    var start = now();
    func();
    var end = now();
    _themeState.perf.duration += end - start;
}
/**
 * initialize global state object
 */
function initializeThemeState() {
    var state = _root.__themeState__ || {
        theme: undefined,
        lastStyleElement: undefined,
        registeredStyles: []
    };
    if (!state.runState) {
        state = __assign({}, (state), { perf: {
                count: 0,
                duration: 0
            }, runState: {
                flushTimer: 0,
                mode: 0 /* sync */,
                buffer: []
            } });
    }
    if (!state.registeredThemableStyles) {
        state = __assign({}, (state), { registeredThemableStyles: [] });
    }
    _root.__themeState__ = state;
    return state;
}
/**
 * Loads a set of style text. If it is registered too early, we will register it when the window.load
 * event is fired.
 * @param {string | ThemableArray} styles Themable style text to register.
 * @param {boolean} loadAsync When true, always load styles in async mode, irrespective of current sync mode.
 */
function loadStyles(styles, loadAsync) {
    if (loadAsync === void 0) { loadAsync = false; }
    measure(function () {
        var styleParts = Array.isArray(styles) ? styles : splitStyles(styles);
        if (_injectStylesWithCssText === undefined) {
            _injectStylesWithCssText = shouldUseCssText();
        }
        var _a = _themeState.runState, mode = _a.mode, buffer = _a.buffer, flushTimer = _a.flushTimer;
        if (loadAsync || mode === 1 /* async */) {
            buffer.push(styleParts);
            if (!flushTimer) {
                _themeState.runState.flushTimer = asyncLoadStyles();
            }
        }
        else {
            applyThemableStyles(styleParts);
        }
    });
}
exports.loadStyles = loadStyles;
/**
 * Allows for customizable loadStyles logic. e.g. for server side rendering application
 * @param {(processedStyles: string, rawStyles?: string | ThemableArray) => void}
 * a loadStyles callback that gets called when styles are loaded or reloaded
 */
function configureLoadStyles(loadStylesFn) {
    _themeState.loadStyles = loadStylesFn;
}
exports.configureLoadStyles = configureLoadStyles;
/**
 * Configure run mode of load-themable-styles
 * @param mode load-themable-styles run mode, async or sync
 */
function configureRunMode(mode) {
    _themeState.runState.mode = mode;
}
exports.configureRunMode = configureRunMode;
/**
 * external code can call flush to synchronously force processing of currently buffered styles
 */
function flush() {
    measure(function () {
        var styleArrays = _themeState.runState.buffer.slice();
        _themeState.runState.buffer = [];
        var mergedStyleArray = [].concat.apply([], styleArrays);
        if (mergedStyleArray.length > 0) {
            applyThemableStyles(mergedStyleArray);
        }
    });
}
exports.flush = flush;
/**
 * register async loadStyles
 */
function asyncLoadStyles() {
    return setTimeout(function () {
        _themeState.runState.flushTimer = 0;
        flush();
    }, 0);
}
/**
 * Loads a set of style text. If it is registered too early, we will register it when the window.load event
 * is fired.
 * @param {string} styleText Style to register.
 * @param {IStyleRecord} styleRecord Existing style record to re-apply.
 */
function applyThemableStyles(stylesArray, styleRecord) {
    if (_themeState.loadStyles) {
        _themeState.loadStyles(resolveThemableArray(stylesArray).styleString, stylesArray);
    }
    else {
        _injectStylesWithCssText ?
            registerStylesIE(stylesArray, styleRecord) :
            registerStyles(stylesArray);
    }
}
/**
 * Registers a set theme tokens to find and replace. If styles were already registered, they will be
 * replaced.
 * @param {theme} theme JSON object of theme tokens to values.
 */
function loadTheme(theme) {
    _themeState.theme = theme;
    // reload styles.
    reloadStyles();
}
exports.loadTheme = loadTheme;
/**
 * Clear already registered style elements and style records in theme_State object
 * @option: specify which group of registered styles should be cleared.
 * Default to be both themable and non-themable styles will be cleared
 */
function clearStyles(option) {
    if (option === void 0) { option = 3 /* all */; }
    if (option === 3 /* all */ || option === 2 /* onlyNonThemable */) {
        clearStylesInternal(_themeState.registeredStyles);
        _themeState.registeredStyles = [];
    }
    if (option === 3 /* all */ || option === 1 /* onlyThemable */) {
        clearStylesInternal(_themeState.registeredThemableStyles);
        _themeState.registeredThemableStyles = [];
    }
}
exports.clearStyles = clearStyles;
function clearStylesInternal(records) {
    records.forEach(function (styleRecord) {
        var styleElement = styleRecord && styleRecord.styleElement;
        if (styleElement && styleElement.parentElement) {
            styleElement.parentElement.removeChild(styleElement);
        }
    });
}
/**
 * Reloads styles.
 */
function reloadStyles() {
    if (_themeState.theme) {
        var themableStyles = [];
        for (var _i = 0, _a = _themeState.registeredThemableStyles; _i < _a.length; _i++) {
            var styleRecord = _a[_i];
            themableStyles.push(styleRecord.themableStyle);
        }
        if (themableStyles.length > 0) {
            clearStyles(1 /* onlyThemable */);
            applyThemableStyles([].concat.apply([], themableStyles));
        }
    }
}
/**
 * Find theme tokens and replaces them with provided theme values.
 * @param {string} styles Tokenized styles to fix.
 */
function detokenize(styles) {
    if (styles) {
        styles = resolveThemableArray(splitStyles(styles)).styleString;
    }
    return styles;
}
exports.detokenize = detokenize;
/**
 * Resolves ThemingInstruction objects in an array and joins the result into a string.
 * @param {ThemableArray} splitStyleArray ThemableArray to resolve and join.
 */
function resolveThemableArray(splitStyleArray) {
    var theme = _themeState.theme;
    var themable = false;
    // Resolve the array of theming instructions to an array of strings.
    // Then join the array to produce the final CSS string.
    var resolvedArray = (splitStyleArray || []).map(function (currentValue) {
        var themeSlot = currentValue.theme;
        if (themeSlot) {
            themable = true;
            // A theming annotation. Resolve it.
            var themedValue = theme ? theme[themeSlot] : undefined;
            var defaultValue = currentValue.defaultValue || 'inherit';
            // Warn to console if we hit an unthemed value even when themes are provided, but only if "DEBUG" is true.
            // Allow the themedValue to be undefined to explicitly request the default value.
            if (theme && !themedValue && console && !(themeSlot in theme) && "boolean" !== 'undefined' && true) {
                console.warn("Theming value not provided for \"" + themeSlot + "\". Falling back to \"" + defaultValue + "\".");
            }
            return themedValue || defaultValue;
        }
        else {
            // A non-themable string. Preserve it.
            return currentValue.rawString;
        }
    });
    return {
        styleString: resolvedArray.join(''),
        themable: themable
    };
}
/**
 * Split tokenized CSS into an array of strings and theme specification objects
 * @param {string} styles Tokenized styles to split.
 */
function splitStyles(styles) {
    var result = [];
    if (styles) {
        var pos = 0; // Current position in styles.
        var tokenMatch = void 0; // tslint:disable-line:no-null-keyword
        while (tokenMatch = _themeTokenRegex.exec(styles)) {
            var matchIndex = tokenMatch.index;
            if (matchIndex > pos) {
                result.push({
                    rawString: styles.substring(pos, matchIndex)
                });
            }
            result.push({
                theme: tokenMatch[1],
                defaultValue: tokenMatch[2] // May be undefined
            });
            // index of the first character after the current match
            pos = _themeTokenRegex.lastIndex;
        }
        // Push the rest of the string after the last match.
        result.push({
            rawString: styles.substring(pos)
        });
    }
    return result;
}
exports.splitStyles = splitStyles;
/**
 * Registers a set of style text. If it is registered too early, we will register it when the
 * window.load event is fired.
 * @param {ThemableArray} styleArray Array of IThemingInstruction objects to register.
 * @param {IStyleRecord} styleRecord May specify a style Element to update.
 */
function registerStyles(styleArray) {
    if (typeof document === 'undefined') {
        return;
    }
    var head = document.getElementsByTagName('head')[0];
    var styleElement = document.createElement('style');
    var _a = resolveThemableArray(styleArray), styleString = _a.styleString, themable = _a.themable;
    styleElement.type = 'text/css';
    styleElement.appendChild(document.createTextNode(styleString));
    _themeState.perf.count++;
    head.appendChild(styleElement);
    var record = {
        styleElement: styleElement,
        themableStyle: styleArray
    };
    if (themable) {
        _themeState.registeredThemableStyles.push(record);
    }
    else {
        _themeState.registeredStyles.push(record);
    }
}
/**
 * Registers a set of style text, for IE 9 and below, which has a ~30 style element limit so we need
 * to register slightly differently.
 * @param {ThemableArray} styleArray Array of IThemingInstruction objects to register.
 * @param {IStyleRecord} styleRecord May specify a style Element to update.
 */
function registerStylesIE(styleArray, styleRecord) {
    if (typeof document === 'undefined') {
        return;
    }
    var head = document.getElementsByTagName('head')[0];
    var registeredStyles = _themeState.registeredStyles;
    var lastStyleElement = _themeState.lastStyleElement;
    var stylesheet = lastStyleElement ? lastStyleElement.styleSheet : undefined;
    var lastStyleContent = stylesheet ? stylesheet.cssText : '';
    var lastRegisteredStyle = registeredStyles[registeredStyles.length - 1];
    var resolvedStyleText = resolveThemableArray(styleArray).styleString;
    if (!lastStyleElement || (lastStyleContent.length + resolvedStyleText.length) > MAX_STYLE_CONTENT_SIZE) {
        lastStyleElement = document.createElement('style');
        lastStyleElement.type = 'text/css';
        if (styleRecord) {
            head.replaceChild(lastStyleElement, styleRecord.styleElement);
            styleRecord.styleElement = lastStyleElement;
        }
        else {
            head.appendChild(lastStyleElement);
        }
        if (!styleRecord) {
            lastRegisteredStyle = {
                styleElement: lastStyleElement,
                themableStyle: styleArray
            };
            registeredStyles.push(lastRegisteredStyle);
        }
    }
    lastStyleElement.styleSheet.cssText += detokenize(resolvedStyleText);
    Array.prototype.push.apply(lastRegisteredStyle.themableStyle, styleArray); // concat in-place
    // Preserve the theme state.
    _themeState.lastStyleElement = lastStyleElement;
}
/**
 * Checks to see if styleSheet exists as a property off of a style element.
 * This will determine if style registration should be done via cssText (<= IE9) or not
 */
function shouldUseCssText() {
    var useCSSText = false;
    if (typeof document !== 'undefined') {
        var emptyStyle = document.createElement('style');
        emptyStyle.type = 'text/css';
        useCSSText = !!emptyStyle.styleSheet;
    }
    return useCSSText;
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11)))

/***/ }),
/* 11 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_12__;

/***/ })
/******/ ])});;
//# sourceMappingURL=to-do-web-part.js.map