// DemoPage.tsx
import React, { useEffect, useState } from 'react';
import { Product } from "@/types/Product";
import { columns } from "./columns";
import { DataTable } from "./data-table"; // Ensure you have this import path correct
import { getData } from "./product-data";

const DemoPage: React.FC = () => {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      setData(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex w-screen h-full justify-center items-center">
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default DemoPage;
