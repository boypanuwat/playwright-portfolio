export type ShippingDetails = {
  phone: string;
  street: string;
  city: string;
  country: string;
};

export function validShippingDetails(): ShippingDetails {
  return {
    phone: "0812345678",
    street: "99 QA Road",
    city: "Bangkok",
    country: "Thailand"
  };
}

export function incompleteShippingDetails(): Partial<ShippingDetails> {
  return {
    phone: "0812345678",
    street: "99 QA Road",
    city: "Bangkok"
  };
}
