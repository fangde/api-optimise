//"use strict"
whModule.directive('timeline', function() {
    function display($scope, element) {

        //d3.selectAll("svg").remove();
        //d3.selectAll("svg").remove();
         d3.select(element[0]).selectAll("svg").remove();
        //console.log("displaying");

        var data = $scope.randomData
            , lanes = data.lanes
            , items = data.items
            , now = new Date();

        //console.log(lanes);
        //console.log(items);
        //console.log(angular.element("#timelineContent").width());

        //console.log(window);
        var w = window,
            d = document,
            e = d.documentElement,
            g = d3.select(element[0]),
            //windowX = w.innerWidth || e.clientWidth || g.clientWidth,
            //windowY = w.innerHeight|| e.clientHeight|| g.clientHeight;

            windowX = angular.element("#timelineContent").width(),
            windowY = w.innerHeight|| e.clientHeight|| g.clientHeight;
        var margin = {top: 25, right: 20, bottom: 10, left: 140}
            //, width = (0.78*windowX) - margin.left - margin.right
            //, height = (0.80*windowY) - margin.top - margin.bottom
            , width = windowX
            , height = (0.8*windowY) - margin.top - margin.bottom
            , miniHeight = lanes.length * 12 + 50
            , mainHeight = height - miniHeight - 50;

        var chart = d3.select(element[0]).append("svg:svg")
            .attr('width', windowX)
            .attr('height', height)
            .attr('class', 'chart');


        var x = d3.time.scale()
            .domain([d3.time.week(d3.min(items, function(d) { return d.start; })),
                d3.max(items, function(d) { return d.end; })])
            .range([0, width]);
        var x1 = d3.time.scale().range([0, width]);
        var x2 = d3.time.scale()
            .domain([d3.time.week(d3.min(items, function(d) { return d.start; })),
                d3.max(items, function(d) { return d.end; })])
            .range([0, width]);

        var ext = d3.extent(lanes, function(d) { return d.id; });
        var y1 = d3.scale.linear().domain([ext[0], ext[1] + 1]).range([0, mainHeight]);
        var y2 = d3.scale.linear().domain([ext[0], ext[1] + 1]).range([0, miniHeight]);

        chart.append('defs').append('clipPath')
            .attr('id', 'clip')
            .append('rect')
            .attr('width', width)
            .attr('height', mainHeight);

        var main = chart.append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
            .attr('width', width)
            .attr('height', mainHeight)
            .attr('class', 'main');

        var mini = chart.append('g')
            .attr('transform', 'translate(' + margin.left + ',' + (mainHeight + 60) + ')')
            .attr('width', width)
            .attr('height', miniHeight)
            .attr('class', 'mini');

        // draw the lanes for the main chart
        main.append('g').selectAll('.laneLines')
            .data(lanes)
            .enter().append('line')
            .attr('x1', 0)
            .attr('y1', function(d) { return d3.round(y1(d.id)) + 0.5; })
            .attr('x2', width)
            .attr('y2', function(d) { return d3.round(y1(d.id)) + 0.5; })
            .attr('stroke', function(d) { return d.label == '' ? 'red' : 'lightgray' });

        main.append('g').selectAll('.laneLegends')
            .data(lanes)
            .enter().append('rect')
            .attr('x', -130 )
            .attr('y', function(d) { return y1(d.id +.5); })
            .attr('width',10)
            .attr('height',10)
            .attr('fill', function(d) {
                switch (d.label){
                    case 'Treatments':
                        return 'green';
                    case 'Relapses':
                        return 'blue';
                    case 'Tests':
                        return 'red';
                    case 'PROMs':
                        return 'yellow';
                    default:
                        return 'grey';
                }
            })
            .attr('class', 'laneLegend');


        /*
        main.append('g').selectAll('.promsYAxis')
            .data(lanesWithYAxis)
            .enter().append('rect')
            .attr('x', 0)
            .attr('y', function(d) { return y1(d.id +.5); })
            .attr('width',10)
            .attr('height',10)
            .attr('class', function(d) {
                //return 'promsXAxis' in d ? (d.label=='PROMs'): null;
                if (d.label=='PROMs')
                    return 'promsYAxis';
                else
                    return null;
            });
        */

        main.append('g').selectAll('.laneText')
            .data(lanes)
            .enter().append('text')
            .text(function(d) { return d.label; })
            .attr('x', -110)
            .attr('y', function(d) { return y1(d.id + .5); })
            .attr('dy', '1.5ex')
            .attr('text-anchor', 'start')
            .style('font-weight', function (d){
                /*
                if ((d.id == 0) || (d.id == 4) || (d.id == 7))
                    return 'bold'
                else*/
                    return 'normal'
            })
            .attr('class', 'laneText');


// draw the lanes for the mini chart
        mini.append('g').selectAll('.laneLines')
            .data(lanes)
            .enter().append('line')
            .attr('x1', 0)
            .attr('y1', function(d) { return d3.round(y2(d.id)) + 0.5; })
            .attr('x2', width)
            .attr('y2', function(d) { return d3.round(y2(d.id)) + 0.5; })
            .attr('stroke', function(d) { return d.label === '' ? 'white' : 'lightgray' });

        mini.append('g').selectAll('.laneLegends')
            .data(lanes)
            .enter().append('rect')
            .attr('x', -130 )
            .attr('y', function(d) { return y2(d.id +.25); })
            .attr('width',5)
            .attr('height',5)
            .attr('fill', function(d) {
                switch (d.label){
                    case 'Treatments':
                        return 'green';
                    case 'Relapses':
                        return 'blue';
                    case 'Tests':
                        return 'red';
                    case 'PROMs':
                        return 'yellow';
                }
            })
            .attr('class', 'laneLegend');

        mini.append('g').selectAll('.laneText')
            .data(lanes)
            .enter().append('text')
            .text(function(d) { return d.label; })
            .attr('x', -110)
            .attr('y', function(d) { return y2(d.id + .25); })
            .attr('dy', '.5ex')
            .attr('text-anchor', 'start')
            .style('font-weight', function (d){
                /*
                if ((d.id == 0) || (d.id == 4) || (d.id == 7))
                    return 'bold'
                else*/
                    return 'normal'
            })
            .attr('class', 'laneText');

        // draw the x axis
        var xDateAxis = d3.svg.axis()
            .scale(x)
            .orient('bottom')
            .ticks(d3.time.mondays, (x.domain()[1] - x.domain()[0]) > 15552e6 ? 2 : 1)
            .tickFormat(d3.time.format('%d'))
            .tickSize(6, 0, 0);

        var x1DateAxis = d3.svg.axis()
            .scale(x1)
            .orient('bottom')
            .ticks(d3.time.days, 1)
            .tickFormat(d3.time.format('%a %d'))
            .tickSize(6, 0, 0);

        var xMonthAxis = d3.svg.axis()
            .scale(x)
            .orient('top')
            .ticks(d3.time.months, 1)
            .tickFormat(d3.time.format('%b %Y'))
            .tickSize(15, 0, 0);

        var x1MonthAxis = d3.svg.axis()
            .scale(x1)
            .orient('top')
            .ticks(d3.time.mondays, 1)
            .tickFormat(d3.time.format('%b - Week %W'))
            .tickSize(15, 0, 0);

        // middle Mon 15 Tues 16
        main.append('g')
            .attr('transform', 'translate(0,' + mainHeight + ')')
            .attr('class', 'main axis date')
            .call(x1DateAxis);

        // Top Dec Week 50
        main.append('g')
            .attr('transform', 'translate(0,0.5)')
            .attr('class', 'main axis month')
            .call(x1MonthAxis)
            .selectAll('text')
            .attr('dx', 5)
            .attr('dy', 12);

        // bottom
        mini.append('g')
            .attr('transform', 'translate(0,' + miniHeight + ')')
            .attr('class', 'axis date')
            .call(xDateAxis);

        mini.append('g')
            .attr('transform', 'translate(0,0.5)')
            .attr('class', 'axis month')
            .call(xMonthAxis)
            .selectAll('text')
            .attr('dx', 5)
            .attr('dy', 12);

        // draw a line representing today's date
        main.append('line')
            .attr('y1', 0)
            .attr('y2', mainHeight)
            .attr('class', 'main todayLine')
            .attr('clip-path', 'url(#clip)');

        mini.append('line')
            .attr('x1', x(now) + 0.5)
            .attr('y1', 0)
            .attr('x2', x(now) + 0.5)
            .attr('y2', miniHeight)
            .attr('class', 'todayLine');

        var lanesWithYAxis = [];
        for (var l = 0; l < lanes.length; l++) {
            if (lanes[l].label == 'PROMs')
                lanesWithYAxis.push(lanes[l]);
        }

        var itemsWithYAxis = [];
        for (var l = 0; l < items.length; l++) {
            if (items[l].domain == 'QS') {
                var aDatum = {x: items[l].start, y:parseInt(items[l].value)};
                itemsWithYAxis.push(aDatum);
            }

        }

        var promsYRange = d3.scale.linear().range([getLaneHeight(),0]).domain([0,10]);

        function getLaneHeight() {
            return mainHeight/lanes.length;
        }

        var promsYAxis = d3.svg.axis()
            .scale(promsYRange)
            .tickSize(1)
            .ticks(2)
            .orient('left')
            .tickSubdivide(false);

        main.append('g').selectAll('.promsYAxis')
            .data(lanesWithYAxis)
            .enter().append('svg:g')
            .attr('class', 'x axis')
            .attr('transform', function (d) {
                return 'translate(0,' + (d3.round(y1(d.id)) + 0.5) + ')';
                //return d3.round(y1(d.id)) + 0.5;
            })
            .call(promsYAxis);

        var lineFunc = d3.svg.line()
            .x(function (d) {
                var result = x2(d.x);
                if (result < 0)
                    return 0;
                else
                    return result;
            })
            .y(function (d) {
                return promsYRange(d.y);
            })
            .interpolate('basis');

        //console.log(lineFunc(itemsWithYAxis));

        main.append("svg:path")
            .attr("d", lineFunc(itemsWithYAxis))
            .attr("stroke", "blue")
            .attr("stroke-width", 2)
            .attr("fill", "none")
            .attr('id','promsLineChart');

        main.select("#promsLineChart")
            .data(lanesWithYAxis)
            .attr('transform', function (d) {
                return 'translate(0,' + (d3.round(y1(d.id)) + 0.5) + ')';
            })

        // draw the items
        var itemRects = main.append('g')
            .attr('clip-path', 'url(#clip)');

        mini.append('g').selectAll('miniItems')
            .data(getPaths(items))
            .enter().append('path')
            .attr('class', function(d) { return 'miniItem ' + d.class; })
            .attr('d', function(d) { return d.path; });

        // invisible hit area to move around the selection window
        mini.append('rect')
            .attr('pointer-events', 'painted')
            .attr('width', width)
            .attr('height', miniHeight)
            .attr('visibility', 'hidden')
            .on('mouseup', moveBrush);

        // draw the selection area
        var brush = d3.svg.brush()
            .x(x)
            .extent([d3.time.monday(now),d3.time.saturday.ceil(now)])
            .on("brush", redraw);

        mini.append('g')
            .attr('class', 'x brush')
            .call(brush)
            .selectAll('rect')
            .attr('y', 1)
            .attr('height', miniHeight - 1);

        mini.selectAll('rect.background').remove();

        redraw();

        function redraw () {

            var rects, labels
                , minExtent = d3.time.day(brush.extent()[0])
                , maxExtent = d3.time.day(brush.extent()[1])
                , visItems = items.filter(function (d) { return d.start < maxExtent && d.end > minExtent});

            mini.select('.brush').call(brush.extent([minExtent, maxExtent]));

            x1.domain([minExtent, maxExtent]);
            x2.domain([minExtent, maxExtent]);

            if ((maxExtent - minExtent) > 1468800000) {
                x1DateAxis.ticks(d3.time.mondays, 1).tickFormat(d3.time.format('%a %d'))
                x1MonthAxis.ticks(d3.time.mondays, 1).tickFormat(d3.time.format('%b - Week %W'))
            }
            else if ((maxExtent - minExtent) > 172800000) {
                x1DateAxis.ticks(d3.time.days, 1).tickFormat(d3.time.format('%a %d'))
                x1MonthAxis.ticks(d3.time.mondays, 1).tickFormat(d3.time.format('%b - Week %W'))
            }
            else {
                x1DateAxis.ticks(d3.time.hours, 4).tickFormat(d3.time.format('%I %p'))
                x1MonthAxis.ticks(d3.time.days, 1).tickFormat(d3.time.format('%b %e'))
            }


            //x1Offset.range([0, x1(d3.time.day.ceil(now) - x1(d3.time.day.floor(now)))]);

            // shift the today line
            main.select('.main.todayLine')
                .attr('x1', x1(now) + 0.5)
                .attr('x2', x1(now) + 0.5);

            // update the axis
            main.select('.main.axis.date').call(x1DateAxis);
            main.select('.main.axis.month').call(x1MonthAxis)
                .selectAll('text')
                .attr('dx', 5)
                .attr('dy', 12);

            // upate the item rects
            rects = itemRects.selectAll('rect')
                .data(visItems, function (d) { return d.id; })
                .attr('x', function(d) { return x1(d.start); })
                .attr('width', function(d) { return x1(d.end) - x1(d.start); });

            rects.enter().append('rect')
                .attr('x', function(d) { return x1(d.start); })
                .attr('y', function(d) { return y1(d.lane) + .1 * y1(1) + 0.5; })
                .attr('width', function(d) { return x1(d.end) - x1(d.start); })
                .attr('height', function(d) { return .8 * y1(1); })
                .attr('class', function(d) { return 'mainItem ' + d.class; });

            rects.exit().remove();

            // update the item labels
            labels = itemRects.selectAll('text')
                .data(visItems, function (d) { return d.id; })
                .attr('x', function(d) { return x1(Math.max(d.start, minExtent)) + 2 ; });

            labels.enter().append('text')
                //.text(function (d) { return 'Item\n\n\n\n Id: ' + d.desc; })
                .text(function (d) { return d.desc; })
                //.text(function (d) { return d.displayLabel; })
                .attr('x', function(d) { return x1(Math.max(d.start, minExtent)) + 2 ; })
                .attr('y', function(d) { return y1(d.lane) + .4 * y1(1) + 0.5; })
                .attr('text-anchor', 'start')
                .attr('class', 'itemLabel');

            labels.exit().remove();
            /*
            main.append("svg:path")
                .attr("d", lineFunc(itemsWithYAxis))
                .attr("stroke", "blue")
                .attr("stroke-width", 2)
                .attr("fill", "none")
                .attr('id','promsLineChart');

            main.select("#promsLineChart")
                .data(lanesWithYAxis)
                .attr('transform', function (d) {
                    return 'translate(0,' + (d3.round(y1(d.id)) + 0.5) + ')';
                })
            */
            var promsChart = main.select("#promsLineChart");

            promsChart.data(lanesWithYAxis)
                 .attr("d", lineFunc(itemsWithYAxis))
                 .attr('transform', function (d) {
                     return 'translate(0,' + (d3.round(y1(d.id)) + 0.5) + ')';
                 });

            //promsChart.enter();
            //console.log(lineFunc(itemsWithYAxis));
            //promsChart.remove();


        }

        function moveBrush () {
            var origin = d3.mouse(this)
                , point = x.invert(origin[0])
                , halfExtent = (brush.extent()[1].getTime() - brush.extent()[0].getTime()) / 2
                , start = new Date(point.getTime() - halfExtent)
                , end = new Date(point.getTime() + halfExtent);

            brush.extent([start,end]);
            redraw();
        }

// generates a single path for each item class in the mini display
// ugly - but draws mini 2x faster than append lines or line generator
// is there a better way to do a bunch of lines as a single path with d3?
        function getPaths(items) {
            var paths = {}, d, offset = .5 * y2(1) + 0.5, result = [];
            for (var i = 0; i < items.length; i++) {
                d = items[i];
                if (!paths[d.class]) paths[d.class] = '';
                paths[d.class] += ['M',x(d.start),(y2(d.lane) + offset),'H',x(d.end)].join(' ');
            }

            for (var className in paths) {
                result.push({class: className, path: paths[className]});
            }

            return result;
        }
    }

    return {
        restrict:"E",
        controller: 'timelineCtrl',
        link: function ($scope, element){
            /*
            var rendered = function(){

                display($scope, element);
            };
            //console.log(element);
            console.log("In timeline");
            timer(rendered,10*3); */

            $scope.$watch('randomData', function(){
                display($scope, element);
            }, true);
        }
    };
});

