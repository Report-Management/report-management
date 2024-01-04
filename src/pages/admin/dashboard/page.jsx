import React, { Component } from 'react';
import { BarChart, PieChart } from "../../../components/chart/index.jsx";
import { Card } from "flowbite-react";
import { DashboardRepository } from "./repository.js";
import { Loading } from "../../../components/index.jsx";
import { Dropdown } from 'flowbite-react';

export class AdminDashboardView extends Component {
    state = {
        loading: true,
    };

    getReport = async (year) => {
        const dashboardRepository = new DashboardRepository();
        let result = null;
        if (year === 0) {
            result = await dashboardRepository.getReportYear();
        }
        else {
            result = await dashboardRepository.getReportMonth(year);
        }
        // console.log(result);
        if (result !== null) {
            this.setState({ dataReportMonth: result });
        }
    };

    getReportCategory = async (year) => {
        const dashboardRepository = new DashboardRepository();
        let result = null;
        if (year === 0) {
            result = await dashboardRepository.getReportCategoryAll();
        } else {
            result = await dashboardRepository.getReportCategoryYear(year);
        }
        if (result !== null) {
            this.setState({ dataReportCategoryYear: result });
        }
    }

    getReportSolve = async (year, month) => {
        const dashboardRepository = new DashboardRepository();
        const result = await dashboardRepository.getReportSolve(year, this.convert_months(month));
        if (result !== null) {
            this.setState({ dataReportSolve: result });
        }
    }

    getReportSpam = async (year, month) => {
        const dashboardRepository = new DashboardRepository();
        const result = await dashboardRepository.getReportSpam(year, this.convert_months(month));
        if (result !== null) {
            this.setState({ dataReportSpam: result });
        }
    }

    getReportDetail = async () => {
        const dashboardRepository = new DashboardRepository();
        const result = await dashboardRepository.getReportDetail();
        if (result !== null) {
            this.setState({ dataReportDetail: result });
        }
    }

