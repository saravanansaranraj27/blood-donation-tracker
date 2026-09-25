import { useMemo } from "react";
import { RECORDS_RAW } from "../data/donor.js";
import {
  calculateAverageGap,
  calculateConsistency,
  calculateDonationStats,
  calculateNextDonationDate,
  calculateYearlyStats,
  sortRecordsByDate,
} from "../utils/donationAnalytics.js";

export default function useDashboardData() {
  const sortedRecords = useMemo(() => sortRecordsByDate(RECORDS_RAW), []);
  const stats = useMemo(
    () => calculateDonationStats(sortedRecords),
    [sortedRecords],
  );
  const yearlyStats = useMemo(
    () => calculateYearlyStats(sortedRecords),
    [sortedRecords],
  );
  const avgGap = useMemo(
    () => calculateAverageGap(sortedRecords),
    [sortedRecords],
  );
  const nextDonationDate = useMemo(
    () => calculateNextDonationDate(stats.latest, avgGap),
    [stats.latest, avgGap],
  );
  const consistencyData = useMemo(
    () => calculateConsistency(sortedRecords),
    [sortedRecords],
  );

  return {
    sortedRecords,
    stats,
    yearlyStats,
    avgGap,
    nextDonationDate,
    consistencyData,
  };
}
