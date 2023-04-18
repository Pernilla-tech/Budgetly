"use client";

import supabase from "@/components/lib/supabase-client";
import { Expense } from "@/components/types/collection";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type Params = {
  params: {
    itemId: string;
  };
};

const EditItem = ({ params: { itemId } }: Params) => {
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

  const getItem = async () => {
    try {
      const { data, error } = await supabase
        .from("expenses")
        .select("*")
        .eq("id", itemId)
        .single();
      if (error) throw error;
      if (data != null) {
        setItem(data);
        setName(data.item);
        setPrice(data.price.toString());
        setCategory(data.category);
        setQuantity(data.quantity);
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

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

      router.push("/shopping/products/addproducts");
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

      router.push("/shopping/products/addproducts");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div>
      <h1>Edit {name}</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="name">{name}</label>
        <br />
        <button type="button" onClick={() => setQuantity(quantity - 1)}>
          -
        </button>
        {quantity}
        <button type="button" onClick={() => setQuantity(quantity + 1)}>
          +
        </button>

        <br />

        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <label htmlFor="category">Category</label>
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
        <button type="submit">Update Item</button>
        <button onClick={handleDeleteItem}>Delete</button>
      </form>
    </div>
  );
};

export default EditItem;
