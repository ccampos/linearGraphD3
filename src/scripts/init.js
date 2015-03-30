(function () {
    configuration = {
        height: 175,
        width: 575,
        data: getSampleData('stocks'),
        firstPropertyName: 'Date',
        secondPropertyName: 'Close'
    }

    var lineGraph = new LineGraph(configuration);
})();
