"use client";

import CustomButton from "@/components/components/ui/CustomButton";

import CustomSelect from "@/components/components/ui/CustomSelect";
import CustomInput from "@/components/components/ui/CustomInput";
import supabase from "@/components/lib/supabase-client";
import { Expense } from "@/components/types/collection";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import styles from "./page.module.css";
import CustomIconButton from "@/components/components/ui/CustomIconButton";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

type Params = {
  params: {
    itemId: string;
    year: string;
    month: string;
  };
};

const EditItem = ({ params: { itemId, year, month } }: Params) => {
  const router = useRouter();
  const [item, setItem] = useState<Expense | null>(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (itemId) {
      getItem();
    }
  }, [itemId]);

  const getItem = useCallback(async () => {
    try {
      const { data: item, error } = await supabase
        .from("expenses")
        .select("*")
        .eq("id", itemId)
        .eq("month", month)
        .eq("year", year)
        .single();
      if (error) throw error;
      if (item != null) {
        setItem(item);
        setName(item.item);
        setPrice(item.price.toString());
        setCategory(item.category);
        setQuantity(item.quantity);
      }
    } catch (error: any) {
      alert(error.message);
    }
  }, [itemId, month, year]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from("expenses")
        .update({
          item: name,
          price: price as unknown as number,
          category: category,
          quantity: quantity,
        })
        .eq("id", itemId);

      if (error) throw error;

      router.push(`/${year}/${month}/shopping/addproducts`);
    } catch (error: any) {
      alert(error.message);
    }
  };

  if (!item) {
    return <p>Loading...</p>;
  }

  const handleDeleteItem = async () => {
    try {
      const { error } = await supabase
        .from("expenses")
        .delete()
        .eq("id", itemId);

      if (error) throw error;

      router.push(`/${year}/${month}/shopping/addproducts`);
    } catch (error: any) {
      alert(error.message);
    }
  };

  const optionsCategory = [
    { label: "Categories", value: "" },
    { label: "Bread", value: "food/Bread" },
    { label: "Chicken", value: "food/Chicken" },
    { label: "Diary", value: "food/Dairy" },
    { label: "Discount", value: "food/Discount" },
    { label: "Drinks", value: "food/Drinks" },
    { label: "Fish and seafood", value: "food/Fish and seafood" },
    { label: "Fruit/greens/berries", value: "food/Fruit/greens/berries" },
    { label: "Kitchenware", value: "food/Kitchenware" },
    { label: "Meat", value: "food/Meat" },
    { label: "Other", value: "food/Other" },
    { label: "Snacks", value: "food/Snacks" },
    { label: "Staples", value: "food/Staples" },
    { label: "Sweets and candy", value: "food/Sweets and candy" },
  ];

  return (
    <div className={styles.main}>
      <p className={styles.description}>Edit {name}</p>
      <form onSubmit={onSubmit}>
        <div className={styles.card}>
          <div className={styles.quantityWrapper}>
            <p className={styles.despription}>Amount</p>
            <div className={styles.quantityInnerWrapper}>
              <CustomIconButton
                className={styles.icon}
                size="small"
                onClick={() => setQuantity(quantity - 1)}
              >
                <RemoveIcon className={styles.icon} />
              </CustomIconButton>
              <p>{quantity}</p>
              <CustomIconButton
                className={styles.icon}
                size="small"
                onClick={() => setQuantity(quantity + 1)}
              >
                <AddIcon className={styles.icon} />
              </CustomIconButton>
            </div>
          </div>

          <div className={styles.wrapper}>
            <CustomInput
              className={styles.addProducts}
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <CustomInput
              className={styles.addProducts}
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <CustomSelect
              className={styles.addProducts}
              value={category}
              onChange={(e) => setCategory(e.target.value.toString())}
              options={optionsCategory}
            />
          </div>
        </div>

        <div className={styles.buttonWrapper}>
          <CustomButton
            type="submit"
            text="Update"
            variant="contained"
            size="large"
          />
          <CustomButton
            text="Delete"
            onClick={handleDeleteItem}
            variant="contained"
            size="large"
            color="red"
          />
        </div>
      </form>
    </div>
  );
};

export default EditItem;
