$(document).ready(function () {

  //Grab current tasks from DB
  getTasks();

  $('#addButton').on('click', function () {
    var taskName = $('#taskIn').val();
    //Generating new task as an object
    var taskToSend = {
      task: taskName,
      done: 'N'
    };
    saveTask(taskToSend);
  }); //end addButton event listener

  $('#showTasks').on('click', '.completeButton', function () {
    var taskId = $(this).parent().parent().data().id;
    $.ajax({
      method: 'PUT',
      url: '/tasks/' + taskId,
      success: function (response) {
        getTasks();
      }
    })//end ajax PUT
  });//end completeButton event listener

  $('#showTasks').on('click', '.deleteButton', function () {
    var taskId = $(this).parent().parent().data().id;
    $.ajax({
      method: 'DELETE',
      url: '/tasks/' + taskId,
      success: function (response) {
        getTasks();
      }
    })//end ajax DELETE
  });//end deleteButton event listener
});// end $(doc).ready

function saveTask(newTask) {
  $.ajax({
    url: '/tasks',
    type: 'POST',
    data: newTask,
    success: function (data) {
      getTasks();
    }
  }); //end ajax POST
}//end saveTask()

function getTasks() {
  $.ajax({
    url: '/tasks',
    type: 'GET',
    success: function (data) {
      showTasks(data);
    }
  }); //end ajax GET
} // end getTasks()

function showTasks(tasksArray) {
  $('#showTasks').empty();
  for (var i = 0; i < tasksArray.length; i++) {
    var tasks = tasksArray[i];
    var taskDisplay = $('<tr></tr>');
    if (tasks.done == "Y") {
      var taskName = $('<td class="completedTask">' + tasks.task + '<button class="deleteButton">Delete</button></td>');
    } else {
      taskName = $('<td class="task">' + tasks.task + '<button class="completeButton">Complete</button>' + '<button class="deleteButton">Delete</button></td>');
    }
    taskDisplay.data('id', tasks.id);
    $('#showTasks').append(taskDisplay);
    $(taskDisplay).append(taskName);
  }//end for loop
};// end showTasks() 