jQuery(function ($) {
    let todos = [];
    let list = $('.todos');
    let input = $('.todo-input');

    //--------add list to localStorage-----------

    function localIn() {
        localStorage.clear();
        localStorage.setItem("myKey", JSON.stringify(todos));
    }

    //-----load list after reload------------

    $(window).on('load', function () {
        if (localStorage.length >0) {
            todos = JSON.parse(localStorage.getItem("myKey"));
            renderTodos();
        }
    });

    //------add event---------------

    function addTodo (value) {
        todos.push(value);
        localIn();
        renderTodos();
    }

    input.on('change', function () {
        addTodo(this.value);
        this.value = '';
    });

    function renderTodos () {
        list.empty();
        $.each(todos, function (i) {
            list.append(`
                <li>
                    ${this}
                    
                </li>
                <input id="done" type="checkbox">
                <button id="edit" data-index = "${i}">edit</button>
                <button id="delete" data-index = "${i}">delete</button>
            `);
        });
    }


    $(document).on('click', '#loadMore', function() {
        $.ajax({
            url: "https://jsonplaceholder.typicode.com/todos",
            success: function(data){
                let listIn = data.slice(0, 10);
                // listIn = JSON.parse(listIn);
                todos.push(listIn);
                renderTodos();
            }
        });
        });


    //-------------for delete event---------------

    $(document).on('click', '#delete', function () {
        let index = $(this).data('index');
        removeTodo(index);
    });

    function removeTodo (index) {
        todos.splice(index, 1);
        localIn();
        renderTodos();
    }

    //--------------for edit event-----------------

    $(document).on('click', '#edit', function(){
        $(this).prev().prev().attr('contenteditable','true');
        $(this).prev().prev().focus();
        $(this).html('Save');
    });

    //--------------for clear list-----------------

    $(document).on('click', '#clear', function(){
        list.empty();
        todos.splice(0, todos.length);
        localIn();
    });


    //--------------when event is done------------

    $(document).on('change', '#done', function (i) {
        if ($(this).is(':checked')) {
            $(this).prev().css('textDecoration', 'line-through');
        } else {
            $(this).prev().css('textDecoration', 'none');
        }
    });


    // -----------load more with ajax----------




});