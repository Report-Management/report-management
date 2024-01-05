import React, { useState, useEffect } from 'react';
import { BarChart, PieChart } from "../../../components/chart/index.jsx";
import { Card } from "flowbite-react";
import { DashboardRepository } from "./repository.js";
import { Loading } from "../../../components/index.jsx";
import { Dropdown } from 'flowbite-react';

const AdminDashboardView = () => {
  const [loading, setLoading] = useState(true);
  const [dataReportMonth, setDataReportMonth] = useState();
  const [dataReportCategoryYear, setDataReportCategoryYear] = useState();
  const [dataReportSolve, setDataReportSolve] = useState();
  const [dataReportSpam, setDataReportSpam] = useState();
  const [dataReportDetail, setDataReportDetail] = useState();

  const [thisYear, setThisYear] = useState();
  const [thisMonth, setThisMonth] = useState();
  const [allYear, setAllYear] = useState();
  const [allMonth, setAllMonth] = useState(["All", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]);

  const [bar1, setBar1] = useState();
  const [bar1Label, setBar1Label] = useState();
  const [bar2, setBar2] = useState();
  const [bar2Label, setBar2Label] = useState();
  
  const [pie1Year, setPie1Year] = useState();
  const [pie1YearLabel, setPie1YearLabel] = useState();
  const [pie1Month, setPie1Month] = useState();
  const [pie1MonthLabel, setPie1MonthLabel] = useState();

  const [pie2Year, setPie2Year] = useState();
  const [pie2YearLabel, setPie2YearLabel] = useState();
  const [pie2Month, setPie2Month] = useState();
  const [pie2MonthLabel, setPie2MonthLabel] = useState();

  const checkData = () => {
    if (
      dataReportMonth === undefined ||
      dataReportCategoryYear === undefined ||
      dataReportSolve === undefined ||
      dataReportSpam === undefined ||
      dataReportDetail === undefined
    ) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  };

  const convert_months = (month) => {
    const months = {
      "All": 0, "Jan": 1, "Feb": 2, "Mar": 3, "Apr": 4, "May": 5, "Jun": 6, "Jul": 7, "Aug": 8, "Sep": 9, "Oct": 10, "Nov": 11, "Dec": 12
    }
    return months[month]
  }

  const getData = async () => {
    await getReport(bar1Label);
    await getReportCategory(bar2Label);
    await getReportSolve(pie1YearLabel, pie1MonthLabel);
    await getReportSpam(pie2YearLabel, pie2MonthLabel);
    await getReportDetail();
  }

  const getReport = async (year) => {
    const dashboardRepository = new DashboardRepository();
    let result = null;
    if (year === 0) {
      result = await dashboardRepository.getReportYear();
    }
    else {
      result = await dashboardRepository.getReportMonth(year);
    }
    if (result !== null) {
      setDataReportMonth(result);
      checkData();
    }
  };

  const getReportCategory = async (year) => {
    const dashboardRepository = new DashboardRepository();
    let result = null;
    if (year === 0) {
      result = await dashboardRepository.getReportCategoryAll();
    } else {
      result = await dashboardRepository.getReportCategoryYear(year);
    }
    if (result !== null) {
      setDataReportCategoryYear(result);
      checkData();
    }
  }

  const getReportSolve = async (year, month) => {
    const dashboardRepository = new DashboardRepository();
    const result = await dashboardRepository.getReportSolve(year, convert_months(month));
    if (result !== null) {
      setDataReportSolve(result);
      checkData();
    }
  }

  const getReportSpam = async (year, month) => {
    const dashboardRepository = new DashboardRepository();
    const result = await dashboardRepository.getReportSpam(year, convert_months(month));
    if (result !== null) {
      setDataReportSpam(result);
      checkData();
    }
  }

  const getReportDetail = async () => {
    const dashboardRepository = new DashboardRepository();
    const result = await dashboardRepository.getReportDetail();
    if (result !== null) {
      setDataReportDetail(result);
      checkData();
    }
  }

  const getDate = async () => {
    const dashboardRepository = new DashboardRepository();
    const result = await dashboardRepository.getDate();
    if (result !== null) {
      setThisYear(result.thisYear);
      setThisMonth(result.thisMonth);
      setAllYear(result.allYear);
      setBar1(result.allYear);
      setBar1Label(result.thisYear);
      setBar2(result.allYear);
      setBar2Label(result.thisYear);
      setPie1Year(result.allYear);
      setPie1YearLabel(0);
      setPie1Month(result.thisMonth);
      setPie1MonthLabel("All");
      setPie2Year(result.allYear);
      setPie2YearLabel(0);
      setPie2Month(result.thisMonth);
      setPie2MonthLabel("All");

      getData();
    }
  }

  const handleBar1 = async (item) => {
    setBar1Label(item);
    await getReport(item);
  }

  const handleBar2 = async (item) => {
    setBar2Label(item);
    await getReportCategory(item);
  }

  const handlepie1Year = async (item) => {
    if (item === 0 && pie1MonthLabel !== 0) {
      setPie1MonthLabel("All");
    }
    if (item === thisYear) {
      setPie1Month(thisMonth);
      setPie1MonthLabel("All");
    } else {
      setPie1Month(allMonth);
    }
    setPie1YearLabel(item);
    await getReportSolve(item, pie1MonthLabel);
  }

  const handlepie1Month = async (item) => {
    setPie1MonthLabel(item);
    await getReportSolve(pie1YearLabel, item);
  }

  const handlepie2Year = async (item) => {
    if (item === 0 && pie2MonthLabel !== 0) {
      setPie2MonthLabel("All");
    }
    if (item === thisYear) {
      setPie2Month(thisMonth);
      setPie2MonthLabel("All");
    } else {
      setPie2Month(allMonth);
    }
    setPie2YearLabel(item);
    await getReportSpam(item, pie2MonthLabel);
  }

  const handlepie2Month = async (item) => {
    setPie2MonthLabel(item);
    await getReportSpam(pie2YearLabel, item);
  }

  useEffect(() => {
    getDate();
  }, []);

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
                <Dropdown label={bar1Label === 0 ? "All Year" : bar1Label} dismissOnClick={false} color="light">
                  {bar1.map((item, index) => (
                    <Dropdown.Item key={index} onClick={() => handleBar1(item)}>{item === 0 ? "All Year" : item}</Dropdown.Item>
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
                <Dropdown label={bar2Label === 0 ? "All" : bar2Label} dismissOnClick={false} color="light">
                  {bar2.map((item, index) => (
                    <Dropdown.Item key={index} onClick={() => handleBar2(item)}>{item === 0 ? "All" : item}</Dropdown.Item>
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
                      <Dropdown label={pie1YearLabel === 0 ? "All" : pie1YearLabel} dismissOnClick={false} color="light">
                        {pie1Year.map((item, index) => (
                          <Dropdown.Item key={index} onClick={() => handlepie1Year(item)}>{item === 0 ? "All" : item}</Dropdown.Item>
                        ))}
                      </Dropdown>
                      <Dropdown label={pie1MonthLabel} dismissOnClick={false} color="light">
                        {pie1Month.map((item, index) => (
                          <Dropdown.Item key={index} onClick={() => handlepie1Month(item)}>{item}</Dropdown.Item>
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
                      <Dropdown label={pie2YearLabel === 0 ? "All" : pie2YearLabel} dismissOnClick={false} color="light">
                        {pie2Year.map((item, index) => (
                          <Dropdown.Item key={index} onClick={() => handlepie2Year(item)}>{item === 0 ? "All" : item}</Dropdown.Item>
                        ))}
                      </Dropdown>
                      <Dropdown label={pie2MonthLabel} dismissOnClick={false} color="light">
                        {pie2Month.map((item, index) => (
                          <Dropdown.Item key={index} onClick={() => handlepie2Month(item)}>{item}</Dropdown.Item>
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
