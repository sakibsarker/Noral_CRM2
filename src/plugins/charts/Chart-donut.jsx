import React, { useEffect, useState } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
const generateRandomData = (length) => {
  const data = [];
  for (let i = 0; i < length; i++) {
    const x = Math.floor(Math.random() * 1000000) + 1;
    const y = parseFloat((Math.random() * 10).toFixed(2));
    data.push({ x, y });
  }
  return data;
};

const staticData = generateRandomData(50);
const DonutChart = () => {
  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: 'pie',
      backgroundColor: 'transparent',
    },
    title: {
      text: null,
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
    },
    accessibility: {
      point: {
        valueSuffix: '%',
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
        },
        innerSize: '60%',
      },
    },
    series: [
      {
        name: 'Share',
        colorByPoint: true,
        data: [],
      },
    ],
    credits: {
      enabled: false,
    },
  });

  useEffect(() => {
    // Convert the staticData to a format suitable for a donut chart
    const donutData = staticData.map((item) => ({
      name: `${item.x}`,
      y: item.y,
    }));

    setChartOptions((prevOptions) => ({
      ...prevOptions,
      series: [
        {
          ...prevOptions.series[0],
          data: donutData,
        },
      ],
    }));
  }, []);

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={chartOptions}
        constructorType="chart"
      />
    </div>
  );
};

export default DonutChart;
