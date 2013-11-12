window.Borkpaedia = {
  url: (function() {
    if (location.hostname.search('borkpaedia.com') > -1) {
      return '/api.php?format=json&action=parse&page=Perkele_Theatre&section=1';
    } else {
      return 'data.json';
    }
  })(),

  charts: [],

  defaults: {
    hAxis: {
      textStyle: {
        fontSize: 12
      },

      titleTextStyle: {
        fontSize: 12
      }
    },

    legend: {
      textStyle: {
        fontSize: 12
      }
    },

    titleTextStyle: {
      fontSize: 14
    },

    vAxis: {
      textStyle: {
        fontSize: 12
      },

      titleTextStyle: {
        fontSize: 12
      }
    }
  },

  done: function(data) {
    var html = '<div>' + data.parse.text['*'] + '</div>';
    var rows = $('table.wikitable > tbody > tr', html).has('td');
    var parsed = $.map(rows, function(row) {
      return Borkpaedia.parseRow(row);
    });

    Borkpaedia.draw(parsed);
  },

  draw: function(data) {
    _(Borkpaedia.charts).each(function(draw) {
      draw(data);
    });
  },

  fail: function(xhr, status, error) {
    console.log('Could not load chart data from ' + Borkpaedia.url + ': ' + error);
  },

  parseRow: function(row) {
    var cells = $('td', row);
    var id = parseInt($(cells[0]).text());
    var watchedOn = new Date(Date.parse($(cells[1]).text().trim()));
    var title = $(cells[2]).text().trim();
    var releaseYear = parseInt($(cells[3]).text());
    var genre = $(cells[4]).text().trim();
    var audience = $(cells[5]).text().trim().split(/\s*,\s*/);

    var parsed = {
      audience: audience,
      genre: genre,
      id: id,
      releaseYear: releaseYear,
      title: title,
      watchedOn: watchedOn
    };

    return parsed;
  }
};
