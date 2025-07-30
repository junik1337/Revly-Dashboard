"use client";

import React from "react";
import { Switch, Table, Tag } from "antd";

const { Column } = Table;

interface DataType {
  key: React.Key;
  user_id: number;
  display_name: string;
  email: string;
  is_active: boolean;
  managed_vendors: string[];
  created_at: string;
}

const data: DataType[] = [
  {
    key: "1",
    user_id: 1,
    display_name: "John Doe",
    email: "john.doe@mail.com",
    is_active: true,
    managed_vendors: ["TechCorp", "InnovateLab", "DigitalFlow"],
    created_at: "2024-01-15",
  },
  {
    key: "2",
    user_id: 2,
    display_name: "Natasha Smith",
    email: "natasha.smith@mail.com",
    is_active: true,
    managed_vendors: ["CloudTech", "DataSync"],
    created_at: "2024-02-03",
  },
  {
    key: "3",
    user_id: 3,
    display_name: "Michael Johnson",
    email: "michael.johnson@mail.com",
    is_active: true,
    managed_vendors: ["SecureNet", "FastTrack", "SmartSolutions"],
    created_at: "2024-01-28",
  },
  {
    key: "4",
    user_id: 4,
    display_name: "Sarah Wilson",
    email: "sarah.wilson@mail.com",
    is_active: false,
    managed_vendors: ["EcoTech"],
    created_at: "2024-03-10",
  },
  {
    key: "5",
    user_id: 5,
    display_name: "David Brown",
    email: "david.brown@mail.com",
    is_active: true,
    managed_vendors: ["GlobalTech", "NextGen", "FutureLab"],
    created_at: "2024-02-18",
  },
  {
    key: "6",
    user_id: 6,
    display_name: "Emily Davis",
    email: "emily.davis@mail.com",
    is_active: true,
    managed_vendors: ["WebSolutions", "MobileFirst"],
    created_at: "2024-01-22",
  },
  {
    key: "7",
    user_id: 7,
    display_name: "Robert Miller",
    email: "robert.miller@mail.com",
    is_active: false,
    managed_vendors: ["LegacySystems"],
    created_at: "2024-03-05",
  },
  {
    key: "8",
    user_id: 8,
    display_name: "Lisa Garcia",
    email: "lisa.garcia@mail.com",
    is_active: true,
    managed_vendors: ["CreativeHub", "DesignStudio", "BrandLab"],
    created_at: "2024-02-12",
  },
  {
    key: "9",
    user_id: 9,
    display_name: "James Rodriguez",
    email: "james.rodriguez@mail.com",
    is_active: true,
    managed_vendors: ["FinanceTech", "PayFlow"],
    created_at: "2024-01-30",
  },
  {
    key: "10",
    user_id: 10,
    display_name: "Jennifer Martinez",
    email: "jennifer.martinez@mail.com",
    is_active: true,
    managed_vendors: ["HealthTech", "MedFlow", "CareConnect"],
    created_at: "2024-02-25",
  },
];

const usersPage = () => (
  <Table<DataType>
    dataSource={data}
    className="h-full"
  >
    <Column
      title="Email"
      dataIndex="email"
      key="email"
    />
    <Column
      title="Display name"
      dataIndex="display_name"
      key="display_name"
    />
    <Column
      title="Is active"
      dataIndex="is_active"
      key="is_active"
      render={(is_active: boolean) => (
        <Tag
          style={{
            backgroundColor: is_active
              ? "var(--color-green-500)"
              : "var(--color-myWhite)",
            color: is_active ? "var(--color-white)" : "var(--color-red-500)",
            border: "none",
            fontWeight: is_active ? 600 : 500,
          }}
        >
          {is_active ? "Active" : "Inactive"}
        </Tag>
      )}
    />
    <Column
      title="List of vendors"
      dataIndex="managed_vendors"
      key="managed_vendors"
      render={(vendors: string[]) => (
        <div style={{ maxWidth: 500 }}>
          {vendors.map((vendor, index) => (
            <Tag
              key={index}
              style={{
                backgroundColor: "var(--color-myViolet)",
                color: "white",
                border: "none",
                marginBottom: 4,
                marginRight: 4,
                fontWeight: 600,
              }}
            >
              {vendor}
            </Tag>
          ))}
        </div>
      )}
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
    <Column
      title="Action"
      key="action"
      render={(record: DataType) => (
        <Switch
          checked={record.is_active}
          onChange={(checked) => {
            console.log(
              `${checked ? "Activate" : "Deactivate"} user:`,
              record.display_name
            );
          }}
        />
      )}
    />
  </Table>
);

export default usersPage;
