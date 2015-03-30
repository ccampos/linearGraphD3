// getSampleData parameter options
// 'stocks'
// 'baseballPlayers'
// 'soccerPlayers'
// adjust PropertyNames accordingly
(function () {
    configuration = {
        height: 175,
        width: 575,
        data: getSampleData('stocks'),
        firstPropertyName: 'close',
        secondPropertyName: 'marketCap'
    }

    var lineGraph = new LineGraph(configuration);
})();
