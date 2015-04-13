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
        interpolateType = 'linear',
        yAxisOrientation = 'left',
        pathClass = 'path';

    initialize();

    function initialize () {
        getGenerators();
        svg = displaySvg();
        displayAxes();
        displayLine();
    }

    function getGenerators () {
        scaleGenerators = getScaleGenerators();
        axisGenerators = getAxisGenerators();
        axisGenerators.y
            .orient(yAxisOrientation);
        lineGenerator = getLineGenerator();
    }

    function displayLine () {
        svg
            .append('svg:path')
            .attr({
                d: lineGenerator(data),
                'class': pathClass
            });
    }

    function displayAxes () {
        appendAxis('x axis', axisGenerators.x, 0, c.height);
        appendAxis('y axis', axisGenerators.y);

        function appendAxis (_class, _axisGenerator, _xTranslate, _yTranslate) {
            var axis = svg
                .append('svg:g')
                .attr('class', _class)
                .call(_axisGenerator),
                xType = typeof _xTranslate,
                yType = typeof _yTranslate;

            if (xType === 'number' && yType === 'number') {
                axis
                    .attr('transform', 'translate(' + _xTranslate + ',' + _yTranslate + ')')
            }
        }
    }

    function displaySvg () {
        return d3
            .select('body')
            .append('svg')
            .attr('height', c.height)
            .attr('width', c.width);
    }

    function getLineGenerator () {
        if (typeof scaleGenerators.x.domain()[0] === 'number' && typeof scaleGenerators.y.domain()[0] === 'number') {
            return d3.svg.line()
                .x( function (d) {
                    return scaleGenerators.x(d[c.xAxisPropertyName]);
                })
                .y( function (d) {
                    return scaleGenerators.y(d[c.yAxisPropertyName]);
                })
                .interpolate(interpolateType);
        } else if (new Date(scaleGenerators.x.domain()[0]) !== 'Invalid Date' && new Date(scaleGenerators.y.domain()[0]) !== 'Invalid Date') {
            return d3.svg.line()
                .x( function (d) {
                    return scaleGenerators.x(new Date(d[c.xAxisPropertyName]));
                })
                .y( function (d) {
                    return scaleGenerators.y(new Date(d[c.yAxisPropertyName]));
                })
                .interpolate(interpolateType);
        } else if (new Date(scaleGenerators.x.domain()[0]) !== 'Invalid Date') {
            return d3.svg.line()
                .x( function (d) {
                    return scaleGenerators.x(new Date(d[c.xAxisPropertyName]));
                })
                .y( function (d) {
                    return scaleGenerators.y(d[c.yAxisPropertyName]);
                })
                .interpolate(interpolateType);
        } else if (new Date(scaleGenerators.y.domain()[0]) !== 'Invalid Date') {
            return d3.svg.line()
                .x( function (d) {
                    return scaleGenerators.x(d[c.xAxisPropertyName]);
                })
                .y( function (d) {
                    return scaleGenerators.y(new Date(d[c.yAxisPropertyName]));
                })
        }
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
            x: getScaleGenerator(firstXAxisValue, lastXAxisValue, c.xAxisPropertyName, 'x'),
            y: getScaleGenerator(firstYAxisValue, lastYAxisValue, c.yAxisPropertyName, 'y')
        }

        function getScaleGenerator (_valueFirst, _valueLast, _propertyName, axisName) {
            var dimension;
            if (axisName === 'x') {
                dimension = c.width;
            } else if (axisName === 'y') {
                dimension = c.height;
            } else {
                return undefined;
            }

            if (typeof _valueFirst === 'number') {
                return d3.scale.linear()
                    .range([dimension, 0])
                    .domain([
                        d3.min(data, function (d) { return d[_propertyName] }),
                        d3.max(data, function (d) { return d[_propertyName] })
                    ]);
            } else if (new Date(_valueFirst) !== 'Invalid Date') {
                return d3.time.scale()
                    .domain([new Date(_valueFirst), new Date(_valueLast)])
                    .rangeRound([0, dimension]);
            } else {
                return undefined;
            }
        }
    }
}
