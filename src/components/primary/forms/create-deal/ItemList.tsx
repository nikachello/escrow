// components/ItemsList.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { ItemType } from "@/types/create-deal/types";
import { DEAL_CATEGORIES } from "@/lib/constants";

interface ItemsListProps {
  items: ItemType[];
  currencySymbol: string;
  onRemoveItem: (index: number) => void;
}

const ItemsList: React.FC<ItemsListProps> = ({
  items,
  currencySymbol,
  onRemoveItem,
}) => {
  if (items.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        <p>ნივთები ჯერ არ არის დამატებული</p>
        <p className="text-sm mt-1">გთხოვთ დაამატოთ მინიმუმ ერთი ნივთი</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-heading font-semibold">
          დამატებული ნივთები
        </h3>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          სულ: {items.length} ნივთი
        </span>
      </div>

      <div className="space-y-3">
        {items.map((item, index) => (
          <Card key={index} className="relative">
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      კატეგორია:
                    </span>

                    <p className="text-sm">
                      {
                        DEAL_CATEGORIES.find((c) => c.id === item.itemCategory)
                          ?.name_ka
                      }
                    </p>
                  </div>

                  <div>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      დასახელება:
                    </span>
                    <p className="font-medium">{item.itemName}</p>
                  </div>

                  <div>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      ფასი:
                    </span>
                    <p className="text-lg font-bold text-green-600 dark:text-green-400">
                      {item.price} {currencySymbol}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      დეტალები:
                    </span>
                    <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
                      {item.itemDescription}
                    </p>
                  </div>
                </div>
              </div>

              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2"
                onClick={() => onRemoveItem(index)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ItemsList;
