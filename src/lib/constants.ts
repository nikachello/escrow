import { DealCategory, UserRole } from "./types";

export const DEAL_CATEGORIES: DealCategory[] = [
  { id: "1", name_en: "Apparel", name_ka: "ტანსაცმელი" },
  { id: "2", name_en: "Electronics", name_ka: "ტექნიკა" },
  { id: "3", name_en: "Furniture", name_ka: "ავეჯი" },
  { id: "4", name_en: "Graphic Design", name_ka: "გრაფიკული დიზაინი" },
  { id: "5", name_en: "Web Development", name_ka: "ვებ-დეველოპმენტი" },
  { id: "6", name_en: "Courses / Coaching", name_ka: "ტრენინგები / კურსები" },
  { id: "7", name_en: "Marketing Services", name_ka: "მარკეტინგი / რეკლამა" },
  { id: "8", name_en: "Kids Products", name_ka: "საბავშვო ნივთები" },
  { id: "9", name_en: "Accessories", name_ka: "აქსესუარები" },
  { id: "10", name_en: "Translation", name_ka: "თარგმნა" },
];

export const USER_ROLES: UserRole[] = [
  { id: 1, role: "seller", name_ka: "ვყიდი" },
  { id: 2, role: "buyer", name_ka: "ვყიდულობ" },
];
