"use client";

import { useEffect, useState } from "react";

interface FormattedDateProps {
  date: string;
}

export function FormattedDate({ date }: FormattedDateProps) {
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFormattedDate(new Date(date).toLocaleDateString("ar-SA"));
  }, [date]);

  if (!formattedDate) return null;

  return <span>{formattedDate}</span>;
}
