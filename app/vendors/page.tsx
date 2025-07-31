"use client";

import { Table } from "antd";
import { Vendor } from "@/types";
import useSWR from "swr";
import { getVendors } from "@/lib/utils";

const { Column } = Table;

const VendorsPage = () => {
  const { data, isLoading, error } = useSWR("vendors", getVendors);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <div className="flex flex-col items-center md:items-start">
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            color: "var(--color-myWhite)",
            marginLeft: "0",
          }}
        >
          Vendors
        </h1>
        <h6
          style={{ marginBottom: "2rem" }}
          className="text-myWhite"
        >
          Manage restaurant locations and their details.
        </h6>
      </div>
      <Table<Vendor>
        dataSource={data}
        rowKey="id"
        className="h-full"
        scroll={{ y: "100vh" }}
        loading={isLoading}
      >
        <Column
          title="Name"
          dataIndex="name"
          key="name"
        />
        <Column
          title="Coordinates"
          key="coordinates"
          render={(record: Vendor) => (
            <a
              href={`https://www.google.com/maps?q=${record.latitude},${record.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--color-myViolet)" }}
            >
              {record.latitude}, {record.longitude}
            </a>
          )}
        />
        <Column
          title="Chain id"
          dataIndex="chainId"
          key="chainId"
        />
        <Column
          title="Chain name"
          dataIndex="chainName"
          key="chainName"
        />
        <Column
          title="Created at"
          dataIndex="createdAt"
          key="createdAt"
          render={(date: string) => (
            <span style={{ color: "var(--color-myWhite)" }}>
              {new Date(date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          )}
        />
      </Table>
    </div>
  );
};

export default VendorsPage;
