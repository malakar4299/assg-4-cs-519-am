import {useState, useEffect} from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';
import { api_config, api_url } from '../../utils/api_config';
import { PieChartData } from '../../Interfaces/config';

ChartJS.register(ArcElement, Tooltip, Legend);

const ReportPie = () => {

    const [shipperData, setShipperData] = useState([]);
    const [boxesData, setBoxesData] = useState([]);
    const [dataRecieved, setdataRecieved] = useState(false);

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top' as const,
          },
          title: {
            display: true,
            text: 'Shipper-Boxes Distribution',
          }
        },
        maintainAspectRatio: false
      };

    useEffect(() => {
        axios.get(`${api_url}/get-shipper-boxes`, api_config).then(result => {
            let shipperIds = result.data.reduce((acc:[], data:PieChartData) => {
                return [...acc, data.ShipperID]
            }, [])
            let boxes = result.data.reduce((acc:[], data:PieChartData) => {
                return [...acc, data.TotalBoxes]
            }, [])
            setShipperData(shipperIds)
            setBoxesData(boxes)
        }).then(result => {
            console.log(shipperData, boxesData)
            setdataRecieved(true)
        })
    }, []);

    const data = {
        labels: shipperData,
        datasets: [
          {
            label: 'Total Boxes Recieved',
            data: boxesData,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };

    return dataRecieved?<Doughnut width={"30%"} data={data} options={options} />:null;
}

export default ReportPie