whModule.factory('patientEvents', function(){

    var getPatientEvents = function(dataToView,AllData) {
        //console.log(dataToView);
        var addToLane = function (chart, item) {
            var name = item.lane;

            if (!chart.lanes[name])
                chart.lanes[name] = [];

            var lane = chart.lanes[name];

            var sublane = 0;
            while(isOverlapping(item, lane[sublane]))
                sublane++;

            if (!lane[sublane]) {
                lane[sublane] = [];
            }

            lane[sublane].push(item);
        };

        var isOverlapping = function(item, lane) {
            if (lane) {
                for (var i = 0; i < lane.length; i++) {
                    var t = lane[i];
                    if (item.start < t.end && item.end > t.start) {
                        return true;
                    }
                }
            }
            return false;
        };

        var parseData = function (data) {
            var i = 0, length = data.length, node;
            var chart = { lanes: {} };

            for (i; i < length; i++) {
                var item = data[i];
                addToLane(chart, item);
            }

            return collapseLanes(chart);
        };

        var collapseLanes = function (chart) {
            var lanes = [], items = [], laneId = 0;
            var now = new Date();

            for (var laneName in chart.lanes) {
                var lane = chart.lanes[laneName];

                for (var i = 0; i < lane.length; i++) {
                    var subLane = lane[i];

                    lanes.push({
                        id: laneId,
                        label: i === 0 ? laneName : ''
                    });

                    for (var j = 0; j < subLane.length; j++) {
                        var item = subLane[j];

                        items.push({
                            id: item.id,
                            lane: laneId,
                            start: item.start,
                            end: item.end,
                            class: item.end > now ? 'future' : 'past',
                            desc: item.desc,
                            domain: item.domain,
                            value: item.value
                        });
                    }

                    laneId++;
                }
            }

            return {lanes: lanes, items: items};
        }

        var generateWorkItems = function (AllData) {
            var data = [];
            //var laneNames = ["MS Specific", "Symptomatic", "Non-Pharma", "Relapses", "Medical Conditions", "MRI", "CSF","Evoked Potantials", "Lab Tests"]

            if (dataToView.indexOf('Treatments') > -1)
                getTreatments(data,AllData);

            //getMedicalEvents(data);
            if (dataToView.indexOf('Relapses') > -1)
                //getRelapses(data);

            if (dataToView.indexOf('Tests') > -1)
                //getTests(data);

            if (dataToView.indexOf('EDSS') > -1)
                //getEDSS(data);

            consolidateItemID(data);

            return data;
        };

        return parseData(generateWorkItems(AllData));
    }


    var consolidateItemID = function(data) {
        for (var i = 0; i < data.length; i++){
            data[i].id = i;
            data[i].name = 'work item '+i;
        }
    }

    var getTests = function (data) {

        var findUniqueCollectionDates = function(labResults, assessmentResults) {
            var uniqueDates = [];

            var collectionDateExists = function (uniqueDates, aDate) {
                for (var d = 0; d < uniqueDates.length; d++) {
                    if (uniqueDates[d].DOMAIN=='IS'){
                        if (aDate.toDateString==uniqueDates[d].ISDTC.toDateString()) {
                            return true;
                        }
                    }
                    else if (uniqueDates[d].DOMAIN=='LB'){
                        if (aDate.toDateString==uniqueDates[d].LBDTC.toDateString()) {
                            return true;
                        }
                    }
                }
                return false;
            }

            for (var l = 0; l < labResults.length; l++) {
                if (!collectionDateExists(uniqueDates, labResults[l].LBDTC)) {
                    uniqueDates.push(labResults[l]);
                }
            }
            for (var a = 0; a < assessmentResults.length; a++) {
                if (!collectionDateExists(uniqueDates, assessmentResults[a].ISDTC)) {
                    uniqueDates.push(assessmentResults[a]);
                }
            }
            return uniqueDates;
        };

        var labResults = laboratoryTestResults.getUniqueDates();
        var assessmentResults = immunogenicitySpecimenAssessments.getUniqueDates();
        var vepFindings = nervousSystemFindings.getUniqueDates();
        var labCollectionDates = findUniqueCollectionDates(labResults, assessmentResults);

        var images = procedures.getExperimentDates();
        var events = vepFindings.concat(labCollectionDates).concat(images);

        for (var t = 0; t < events.length; t++) {
            var workItem = null;
            switch (events[t].DOMAIN) {
                case 'IS':
                    var stdtc = events[t].ISDTC;
                    var endtc = new Date(stdtc);
                    endtc.setDate(stdtc.getDate()+1);
                    workItem = {
                        id: '',
                        name: 'work item ' + '',
                        lane: "Tests",
                        start: stdtc,
                        end: endtc,
                        desc: events[t].displayLabel,
                        domain: 'LB',
                        value: ''
                    };
                    //console.log(workItem);
                    break;
                case 'LB':
                    var stdtc = events[t].LBDTC;
                    var endtc = new Date(stdtc);
                    endtc.setDate(stdtc.getDate()+1);
                    workItem = {
                        id: '',
                        name: 'work item ' + '',
                        lane: "Tests",
                        start: stdtc,
                        end: endtc,
                        desc: events[t].displayLabel,
                        domain: 'LB',
                        value: ''
                    };
                    //console.log(workItem);
                    break;
                case 'NV':
                    var stdtc = events[t].NVDTC;
                    var endtc = new Date(stdtc);
                    endtc.setDate(stdtc.getDate()+1);
                    workItem = {
                        id: '',
                        name: 'work item ' + '',
                        lane: "Tests",
                        start: stdtc,
                        end: endtc,
                        desc: events[t].displayLabel,
                        domain: 'LB',
                        value: ''
                    };
                    //console.log(workItem);
                    break;
                case 'PR':
                    var stdtc = events[t].PRSTDTC;
                    var endtc = new Date(stdtc);
                    endtc.setDate(stdtc.getDate()+1);
                    workItem = {
                        id: '',
                        name: 'work item ' + '',
                        lane: "Tests",
                        start: stdtc,
                        end: endtc,
                        desc: events[t].displayLabel,
                        domain: 'LB',
                        value: ''
                    };
                    //console.log(workItem);
                    break;
            }

            //console.log(workItem);
            if (workItem!=null)
                data.push(workItem);
        }
    }

    var getTreatments = function (data,AllData) {
        var events = AllData["exposures"];
        //console.log("getting treatment");
        for (var t = 0; t < events.length; t++) {
            var workItem = {
                id: '',
                name: 'work item ' + '',
                lane: "Treatments",
                start: events[t].EXSTDTC,
                end: events[t].EXENDTC,
                desc: events[t].displayLabel,
                domain: 'EX',
                value: ''
            };
            //console.log(events);
            data.push(workItem);
        }
    }

    var getEDSS = function (data) {
        var edss = questionnaires.getEDSSScores();

        for (var t = 0; t < edss.length; t++) {
            var stdtc = edss[t].QSDTC;
            var endtc = new Date(stdtc);
            endtc.setDate(stdtc.getDate()+1);

            var workItem = {
                id: '',
                name: 'work item ' + '',
                lane: "PROMs",
                start: stdtc,
                end: endtc,
                desc: edss[t].displayLabel,
                domain: 'QS',
                value: edss[t].QSSTRESC
            };
            data.push(workItem);

        }
    }

    var getPROMS = function (data) {

        var stdtc = new Date(2015,01,01);
        var endtc = new Date(stdtc);
        endtc.setDate(stdtc.getDate()+1);

        var workItem = {
            id: '',
            name: 'work item ' + '',
            lane: "PROMs",
            start: stdtc,
            end: endtc,
            desc: 'test',
            domain: 'QS',
            value: '5'
        };
        data.push(workItem);

        stdtc = new Date(2015,02,02);
        endtc = new Date(stdtc);
        endtc.setDate(stdtc.getDate()+1);

        workItem = {
            id: '',
            name: 'work item ' + '',
            lane: "PROMs",
            start: stdtc,
            end: endtc,
            desc: 'test',
            domain: 'QS',
            value: '8'
        };
        data.push(workItem);
    }

    var getMedicalEvents = function (data) {
        var events = clinicalEvents.getEventsFromCategory('Other');
        //console.log("getting treatment");
        for (var t = 0; t < events.length; t++) {
            var workItem = {
                id: '',
                name: 'work item ' + '',
                lane: "Medical Events",
                start: events[t].CESTDTC,
                end: events[t].CEENDTC,
                desc: events[t].displayLabel
            };
            data.push(workItem);
        }

        var adverseEvents = adverseEventService.getAdverseEvents();
        for (var t = 0; t < adverseEvents.length; t++) {
            var stdtc = adverseEvents[t].AESTDTC;
            var endtc = new Date(stdtc);
            endtc.setDate(stdtc.getDate()+1);
            var workItem = {
                id: '',
                name: 'work item ' + '',
                lane: "Medical Events",
                start: stdtc,
                end: endtc,
                desc: adverseEvents[t].displayLabel
            };
            data.push(workItem);
        }

    }

    var getRelapses = function (data) {
        var events = clinicalEvents.getUniqueDatesFromCategory('MS Relapse');
        //console.log("getting treatment");
        for (var t = 0; t < events.length; t++) {
            var workItem = {
                id: '',
                name: 'work item ' + '',
                lane: "Relapses",
                start: events[t].CESTDTC,
                end: events[t].CEENDTC,
                desc: events[t].displayLabel,
                domain: 'CE',
                value: ''
            };
            data.push(workItem);
        }
    }

    return {
        getPatientEvents: getPatientEvents
    }
});


