"use client";
import { PageType, RealisationType } from "../page";

export default function RealisationClient({
  page,
}: {
  page: PageType<RealisationType>;
}) {
  return (
    <div>
      <ul className="filter"></ul>
    </div>
  );
}
