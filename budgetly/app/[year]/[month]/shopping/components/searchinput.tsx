import CustomButton from "@/components/components/ui/CustomButton";
import CustomInput from "@/components/components/ui/CustomInput";
import { ShoppingSvg } from "@/components/public/ShoppingSvg";
import { Expense } from "@/components/types/collection";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { useMemo, useState } from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import styles from "./styles.module.css";

interface Props {
  expenses: Expense[];
}

export const SearchInput = ({ expenses }: Props) => {
  const [search, setSearch] = useState<string>("");
  const [sortProperty, setSortProperty] = useState<string>("");
  const [isNameSorted, setIsNameSorted] = useState<boolean>(false);
  const [isPriceSorted, setIsPriceSorted] = useState<boolean>(false);
  const [isPriceHighest, setIsPriceHighest] = useState<boolean>(false);

  const [isCategorySorted, setIsCategorySorted] = useState<boolean>(false);

  const handleSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filteredExpenses = useMemo(() => {
    return expenses
      ? expenses.filter((items) => {
          return items.item.toLowerCase().includes(search.toLowerCase());
        })
      : [];
  }, [expenses, search]);

  const sortedItems = useMemo(() => {
    const sorted = [...filteredExpenses].sort((a, b) => {
      if (sortProperty === "category")
        return a.category.localeCompare(b.category);
      else if (sortProperty === "priceHighest") return b.price - a.price;
      else if (sortProperty === "priceLowest") return a.price - b.price;
      else if (sortProperty === "item") return a.item.localeCompare(b.item);
      else return 0;
    });
    return sorted;
  }, [filteredExpenses, sortProperty]);

  const sortByCategory = () => {
    setSortProperty("category");
    setIsCategorySorted(true);
    setIsNameSorted(false);
    setIsPriceSorted(false);
  };

  const sortByHighestPrice = () => {
    setSortProperty("priceHighest");
    setIsPriceHighest(!isPriceHighest);
    setIsPriceSorted(true);
    setIsNameSorted(false);
    setIsCategorySorted(false);
  };

  const sortByLowestPrice = () => {
    setSortProperty("priceLowest");
    setIsPriceHighest(!isPriceHighest);
    setIsPriceSorted(true);
    setIsNameSorted(false);
    setIsCategorySorted(false);
  };

  const sortByName = () => {
    setSortProperty("item");
    setIsNameSorted(true);
    setIsPriceSorted(false);
    setIsCategorySorted(false);
  };

  return (
    <>
      <CustomInput
        type="text"
        label="Search"
        value={search}
        onChange={handleSearchText}
        placeholder="Search products"
        sx={{
          color: "white",

          "& .MuiInputLabel-root": {
            color: "white",
          },
          "&  svg": {
            color: "white",
          },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      <div className={styles.buttonWrapper}>
        <CustomButton
          color={isNameSorted ? "purple" : "darkpurple"}
          onClick={sortByName}
          text="Name"
          endIcon={isNameSorted ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
        />
        <CustomButton
          color={isPriceSorted ? "purple" : "darkpurple"}
          onClick={isPriceHighest ? sortByLowestPrice : sortByHighestPrice}
          text="Price"
          endIcon={
            isPriceSorted ? (
              isPriceHighest ? (
                <ArrowUpwardIcon />
              ) : (
                <ArrowDownwardIcon />
              )
            ) : null
          }
        />
        <CustomButton
          color={isCategorySorted ? "purple" : "darkpurple"}
          onClick={sortByCategory}
          text="Category"
          endIcon={
            isCategorySorted ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />
          }
        />
      </div>

      <>
        {expenses && expenses.length > 0 ? (
          <>
            {sortedItems.map((item) => (
              <div className={styles.card} key={item.id}>
                <span>
                  <p>{item.item}</p>
                  <p> {item.category?.replace("food/", "")}</p>
                </span>

                <span>
                  <p>{item.price} kr</p>
                  <p>{item.quantity} st</p>
                </span>
              </div>
            ))}
          </>
        ) : (
          <>
            <p>Added products will appear here</p>

            <ShoppingSvg />
          </>
        )}
      </>
    </>
  );
};
