export const formatDate = (date: number) => {
  console.log("date", date);

  const dateObj = new Date(date);
  const day = dateObj.getDate();
  const month = dateObj.toLocaleString("default", { month: "long" });
  const year = dateObj.getFullYear();

  return `${day} ${month} ${year}`;
};
export const setFutureDate = (date: string, days: number) => {
  if (date === "") return "2018-07-19";
  console.log(new Date(Date.parse(date)).toISOString().split("T")[0]);
  const dateObj = new Date(Date.parse(date));
  dateObj.setDate(dateObj.getDate() + days);
  return dateObj.toISOString().split("T")[0];
};
