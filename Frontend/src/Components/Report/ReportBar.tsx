import {FunctionComponent as FC, PropsWithChildren} from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { ReportProps } from '../../Interfaces/config';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Boxes Recieved Daily',
    }
  },
  maintainAspectRatio: false
};



const BarChart: FC<PropsWithChildren<ReportProps>> = ({Boxes, Dates})=> {
  const labels = Dates;

  const data = {
    labels,
    datasets: [
      {
        label: 'Boxes Recieved',
        data: Boxes,
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      }
    ],
  };
    console.log(Boxes, Dates)
    return(
        <Bar options={options} data={data} />
    )
}

export default BarChart;
