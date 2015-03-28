(function () {
    configuration = {
        height: 175,
        width: 575,
        firstPropertyName: 'age',
        secondPropertyName: 'nextBirthday',
        data: [
            {
                age: 22,
                nextBirthday: '2015-12-01',
                marketCap: 124000
            },
            {
                age: 26,
                nextBirthday: '2015-06-14',
                marketCap: 'na'
            },
            {
                age: 26,
                nextBirthday: '2015-06-14',
                marketCap: 'na'
            }
        ]
    }

    var lineGraph = new LineGraph(configuration);
})();
