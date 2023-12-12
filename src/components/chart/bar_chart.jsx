import React from "react";
import PropTypes from "prop-types";
import Chart from "react-apexcharts";

export const BarChart = (props) => {
    const chartOptions = {
        chart: {
            type: "bar",
            height: 150,
            toolbar: {
                show: false, // Disable toolbar
            },
        },
        xaxis: {
            categories: props.xLabels,
        },
        title: {
            text: props.title,
            align: 'left',
            style: {
                fontSize:  '18px',
            }
        },
        series: [
            {
                name: props.title,
                data: props.datasets,
            },
        ],
    };

    return (
        <div className="rounded-lg p-3 h-full">
            <div className="">
                <Chart
                    options={chartOptions}
                    series={chartOptions.series}
                    type="bar"
                />
            </div>
        </div>
    );
};

BarChart.propTypes = {
    title: PropTypes.string.isRequired,
    xLabels: PropTypes.array.isRequired,
    datasets: PropTypes.array.isRequired,
}