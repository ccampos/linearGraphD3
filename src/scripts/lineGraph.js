function LineGraph (c) {
    var svg,
        data = c.data,
        length = data.length,
        firstIndex = 0,
        lastIndex = length - 1,
        firstXAxisValue = data[firstIndex][c.xAxisPropertyName],
        lastXAxisValue = data[lastIndex][c.xAxisPropertyName],
        firstYAxisValue = data[firstIndex][c.yAxisPropertyName],
        lastYAxisValue = data[lastIndex][c.yAxisPropertyName],
        scaleGenerators,
        axisGenerators,
        tickFormat = '%b %y',
        lineGenerator,
        interpolateType = 'linear';
    
    function initialize () {
        svg = displaySvg();
        displayAxes(svg);
    }

    function getGenerators () {
        scaleGenerators = getScaleGenerators();
        axisGenerators = getAxisGenerators();
        lineGenerator = getLineGenerator();
    }

    function displayAxes (_svg) {
        appendAxis('x axis', axisGenerators.x, 0, c.height);
        appendAxis('y axis', axisGenerators.y);

        function appendAxis (_class, _axisGenerator, _xTranslate, _yTranslate) {
            var axis = _svg
                .append('svg:g')
                .attr('class', _class)
                .call(_axisGenerator),
                xType = typeof _xTranslate,
                yType = typeof _yTranslate;

            if (xType === 'number' && yType === 'number') {
                axis
                    .attr('transform', 'translate(' + xTranslate + ',' + yTranslate + ')')
            }
        }
    }

    function displaySvg () {
        return d3
            .select('body')
            .append('svg')
            .attr('height', c.height)
            .attr('width', c.width)
    }

    function getLineGenerator () {
        return d3.svg.line()
            .x( function (d) {
                return scaleGenerators.x(d[c.xAxisPropertyName]);
            })
            .y( function (d) {
                return scaleGenerators.y(d[c.yAxisPropertyName]);
            })
            .interpolate(interpolateType);
    }

    function getAxisGenerators () {
        return {
            x: addDateFormat(getAxisGenerator(scaleGenerators.x), firstXAxisValue),
            y: addDateFormat(getAxisGenerator(scaleGenerators.y), firstYAxisValue)
        }

        function addDateFormat (_axisGenerator, _axisValue) {
            if (typeof _axisValue === 'number') {
                return _axisGenerator;
            } else if (new Date(_axisValue) !== 'Invalid Date') {
                return _axisGenerator
                    .tickFormat(d3.time.format(tickFormat));
            } else {
                return _axisGenerator;
            }
        }

        function getAxisGenerator (_scaleGenerator) {
            return d3.svg.axis()
                .scale(_scaleGenerator)
        }
    }

    function getScaleGenerators () {
        return {
            x: getScaleGenerator(firstXAxisValue, lastXAxisValue, c.xAxisPropertyName),
            y: getScaleGenerator(firstYAxisValue, lastYAxisValue, c.yAxisPropertyName)
        }

        function getScaleGenerator (_valueFirst, _valueLast, _propertyName) {
            if (typeof _valueFirst === 'number') {
                return d3.scale.linear()
                    .range([c.width, 0])
                    .domain([
                        d3.min(data, function (d) { return d[_propertyName] }),
                        d3.max(data, function (d) { return d[_propertyName] })
                    ]);
            } else if (new Date(_valueFirst) !== 'Invalid Date') {
                return d3.time.scale()
                    .domain([_valueFirst, _valueLast])
                    .rangeRound([0, c.width]);
            } else {
                return undefined;
            }
        }
    }
}
