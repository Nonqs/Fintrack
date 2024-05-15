"use client"
import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        }
    },
}

const generateRandomData = (count) => {
    const data = [];
    for (let i = 0; i < count; i++) {
        data.push(Math.floor(Math.random() * 1000));
    }
    return data;
}

const labels = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
]

// Función de componente para el gráfico
export function LinearChart({ category }: { category: string }) {

    let data;

    if (category === "income") {

        data = {
            labels,
            datasets: [
                {
                    label: 'Incomes',
                    data: generateRandomData(labels.length),
                    borderColor: '#166534',
                    backgroundColor: '#bbf7d0',
                },
                {
                    label: 'Expenses',
                    data: generateRandomData(labels.length),
                    borderColor: '#991b1b',
                    backgroundColor: '#f87171',
                    hidden:true
                },
            ],
        }

    } else {

        data = {
            labels,
            datasets: [
                {
                    label: 'Incomes',
                    data: generateRandomData(labels.length),
                    borderColor: '#166534',
                    backgroundColor: '#bbf7d0',
                    hidden:true
                },
                {
                    label: 'Expenses',
                    data: generateRandomData(labels.length),
                    borderColor: '#991b1b',
                    backgroundColor: '#f87171',
                },
            ],
        }

    }

    return <Line options={options} data={data} />
}