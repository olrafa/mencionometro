import { Mention } from "../types";

// import { generateTimestamps } from "./generateTimestamps";

export const summarizeData = (data: Mention[]) => {
  const mentionsWithDates = data.map((d) => {
    const fixedDate = new Date(d.created_at);
    fixedDate.setMinutes(0);
    fixedDate.setSeconds(0);
    fixedDate.setMilliseconds(0);

    return { ...d, date: fixedDate };
  });

  const runHours = [
    ...new Set(mentionsWithDates.map((item) => item.date.toString())),
  ].sort((date1, date2) => (date1 > date2 ? -1 : 1));

  const mentionsByHours = runHours.map((runHour) => ({
    runHour,
    mentions: mentionsWithDates.filter(
      ({ date }) => date.toString() === runHour,
    ).length,
  }));

  // Get time of first run
  // const firstRun = new Date(Math.min(...runHours.map((h) => Date.parse(h))));

  /* const timestamps = generateTimestamps(firstRun, 6, []); */

  return mentionsByHours;
};
