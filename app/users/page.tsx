"use client";

import React from "react";
import { Switch, Table, Tag, App, Typography } from "antd";
import { getUsers, updateUser, updateUserDisplayName } from "@/lib/utils";
import useSWR, { mutate } from "swr";
import { User } from "@/types";

const { Column } = Table;

const UsersPage = () => {
  const { data, isLoading, error } = useSWR("users", getUsers);
  const { message } = App.useApp();
  const { Text } = Typography;

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

  const handleDisplayNameEdit = async (value: string, record: User) => {
    if (value.trim() === "") {
      message.error("Display name cannot be empty");
      return false;
    }

    try {
      await updateUserDisplayName(record.id.toString(), value.trim());
      mutate("users");
      message.success("Display name updated successfully!");
      return true;
    } catch (error) {
      message.error("Failed to update display name. Please try again.");
      console.error("Error updating display name:", error);
      return false;
    }
  };

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
          Users
        </h1>
        <h6
          style={{ marginBottom: "2rem" }}
          className="text-myWhite"
        >
          Manage and monitor users&apos;s actions.
        </h6>
      </div>

      <div className="max-w-[1920px] mx-auto">
        <Table<User>
          dataSource={data}
          className="h-full"
          loading={isLoading}
          rowKey="id"
          scroll={{ y: "50vh", x: "1200px" }}
          pagination={{
            pageSize: 10,
          }}
          tableLayout="auto"
        >
          <Column
            title="Email"
            dataIndex="email"
            key="email"
            width={170}
          />
          <Column
            title="Display name"
            dataIndex="displayName"
            key="displayName"
            width={150}
            render={(displayName: string, record: User) => (
              <Text
                editable={{
                  text: displayName,
                  onChange: (value) => handleDisplayNameEdit(value, record),
                  tooltip: "Click to edit",
                }}
                style={{
                  color: "var(--color-myWhite)",
                  fontSize: "14px",
                }}
              >
                {displayName}
              </Text>
            )}
          />
          <Column
            title="Is active"
            dataIndex="isActive"
            key="isActive"
            width={130}
            render={(isActive: boolean, record: User) => (
              <div className="w-full flex items-center justify-between">
                <Switch
                  checked={isActive}
                  onChange={(checked) => handleStatusChange(record, checked)}
                />
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
              </div>
            )}
          />
          <Column
            title="List of vendors"
            dataIndex="vendors"
            key="vendors"
            width={250}
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
            width={100}
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
    </div>
  );
};

export default UsersPage;
