import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  ResponsiveContainer,
} from "recharts";
import { Search, ChevronUp, ChevronDown } from "lucide-react";
import Modal from "./ChartModal";
import { Asteroid, DashboardData } from "../types/types";

interface ChartProps {
  dummyData: DashboardData;
}

const Chart: React.FC<ChartProps> = ({ dummyData }) => {
  const [chartData, setChartData] = useState<{ name: string; value: number }[]>(
    []
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedThreatLevel, setSelectedThreatLevel] = useState<string | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Asteroid;
    direction: "asc" | "desc";
  }>({ key: "name", direction: "asc" });

  useEffect(() => {
    if (dummyData?.threatLevelBreakdown) {
      const formattedData = Object.entries(dummyData.threatLevelBreakdown).map(
        ([name, value]) => ({ name, value })
      );
      setChartData(formattedData);
    }
  }, [dummyData]);

  const handleSort = useCallback((column: keyof Asteroid) => {
    setSortConfig((prevConfig) => ({
      key: column,
      direction:
        prevConfig.key === column && prevConfig.direction === "asc"
          ? "desc"
          : "asc",
    }));
  }, []);

  const filteredAsteroids = useMemo(() => {
    return dummyData.asteroids
      .filter(
        (asteroid) =>
          asteroid.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (!selectedThreatLevel || asteroid.threatLevel === selectedThreatLevel)
      )
      .sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key])
          return sortConfig.direction === "asc" ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key])
          return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
  }, [dummyData.asteroids, searchTerm, selectedThreatLevel, sortConfig]);

  const handleBarClick = useCallback((data: { name: string }) => {
    setSelectedThreatLevel(data.name);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => setIsModalOpen(false), []);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value),
    []
  );

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <ChartView chartData={chartData} onBarClick={handleBarClick} />
      <AsteroidModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        selectedThreatLevel={selectedThreatLevel}
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        sortConfig={sortConfig}
        onSort={handleSort}
        filteredAsteroids={filteredAsteroids}
      />
    </div>
  );
};

interface ChartViewProps {
  chartData: { name: string; value: number }[];
  onBarClick: (data: { name: string }) => void;
}

const ChartView: React.FC<ChartViewProps> = ({ chartData, onBarClick }) => (
  <div className="w-full h-64 sm:h-80 md:h-96 lg:h-[400px] mt-8">
    <ResponsiveContainer>
      <BarChart data={chartData}>
        <XAxis dataKey="name" stroke="#A78BFA" />
        <YAxis stroke="#A78BFA" />
        <Tooltip
          contentStyle={{
            backgroundColor: "#1F2937",
            border: "none",
          }}
          cursor={{ fill: "rgba(139, 92, 246, 0.1)" }}
        />
        <Bar
          dataKey="value"
          fill="#8B5CF6"
          onClick={onBarClick}
          cursor="pointer"
        />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

interface AsteroidModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedThreatLevel: string | null;
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  sortConfig: { key: keyof Asteroid; direction: "asc" | "desc" };
  onSort: (column: keyof Asteroid) => void;
  filteredAsteroids: Asteroid[];
}

const AsteroidModal: React.FC<AsteroidModalProps> = ({
  isOpen,
  onClose,
  selectedThreatLevel,
  searchTerm,
  onSearchChange,
  sortConfig,
  onSort,
  filteredAsteroids,
}) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <div className="max-w-full overflow-hidden">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-purple-300">
        {selectedThreatLevel} Threat Level Asteroids
      </h2>
      <SearchInput value={searchTerm} onChange={onSearchChange} />
      <AsteroidTable
        asteroids={filteredAsteroids}
        sortConfig={sortConfig}
        onSort={onSort}
      />
    </div>
  </Modal>
);

interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange }) => (
  <div className="relative mb-4">
    <input
      type="text"
      placeholder="Search asteroids..."
      value={value}
      onChange={onChange}
      className="pl-10 pr-4 py-2 w-full bg-gray-700 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-base"
    />
    <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
  </div>
);

