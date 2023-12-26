import React, { useEffect, useState } from 'react';
import { BarChart, PieChart } from "../../../components/chart";
import { Card } from "flowbite-react";
import { DashboardRepository } from "./repository.js";
import { Loading } from "../../../components/index.jsx";


export const AdminDashboardView = () => {
    const [dataReportMonth, setReportMonth] = useState({});
    const [dataReportCategoryYear, setReportCategoryYear] = useState({});
    const [dataReportSolve, setReportSolve] = useState({});
    const [dataReportSpam, setReportSpam] = useState({});
    const [dataReportDetail, setReportDetail] = useState({});
    const [isLoading, setLoading] = useState(false);

    async function getReportMonth() {
        const dashboardRepository = new DashboardRepository();
        const result = await dashboardRepository.getReportMonth();
        if (result !== null) {
            setReportMonth(result);  
        }
    }

    async function getReportCategoryYear() {
        const dashboardRepository = new DashboardRepository();
        const result = await dashboardRepository.getReportCategoryYear();
        if (result !== null) {
            setReportCategoryYear(result);
        }
    }

    async function getReportSolve() {
        const dashboardRepository = new DashboardRepository();
        const result = await dashboardRepository.getReportSolve();
        if (result !== null) {
            setReportSolve(result);
        }
    }

    async function getReportSpam() {
        const dashboardRepository = new DashboardRepository();
        const result = await dashboardRepository.getReportSpam();
        if (result !== null) {
            setReportSpam(result);
            
        }
    }

    async function getReportDetail() {
        const dashboardRepository = new DashboardRepository();
        const result = await dashboardRepository.getReportDetail();
        if (result !== null) {
            setReportDetail(result);
            
        }
    }


    useEffect(() => {
        const fetchData = async () => {
            try {
                await setLoading(true);
                await getReportSolve();
                await getReportMonth();
                await getReportCategoryYear();
                await getReportSpam();
                await getReportDetail();
        
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                await setLoading(false);
            }
        };
    
        fetchData();
    }, []);

    const reportDetails = [
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
        xLabels: ['Solved', 'In Progress'],
        datasets: [12, 19]
    };
    const dataPieSecond = {
        title: "Spam",
        xLabels: ['Spam', 'Not Spam',],
        datasets: [12, 19]
    };

    if (isLoading) {
        <div className="h-screen">
            <Loading />
        </div>

    }

    return (
        <div className="rounded-lg p-3 h-full">
            <div className="flex flex-col space-y-4 h-full">
                <div className="w-full">
                    <div className="flex flex-row space-x-3 w-full">
                        <div className="flex-auto w-1/2">
                            <div className="rounded-xl bg-white dark:bg-gray-900 drop-shadow-md w-full">
                                <BarChart
                                    title={dataReportMonth.title}
                                    xLabels={dataReportMonth.xLabels}
                                    datasets={dataReportMonth.datasets}
                                />
                            </div>
                        </div>
                        <div className="flex-auto w-1/2">
                            <div className="rounded-xl bg-white dark:bg-gray-900 drop-shadow-md">
                                <BarChart 
                                    title={dataReportCategoryYear.title}
                                    xLabels={dataReportCategoryYear.xLabels}
                                    datasets={dataReportCategoryYear.datasets}
                                />
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
                                        <PieChart   {...dataPieOne}
                                            // title={dataPieOne.title}
                                            // xLabels={dataPieOne.xLabels}
                                            // datasets={dataPieOne.datasets}
                                        />
                                    </div>
                                    <div className="flex-auto h-full" style={{ flexBasis: '50%' }}>
                                        <PieChart {...dataPieSecond}
                                            // title={dataReportSpam.title}
                                            // xLabels={dataReportSpam.xLabels}
                                            // datasets={dataReportSpam.datasets}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex-auto w-1/8 h-full">
                            <div className="h-full">
                                <div className="grid grid-cols-2 gap-3 h-full">
                                    {reportDetails.map((item, index) => (
                                        
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
