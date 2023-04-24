"use client";

import { useRouter } from "next/navigation";
import React, { Suspense, useEffect } from "react";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    router.replace(`/${year}/${month}/overview`);
  }, [router]);

  return <>{/* <Suspense fallback={<h1>Loading...</h1>} /> */}</>;
};

export default Home;
