import * as angular from 'angular';
import HomeController from './HomeController';
import DataService from './DataService';
var todoapp = angular.module('todoapp', []);
todoapp
    .controller('HomeController', HomeController)
    .service('DataService', DataService);
//# sourceMappingURL=app-module.js.map