whModule.controller('timelineCtrl', function ($scope, patientEvents,RequestFactory,Exposure,viewService,$rootScope) {
    viewService.setView('Timeline');
    $scope.showThisContent = function() {
        if (viewService.getView().Section=='Timeline'){
            //$scope.randomData = patientEvents.getPatientEvents($scope.dataToView);
            return true;
        }
        else
            return false;
    }

    $scope.dataToView = ['Treatments', 'Relapses', 'Tests', 'EDSS'];

    $scope.toggleTimelineData = function(dataToViewName) {
        var indexOfData = $scope.dataToView.indexOf(dataToViewName);
        if (indexOfData == -1) {
            $scope.dataToView.push(dataToViewName);
        }
        else {
            $scope.dataToView.splice(indexOfData, 1);
        }
        //console.log($scope.dataToView);
        $scope.randomData = patientEvents.getPatientEvents($scope.dataToView,$scope.AllData);
    }
    var getDomain = function (items) {
        var domain = '';
        //console.log(items);
        for (var i = 0; i < items.length; i++) {
            if (items[i].fieldName == 'DOMAIN') {
                return items[i].value;
            }
        }
        return domain;
    }

    $scope.populate = function (domain, aRecordItems) {
        switch (domain) {
            case 'EX':
            {
                var newEvent= populateExposures(aRecordItems);
                $scope.AllData["exposures"].push(newEvent);
            }
        }
    }
    var formatStringToDate = function (aDate) {

        //var newDate = new Date(getYear(aDate),getMonth(aDate),getDay(aDate));
        //return newDate;
        //console.log(aDate);

        if (aDate != '')
        {
            var date = new Date(aDate);
            return date;
        }
        else
            return '';

    }
    var populateExposures = function (RecordItems) {
        var newEvent = new Exposure();
        for (var i = 0; i < RecordItems.length; i++){

            switch (RecordItems[i].fieldName) {
                case 'STUDYID':{
                    newEvent.STUDYID = RecordItems[i].value;
                    break;
                }
                case 'DOMAIN':{
                    newEvent.DOMAIN = RecordItems[i].value;
                    break;
                }
                case 'USUBJID':{
                    newEvent.USUBJID = RecordItems[i].value;
                    break;
                }
                case 'EXSEQ':{
                    newEvent.EXSEQ = RecordItems[i].value;
                    break;
                }
                case 'EXADJ':{
                    newEvent.EXADJ = RecordItems[i].value;
                    break;
                }
                case 'EXSTDTC':{
                    newEvent.EXSTDTC = formatStringToDate(RecordItems[i].value);
                    break;
                }
                case 'EXTRT':{
                    newEvent.EXTRT = RecordItems[i].value;
                    break;
                }
                case 'EXDOSE':{
                    newEvent.EXDOSE = RecordItems[i].value;
                    break;
                }
                case 'EXDOSU':{
                    newEvent.EXDOSU = RecordItems[i].value;
                    break;
                }
                case 'EXDOSFRM':{
                    newEvent.EXDOSFRM = RecordItems[i].value;
                    break;
                }
                case 'EXDOSFRQ':{
                    newEvent.EXDOSFRQ = RecordItems[i].value;
                    break;
                }
                case 'EXENDTC':{
                    newEvent.EXENDTC = formatStringToDate(RecordItems[i].value);
                    break;
                }
                case 'displayLabel':{
                    newEvent.displayLabel = RecordItems[i].value;
                    break;
                }
                case 'displayDate':{
                    newEvent.displayDate = RecordItems[i].value;
                    break;
                }
            }
        }
        return newEvent;

        //console.log(exposures);
    };
    $scope.getAllData=function()
    {
        console.log("getAllData");
        var params={"USUBJID":"OPT001"};
        var resGet=RequestFactory.GetJson(params);
        var recordSet=[];
        $scope.AllData={};
        $scope.AllData["exposures"]=[];
        resGet.success(function(data, status, headers, config) {
            var resJson=angular.fromJson(data);

            var RecordSet = resJson.RecordSet;
            for (var recordItem = 0; recordItem < RecordSet.length; recordItem++) {
                var aRecordItems = RecordSet[recordItem].RecordItems;
                var domain = getDomain(aRecordItems);

                //console.log(domain);
                $scope.populate(domain, aRecordItems);
            }
            $scope.randomData = patientEvents.getPatientEvents($scope.dataToView,$scope.AllData);
        });
        resGet.error(function(data, status, headers, config) {
            alert( "failure message: " + JSON.stringify({data: data}));
            return null;
        });
    };

});


whModule.factory('Exposure', function () {
    return function (USUBJID, extrt) {
        var Exposure = {
            USUBJID : USUBJID,
            STUDYID : 'OPTIMISE',
            DOMAIN:'EX',
            EXSEQ :'',
            EXTRT:extrt,
            EXDOSE:'',
            EXDOSU:'',
            EXDOSFRM:'',
            EXDOSFRQ:'',
            EXSTDTC: new Date(),
            EXENDTC: '',
            EXADJ: '',
            displayLabel:''
        }
        return Exposure;
    }
});