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
import { Asteroid, DummyData } from "../types/asteroidTypes";

interface ChartProps {
  dummyData: DummyData;
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
    <>
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
    </>
  );
};

interface ChartViewProps {
  chartData: { name: string; value: number }[];
  onBarClick: (data: { name: string }) => void;
}

const ChartView: React.FC<ChartViewProps> = ({ chartData, onBarClick }) => (
  <div style={{ width: "100%", height: 300 }}>
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
    <h2 className="text-2xl font-semibold mb-4 text-purple-300">
      {selectedThreatLevel} Threat Level Asteroids
    </h2>
    <SearchInput value={searchTerm} onChange={onSearchChange} />
    <AsteroidTable
      asteroids={filteredAsteroids}
      sortConfig={sortConfig}
      onSort={onSort}
    />
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
      className="pl-10 pr-4 py-2 w-full bg-gray-700 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
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
            <TableHeader
              key={column}
              column={column as keyof Asteroid}
              sortConfig={sortConfig}
              onSort={onSort}
            />
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-700">
        {asteroids.map((asteroid) => (
          <AsteroidRow key={asteroid.id} asteroid={asteroid} />
        ))}
      </tbody>
    </table>
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
}) => (
  <th
    className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
    onClick={() => onSort(column)}
  >
    <div className="flex items-center">
      {column.charAt(0).toUpperCase() + column.slice(1)}
      {sortConfig.key === column &&
        (sortConfig.direction === "asc" ? (
          <ChevronUp className="ml-1 w-4 h-4" />
        ) : (
          <ChevronDown className="ml-1 w-4 h-4" />
        ))}
    </div>
  </th>
);

interface AsteroidRowProps {
  asteroid: Asteroid;
}

const AsteroidRow: React.FC<AsteroidRowProps> = ({ asteroid }) => (
  <tr className="hover:bg-gray-750">
    <td className="px-4 py-3 whitespace-nowrap">{asteroid.name}</td>
    <td className="px-4 py-3 whitespace-nowrap">{asteroid.date}</td>
    <td className="px-4 py-3 whitespace-nowrap">
      {asteroid.diameter.toFixed(2)} m
    </td>
    <td className="px-4 py-3 whitespace-nowrap">
      {parseFloat(asteroid.velocity).toFixed(2)} km/s
    </td>
    <td className="px-4 py-3 whitespace-nowrap">
      {parseFloat(asteroid.missDistance).toLocaleString(undefined, {
        maximumFractionDigits: 0,
      })}{" "}
      km
    </td>
    <td className="px-4 py-3 whitespace-nowrap">
      {asteroid.threatScore.toFixed(2)}
    </td>
  </tr>
);

export default Chart;
