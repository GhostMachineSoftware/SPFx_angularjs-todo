var DataService = /** @class */ (function () {
    function DataService($q) {
        this.$q = $q;
        this.items = [
            {
                id: 1,
                title: 'Prepare demo Web Part',
                done: true
            },
            {
                id: 2,
                title: 'Show demo',
                done: false
            },
            {
                id: 3,
                title: 'Share code',
                done: false
            }
        ];
        this.nextId = 4;
    }
    DataService.prototype.getTodos = function (hideFinishedTasks) {
        var deferred = this.$q.defer();
        var todos = [];
        for (var i = 0; i < this.items.length; i++) {
            if (hideFinishedTasks && this.items[i].done) {
                continue;
            }
            todos.push(this.items[i]);
        }
        deferred.resolve(todos);
        return deferred.promise;
    };
    DataService.prototype.addTodo = function (todo) {
        var deferred = this.$q.defer();
        this.items.push({
            id: this.nextId++,
            title: todo,
            done: false
        });
        deferred.resolve();
        return deferred.promise;
    };
    DataService.prototype.deleteTodo = function (todo) {
        var deferred = this.$q.defer();
        var pos = -1;
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].id === todo.id) {
                pos = i;
                break;
            }
        }
        if (pos > -1) {
            this.items.splice(pos, 1);
            deferred.resolve();
        }
        else {
            deferred.reject();
        }
        return deferred.promise;
    };
    DataService.prototype.setTodoStatus = function (todo, done) {
        var deferred = this.$q.defer();
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].id === todo.id) {
                this.items[i].done = done;
            }
        }
        deferred.resolve();
        return deferred.promise;
    };
    DataService.$inject = ['$q'];
    return DataService;
}());
export default DataService;
//# sourceMappingURL=data.service.js.map