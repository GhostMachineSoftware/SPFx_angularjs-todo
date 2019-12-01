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
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { PropertyPaneTextField } from '@microsoft/sp-property-pane';
import styles from './ToDoWebPart.module.scss';
import * as strings from 'ToDoWebPartStrings';
import * as angular from 'angular';
import 'ng-office-ui-fabric';
import './app/app.module';
var ToDoWebPart = /** @class */ (function (_super) {
    __extends(ToDoWebPart, _super);
    function ToDoWebPart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ToDoWebPart.prototype.render = function () {
        if (this.renderedOnce === false) {
            require('./app/app.module');
            this.domElement.innerHTML = "\n        <div class=\"" + styles.toDo + "\">\n          <div data-ng-controller=\"HomeController as vm\">\n            <div class=\"" + styles.loading + "\" ng-show=\"vm.isLoading\">\n              <uif-spinner>Loading...</uif-spinner>\n            </div>\n            <div id=\"entryform\" ng-show=\"vm.isLoading === false\">\n              <uif-textfield uif-label=\"New to do:\" uif-underlined ng-model=\"vm.newItem\" ng-keydown=\"vm.todoKeyDown($event)\"></uif-textfield>\n            </div>\n            <uif-list id=\"items\" ng-show=\"vm.isLoading === false\" >\n              <uif-list-item ng-repeat=\"todo in vm.todoCollection\" uif-item=\"todo\" ng-class=\"{'" + styles.done + "': todo.done}\">\n                <uif-list-item-primary-text>{{todo.title}}</uif-list-item-primary-text>\n                <uif-list-item-actions>\n                  <uif-list-item-action ng-click=\"vm.completeTodo(todo)\" ng-show=\"todo.done === false\">\n                    <i class=\"ms-Icon ms-Icon--CheckMark\" aria-hidden=\"true\"></i>\n                  </uif-list-item-action>\n                  <uif-list-item-action ng-click=\"vm.undoTodo(todo)\" ng-show=\"todo.done\">\n                    <i class=\"ms-Icon ms-Icon--RevToggleKey\" aria-hidden=\"true\"></i>\n                  </uif-list-item-action>\n                  <uif-list-item-action ng-click=\"vm.deleteTodo(todo)\">\n                    <i class=\"ms-Icon ms-Icon--Delete\" aria-hidden=\"true\"></i>\n                  </uif-list-item-action>\n                </uif-list-item-actions>\n              </uif-list-item>\n            </uif-list>\n          </div>\n        </div>";
            angular.bootstrap(this.domElement, ['todoapp']);
        }
    };
    Object.defineProperty(ToDoWebPart.prototype, "dataVersion", {
        get: function () {
            return Version.parse('1.0');
        },
        enumerable: true,
        configurable: true
    });
    ToDoWebPart.prototype.getPropertyPaneConfiguration = function () {
        return {
            pages: [
                {
                    header: {
                        description: strings.PropertyPaneDescription
                    },
                    groups: [
                        {
                            groupName: strings.BasicGroupName,
                            groupFields: [
                                PropertyPaneTextField('description', {
                                    label: strings.DescriptionFieldLabel
                                })
                            ]
                        }
                    ]
                }
            ]
        };
    };
    return ToDoWebPart;
}(BaseClientSideWebPart));
export default ToDoWebPart;
//# sourceMappingURL=ToDoWebPart.js.map