    getDate = async () => {
        const dashboardRepository = new DashboardRepository();
        const result = await dashboardRepository.getDate();
        if (result !== null) {
            this.setState({
                thisYear: result.thisYear,
                thisMonth: result.thisMonth,
                allYear: result.allYear,
                allMonth: ["All", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                bar1: result.allYear,
                bar1Label: result.thisYear,
                bar2: result.allYear,
                bar2Label: result.thisYear,
                pie1Year: result.allYear,
                pie1YearLabel: 0,
                pie1Month: result.thisMonth,
                pie1MonthLabel: "All",
                pie2Year: result.allYear,
                pie2YearLabel: 0,
                pie2Month: result.thisMonth,
                pie2MonthLabel: "All",
            });
        }
    }

    handleBar1 = async (item) => {
        this.setState({ bar1Label: item });
        await this.getReport(item);
    }

    handleBar2 = async (item) => {
        this.setState({ bar2Label: item });
        await this.getReportCategory(item);
    }

    handlepie1Year = async (item) => {
        if (item === 0 && this.state.pie1MonthLabel !== 0) {
            this.setState({ pie1MonthLabel: "All" });
        }
        if (item === this.state.thisYear) {
            this.setState({ pie1Month: this.state.thisMonth });
            this.setState({ pie1MonthLabel: "All" });
        } else {
            this.setState({ pie1Month: this.state.allMonth })
        }
        this.setState({ pie1YearLabel: item });
        await this.getReportSolve(item, this.state.pie1MonthLabel);
    }

    handlepie1Month = async (item) => {
        this.setState({ pie1MonthLabel: item });
        await this.getReportSolve(this.state.pie1YearLabel, item);
    }

    handlepie2Year = async (item) => {
        if (item === 0 && this.state.pie2MonthLabel !== 0) {
            this.setState({ pie2MonthLabel: "All" });
        }
        if (item === this.state.thisYear) {
            this.setState({ pie2Month: this.state.thisMonth });
            this.setState({ pie2MonthLabel: "All" });
        } else {
            this.setState({ pie2Month: this.state.allMonth })
        }
        this.setState({ pie2YearLabel: item });
        await this.getReportSpam(item, this.state.pie2MonthLabel);
    }

    handlepie2Month = async (item) => {
        this.setState({ pie2MonthLabel: item });
        await this.getReportSpam(this.state.pie2YearLabel, item);
    }

    checkData = () => {
        if (this.state.dataReportMonth === undefined
            || this.state.dataReportCategoryYear === undefined
            || this.state.dataReportSolve === undefined
            || this.state.dataReportSpam === undefined
            || this.state.dataReportDetail === undefined) {
            this.setState({ loading: true });
        } else {
            this.setState({ loading: false });
        }
    }

    convert_months(month){
        const months = {"All":0, "Jan":1, "Feb":2, "Mar":3, "Apr":4, "May":5, "Jun":6,"Jul":7, "Aug":8, "Sep":9, "Oct":10, "Nov":11, "Dec":12}
        return months[month]
    }

    getData = async () => {
        await this.getDate();
        await this.getReport(this.state.bar1Label);
        await this.getReportCategory(this.state.bar2Label);
        await this.getReportSolve(this.state.pie1YearLabel, this.state.pie1MonthLabel);
        await this.getReportSpam(this.state.pie2YearLabel, this.state.pie2MonthLabel);
        await this.getReportDetail();
        await this.checkData();
    }

    async componentDidMount() {
        await this.getData();
    }

    render() {
        const { loading, dataReportMonth, dataReportCategoryYear, dataReportSolve, dataReportSpam, dataReportDetail } = this.state;

        if (loading) {
            return <Loading /> // Render a loading message or spinner
        }

        return (
            <div className="rounded-lg p-3 h-full">
                <div className="flex flex-col space-y-4 h-full">
                    <div className="w-full">
                        <div className="flex flex-row space-x-3 w-full">
                            <div className="flex-auto w-1/2">
                                <div className="rounded-xl bg-white dark:bg-gray-900 drop-shadow-md w-full" >
                                    <Dropdown label={this.state.bar1Label === 0 ? "All Year" : this.state.bar1Label} dismissOnClick={false} color="light">
                                        {this.state.bar1.map((item, index) => (
                                            <Dropdown.Item key={index} onClick={() => this.handleBar1(item)}>{item === 0 ? "All Year" : item}</Dropdown.Item>
                                        ))}
                                    </Dropdown>

                                    <BarChart
                                        title={dataReportMonth.title}
                                        xLabels={dataReportMonth.xLabels}
                                        datasets={dataReportMonth.datasets}
                                    />

                                </div>
                            </div>
                            <div className="flex-auto w-1/2">
                                <div className="rounded-xl bg-white dark:bg-gray-900 drop-shadow-md">
                                    <Dropdown label={this.state.bar2Label === 0 ? "All" : this.state.bar2Label} dismissOnClick={false} color="light">
                                        {this.state.bar2.map((item, index) => (
                                            <Dropdown.Item key={index} onClick={() => this.handleBar2(item)}>{item === 0 ? "All" : item}</Dropdown.Item>
                                        ))}
                                    </Dropdown>
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
                                        <div className="rounded-xl bg-white dark:bg-gray-900 drop-shadow-md m-2">
                                            <div className="flex-auto h-full" style={{ flexBasis: '50%' }}>
                                                <Dropdown label={this.state.pie1YearLabel === 0 ? "All" : this.state.pie1YearLabel} dismissOnClick={false} color="light">
                                                    {this.state.pie1Year.map((item, index) => (
                                                        <Dropdown.Item key={index} onClick={() => this.handlepie1Year(item)}>{item === 0 ? "All" : item}</Dropdown.Item>
                                                    ))}
                                                </Dropdown>
                                                <Dropdown label={this.state.pie1MonthLabel} dismissOnClick={false} color="light">
                                                    {this.state.pie1Month.map((item, index) => (
                                                        <Dropdown.Item key={index} onClick={() => this.handlepie1Month(item)}>{item}</Dropdown.Item>
                                                    ))}
                                                </Dropdown>
                                                <PieChart
                                                    title={dataReportSolve.title}
                                                    xLabels={dataReportSolve.xLabels}
                                                    datasets={dataReportSolve.datasets}
                                                />
                                            </div>
                                        </div>
                                        <div className="rounded-xl bg-white dark:bg-gray-900 drop-shadow-md m-2">
                                            <div className="flex-auto h-full" style={{ flexBasis: '50%' }}>
                                                <Dropdown label={this.state.pie2YearLabel === 0 ? "All" : this.state.pie2YearLabel} dismissOnClick={false} color="light">
                                                    {this.state.pie2Year.map((item, index) => (
                                                        <Dropdown.Item key={index} onClick={() => this.handlepie2Year(item)}>{item === 0 ? "All" : item}</Dropdown.Item>
                                                    ))}
                                                </Dropdown>
                                                <Dropdown label={this.state.pie2MonthLabel} dismissOnClick={false} color="light">
                                                    {this.state.pie2Month.map((item, index) => (
                                                        <Dropdown.Item key={index} onClick={() => this.handlepie2Month(item)}>{item}</Dropdown.Item>
                                                    ))}
                                                </Dropdown>
                                                <PieChart
                                                    title={dataReportSpam.title}
                                                    xLabels={dataReportSpam.xLabels}
                                                    datasets={dataReportSpam.datasets}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex-auto w-1/8 h-full">
                                <div className="h-full">
                                    <div className="grid grid-cols-2 gap-3 h-full">
                                        {dataReportDetail.reportDetail.map((item, index) => (
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
    }
}
