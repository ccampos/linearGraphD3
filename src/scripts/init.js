(function () {
    configuration = {
        height: 200,
        width: 575,
        data: getSampleData('teamSoccerGames'),
        firstPropertyName: 'Date',
        secondPropertyName: 'Fouls',
        sortBy: 'Date'
    }

    document.addEventListener('DOMContentLoaded', function() {
        var lineGraph = new LineGraph(configuration);
    });
})();
