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