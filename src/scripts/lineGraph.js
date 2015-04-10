function LineGraph (c) {
    var data = c.data,
        length = data.length,
        firstIndex = 0,
        lastIndex = length - 1,
        firstXAxisValue = data[firstIndex][c.xAxisPropertyName],
        lastXAxisValue = data[lastIndex][c.xAxisPropertyName],
        firstYAxisValue = data[firstIndex][c.yAxisPropertyName],
        lastYAxisValue = data[lastIndex][c.yAxisPropertyName],
        scaleGenerators = getScaleGenerators(data),
        axisGenerators = getAxisGenerators(data, scaleGenerators),
        lineGenerator = getLineGenerator(scaleGenerators);

    function getAxisGenerators (_data, _scaleGenerators) {

    }

    function getScaleGenerators () {
        return {
            xScale: getScale(firstXAxisValue, lastXAxisValue, c.xAxisPropertyName),
            yScale: getScale(firstYAxisValue, lastYAxisValue, c.yAxisPropertyName)
        }

        function getScale (_valueFirst, _valueLast, _propertyName) {
            if (typeof _valueFirst === 'number') {
                return d3.scale.linear()
                    .range([c.width, 0])
                    .domain([
                        d3.min(_data, function (d) { return d[_propertyName] }),
                        d3.max(_data, function (d) { return d[_propertyName] })
                    ]);
            } else if (new Date(_valueFirst !== 'Invalid Date')) {
                return d3.time.scale()
                    .domain([_valueFirst, _valueLast])
                    .rangeRound([0, c.width]);
            } else {
                return undefined;
            }
        }
    }
}
