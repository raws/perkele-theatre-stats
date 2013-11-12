Borkpaedia.charts.push(function(data) {
  var showingsByGenre = _.chain(data).countBy(function(showing) {
    return showing.genre;
  }).pairs();

  var topGenres = showingsByGenre.sortBy(function(pair) {
    return pair[1] * -1;
  }).first(4).map(function(pair) {
    return pair[0];
  }).value();

  var simplifiedShowingsByGenre = showingsByGenre.reduce(function(memo, pair) {
    var genre = pair[0], count = pair[1];

    if (_(topGenres).contains(genre)) {
      memo[genre] = memo[genre] || 0;
      memo[genre] += count;
    } else {
      memo['Other'] = memo['Other'] || 0;
      memo['Other'] += count;
    }

    return memo;
  }, {}).pairs().sortBy(function(pair) {
    return pair[1] * -1;
  }).value();

  var table = new google.visualization.DataTable();
  table.addColumn('string', 'Genre');
  table.addColumn('number', 'Showings');
  table.addRows(simplifiedShowingsByGenre);

  var options = _.defaults({
    title: 'Showings by Genre'
  }, Borkpaedia.defaults);

  var chart = new google.visualization.PieChart(document.getElementById('showings-by-genre'));
  chart.draw(table, options);
});
