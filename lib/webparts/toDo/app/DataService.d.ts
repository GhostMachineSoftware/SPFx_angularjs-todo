import * as angular from 'angular';
export interface ITodo {
    id: number;
    title: string;
    done: boolean;
}
export interface IDataService {
    getTodos: () => angular.IPromise<ITodo[]>;
    addTodo: (todo: string) => angular.IPromise<{}>;
    deleteTodo: (todo: ITodo) => angular.IPromise<{}>;
    setTodoStatus: (todo: ITodo, done: boolean) => angular.IPromise<{}>;
}
export default class DataService implements IDataService {
    private $q;
    private $http;
    private sharepointApi;
    private todoListName;
    private hideFinishedTasks;
    static $inject: string[];
    constructor($q: angular.IQService, $http: angular.IHttpService, sharepointApi: string, todoListName: string, hideFinishedTasks: boolean);
    getTodos(): angular.IPromise<ITodo[]>;
    addTodo(todo: string): angular.IPromise<{}>;
    deleteTodo(todo: ITodo): angular.IPromise<{}>;
    setTodoStatus(todo: ITodo, done: boolean): angular.IPromise<{}>;
    private getRequestDigest;
    private getListItemEntityTypeFullName;
}
//# sourceMappingURL=DataService.d.ts.map