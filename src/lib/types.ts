export type DealCategory = {
  id: string;
  name_en: string;
  name_ka: string;
};

export type UserRole =
  | { id: 1; name_ka: "ვყიდი"; role: "seller" }
  | { id: 2; name_ka: "ვყიდულობ"; role: "buyer" };
