(function () {
    configuration = {
        height: 200,
        width: 575,
        data: getSampleData('teamSoccerGames'),
        xAxisPropertyName: 'Date',
        yAxisPropertyName: 'Fouls',
        sortBy: 'Date'
    }

    document.addEventListener('DOMContentLoaded', function() {
        var lineGraph = new LineGraph(configuration);
    });
})();
