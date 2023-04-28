"use client";

import { useAuth } from "@/components/components/providers/supabase-auth-provider";
import CustomButton from "@/components/components/ui/CustomButton";
import CustomSelect from "@/components/components/ui/CustomSelect";
import CustomInput from "@/components/components/ui/CustomInput";
import supabase from "@/components/lib/supabase-client";
import { Expense } from "@/components/types/collection";
import { useRouter } from "next/navigation";

import { FormEventHandler, useEffect, useState } from "react";

const AddProducts = () => {
  const [item, setItem] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [items, setItems] = useState<Expense[]>([]);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useAuth();
  const route = useRouter();

  useEffect(() => {
    if (user) {
      getItems();
    }
  }, [user]);

  const getItems = async () => {
    try {
      if (!user) {
        return;
      }
      const { data, error } = await supabase
        .from("expenses")
        .select("*")
        .ilike("category", "food/%")
        .eq("profile_id", user.id);
      // .limit(5) //om man vill ha en limit på antal produkter
      if (error) throw error;
      if (data != null) {
        setItems(data); // [product1, product2, product3]
      }
      setIsLoading(false);
    } catch (error: any) {
      alert(error.message);
    }
    console.log("items", items);
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from("expenses")
        .insert({
          item: item,
          month: month,
          year: year,
          price: price as unknown as number,
          category: category,
          quantity: quantity,
          profile_id: user?.id ?? "",
        })
        .single();

      if (error) throw error;
      onAdd();
    } catch (error: any) {
      alert(error.message);
    }
    setCategory("");
    setItem("");
    setPrice("");
    setQuantity(1);
  };

  const onAdd = () => {
    getItems();
  };

  const optionsMonth = [
    { label: "Januari", value: 1 },
    { label: "Februari", value: 2 },
    { label: "Mars", value: 3 },
    { label: "April", value: 4 },
    { label: "Maj", value: 5 },
    { label: "Juni", value: 6 },
    { label: "Juli", value: 7 },
    { label: "Augusti", value: 8 },
    { label: "September", value: 9 },
    { label: "Oktober", value: 10 },
    { label: "November", value: 11 },
    { label: "December", value: 12 },
  ];

  const optionsYear = [
    {
      value: new Date().getFullYear() - 1,
      label: (new Date().getFullYear() - 1).toString(),
    },
    {
      value: new Date().getFullYear(),
      label: new Date().getFullYear().toString(),
    },
    {
      value: new Date().getFullYear() + 1,
      label: (new Date().getFullYear() + 1).toString(),
    },
    {
      value: new Date().getFullYear() + 2,
      label: (new Date().getFullYear() + 2).toString(),
    },
  ];

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
    { label: "Sötsaker", value: "food/Sötsaker" },
    { label: "Övrigt", value: "food/Övrigt" },
  ];

  return (
    <>
      <form onSubmit={onSubmit}>
        <CustomSelect
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
          options={optionsMonth}
        />
        <CustomSelect
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          options={optionsYear}
        />
        Add Products
        <CustomButton
          type="button"
          onClick={() => setQuantity(quantity - 1)}
          text="-"
        />
        -{quantity}
        <CustomButton
          type="button"
          onClick={() => setQuantity(quantity + 1)}
          text="+"
        />
        <CustomInput
          value={item}
          placeholder="Add products"
          type="text"
          onChange={(e) => setItem(e.target.value)}
        />
        <CustomInput
          value={price}
          placeholder="price or discount"
          type="number"
          onChange={(e) => setPrice(e.target.value)}
        />
        <CustomSelect
          value={category}
          onChange={(e) => setCategory(e.target.value.toString())}
          options={optionsCategory}
        />
        <CustomButton type="submit" text="Add" />
      </form>

      <>
        <p>Added products</p>
        {items.map((item) => (
          <div key={item.id}>
            <p>{item.item}</p>
            <p>{item.price}</p>
            <p>{item.category}</p>
            <p>{item.quantity}</p>

            <CustomButton
              variant="outlined"
              onClick={() =>
                route.push(`/${year}/${month}/shopping/addproducts/${item.id}`)
              }
            >
              Edit {item.item}
            </CustomButton>
          </div>
        ))}
      </>
    </>
  );
};

export default AddProducts;
