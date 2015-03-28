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
}
