"use client";

import { useRouter } from "next/navigation";
import React from "react";

const Products = () => {
  const router = useRouter();
  return (
    <>
      <div>
        Products
        <button onClick={() => router.push("/shopping/products/addproducts")}>
          Add products
        </button>
      </div>
    </>
  );
};

export default Products;
