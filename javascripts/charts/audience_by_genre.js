Borkpaedia.charts.push(function(data) {
  var showingsByGenre = _.chain(data).countBy(function(showing) {
    return showing.genre;
  }).pairs();

  var topGenres = showingsByGenre.sortBy(function(pair) {
    return pair[1] * -1;
  }).first(4).map(function(pair) {
    return pair[0];
  }).value();

  var audienceByGenre = {};

  _(data).each(function(showing) {
    _(showing.audience).each(function(name) {
      if (name.length > 0) {
        audienceByGenre[name] = audienceByGenre[name] || {};
        audienceByGenre[name][showing.genre] = audienceByGenre[name][showing.genre] || 0;
        audienceByGenre[name][showing.genre] += 1;
      }
    });
  });

  var headers = ['Name'].concat(topGenres).concat('Other');
  var indexOfOther = headers.indexOf('Other');
  var rows = [];

  _(audienceByGenre).each(function(counts, name) {
    var row = [name];

    _(counts).each(function(count, genre) {
      var index;

      if (_(topGenres).contains(genre)) {
        index = headers.indexOf(genre);
      } else {
        index = indexOfOther;
      }

      row[index] = count;
    });

    _(topGenres).each(function(genre) {
      index = headers.indexOf(genre);
      row[index] = row[index] || 0;
    });

    row[indexOfOther] = row[indexOfOther] || 0;

    rows.push(row);
  });

  rows = _(rows).sortBy(function(row) {
    return _(row).reduce(function(cell, total) {
      if (typeof(cell) == 'number') {
        total += cell;
      }

      return total;
    }, 0) * -1;
  });

  rows = [headers].concat(rows);

  var table = google.visualization.arrayToDataTable(rows);

  var options = _.defaults({
    title: 'Audience by Genre',
    isStacked: true,
    hAxis: _.defaults({ title: 'Showings' }, Borkpaedia.defaults.hAxis)
  }, Borkpaedia.defaults);

  var chart = new google.visualization.BarChart(document.getElementById('audience-by-genre'));
  chart.draw(table, options);
});
