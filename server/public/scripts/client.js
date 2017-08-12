$(document).ready(function () {

  $('#addButton').on('click', function () {
    console.log('button\'s workin');
    var taskName = $('#taskIn').val();
    console.log(taskName);

    //Generating new task as an object
    var taskToSend = {
      task: taskName,
      done: 'N'
    };

    saveTask(taskToSend);
  }); //end addButton event listener

  $('#showTasks').on('click', '.deleteButton', function () {
    console.log('Delete button was clicked...');
    var messageId = $(this).parent().parent().data().id;
    console.log(messageId);

    $.ajax({
      method: 'DELETE',
      url: '/tasks/' + messageId,
      success: function (response) {
        console.log('response');
        getTasks();
      }
    })//end ajax DELETE
  });//end deleteButton event listener
});// end $(doc).ready

function saveTask(newTask) {
  console.log(newTask);
  $.ajax({
    url: '/tasks',
    type: 'POST',
    data: newTask,
    success: function (data) {
      console.log('tasks r here: ', data);
      getTasks();
    }//end success
  }); //end ajax POST
}//end saveTask

function getTasks() {
  $.ajax({
    url: '/tasks',
    type: 'GET',
    success: function (data) {
      console.log('tasks r here: ', data);
      showTasks(data);
    } // end success
  }); //end ajax GET
} // end getTasks

function showTasks(tasksArray) {
  $('#showTasks').empty();
  for (var i = 0; i < tasksArray.length; i++) {
    var tasks = tasksArray[i];

    var taskDisplay = $('<tr></tr>');
    taskDisplay.data('id', tasks.id);
    $('#showTasks').append(taskDisplay);

    var taskName = $('<td>' + tasks.task + '<button class="completeButton">Complete</button>' + '<button class="deleteButton">Delete</button></td>');

    $(taskDisplay).append(taskName);
  }//end for loop
};// end showTasks 