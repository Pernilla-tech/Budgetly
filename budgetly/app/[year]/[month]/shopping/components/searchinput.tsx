import { ShoppingSvg } from "@/components/public/ShoppingSvg";
import { Expense } from "@/components/types/collection";
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

  // The 'filteredExpenses' conditional could make the dependencies of useMemo Hook (at line 37) change on every render. To fix this, wrap the initialization of 'filteredExpenses' in its own useMemo() Hook.
  // const filteredExpenses = expenses
  //   ? expenses.filter((items) => {
  //       return items.item.toLowerCase().includes(search.toLowerCase());
  //     })
  //   : []; //kollar om data finns och inte är null, annars returnerar en tom array om data inte finns

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
      <input
        type="text"
        value={search}
        onChange={handleSearchText}
        placeholder="Search products"
      ></input>
      <div>
        <button onClick={sortByName}>Name</button>
        <button onClick={sortByHighestPrice}>Price</button>
        <button onClick={sortByCategory}>Category</button>
      </div>
      <div>
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
      </div>
    </div>
  );
};
