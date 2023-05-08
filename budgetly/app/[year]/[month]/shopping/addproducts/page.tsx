"use client";

import { useAuth } from "@/components/components/providers/supabase-auth-provider";
import CustomButton from "@/components/components/ui/CustomButton";
import CustomSelect from "@/components/components/ui/CustomSelect";
import CustomInput from "@/components/components/ui/CustomInput";
import supabase from "@/components/lib/supabase-client";
import { Expense } from "@/components/types/collection";
import { useRouter } from "next/navigation";
import styles from "./addproducts.module.css";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { FormEventHandler, useEffect, useState } from "react";
import CustomIconButton from "@/components/components/ui/CustomIconButton";
import EditIcon from "@mui/icons-material/Edit";
import { ShoppingSvg } from "@/components/public/ShoppingSvg";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

type Params = {
  params: {
    year: string;
    month: string;
  };
};

const AddProducts = ({ params: { year, month } }: Params) => {
  const [item, setItem] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [items, setItems] = useState<Expense[]>([]);
  const [selectedMonth, setSelectedMonth] = useState(parseInt(month));
  const [selectedYear, setSelectedYear] = useState(parseInt(year));
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
        .eq("profile_id", user.id)
        .eq("month", month)
        .eq("year", year);

      if (error) throw error;
      if (data != null) {
        setItems(data);
      }
      setIsLoading(false);
    } catch (error: any) {
      alert(error.message);
    }
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from("expenses")
        .insert({
          item: item,
          month: selectedMonth,
          year: selectedYear,
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
    { label: "March", value: 3 },
    { label: "April", value: 4 },
    { label: "May", value: 5 },
    { label: "Juni", value: 6 },
    { label: "July", value: 7 },
    { label: "August", value: 8 },
    { label: "September", value: 9 },
    { label: "October", value: 10 },
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
      <div className={styles.styledDiv}>
        <div className={styles.arrowIcon}>
          <CustomIconButton
            onClick={() => route.push(`/${year}/${month}/shopping`)}
          >
            <ArrowBackIcon />
          </CustomIconButton>
        </div>
        <div>
          <h1 className={styles.description}>Add Products</h1>
        </div>
      </div>

      <div className={styles.wrapper}>
        <form onSubmit={onSubmit}>
          <div className={styles.selectDateWrapper}>
            <CustomSelect
              value={selectedMonth}
              className={styles.selectMonth}
              onChange={(e) => setSelectedMonth(Number(e.target.value))}
              options={optionsMonth}
            />

            <CustomSelect
              className={styles.selectYear}
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              options={optionsYear}
            />
          </div>

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

          <div className={styles.addProductsWrapper}>
            <CustomInput
              className={styles.addProducts}
              value={item}
              placeholder="Add products"
              type="text"
              onChange={(e) => setItem(e.target.value)}
            />
            <CustomInput
              className={styles.addProducts}
              value={price}
              placeholder="price or discount"
              type="number"
              onChange={(e) => setPrice(e.target.value)}
            />

            <CustomSelect
              className={styles.addProducts}
              displayEmpty
              value={category}
              onChange={(e) => setCategory(e.target.value.toString())}
              options={optionsCategory}
            />
            <CustomButton
              className={styles.addButton}
              type="submit"
              text="Add"
              color="blue"
              size="medium"
            />
          </div>
        </form>
      </div>
      {items.length === 0 ? (
        <div className={styles.noAddedProductsText}>
          <p>No products added</p>
          <ShoppingSvg />
        </div>
      ) : (
        <div className={styles.addedProductsWrapper}>
          <p className={styles.addedProductsText}>Added products</p>
          {items.map((item) => (
            <div className={styles.card} key={item.id}>
              <div>
                <h3>{item.item}</h3>
                <p>{item.category.replace("food/", "")}</p>
              </div>

              <div>
                <h3>{item.price} kr</h3>
                <p>amount {item.quantity}</p>
              </div>

              <span>
                <CustomIconButton
                  size="small"
                  onClick={() =>
                    route.push(
                      `/${year}/${month}/shopping/addproducts/${item.id}`
                    )
                  }
                >
                  <EditIcon className={styles.editIcon} />
                </CustomIconButton>
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddProducts;
