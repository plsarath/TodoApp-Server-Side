(function(angular){
  
  var todoApp = angular.module("TodoApp",[]);

/*  var urlMap ={
    ALL_TODOS:'/allTodos',


  }*/

  todoApp.constant("URL_MAP",{
    ALL_TODOS:'/allTodos',
    ADD_TODO :'/addTodo'

  })

  todoApp.controller("TodoController",['$scope','$rootScope','$http','URL_MAP',function($scope,$rootScope,$http,URL_MAP){
      var ctrl = this;

    /*  
    ctrl.todos = [
          
          {id:1,name:"Groceries",date:new Date('03-02-2017'),notes:"Go to Taj to pick groceries"},
          {id:2,name:"Gardening",date:new Date('03-03-2017'),notes:"Cut the grass"}
                    ];
    */
    
    $http.get(URL_MAP.ALL_TODOS).
        then(function(response){
            console.log(response);
            ctrl.todos = response.data;


        }).
        catch(function(er){
            console.log("There is an error...")
            console.error(er);

        });
     
   console.log("Called after allTodos");
    ctrl.newTodoName = '';
    ctrl.newTodoDate = '';
    ctrl.newTodoNotes = '';

    ctrl.addTodo = function(){
       var todo = {};
       todo.id = ctrl.todos[ctrl.todos.length - 1].id + 1;
       todo.name = ctrl.newTodoName;
       todo.date = ctrl.newTodoDate;
       todo.notes = ctrl.newTodoNotes;

     ///  ctrl.todos.push(todo);

        $http.post(URL_MAP.ADD_TODO,{newTodo:todo}).
            then(function(response){
                console.log(response);
                ctrl.todos = response.data;

            }).
            catch(function(error){
                console.log(error);
            })
      

    }
   
    ctrl.showTodo = function(todo){
         var result = {};
         result.selectedTodo = todo;
        $rootScope.$broadcast("TDC:selectedTodo",result);


    }
 }]);

 todoApp.controller("NotesController",['$scope',function($scope){
    var nCtrl = this;
    $scope.$on("TDC:selectedTodo",function(event,data){
        nCtrl.selectedTodo = data.selectedTodo;

    })


 }]);



})(angular);