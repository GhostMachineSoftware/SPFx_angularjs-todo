export interface ITodo {
    id: number;
    title: string;
    done: boolean;
}
export interface IDataService {
    getTodos(hideFinishedTasks: boolean): angular.IPromise<ITodo[]>;
    addTodo(todo: string): angular.IPromise<{}>;
    deleteTodo(todo: ITodo): angular.IPromise<{}>;
    setTodoStatus(todo: ITodo, done: boolean): angular.IPromise<{}>;
}
export default class DataService implements IDataService {
    private $q;
    static $inject: string[];
    private items;
    private nextId;
    constructor($q: angular.IQService);
    getTodos(hideFinishedTasks: boolean): angular.IPromise<ITodo[]>;
    addTodo(todo: string): angular.IPromise<{}>;
    deleteTodo(todo: ITodo): angular.IPromise<{}>;
    setTodoStatus(todo: ITodo, done: boolean): angular.IPromise<{}>;
}
//# sourceMappingURL=data.service.d.ts.map