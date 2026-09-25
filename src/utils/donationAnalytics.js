import { ELIGIBILITY_THRESHOLD } from "../data/donor.js";
import { parseDate } from "./date.js";

export function sortRecordsByDate(records) {
  return [...records].sort((a, b) => parseDate(a.date) - parseDate(b.date));
}

export function calculateDonationStats(records) {
  const hbValues = records.map((record) => record.hb);
  const total = records.length;
  const sum = hbValues.reduce((a, b) => a + b, 0);
  const average = sum / total;
  const highest = records.reduce((a, b) => (b.hb > a.hb ? b : a));
  const lowest = records.reduce((a, b) => (b.hb < a.hb ? b : a));
  const first = records[0];
  const latest = records[records.length - 1];

  return { total, average, highest, lowest, first, latest };
}

export function calculateYearlyStats(records) {
  const years = {};

  records.forEach((record) => {
    const year = record.date.split(" ")[2];
    years[year] = (years[year] || 0) + 1;
  });

  return Object.keys(years).map((year) => ({
    name: year,
    count: years[year],
  }));
}

export function calculateAverageGap(records) {
  if (records.length < 2) return 0;

  let totalDays = 0;
  for (let i = 1; i < records.length; i += 1) {
    const previous = parseDate(records[i - 1].date);
    const current = parseDate(records[i].date);
    totalDays += (current - previous) / (1000 * 60 * 60 * 24);
  }

  return Math.round(totalDays / (records.length - 1));
}

export function calculateNextDonationDate(latestRecord, averageGap) {
  if (!latestRecord) return null;

  const nextDate = new Date(parseDate(latestRecord.date));
  nextDate.setDate(nextDate.getDate() + (averageGap || 90));
  return nextDate;
}

export function calculateConsistency(records) {
  const recent = records.slice(-3);
  let result = {
    status: "Building Data",
    detail: "Need 3+ records",
    icon: "clock",
  };

  if (recent.length < 3) return result;

  const values = recent.map((record) => record.hb);
  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  const squareDiffs = values.map((value) => Math.pow(value - mean, 2));
  const avgSquareDiff = squareDiffs.reduce((a, b) => a + b, 0) / values.length;
  const stdDev = Math.sqrt(avgSquareDiff);
  const cv = (stdDev / mean) * 100;
  const isBelowThreshold = values.some(
    (value) => value < ELIGIBILITY_THRESHOLD,
  );
  const isDropping = values[2] < values[1] && values[1] < values[0];

  if (isBelowThreshold) {
    result = {
      status: "Attention Needed",
      detail: "Recent Hb < 12.5 g/dl",
      icon: "alert",
    };
  } else if (cv > 5) {
    result = {
      status: "Variable",
      detail: "High fluctuation in recent readings",
      icon: "activity",
    };
  } else if (isDropping) {
    result = {
      status: "Declining Trend",
      detail: "Consistent drop in last 3 visits",
      icon: "trendingDown",
    };
  } else {
    result = {
      status: "Stable",
      detail: "Consistent healthy levels",
      icon: "shield",
    };
  }

  return result;
}

export function getRecordTier(record, average) {
  if (record.hb < ELIGIBILITY_THRESHOLD) return "low";
  return record.hb >= average ? "high" : "mid";
}
