"use client";

import { useAuth } from "@/components/components/providers/supabase-auth-provider";
import supabase from "@/components/lib/supabase-client";
import { Expense } from "@/components/types/collection";
import { useRouter } from "next/navigation";

import { FormEventHandler, useEffect, useState } from "react";

//page where you can add food items to the database
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

  return (
    <>
      <form onSubmit={onSubmit}>
        <select
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
        >
          <option value="1">Januari</option>
          <option value="2">Februari </option>
          <option value="3">Mars</option>
          <option value="4">April</option>
          <option value="5">Maj</option>
          <option value="6">Juni</option>
          <option value="7">Juli</option>
          <option value="8">augusti</option>
          <option value="9">September</option>
          <option value="10">Oktober</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
        <select value={year} onChange={(e) => setYear(Number(e.target.value))}>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
        </select>
        Add Products
        <button type="button" onClick={() => setQuantity(quantity - 1)}>
          -
        </button>
        {quantity}
        <button type="button" onClick={() => setQuantity(quantity + 1)}>
          +
        </button>
        <input
          value={item}
          placeholder="Add products"
          type="text"
          onChange={(e) => setItem(e.target.value)}
        />
        <input
          value={price}
          placeholder="price or discount"
          type="number"
          onChange={(e) => setPrice(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>Välj kategori</option>
          <option value="food/Bröd">Bröd</option>
          <option value="food/Drycker">Drycker</option>
          <option value="food/Fisk och skaldjur">Fisk och skaldjur</option>
          <option value="food/Frukt/grönt/bär">Frukt/grönt/bär</option>
          <option value="food/Kyckling">Kyckling</option>
          <option value="food/Köksartiklar">Köksartiklar</option>
          <option value="food/Kött">Kött</option>
          <option value="food/Mejeriprodukter">Mejeriprodukter</option>
          <option value="food/Rabatt">Rabatt</option>
          <option value="food/Skafferi">Skafferi</option>
          <option value="food/Snacks">Snacks</option>
          <option value="food/Såser">Såser</option>
          <option value="food/Toalettartiklar">Toalettartiklar</option>
          <option value="food/Vegetariskt">Vegetariskt</option>
          <option value="food/Övrigt">Övrigt</option>
        </select>
        <button type="submit">Add</button>
      </form>

      <div>
        <p>Added products</p>
        {items.map((item) => (
          <div key={item.id}>
            <p>{item.item}</p>
            <p>{item.price}</p>
            <p>{item.category}</p>
            <p>{item.quantity}</p>

            <button
              onClick={() => route.push(`/shopping/addproducts/${item.id}`)}
            >
              Edit {item.item}
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default AddProducts;
