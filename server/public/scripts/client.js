$(document).ready(function () {

    //Add task button click
    $('#addButton').on('click', function () {
        console.log('button\'s workin');
        // get user task from input box
        var taskName = $('#taskIn').val();
        console.log(taskName);
        
        var taskToSend = {
            task: taskName,
            done: 'N'
        };
        
        // call saveTask with the new obejct
        saveTask(taskToSend);
    }); //end addButton event listener
});// end $(doc).ready

function saveTask(newTask) {
    // ajax call to server to get newTask
    console.log(newTask);
    
    $.ajax({
      url: '/tasks',
      type: 'POST',
      data: newTask,
      success: function (data) {
        console.log('tasks r here: ', data);
        getTasks();
      }//end success
    }); //end ajax
  }

  function getTasks() {
    // ajax call to server to get tasks
    $.ajax({
      url: '/tasks',
      type: 'GET',
      success: function (data) {
        console.log('tasks r here: ', data);
        showTasks(data);
      } // end success
    }); //end ajax
    
  } // end getTasks

  function showTasks(tasksArray) {
    //$('#showTasks').empty();
    for (var i = 0; i < tasksArray.length; i++) {
      var tasks = tasksArray[i];
  
      var taskDisplay = $('<tr></tr>');
      taskDisplay.data('id', tasks.id);
      $('#showTasks').append(taskDisplay);
  
      var taskName = $('<td>' + tasks.task + '</td>');

      $(taskDisplay).append(taskName);
    }//end of for loop
  };// end showTasks function 