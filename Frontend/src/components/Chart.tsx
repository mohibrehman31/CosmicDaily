import React, { useState, useEffect } from "react";
import {
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  ResponsiveContainer,
} from "recharts";
import { Search, ChevronUp, ChevronDown } from "lucide-react";
import Modal from "./ChartModal"; // Adjust the import path as needed

interface Asteroid {
  id: string;
  name: string;
  date: string;
  diameter: number;
  velocity: string;
  missDistance: string;
  threatScore: number;
  threatLevel: string;
}

interface DummyData {
  threatLevelBreakdown: {
    [key: string]: number;
  };
  asteroids: Asteroid[];
}

interface ChartWithModalProps {
  dummyData: DummyData;
}

const Chart: React.FC<ChartWithModalProps> = ({ dummyData }) => {
  const [chartData, setChartData] = useState<{ name: string; value: number }[]>(
    []
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedThreatLevel, setSelectedThreatLevel] = useState<string | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortColumn, setSortColumn] = useState<keyof Asteroid>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    if (dummyData && dummyData.threatLevelBreakdown) {
      const formattedData = Object.entries(dummyData.threatLevelBreakdown).map(
        ([name, value]) => ({ name, value })
      );
      setChartData(formattedData);
    }
  }, [dummyData]);

  const handleSort = (column: keyof Asteroid) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const filteredAsteroids = React.useMemo(() => {
    return dummyData.asteroids
      .filter(
        (asteroid) =>
          asteroid.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (!selectedThreatLevel || asteroid.threatLevel === selectedThreatLevel)
      )
      .sort((a, b) => {
        if (a[sortColumn] < b[sortColumn])
          return sortDirection === "asc" ? -1 : 1;
        if (a[sortColumn] > b[sortColumn])
          return sortDirection === "asc" ? 1 : -1;
        return 0;
      });
  }, [
    dummyData.asteroids,
    searchTerm,
    selectedThreatLevel,
    sortColumn,
    sortDirection,
  ]);

  const threatLevelColors: Record<string, string> = {
    Low: "bg-green-500",
    Medium: "bg-yellow-500",
    High: "bg-orange-500",
    Extreme: "bg-red-500",
  };

  return (
    <>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={chartData}>
            <XAxis dataKey="name" stroke="#A78BFA" />
            <YAxis stroke="#A78BFA" />
            <Tooltip
              contentStyle={{ backgroundColor: "#1F2937", border: "none" }}
            />
            <Bar
              dataKey="value"
              fill="#8B5CF6"
              onClick={(data) => {
                setSelectedThreatLevel(data.name);
                setIsModalOpen(true);
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-2xl font-semibold mb-4 text-purple-300">
          {selectedThreatLevel} Threat Level Asteroids
        </h2>
        <div className="flex justify-between items-center mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search asteroids..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-gray-700 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-800">
            <thead className="bg-gray-900">
              <tr>
                {[
                  "name",
                  "date",
                  "diameter",
                  "velocity",
                  "missDistance",
                  "threatScore",
                ].map((column) => (
                  <th
                    key={column}
                    className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort(column as keyof Asteroid)}
                  >
                    <div className="flex items-center">
                      {column.charAt(0).toUpperCase() + column.slice(1)}
                      {sortColumn === column &&
                        (sortDirection === "asc" ? (
                          <ChevronUp className="ml-1 w-4 h-4" />
                        ) : (
                          <ChevronDown className="ml-1 w-4 h-4" />
                        ))}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredAsteroids.map((asteroid) => (
                <tr key={asteroid.id} className="hover:bg-gray-750">
                  <td className="px-4 py-3 whitespace-nowrap">
                    {asteroid.name}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {asteroid.date}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {asteroid.diameter.toFixed(2)} m
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {parseFloat(asteroid.velocity).toFixed(2)} km/s
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {parseFloat(asteroid.missDistance).toLocaleString(
                      undefined,
                      {
                        maximumFractionDigits: 0,
                      }
                    )}{" "}
                    km
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {asteroid.threatScore.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Modal>
    </>
  );
};

export default Chart;
