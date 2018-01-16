"use strict;"




var App = (function() {

    google.charts.load('current', {'packages':['gauge']});
    google.charts.setOnLoadCallback(drawChart);

    var updateRunnerID_1;
    var updateRunnerID_2;

    var running = 0;

    var datain = [
        ['Label', 'Value'],
        ['Fp1 beta power', 0],
        ['Fp2 beta power', 0]
    ];


    // Set the value of the indicator
    function setValue(id, x) {
        $("#value" + id).text(x);
	datain[id][1] = Number(x);
	drawChart();
    }

    // debugging function
    function toggleUpdater() {
        if (running === 0) {
            updateRunnerID_1 = setInterval(function() { getValue('1') }, 1000);
            updateRunnerID_2 = setInterval(function() { getValue('2') }, 1000);
            running = 1;
            $("#updatebutton").text("stop updating");
        } else if  (running === 1) {
            clearInterval(updateRunnerID_1);
            clearInterval(updateRunnerID_2);
            clearInterval(updateRunnerID_3);
            running = 0;
            $("#updatebutton").text("start updating");
        }

    }

    // Make HTTP get request and set the
    function getfp1(id) {
        $.ajax({
            type: "GET",
            url: 'http://localhost:8080/eeg_node/metric/{"type":"fp1beta"}',
            dataType: "jsonp",
            success: function(data) {
                if (typeof data[0] !== "undefined") {
                    var val = data[0]["return"];
                    setValue(id, val);
                }
            }
        });
    }

    function getfp2(id) {
        $.ajax({
            type: "GET",
            url: 'http://localhost:8080/eeg_node/metric/{"type":"fp2beta"}',
            dataType: "jsonp",
            success: function(data) {
                if (typeof data[0] !== "undefined") {
                    var val = data[0]["return"];
                    setValue(id, val);
                }
            }
        });
    }

    /* Gauges */



    function drawChart() {

        var data = google.visualization.arrayToDataTable(datain);

        var options = {
            min: -40,
            max: 40,
            width: 400, height: 120,
            greenFrom: -40, greenTo: 0,
            yellowFrom:0, yellowTo: 40,
            minorTicks: 10
        };

        var chart = new google.visualization.Gauge(document.getElementById('chart_div'));

        chart.draw(data, options);


    }
    /* End of gauges */


    return {
        toggleUpdater: toggleUpdater
    };

})();

$(document).ready(function() {
});
