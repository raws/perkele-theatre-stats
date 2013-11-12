Borkpaedia.charts.push(function(data) {
  var showingsByYear = _.pairs(_.countBy(data, function(showing) {
    return showing.watchedOn.getFullYear();
  }));

  var table = new google.visualization.DataTable();
  table.addColumn('string', 'Year');
  table.addColumn('number', 'Showings');
  table.addRows(showingsByYear);

  var options = _.defaults({
    title: 'Showings by Year',
    legend: 'none',
    pointSize: 7
  }, Borkpaedia.defaults);

  var chart = new google.visualization.LineChart(document.getElementById('showings-by-year'));
  chart.draw(table, options);
});
