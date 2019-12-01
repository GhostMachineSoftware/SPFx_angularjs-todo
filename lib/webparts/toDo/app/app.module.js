import * as angular from 'angular';
import config from './app.config';
import HomeController from './HomeController';
import DataService from './DataService';
import 'ng-office-ui-fabric';
var todoapp = angular.module('todoapp', [
    'officeuifabric.core',
    'officeuifabric.components'
]);
config();
todoapp
    .controller('HomeController', HomeController)
    .service('DataService', DataService);
//# sourceMappingURL=app.module.js.map