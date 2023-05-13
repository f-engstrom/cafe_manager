export const formatDate = (date: number) => {
  console.log("date", date);

  const dateObj = new Date(date);
  const day = dateObj.getDate();
  const month = dateObj.toLocaleString("default", { month: "long" });
  const year = dateObj.getFullYear();

  return `${day} ${month} ${year}`;
};
