"use client";

import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function AnnouncementBanner({
  announcementReference,
}: {
  announcementReference: { message: string; status?: "info" | "warning" | "error" };
}) {
  const [visible, setVisible] = useState(true);

  if (!announcementReference?.message || !visible) return null;

  const status = announcementReference.status ?? "info";
  const baseStyle = "text-sm font-medium px-4 py-2 flex items-center justify-between";
  const statusStyles = {
    info: "bg-indigo-500 text-white",
    warning: "bg-yellow-500 text-black",
    error: "bg-red-600 text-white",
  };

  return (
    <div className={`${baseStyle} ${statusStyles[status]}`}>
      <div>{announcementReference.message}</div>
      <button
        onClick={() => setVisible(false)}
        className="ml-4 flex-shrink-0 hover:opacity-75 focus:outline-none"
        aria-label="Dismiss"
      >
        <XMarkIcon className="h-5 w-5" />
      </button>
    </div>
  );
}
