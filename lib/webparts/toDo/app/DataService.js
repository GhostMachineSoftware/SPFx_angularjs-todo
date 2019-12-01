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
export default DataService;
//# sourceMappingURL=DataService.js.map