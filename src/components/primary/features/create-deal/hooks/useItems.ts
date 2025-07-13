import { useState, useCallback } from "react";
import { ItemType } from "@/lib/types/create-deal";

export const useItems = () => {
  const [items, setItems] = useState<ItemType[]>([]);

  const addItem = useCallback((item: ItemType) => {
    setItems((prev) => [...prev, item]);
  }, []);

  const removeItem = useCallback((index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const updateItem = useCallback((index: number, updatedItem: ItemType) => {
    setItems((prev) =>
      prev.map((item, i) => (i === index ? updatedItem : item))
    );
  }, []);

  const clearItems = useCallback(() => {
    setItems([]);
  }, []);

  const getItemsTotal = useCallback(() => {
    return items.reduce((total, item) => Number(total) + Number(item.price), 0);
  }, [items]);

  return {
    items,
    addItem,
    removeItem,
    updateItem,
    clearItems,
    getItemsTotal,
    itemCount: items.length,
    hasItems: items.length > 0,
  };
};
