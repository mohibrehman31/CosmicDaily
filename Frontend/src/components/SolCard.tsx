import React from "react";
import { GlassCard } from "./GlassCard";
import { SolData } from "../types";

interface SolCardProps {
  sol: string;
  data: SolData;
}

export const SolCard: React.FC<SolCardProps> = ({ sol, data }) => (
  <GlassCard>
    <p className="font-bold text-white">Sol {sol}</p>
    <p className="text-sm text-white">
      {new Date(data.First_UTC).toLocaleDateString()}
    </p>
    <p className="mt-2 text-white">High: {data.AT.mx.toFixed(1)}° C</p>
    <p className="text-white">Low: {data.AT.mn.toFixed(1)}° C</p>
    <p className="text-white">Wind: {data.WD.most_common.compass_point}</p>
  </GlassCard>
);
