import Dashboard from "../components/Dashboard";
import ReactApexChart from "react-apexcharts";
import NotifListener from "../components/NotifListener";
import { useEffect, useState } from "react";

import api from "../services/api";

export default function DashboardView() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            setLoading(true);

            const res = await api.get("/records");
            setData(res.data ?? []);

        } catch (e) {
            console.error(
                e.response?.data?.msg || e.message
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        console.log("Fetched");
        fetchData();
    }, []);

    /*
     * ============================================================
     * CHART DATA
     * ============================================================
     */

    const timestamps = data.map((record) =>
        new Date(record.created_at).getTime()
    );

    const voltageSeries = [
        {
            name: "Voltage",
            data: data.map((record, index) => ({
                x: timestamps[index],
                y: Number(record.voltage),
            })),
        },
    ];

    const currentSeries = [
        {
            name: "Current",
            data: data.map((record, index) => ({
                x: timestamps[index],
                y: Number(record.current),
            })),
        },
    ];

    const powerSeries = [
        {
            name: "Power",
            data: data.map((record, index) => ({
                x: timestamps[index],
                y: Number(record.power),
            })),
        },
    ];

    const energySeries = [
        {
            name: "Energy",
            data: data.map((record, index) => ({
                x: timestamps[index],
                y: Number(record.energy),
            })),
        },
    ];


    /*
     * ============================================================
     * COMMON CHART OPTIONS
     * ============================================================
     */

    const baseOptions = {
        chart: {
            type: "area",
            toolbar: {
                show: false,
            },
            zoom: {
                enabled: true,
            },
            fontFamily: "inherit",
        },

        dataLabels: {
            enabled: false,
        },

        stroke: {
            curve: "smooth",
            width: 3,
        },

        fill: {
            type: "gradient",
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.25,
                opacityTo: 0.03,
                stops: [0, 90, 100],
            },
        },

        markers: {
            size: 0,
            hover: {
                size: 5,
            },
        },

        xaxis: {
            type: "datetime",

            labels: {
                datetimeUTC: false,
                style: {
                    colors: "#64748b",
                },
            },

            axisBorder: {
                show: false,
            },

            axisTicks: {
                show: false,
            },
        },

        grid: {
            borderColor: "#e2e8f0",
            strokeDashArray: 4,
        },

        tooltip: {
            x: {
                format: "HH:mm:ss",
            },
        },

        legend: {
            show: false,
        },
    };


    /*
     * ============================================================
     * INDIVIDUAL CHART OPTIONS
     * ============================================================
     */

    const voltageOptions = {
        ...baseOptions,

        colors: ["#2F578A"],

        yaxis: {
            title: {
                text: "Voltage (V)",
                style: {
                    color: "#64748b",
                    fontWeight: 500,
                },
            },

            labels: {
                formatter: (value) =>
                    `${Number(value).toFixed(1)} V`,
            },
        },

        tooltip: {
            x: {
                format: "HH:mm:ss",
            },

            y: {
                formatter: (value) =>
                    `${Number(value).toFixed(2)} V`,
            },
        },
    };


    const currentOptions = {
        ...baseOptions,

        colors: ["#36ADA3"],

        yaxis: {
            title: {
                text: "Current (A)",
                style: {
                    color: "#64748b",
                    fontWeight: 500,
                },
            },

            labels: {
                formatter: (value) =>
                    `${Number(value).toFixed(2)} A`,
            },
        },

        tooltip: {
            x: {
                format: "HH:mm:ss",
            },

            y: {
                formatter: (value) =>
                    `${Number(value).toFixed(3)} A`,
            },
        },
    };


    const powerOptions = {
        ...baseOptions,

        colors: ["#232F72"],

        yaxis: {
            title: {
                text: "Power (W)",
                style: {
                    color: "#64748b",
                    fontWeight: 500,
                },
            },

            labels: {
                formatter: (value) =>
                    `${Number(value).toFixed(0)} W`,
            },
        },

        tooltip: {
            x: {
                format: "HH:mm:ss",
            },

            y: {
                formatter: (value) =>
                    `${Number(value).toFixed(2)} W`,
            },
        },
    };


    const energyOptions = {
        ...baseOptions,

        colors: ["#121358"],

        yaxis: {
            title: {
                text: "Energy (kWh)",
                style: {
                    color: "#64748b",
                    fontWeight: 500,
                },
            },

            labels: {
                formatter: (value) =>
                    `${Number(value).toFixed(3)} kWh`,
            },
        },

        tooltip: {
            x: {
                format: "HH:mm:ss",
            },

            y: {
                formatter: (value) =>
                    `${Number(value).toFixed(4)} kWh`,
            },
        },
    };


    /*
     * ============================================================
     * RENDER
     * ============================================================
     */

    return (
        <Dashboard
            child={
                <div className="space-y-6">
                    {/* =================================================
                        HEADER
                    ================================================== */}
                    <div>
                        <h1 className="text-2xl font-bold text-[#121358]">
                            Energy Dashboard
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Real-time electrical measurements for today
                        </p>
                    </div>

                    {/* =================================================
                        STAT CARDS
                    ================================================== */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        {/* Voltage */}
                        <div
                            className="rounded-2xl border border-slate-200
                                        bg-white p-5 shadow-sm"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-slate-500">
                                        Voltage
                                    </p>

                                    <p className="mt-2 text-2xl font-bold text-[#121358]">
                                        {data.length
                                            ? `${Number(
                                                  data[data.length - 1].voltage,
                                              ).toFixed(1)} V`
                                            : "--"}
                                    </p>
                                </div>

                                <div
                                    className="flex h-11 w-11 items-center
                                                justify-center rounded-xl
                                                bg-[#2F578A]/10 text-[#2F578A]"
                                >
                                    <i className="fa fa-bolt text-lg" />
                                </div>
                            </div>
                        </div>

                        {/* Current */}
                        <div
                            className="rounded-2xl border border-slate-200
                                        bg-white p-5 shadow-sm"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-slate-500">
                                        Current
                                    </p>

                                    <p className="mt-2 text-2xl font-bold text-[#121358]">
                                        {data.length
                                            ? `${Number(
                                                  data[data.length - 1].current,
                                              ).toFixed(2)} A`
                                            : "--"}
                                    </p>
                                </div>

                                <div
                                    className="flex h-11 w-11 items-center
                                                justify-center rounded-xl
                                                bg-[#36ADA3]/10 text-[#36ADA3]"
                                >
                                    <i className="fa fa-wave-square text-lg" />
                                </div>
                            </div>
                        </div>

                        {/* Power */}
                        <div
                            className="rounded-2xl border border-slate-200
                                        bg-white p-5 shadow-sm"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-slate-500">
                                        Power
                                    </p>

                                    <p className="mt-2 text-2xl font-bold text-[#121358]">
                                        {data.length
                                            ? `${Number(
                                                  data[data.length - 1].power,
                                              ).toFixed(1)} W`
                                            : "--"}
                                    </p>
                                </div>

                                <div
                                    className="flex h-11 w-11 items-center
                                                justify-center rounded-xl
                                                bg-[#232F72]/10 text-[#232F72]"
                                >
                                    <i className="fa fa-plug text-lg" />
                                </div>
                            </div>
                        </div>

                        {/* Energy */}
                        <div
                            className="rounded-2xl border border-slate-200
                                        bg-white p-5 shadow-sm"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-slate-500">
                                        Energy
                                    </p>

                                    <p className="mt-2 text-2xl font-bold text-[#121358]">
                                        {data.length
                                            ? `${Number(
                                                  data[data.length - 1].energy,
                                              ).toFixed(3)} kWh`
                                            : "--"}
                                    </p>
                                </div>

                                <div
                                    className="flex h-11 w-11 items-center
                                                justify-center rounded-xl
                                                bg-[#121358]/10 text-[#121358]"
                                >
                                    <i className="fa fa-chart-line text-lg" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* =================================================
                        CHARTS
                    ================================================== */}

                    {loading ? (
                        <div
                            className="flex min-h-[400px] items-center
                                        justify-center rounded-2xl
                                        border border-slate-200 bg-white"
                        >
                            <div className="text-center">
                                <div
                                    className="mx-auto mb-3 h-8 w-8
                                                animate-spin rounded-full
                                                border-4 border-slate-200
                                                border-t-[#36ADA3]"
                                />

                                <p className="text-sm text-slate-500">
                                    Loading electrical data...
                                </p>
                            </div>
                        </div>
                    ) : data.length === 0 ? (
                        <div
                            className="flex min-h-[400px] items-center
                                        justify-center rounded-2xl
                                        border border-slate-200 bg-white"
                        >
                            <div className="text-center">
                                <div
                                    className="mx-auto mb-3 flex h-12 w-12
                                                items-center justify-center
                                                rounded-xl bg-[#121358]/10
                                                text-[#121358]"
                                >
                                    <i className="fa fa-chart-line text-xl" />
                                </div>

                                <h3 className="font-semibold text-[#121358]">
                                    No data available
                                </h3>

                                <p className="mt-1 text-sm text-slate-500">
                                    There are no records for today.
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                            {/* Voltage */}
                            <div
                                className="rounded-2xl border border-slate-200
                                            bg-white p-5 shadow-sm"
                            >
                                <div className="mb-4">
                                    <h2 className="font-semibold text-[#121358]">
                                        Voltage
                                    </h2>

                                    <p className="text-xs text-slate-400">
                                        Voltage measurements throughout the day
                                    </p>
                                </div>

                                <ReactApexChart
                                    options={voltageOptions}
                                    series={voltageSeries}
                                    type="area"
                                    height={300}
                                />
                            </div>

                            {/* Current */}
                            <div
                                className="rounded-2xl border border-slate-200
                                            bg-white p-5 shadow-sm"
                            >
                                <div className="mb-4">
                                    <h2 className="font-semibold text-[#121358]">
                                        Current
                                    </h2>

                                    <p className="text-xs text-slate-400">
                                        Current measurements throughout the day
                                    </p>
                                </div>

                                <ReactApexChart
                                    options={currentOptions}
                                    series={currentSeries}
                                    type="area"
                                    height={300}
                                />
                            </div>

                            {/* Power */}
                            <div
                                className="rounded-2xl border border-slate-200
                                            bg-white p-5 shadow-sm"
                            >
                                <div className="mb-4">
                                    <h2 className="font-semibold text-[#121358]">
                                        Power Consumption
                                    </h2>

                                    <p className="text-xs text-slate-400">
                                        Power usage throughout the day
                                    </p>
                                </div>

                                <ReactApexChart
                                    options={powerOptions}
                                    series={powerSeries}
                                    type="area"
                                    height={300}
                                />
                            </div>

                            {/* Energy */}
                            <div
                                className="rounded-2xl border border-slate-200
                                            bg-white p-5 shadow-sm"
                            >
                                <div className="mb-4">
                                    <h2 className="font-semibold text-[#121358]">
                                        Energy Consumption
                                    </h2>

                                    <p className="text-xs text-slate-400">
                                        Accumulated energy throughout the day
                                    </p>
                                </div>

                                <ReactApexChart
                                    options={energyOptions}
                                    series={energySeries}
                                    type="area"
                                    height={300}
                                />
                            </div>
                        </div>
                    )}

                    <NotifListener
                        listenOn="new-data"
                        eventName="NewData"
                        onTrigger={() => {
                            console.log("Fetching data");
                            fetchData();
                        }}
                        
                    />
                </div>
            }
        />
    );
}

