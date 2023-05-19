"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    const month = new Date().getMonth() + 1;
    const formattedMonth = month.toString().padStart(2, "0");
    const year = new Date().getFullYear();
    router.replace(`/${year}/${formattedMonth}/overview`);
  }, [router]);
};

export default Home;
