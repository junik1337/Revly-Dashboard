"use client";

import React from "react";
import { Button, Table } from "antd";

const { Column } = Table;

interface DataType {
  key: React.Key;
  name: string;
  coordinates: string;
  chain_id: number;
  chain_name: string;
  created_at: string;
}

const data: DataType[] = [
  {
    key: "1",
    name: "The Healthy Brand - Business Bay",
    coordinates: "25.219511, 55.279824",
    chain_id: 1,
    chain_name: "The Healthy Brand",
    created_at: "2024-01-15",
  },
  {
    key: "2",
    name: "The Healthy Brand - Downtown",
    coordinates: "25.21992, 55.2798",
    chain_id: 1,
    chain_name: "The Healthy Brand",
    created_at: "2024-02-03",
  },
  {
    key: "3",
    name: "Tasty Burgers - Business Bay",
    coordinates: "25.0941429, 55.159214",
    chain_id: 2,
    chain_name: "Tasty Burgers",
    created_at: "2024-01-28",
  },
  {
    key: "4",
    name: "The Pizza House - Business Bay",
    coordinates: "25.0941431, 55.1592144",
    chain_id: 3,
    chain_name: "The Pizza House",
    created_at: "2024-03-10",
  },
  {
    key: "5",
    name: "The Healthy Brand - Marina",
    coordinates: "25.219511, 55.279824",
    chain_id: 1,
    chain_name: "The Healthy Brand",
    created_at: "2024-02-18",
  },
  {
    key: "6",
    name: "Tasty Burgers - Downtown",
    coordinates: "25.21992, 55.2798",
    chain_id: 2,
    chain_name: "Tasty Burgers",
    created_at: "2024-01-22",
  },
  {
    key: "7",
    name: "The Pizza House - Marina",
    coordinates: "25.0941429, 55.159214",
    chain_id: 3,
    chain_name: "The Pizza House",
    created_at: "2024-03-05",
  },
  {
    key: "8",
    name: "Coffee Corner - Business Bay",
    coordinates: "25.0941431, 55.1592144",
    chain_id: 4,
    chain_name: "Coffee Corner",
    created_at: "2024-02-12",
  },
  {
    key: "9",
    name: "Coffee Corner - Downtown",
    coordinates: "25.219511, 55.279824",
    chain_id: 4,
    chain_name: "Coffee Corner",
    created_at: "2024-01-30",
  },
  {
    key: "10",
    name: "Fresh Market - Business Bay",
    coordinates: "25.21992, 55.2798",
    chain_id: 5,
    chain_name: "Fresh Market",
    created_at: "2024-02-25",
  },
];

const vendorsPage = () => (
  <div>
    <div className="flex justify-between items-center">
      <div>
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

      <Button disabled>Add vendor</Button>
    </div>
    <Table<DataType>
      dataSource={data}
      className="h-full"
      scroll={{ y: "100vh" }}
    >
      <Column
        title="Name"
        dataIndex="name"
        key="name"
      />
      <Column
        title="Coordinates"
        key="coordinates"
        render={(record: DataType) => (
          <a
            href={`https://www.google.com/maps?q=${record.coordinates}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--color-myViolet)" }}
          >
            {record.coordinates}
          </a>
        )}
      />
      <Column
        title="Chain id"
        dataIndex="chain_id"
        key="chain_id"
      />
      <Column
        title="Chain name"
        dataIndex="chain_name"
        key="chain_name"
      />
      <Column
        title="Created at"
        dataIndex="created_at"
        key="created_at"
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

export default vendorsPage;
