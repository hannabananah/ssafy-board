import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
dayjs.extend(isToday);
export function formatData(
  date: number | string | Date | null,
  detail?: "detail"
) {
  if (!date) return null;

  if (detail === "detail") return dayjs(date).format("YYYY.MM.DD HH:mm");

  if (dayjs(date).isToday()) return dayjs(date).format("HH:mm");

  return dayjs(date).format("YY-MM-DD");
}
