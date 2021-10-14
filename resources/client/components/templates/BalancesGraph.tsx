import React from 'react';
import Empty from '../molecules/Empty';
import IsFetching from '../atoms/IsFetching';
import { Line } from 'react-chartjs-2';
import { ChartData, ChartDataset, ChartOptions } from 'chart.js';
import { formatDate } from '../../Utils';

const colors = [
  '#4fc3f7',
  '#ef5350',
  '#26a69a',
  '#303f9f',
  '#66bb6a',
  '#d4e157',
  '#ffa726',
  '#ff7043',
  '#78909c',
  '#8d6e63',
  '#9e9d24',
  '#880e4f',
  '#fff9c4',
];

const balancesToGraphData = (balances: Balance[], minDate: Date): ChartDataset[] => {
  const byMonth: Map<string, Balance[]> = new Map<string, Balance[]>();
  const byDate: Map<string, Balance> = new Map<string, Balance>();

  const b = balances
    .filter((x) => x.bookingDate >= minDate)
    .sort((a, b) => (a.bookingDate > b.bookingDate ? 1 : -1));

  // take last booking of the day
  b.forEach((x) => {
    byDate.set(formatDate(x.bookingDate), x);
  });

  // group by month
  byDate.forEach((x) => {
    const key = formatDate(x.bookingDate).substr(0, 7);
    const existing = byMonth.get(key) ?? [];

    byMonth.set(key, [...existing, x]);
  });

  return Array.from(byMonth).map(([key, balances], index): ChartDataset => {
    const data = new Array(31);

    console.log(balances);

    balances.forEach((x: Balance) => {
      const index = x.bookingDate.getDate() - 1;
      data[index] = x.amount / 100;
    });

    const color = colors[index];

    return {
      label: key,
      data: data,
      fill: false,
      backgroundColor: color,
      borderColor: color,
    };
  });
};

type BalancesGraphProps = {
  isFetching: boolean;
  balances: Balance[];
  startDate: Date;
};

export default function BalancesGraph(props: BalancesGraphProps) {
  const data: ChartData = {
    labels: Array.from({ length: 31 }, (_, i) => i + 1),
    datasets: balancesToGraphData(props.balances, props.startDate),
  };

  const options: ChartOptions = {
    aspectRatio: 3,
    scales: {
      xAxes: {
        grid: {
          color: 'rgba(155, 155, 155, 0.3)',
        },
      },
      yAxes: {
        grid: {
          color: 'rgba(155, 155, 155, 0.5)',
        },
      },
    },
  };

  return (
    <IsFetching isFetching={props.isFetching}>
      <Empty items={props.balances} text="There is not yet enough data.">
        <Line data={data} options={options} />
      </Empty>
    </IsFetching>
  );
}
