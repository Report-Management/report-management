import React from "react";
import PropTypes from "prop-types";
import Chart from "react-apexcharts";

export const PieChart = (props) => {
    const chartOptions = {
        chart: {
            type: "pie",
            toolbar: {
                show: false,
            },
        },
        labels: props.xLabels,
        title: {
            text: props.title,
            align: 'left',
            style: {
                fontSize: '18px',
            }
        },
        series: props.datasets,
    };

    return (
        <div className="rounded-lg p-3 h-full">
            <Chart
                type={chartOptions.chart.type}
                series={chartOptions.series}
                options={chartOptions}
            />
        </div>
    );
};


PieChart.propTypes = {
    title: PropTypes.string.isRequired,
    xLabels: PropTypes.array.isRequired,
    datasets: PropTypes.array.isRequired,
};

