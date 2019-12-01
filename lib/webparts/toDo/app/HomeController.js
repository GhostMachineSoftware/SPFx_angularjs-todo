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
export default HomeController;
//# sourceMappingURL=HomeController.js.map