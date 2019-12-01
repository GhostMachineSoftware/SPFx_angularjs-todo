import * as angular from 'angular';
import { IDataService, ITodo } from './DataService';
export default class HomeController {
    private dataService;
    private $window;
    isLoading: boolean;
    newItem: string;
    todoCollection: ITodo[];
    static $inject: string[];
    constructor(dataService: IDataService, $window: angular.IWindowService);
    private loadTodos;
    todoKeyDown($event: KeyboardEvent): void;
    deleteTodo(todo: ITodo): void;
    completeTodo(todo: ITodo): void;
    undoTodo(todo: ITodo): void;
}
//# sourceMappingURL=HomeController.d.ts.map