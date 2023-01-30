import React from 'react'
import {Line} from "react-chartjs-2";
import { Chart as
     ChartJS,
     CategoryScale,
     LinearScale,
     PointElement,
     LineElement,
     Title,
     Tooltip,
     Legend} from "chart.js"

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
    );
const Chart = ({arr=[] ,currency,days}) => {
   const prices=[1,2,3,4];
   const date=["21/2/23" , "22/2/23","23/2/23" ]
   

  return (
    <Line options={{
        responsive:true,
    }}

     data={{
        labels:date,
        datasets:[{
            label:`Price in ${currency}`,
            data:prices,borderColor:"rgb(255,99,132)",
            backgroundColor:"rgb(255,99,50)"
        }]
     }}
    />
  )
}

export default Chart