interface AsteroidTableProps {
  asteroids: Asteroid[];
  sortConfig: { key: keyof Asteroid; direction: "asc" | "desc" };
  onSort: (column: keyof Asteroid) => void;
}

const AsteroidTable: React.FC<AsteroidTableProps> = ({
  asteroids,
  sortConfig,
  onSort,
}) => (
  <div className="overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
      <table className="min-w-full divide-y divide-gray-700">
        <thead>
          <tr>
            <TableHeader
              column="name"
              sortConfig={sortConfig}
              onSort={onSort}
            />
            <TableHeader
              column="date"
              sortConfig={sortConfig}
              onSort={onSort}
            />
            <TableHeader
              column="diameter"
              sortConfig={sortConfig}
              onSort={onSort}
            />
            <TableHeader
              column="velocity"
              sortConfig={sortConfig}
              onSort={onSort}
            />
            <TableHeader
              column="missDistance"
              sortConfig={sortConfig}
              onSort={onSort}
            />
            <TableHeader
              column="threatScore"
              sortConfig={sortConfig}
              onSort={onSort}
            />
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {asteroids.map((asteroid) => (
            <AsteroidRow key={asteroid.id} asteroid={asteroid} />
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

interface TableHeaderProps {
  column: keyof Asteroid;
  sortConfig: { key: keyof Asteroid; direction: "asc" | "desc" };
  onSort: (column: keyof Asteroid) => void;
}

const TableHeader: React.FC<TableHeaderProps> = ({
  column,
  sortConfig,
  onSort,
}) => {
  const isActive = sortConfig.key === column;

  return (
    <th className="px-2 sm:px-3 py-3.5 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer">
      <div
        className="flex items-center justify-between"
        onClick={() => onSort(column)}
      >
        <span className="truncate">
          {column.charAt(0).toUpperCase() + column.slice(1)}
        </span>
        <div className="flex flex-col ml-1 flex-shrink-0">
          <ChevronUp
            className={`w-3 h-3 ${
              isActive && sortConfig.direction === "asc"
                ? "text-purple-500"
                : "text-gray-600"
            }`}
          />
          <ChevronDown
            className={`w-3 h-3 ${
              isActive && sortConfig.direction === "desc"
                ? "text-purple-500"
                : "text-gray-600"
            }`}
          />
        </div>
      </div>
    </th>
  );
};

interface AsteroidRowProps {
  asteroid: Asteroid;
}

const AsteroidRow: React.FC<AsteroidRowProps> = ({ asteroid }) => (
  <tr className="hover:bg-gray-750">
    <td className="px-2 sm:px-3 py-4 whitespace-nowrap text-sm">
      <div className="truncate max-w-[100px] sm:max-w-[150px] md:max-w-[200px]">
        {asteroid.name}
      </div>
    </td>
    <td className="px-2 sm:px-3 py-4 whitespace-nowrap text-sm">
      <div className="truncate">{asteroid.date}</div>
    </td>
    <td className="px-2 sm:px-3 py-4 whitespace-nowrap text-sm">
      <div className="truncate">{asteroid.diameter.toFixed(2)} m</div>
    </td>
    <td className="px-2 sm:px-3 py-4 whitespace-nowrap text-sm">
      <div className="truncate">
        {parseFloat(asteroid.velocity).toFixed(2)} km/s
      </div>
    </td>
    <td className="px-2 sm:px-3 py-4 whitespace-nowrap text-sm">
      <div className="truncate">
        {parseFloat(asteroid.missDistance).toLocaleString(undefined, {
          maximumFractionDigits: 0,
        })}{" "}
        km
      </div>
    </td>
    <td className="px-2 sm:px-3 py-4 whitespace-nowrap text-sm">
      <div className="truncate">{asteroid.threatScore.toFixed(2)}</div>
    </td>
  </tr>
);

export default Chart;
