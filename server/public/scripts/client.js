$(document).ready(function () {

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
    console.log('Complete button was clicked...');
    var taskId = $(this).parent().parent().data().id;
    var taskDone = $(this).parent().parent().data().done;
    $.ajax({
      method: 'PUT',
      url: '/tasks/' + taskId,
      success: function (response) { 
        getTasks();
      }
    })//end ajax PUT
    if (taskDone == 'Y') {
      $('this td').css('background-color', 'black');
    }
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
    taskDisplay.data('id', tasks.id);
    taskDisplay.data('done', tasks.done);
    $('#showTasks').append(taskDisplay);
    var taskName = $('<td class="task">' + tasks.task + '<button class="completeButton">Complete</button>' + '<button class="deleteButton">Delete</button></td>');
    $(taskDisplay).append(taskName);
  }//end for loop
};// end showTasks() 