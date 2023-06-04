export const formatDate = (date: number) => {
  const dateObj = new Date(date);
  const day = dateObj.getDate();
  const month = dateObj.toLocaleString("default", { month: "long" });
  const year = dateObj.getFullYear();

  return `${day} ${month} ${year}`;
};
export const setFutureDate = (date: string, days: number = 0) => {
  if (!date) return "";
  const dateObj = new Date(Date.parse(date));
  dateObj.setDate(dateObj.getDate() + days);
  return dateObj.toISOString().split("T")[0];
};

export const timeOut = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const sortAndGroup = <
  T extends { products?: { product_name?: string }[] }
>(
  data: T[]
): { name: string; products: T[] }[] => {
  if (!data) return [];
  return data.reduce<{ name: string; products: T[] }[]>((acc, curr) => {
    console.log(curr);
    let product = "";
    if (curr.products?.product_name) {
      product = curr.products.product_name;
    } else {
      product = "Okänd produkt";
    }
    const existingProduct = acc.find((p) => p.name === product);
    if (!existingProduct) {
      let productGroup = { name: product, products: [curr] };
      acc.push(productGroup);
    } else {
      existingProduct.products.push(curr);
    }
    return acc;
  }, []);
};
