"use client"
import React, { useState } from 'react';
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
import dayjs from 'dayjs';

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

export function HomeChart({ data, view }) {

    const labels = view === 'annual' ? annualLabels : monthlyLabels;

    const incomeData = processData(data.filter(d => d.type === 'income'), view);
    const expenseData = processData(data.filter(d => d.type === 'expense'), view);

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Incomes',
                data: incomeData,
                backgroundColor: '#4ade80',
            },
            {
                label: 'Expenses',
                data: expenseData,
                backgroundColor: '#f87171',
            },
        ],
    };

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

    return (
        <Bar data={chartData} options={options} />
    );
}
