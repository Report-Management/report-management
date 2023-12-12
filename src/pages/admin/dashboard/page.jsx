import React from 'react';
import {BarChart, PieChart} from "../../../components/chart";
import {Card} from "flowbite-react";

export const AdminDashboardView = () => {
    const reportDetail = [
        {
            label: "All",
            number: 96,
        },
        {
            label: "Approved",
            number: 23,
        },
        {
            label: "Done",
            number: 12,
        },
        {
            label: "Spam",
            number: 152,
        },
    ]


    const data = {
        title: "Reports Per Month",
        xLabels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [12, 19, 3, 5, 2, 3, 9],
    };
    const dataCategory = {
        title: "Trending Category",
        xLabels: ['Community', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [12, 19, 3, 5, 2, 3, 9],
    };

    const dataPieOne = {
        title: "Solved Problem",
        xLabels: ['Solved', 'In Progress',],
        datasets: [12, 19]
    };
    const dataPieSecond = {
        title: "Spam",
        xLabels: ['Spam', 'Not Spam',],
        datasets: [12, 19]
    };
    return (
        <div className="rounded-lg p-3 h-full">
            <div className="flex flex-col space-y-4 h-full">
                <div className="w-full">
                    <div className="flex flex-row space-x-3 w-full">
                        <div className="flex-auto w-1/2">
                            <div className="rounded-xl bg-white dark:bg-gray-900 drop-shadow-md w-full">
                                <BarChart {...data} />
                            </div>
                        </div>
                        <div className="flex-auto w-1/2">
                            <div className="rounded-xl bg-white dark:bg-gray-900 drop-shadow-md">
                                <BarChart {...dataCategory} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full h-full">
                    <div className="flex justify-center items-center h-full">

                        <div className="flex-auto w-1/2 h-full pt-8">
                            <div className="h-full">
                                <div className="flex h-full">
                                    <div className="flex-auto h-full" style={{ flexBasis: '50%' }}>
                                        <PieChart {...dataPieOne} />
                                    </div>
                                    <div className="flex-auto h-full" style={{ flexBasis: '50%' }}>
                                        <PieChart {...dataPieSecond} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex-auto w-1/8 h-full">
                            <div className="h-full">
                                <div className="grid grid-cols-2 gap-3 h-full">
                                    {reportDetail.map((item, index) => (
                                        <div key={index} className="h-full flex items-center justify-center">
                                            <Card className="w-full h-full flex flex-col justify-center items-center">
                                                <div className="text-gray-400 font-nunito font-bold">{item.label}</div>
                                                <div
                                                    className="text-4xl font-bold font-mono text-purple-800">{item.number}</div>
                                            </Card>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
