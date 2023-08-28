import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const Chart = ({ theme, monthlySalarySums }) => {
  const options = {
    chart: {
      backgroundColor: theme === 'dark' ? '#282933' : '#ffffff',
    },
    title: {
      text: "Évolution des salaires mensuels cumulés de tous les employés",
      style: {
        color: theme === 'dark' ? '#ffffff' : '#000000',
      },
    },
    xAxis: {
      categories: ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aou', 'Sep', 'Oct', 'Nov', 'Dec'],
      labels: {
        style: {
          color: theme === 'dark' ? '#ffffff' : '#000000',
        },
      },
    },
    yAxis: {
      title: {
        text: 'Montant cumulé des salaires',
        style: {
          color: theme === 'dark' ? '#ffffff' : '#000000',
        },
      },
    },
    series: [
      {
        name: 'Salaires mensuels',
        data: monthlySalarySums,
        curveType: 'curve',
        color: theme === 'dark' ? '#fff' : '#000',
        marker: {
          fillColor: theme === 'dark' ? '#fff' : '#000',
          lineColor: theme === 'dark' ? '#282933' : '#ffffff',
        },
      },
    ],
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default Chart;
