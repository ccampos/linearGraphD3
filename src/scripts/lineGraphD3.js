function LineGraph (c) {
    var svg,
        firstPropertyName = c.firstPropertyName,
        secondPropertyName = c.secondPropertyName,
        data,
        firstIndex = 0;

    this.axesGenerator;
    this.displayAxes;
    this.pathGenerator;
    this.displayPath;

    svg = createSvg();

    if (isConsistent(c.data)) {
        data = getRelevant(c.data);
        data = transformData(data);
        data = sortData(data, c.sortBy);
    } else {
        console.log('data is not consistent');
        return undefined;
    }

    function axesGenerator () {
        function scalesGenerator () {
        }
    }

    function sortData (_data, propertyName) {
        if (propertyName) {
            return _.sortBy(_data, propertyName);
        }
    }

    function transformData (_data) {
        var length = _data.length,
            newDate1,
            newDate2,
            numberStringRegEx = /\d*\.?\d*/,
            currentValue;

        for (var i = firstIndex; i < length; i = i + 1) {
            newDate1 = null;
            newDate2 = null;
            currentValue1 = _data[i][firstPropertyName];
            currentValue2 = _data[i][secondPropertyName];

            if (newDate1 = isDate(currentValue1)) {
                _data[i][firstPropertyName + 'MomentObject'] = newDate1;
            } else if (typeof currentValue1 === 'string') {
                if (currentValue1.match(numberStringRegEx)) {
                    _data[i][firstPropertyName] = parseFloat(currentValue1);
                }
            }
            if (newDate2 = isDate(currentValue2)) {
                _data[i][secondPropertyName + 'Object'] = newDate2;
            } else if (typeof currentValue2 === 'string') {
                if (currentValue2.match(numberStringRegEx)) {
                    _data[i][secondPropertyName] = parseFloat(currentValue2);
                }
            }
        }

        return _data;
    }

    function isDate (string) {
        var newDate = moment(string);

        if (newDate._d != 'Invalid Date') {
            return newDate;
        }
    }

    function getRelevant( _data ) {
        var relevantData = [],
            currentObject,
            length = _data.length;

        for (var i = firstIndex; i < length; i = i + 1) {
            currentObject = {};
            for (property in _data[i]) {
                if (property === firstPropertyName) {
                    currentObject[property] = _data[i][property];
                }
                if (property === secondPropertyName) {
                    currentObject[property] = _data[i][property];
                }
            }
            relevantData.push(currentObject);
        }

        return relevantData;
    }

    function isConsistent (_data) {
        var length = _data.length,
            firstPropertyType,
            secondPropertyType,
            _availableProperties = availableProperties(c.data);
            lastIndex = length - 1;

        for (var i = firstIndex; i < length; i = i + 1) {
            if (typeof _data[i] != 'object') {
                console.error('data is not formatted as an array with objects');
                return undefined;
            }

            if (firstIndex === i) {
                for (property in _data[i]) {
                    if (containsProperty(firstPropertyName, _data[i])) {
                        if (property === firstPropertyName) {
                            firstPropertyType = typeof _data[i][property];
                        }
                    } else {
                        console.error('firstPropertyName not found:', firstPropertyName);
                        console.log('available properties:', _availableProperties);
                        return undefined;
                    }
                    if (containsProperty(secondPropertyName, _data[i])) {
                        if (property === secondPropertyName) {
                            secondPropertyType = typeof _data[i][property];
                        }
                    } else {
                        console.error('secondPropertyName not found:', secondPropertyName);
                        console.log('available properties:', _availableProperties);
                        return undefined;
                    }
                }
            } else if (firstIndex < i) {
                for (property in _data[i]) {
                    if (property === firstPropertyName) {
                        if (firstPropertyType != typeof _data[i][property]) {
                            console.error('mismatch data type for first property at index ' + i);
                            return undefined;
                        }
                    }
                    if (property === secondPropertyName) {
                        if (secondPropertyType != typeof _data[i][property]) {
                            console.error('mismatch data type for second property at index ' + i);
                            return undefined;
                        }
                    }
                }

                if (lastIndex === i) {
                    return true;
                }
            }
        }

        function availableProperties (_data) {
            var properties = [];

            for (property in _data[firstIndex]) {
                    properties.push(property);
            }

            return properties;
        }

        function containsProperty (_property, _object) {
            for (objectProperty in _object) {
                if (_property === objectProperty) {
                    return true;
                }
            }
            return false;
        }
    }

    function createSvg () {
        return svg = d3
        .select('body')
        .append('svg')
        .attr('height', c.height)
        .attr('width', c.width);
    }
}
