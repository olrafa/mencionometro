import { Mention } from "../types";

import { calculateColor } from "./addColors";

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

  const maxCount = Math.max(...mentionsByHours.map(({ mentions }) => mentions));

  const mentionsSummary = mentionsByHours.map((i) => ({
    ...i,
    color: calculateColor(i.mentions, maxCount),
  }));

  return mentionsSummary;
};
