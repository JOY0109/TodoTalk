"use strict";

const KTChartsWidget1 = {
  init: () => {
    const element = document.getElementById("kt_charts_widget_1");
    if (!element) return;

    const negativeColor = element.getAttribute("data-kt-negative-color") ?? KTUtil.getCssVariableValue("--bs-success");
    const height = parseInt(KTUtil.css(element, "height"));
    const grayColor = KTUtil.getCssVariableValue("--bs-gray-500");
    const borderColor = KTUtil.getCssVariableValue("--bs-border-dashed-color");
    const primaryColor = KTUtil.getCssVariableValue("--bs-primary");

    const chart = new ApexCharts(element, {
      series: [
        {
          name: "Net Profit",
          data: [20, 30, 20, 40, 60, 75, 65, 18, 10, 5, 15, 40, 60, 18, 35, 55, 20],
        },
        {
          name: "Revenue",
          data: [-20, -15, -5, -20, -30, -15, -10, -8, -5, -5, -10, -25, -15, -5, -10, -5, -15],
        },
      ],
      chart: {
        fontFamily: "inherit",
        type: "bar",
        stacked: true,
        height,
        toolbar: { show: false },
      },
      plotOptions: {
        bar: {
          columnWidth: "35%",
          barHeight: "70%",
          borderRadius: [6, 6],
        },
      },
      legend: { show: false },
      dataLabels: { enabled: false },
      xaxis: {
        categories: [
          "Jan 5", "Jan 7", "Jan 9", "Jan 11", "Jan 13", "Jan 15", "Jan 17",
          "Jan 19", "Jan 20", "Jan 21", "Jan 23", "Jan 24", "Jan 25", "Jan 26",
          "Jan 24", "Jan 28", "Jan 29"
        ],
        axisBorder: { show: false },
        axisTicks: { show: false },
        tickAmount: 10,
        labels: {
          style: {
            colors: grayColor,
            fontSize: "12px",
          },
        },
        crosshairs: { show: false },
      },
      yaxis: {
        min: -50,
        max: 80,
        tickAmount: 6,
        labels: {
          style: {
            colors: grayColor,
            fontSize: "12px",
          },
          formatter: (val) => `${parseInt(val)}K`,
        },
      },
      fill: { opacity: 1 },
      states: {
        normal: { filter: { type: "none", value: 0 } },
        hover: { filter: { type: "none", value: 0 } },
        active: {
          allowMultipleDataPointsSelection: false,
          filter: { type: "none", value: 0 },
        },
      },
      tooltip: {
        style: { fontSize: "12px", borderRadius: 4 },
        y: {
          formatter: (val) => `$${val} thousands`,
        },
      },
      colors: [primaryColor, negativeColor],
      grid: {
        borderColor,
        strokeDashArray: 4,
        yaxis: { lines: { show: true } },
      },
    });

    setTimeout(() => chart.render(), 200);
  },
};

if (typeof module !== "undefined") {
  module.exports = KTChartsWidget1;
}

KTUtil.onDOMContentLoaded(() => {
  KTChartsWidget1.init();
});
