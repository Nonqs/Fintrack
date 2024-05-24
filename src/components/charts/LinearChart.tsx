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
import dayjs from 'dayjs';

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


const annualLabels = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

const monthlyLabels = Array.from({ length: 31 }, (_, i) => (i + 1).toString());

function processData(data, view) {
    const result = view === 'annual' ? new Array(12).fill(0) : new Array(31).fill(0);

    data.forEach(({ date, amount, type }) => {
        const d = dayjs(date);
        if (view === 'annual') {
            const month = d.month(); // Devuelve el mes (0-11)
            result[month] += type === 'income' ? amount : amount;
        } else {
            const day = d.date() - 1; // Devuelve el día del mes (1-31)
            result[day] += type === 'income' ? amount : amount;
        }
    });

    return result;
}
export function LinearChart({ category, data, view }: { category: string }) {

    const labels = view === 'annual' ? annualLabels : monthlyLabels;

    const incomeData = processData(data.filter(d => d.type === 'income'), view)
    const expenseData = processData(data.filter(d => d.type === 'expense'), view)

    let chartData
    if(category === "income"){

        chartData = {
            labels,
            datasets: [
                {
                    label: 'Incomes',
                    data: incomeData,
                    backgroundColor: '#4ade80',
                    borderColor: '#166534',
                },
                {
                    label: 'Expenses',
                    data: expenseData,
                    backgroundColor: '#f87171',
                    borderColor: '#991b1b',
                    hidden:true
                },
            ],
        }

    } else {
       
        chartData = {
            labels,
            datasets: [
                {
                    label: 'Incomes',
                    data: incomeData,
                    backgroundColor: '#4ade80',
                    borderColor: '#166534',
                    hidden:true

                },
                {
                    label: 'Expenses',
                    data: expenseData,
                    backgroundColor: '#f87171',
                    borderColor: '#991b1b',
                },
            ],
        }

    }
    
    const options = {
        scales: {
            x: {
                beginAtZero: true,
            },
            y: {
                beginAtZero: true,
            },
        },
    };


    return <Line options={options} data={chartData} />
}