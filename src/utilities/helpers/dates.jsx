import { differenceInSeconds, parseISO } from "date-fns";
export function displayRelativeTime(createdAt) {
  const todayDate = new Date();
  createdAt = parseISO(createdAt);
  const seconds = differenceInSeconds(todayDate, createdAt);

  const intervals = [
    { label: "d", seconds: 86400 },
    { label: "h", seconds: 3600 },
    { label: "m", seconds: 60 },
    { label: "s", seconds: 1 },
  ];

  for (const interval of intervals) {
    const intervalValue = Math.floor(seconds / interval.seconds);
    if (intervalValue >= 1) {
      return `${intervalValue}${interval.label}`;
    }
  }
  return "just now";
}

export const Dates = {
  displayRelativeTime,
};
/*
1- // get created at date in seconds  2026-02-12
2/3/2026

date fns

day ==> 24 * 60 * 60 = 86400  result > 1 12d
hours ==> 60 * 60 = 3600 result => 22h
minutes ==> 60 
s = 1


*/
