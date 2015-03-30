function LineGraph (c) {
    this.axesGenerator;
    this.displayAxes;
    this.pathGenerator;
    this.displayPath;

    this.svg = d3
        .select('body')
        .append('svg')
        .attr('height', c.height)
        .attr('width', c.width)

    if (isConsistent(c.data)) {
        getRelevant(c.data);
    }

    function getRelevant(data) {
        return true;
    }

    function isConsistent (data) {
        var length = data.length,
            firstPropertyName = c.firstPropertyName,
            secondPropertyName = c.secondPropertyName,
            firstPropertyType,
            secondPropertyType,
            _availableProperties = availableProperties(c.data);
            firstIndex = 0;

        for (var i = firstIndex; i < length; i = i + 1) {
            if (typeof data[i] != 'object') {
                console.error('data is not formatted as an array with objects');
                return undefined;
            }

            if (firstIndex === i) {
                for (property in data[i]) {
                    if (containsProperty(firstPropertyName, data[i])) {
                        if (property === firstPropertyName) {
                            firstPropertyType = typeof data[i][property];
                        }
                    } else {
                        console.error('firstPropertyName not found:', firstPropertyName);
                        console.log('available properties:', _availableProperties);
                        return undefined;
                    }
                    if (containsProperty(secondPropertyName, data[i])) {
                        if (property === secondPropertyName) {
                            secondPropertyType = typeof data[i][property];
                        }
                    } else {
                        console.error('secondPropertyName not found:', secondPropertyName);
                        console.log('available properties:', _availableProperties);
                        return undefined;
                    }
                }
            } else if (firstIndex < i) {
                for (property in data[i]) {
                    if (property === firstPropertyName) {
                        if (firstPropertyType != typeof data[i][property]) {
                            console.error('mismatch data type for first property at index ' + i);
                            return undefined;
                        }
                    }
                    if (property === secondPropertyName) {
                        if (secondPropertyType != typeof data[i][property]) {
                            console.error('mismatch data type for second property at index ' + i);
                            return undefined;
                        }
                    }
                }
            }
        }

        function availableProperties (data) {
            var properties = [],
                firstIndex = 0;

            for (property in data[firstIndex]) {
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
}
