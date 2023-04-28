import CustomButton from "@/components/components/ui/CustomButton";
import CustomInput from "@/components/components/ui/CustomInput";
import { ShoppingSvg } from "@/components/public/ShoppingSvg";
import { Expense } from "@/components/types/collection";
import InputAdornment from "@mui/material/InputAdornment";
import { SearchIcon } from "lucide-react";
import { useMemo, useState } from "react";

// import { SearchIcon } from "./icons/SearchIcon";

interface Props {
  expenses: Expense[];
}

export const SearchInput = ({ expenses }: Props) => {
  const [search, setSearch] = useState<string>("");
  const [sortProperty, setSortProperty] = useState<string>("");

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

  console.log("expenses", expenses);

  console.log("filteredExpenses", filteredExpenses);

  const sortedItems = useMemo(() => {
    const sorted = [...filteredExpenses].sort((a, b) => {
      if (sortProperty === "category")
        return a.category.localeCompare(b.category);
      else if (sortProperty === "priceHighest") return b.price - a.price;
      // else if (sortProperty === "priceLowest") return a.price - b.price;
      else if (sortProperty === "item") return a.item.localeCompare(b.item);
      else return 0;
    });
    return sorted;
  }, [filteredExpenses, sortProperty]);

  console.log("sortedItems", sortedItems);

  const sortByCategory = () => {
    setSortProperty("category");
    console.log("category");
  };
  const sortByHighestPrice = () => {
    setSortProperty("priceHighest");
    console.log("highest price");
  };
  // const sortByLowestPrice = () => {
  //   setSortProperty("priceLowest");
  // };
  const sortByName = () => {
    setSortProperty("item");
    console.log("name");
  };

  return (
    <div>
      <CustomInput
        type="text"
        label="Search"
        value={search}
        onChange={handleSearchText}
        placeholder="Search products"
        // endAdornment={
        //   CustomInputAdornment position="end">
        //     <SearchIcon />
        //   </InputAdornment>

        // } //TODO icon syns ej
      />
      <>
        <CustomButton onClick={sortByName} text="Name" />
        <CustomButton onClick={sortByHighestPrice} text="Price" />
        <CustomButton onClick={sortByCategory} text="Category" />
      </>
      <>
        {expenses && expenses.length > 0 ? (
          <>
            {sortedItems.map((item) => (
              <div key={item.id}>
                <p>{item.item}</p>
                <p> {item.category}</p>
                <p>{item.price} kr</p>
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
    </div>
  );
};
