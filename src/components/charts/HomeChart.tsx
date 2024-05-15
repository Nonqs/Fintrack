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
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Finance chart',
        },
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

const data = {
    labels,
    datasets: [
        {
            label: 'Incomes',
            data: generateRandomData(labels.length),
            backgroundColor: '#4ade80',
        },
        {
            label: 'Expenses',
            data: generateRandomData(labels.length),
            backgroundColor: '#f87171',
        },
    ],
}

// Función de componente para el gráfico
export function HomeChart() {
    return <Bar options={options} data={data} />
}