import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import { PieChart, Pie, Cell, Label } from "recharts";
import { GetGraphData } from "../../Services/Auth";
import { useEffect } from "react";
export const GraphComponent = () => {
  const data = [
    {
      month: "January",
    },
    {
      month: "February",
    },
    {
      month: "March",
    },
    {
      month: "April",
    },
    {
      month: "May",
    },
    {
      month: "June",
    },
    {
      month: "July",
    },
    {
      month: "August",
    },
    {
      month: "September",
    },
    {
      month: "October",
    },
    {
      month: "November",
    },
    {
      month: "December",
    },
  ];

  const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff5733"];

  const [selectedMonth, setSelectedMonth] = React.useState("All");

  const [payLoad, setPayLoad] = React.useState();

  const getGrpahData = async () => {
    try {
      const res = await GetGraphData();
      if (+res?.code === 200) {
        console.log("GRAPH DATA");
        console.log(res);
        setPayLoad(res?.data);
      } else if (+res?.code !== 200) {
        //setDrivers([]);
      }
    } catch (error) {
      // Handle error
      //setDrivers([]);
    }
  };

  const keyCount = 5;
  console.log("PAYLOAD From API");
  console.log(payLoad);

  console.log("DUMMY DATA");
  console.log(data);

  useEffect(() => {
    getGrpahData();
  }, []);

  const CustomXAxisTick = (props) => {
    const { x, y, payload } = props;
    const monthAbbreviation = payload.value.slice(0, 3); // Get first three letters of the month
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="middle" fill="#666">
          {monthAbbreviation}
        </text>
      </g>
    );
  };

  return (
    <div className="ml-80 mt-32  overflow-hidden">
      <div className="grid grid-cols-1">
        <div className="grid grid-cols-4 mt-8 mb-16 ">
          <div className="block max-w-sm p-3 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700  mr-6 ml-6">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Total Users
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              {payLoad?.stats?.total}
            </p>
          </div>
          <div className="block max-w-sm p-3 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mr-6">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Android Users
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              {" "}
              {payLoad?.stats?.android}
            </p>
          </div>
          <div className="block max-w-sm p-3 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mr-6">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              IOS Users
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              {" "}
              {payLoad?.stats?.iOS}
            </p>
          </div>
          <div className="block max-w-sm p-3 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mr-6">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Total Subscribers
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              {" "}
              {payLoad?.stats?.subscription}
            </p>
          </div>
        </div>
        <div className="ml-32 mb-6">
          <label htmlFor="monthSelect" className="font-semibold">
            Select Month:
          </label>
          <select
            id="monthSelect"
            className=" p-2 border rounded ml-2"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option value="All">All</option>
            {data.map((monthData) => (
              <option key={monthData.month} value={monthData.month}>
                {monthData.month}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-1 ml-20 ">
          <LineChart
            width={700}
            height={400}
            data={
              selectedMonth === "All"
                ? payLoad?.graph
                : payLoad?.graph.filter(
                    (monthData) => monthData.month === selectedMonth
                  )
            }
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" tick={<CustomXAxisTick />} />
            <YAxis />
            <Tooltip
              formatter={(value) => value.toLocaleString()}
              content={({ payload }) => {
                if (payload && payload.length) {
                  const {
                    month,
                    total_users,
                    total_subscription,
                    total_videos,
                    total_fleet_manger,
                  } = payload[0].payload;
                  return (
                    <div className="bg-white border border-gray-300 rounded p-2">
                      <p className="mb-1 font-bold text-xl">{month}</p>
                      <p className="mb-1 font-semibold text-md">
                        Total Users: {total_users.toLocaleString()}
                      </p>
                      <p className="mb-1 font-semibold text-md">
                        Total Subscription:{" "}
                        {total_subscription.toLocaleString()}
                      </p>
                      <p className="mb-1 font-semibold text-md">
                        Total Videos: {total_videos.toLocaleString()}
                      </p>
                      <p className="mb-1 font-semibold text-md">
                        Total Fleet Managers:{" "}
                        {total_fleet_manger.toLocaleString()}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />

            {Array.from({ length: keyCount - 1 }, (_, i) => (
              <Line
                key={i}
                type="monotone"
                dataKey={Object.keys(payLoad?.graph?.[0] ?? {})[i + 1]}
                stroke={colors[i % colors.length]}
                name={Object.keys(payLoad?.graph?.[0] ?? {})[i + 1]}
              />
            ))}

            <Legend />
          </LineChart>
        </div>
      </div>
    </div>
  );
};
