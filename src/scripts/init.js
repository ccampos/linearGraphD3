(function () {
    configuration = {
        height: 200,
        width: 575,
        data: getSampleData('stocks'),
        firstPropertyName: 'Date',
        secondPropertyName: 'Close',
        sortBy: 'Date'
    }

    document.addEventListener('DOMContentLoaded', function() {
        var lineGraph = new LineGraph(configuration);
    });
})();
