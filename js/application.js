// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear in whatever order it 
// gets included (e.g. say you have require_tree . then the code will appear after all the directories 
// but before any files alphabetically greater than 'application.js' 
//
// The available directives right now are require, require_directory, and require_tree
//
//= require jquery-2.1.1.min.js
//= require jquery_ujs.js
//= require moment.js
//= require bootstrap.min.js
//= require bootstrap-datetimepicker.js
//= require_self

$(function() {
  $('.datetimepicker').datetimepicker();

  $('.datepicker').datetimepicker({
    pickTime: false,
    dateFormat: 'YYYY-MM-DD'
  });

  var $activityEl = $('#activity_id');
  if($activityEl) {
    var $metricEl = $('#metric_id');

    $activityEl.on('change', function(e) {
      e.preventDefault();

      var activityId = $activityEl.val();

      $.get('/activity_metrics/' + activityId).then(function(data) {
        var options = [];

        var blankOption = data[''];
        delete data[''];

        options.push("<option value=''>" + blankOption + "</option>");

        $.each(data, function(id, name) {
          options.push("<option value='" + id + "'>" + name + "</option>");
        });

        $metricEl.html(options);
      });
    });
  }
});