"use client";

import React from "react";
import { Button, Switch, Table, Tag, App } from "antd";
import { getUsers, updateUser } from "@/lib/utils";
import useSWR, { mutate } from "swr";
import { User } from "@/types";

const { Column } = Table;

const UsersPage = () => {
  const { data, isLoading, error } = useSWR("users", getUsers);
  const { message } = App.useApp();

  const handleStatusChange = async (record: User, checked: boolean) => {
    try {
      await updateUser(record.id.toString(), checked);
      mutate("users");
      message.success(
        `User ${record.displayName} ${
          checked ? "activated" : "deactivated"
        } successfully!`
      );
    } catch (error) {
      mutate("users");
      message.error(
        `Failed to ${checked ? "activate" : "deactivate"} user ${
          record.displayName
        }. Please try again.`
      );
      console.error("Error updating user status:", error);
    }
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
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
            Users
          </h1>
          <h6
            style={{ marginBottom: "2rem" }}
            className="text-myWhite"
          >
            Manage and monitor users&apos;s actions.
          </h6>
        </div>

        <Button disabled>Add user</Button>
      </div>
      <Table<User>
        dataSource={data}
        className="h-full"
        loading={isLoading}
        rowKey="id"
      >
        <Column
          title="Email"
          dataIndex="email"
          key="email"
        />
        <Column
          title="Display name"
          dataIndex="displayName"
          key="displayName"
        />
        <Column
          title="Is active"
          dataIndex="isActive"
          key="isActive"
          render={(isActive: boolean) => (
            <Tag
              style={{
                backgroundColor: isActive
                  ? "var(--color-green-500)"
                  : "var(--color-red-500)",
                color: "var(--color-myWhite)",
                border: "none",
                fontWeight: 700,
              }}
            >
              {isActive ? "Active" : "Inactive"}
            </Tag>
          )}
        />
        <Column
          title="List of vendors"
          dataIndex="vendors"
          key="vendors"
          render={(vendors: { id: string; displayName: string }[]) => (
            <div style={{ maxWidth: 420 }}>
              {vendors &&
                vendors.map((vendor) => (
                  <Tag
                    key={vendor.id}
                    style={{
                      backgroundColor: "var(--color-myViolet)",
                      color: "white",
                      border: "none",
                      marginBottom: 4,
                      marginRight: 4,
                      fontWeight: 600,
                    }}
                  >
                    {vendor.displayName}
                  </Tag>
                ))}
            </div>
          )}
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
        <Column
          title="Action"
          key="action"
          render={(record: User) => (
            <Switch
              checked={record.isActive}
              onChange={(checked) => handleStatusChange(record, checked)}
            />
          )}
        />
      </Table>
    </div>
  );
};

export default UsersPage;
