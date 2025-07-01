/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Control, useController } from "react-hook-form";
import { Slider } from "../ui/slider";
import { useState } from "react";
import { formatCurrency } from "@/app/utils/formatCurrency";

interface iAppProps {
  control: Control<any>;
  minSalary?: number;
  maxSalary?: number;
  step?: number;
  currency?: string;
}

export function SalaryRangeSelector({
  control,
  currency,
  maxSalary,
  minSalary,
  step,
}: iAppProps) {
  // Handle undefined salary values
  const safeMinSalary = minSalary ?? 0;
  const safeMaxSalary = maxSalary ?? 100000;

  const { field: fromFiled } = useController({
    name: "salaryFrom",
    control,
  });

  const { field: toFiled } = useController({
    name: "salaryTo",
    control,
  });

  // Use safe values in initial state
  const [range, setRange] = useState<[number, number]>([
    fromFiled.value ?? safeMinSalary,
    toFiled.value ?? safeMaxSalary / 2,
  ]);

  const handleRangeChange = (value: number[]) => {
    const newRange: [number, number] = [value[0], value[1]];
    setRange(newRange);
    fromFiled.onChange(newRange[0]);
    toFiled.onChange(newRange[1]);
  };

  return (
    <div className="w-full space-y-4">
      <Slider
        onValueChange={handleRangeChange}
        min={safeMinSalary}
        max={safeMaxSalary}
        step={step}
        value={range}
      />
      <div className="flex justify-between">
        <span>{formatCurrency(range[0])}</span>
        <span>{formatCurrency(range[1])}</span>
      </div>
    </div>
  );
}
