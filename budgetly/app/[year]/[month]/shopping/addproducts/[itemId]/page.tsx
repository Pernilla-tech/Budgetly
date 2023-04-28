"use client";

import CustomButton from "@/components/components/ui/CustomButton";

import CustomSelect from "@/components/components/ui/CustomSelect";
import CustomInput from "@/components/components/ui/CustomInput";
import supabase from "@/components/lib/supabase-client";
import { Expense } from "@/components/types/collection";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

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
    { label: "Välj kategori", value: "" },
    { label: "Bröd", value: "food/Bröd" },
    { label: "Drycker", value: "food/Drycker" },
    { label: "Fisk och skaldjur", value: "food/Fisk och skaldjur" },
    { label: "Frukt/grönt/bär", value: "food/Frukt/grönt/bär" },
    { label: "Kyckling", value: "food/Kyckling" },
    { label: "Köksartiklar", value: "food/Köksartiklar" },
    { label: "Kött", value: "food/Kött" },
    { label: "Mejeriprodukter", value: "food/Mejeriprodukter" },
    { label: "Rabatt", value: "food/Rabatt" },
    { label: "Skafferi", value: "food/Skafferi" },
    { label: "Snacks", value: "food/Snacks" },
    { label: "Såser", value: "food/Såser" },
    { label: "Toalettartiklar", value: "food/Toalettartiklar" },
    { label: "Vegetariskt", value: "food/Vegetariskt" },
    { label: "Övrigt", value: "food/Övrigt" },
  ];

  return (
    <>
      <h1>Edit {name}</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="name">{name}</label>
        <br />
        <CustomButton
          type="button"
          onClick={() => setQuantity(quantity - 1)}
          text="-"
        />

        {quantity}
        <CustomButton
          type="button"
          onClick={() => setQuantity(quantity + 1)}
          text="+"
        />

        <br />

        <CustomInput
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="price">Price</label>
        <CustomInput
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <label htmlFor="category">Category</label>

        <CustomSelect
          value={category}
          onChange={(e) => setCategory(e.target.value.toString())}
          options={optionsCategory}
        />

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
          sx={{ backgroundColor: "#FF6161" }}
        />
      </form>
    </>
  );
};

export default EditItem;
