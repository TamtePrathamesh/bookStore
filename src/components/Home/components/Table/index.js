import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Table as AntTable, Rate, Button, Popover, Checkbox } from "antd";
import { EyeInvisibleOutlined } from "@ant-design/icons";
import { getRandomNumber } from "../../../../utils";

import "./style.scss";

const CheckboxGroup = Checkbox.Group;

export const Table = ({ data }) => {
  const [filteredInfo, setFilteredInfo] = useState("");
  const [visible, setPopupVisible] = useState(false);
  const toogleColumns = {
    Title: {
      title: "Title",
      dataIndex: "title",
    },

    Price: {
      title: "Price",
      dataIndex: "price",
      render: (value) => (
        <>
          <div>{`₹ ${value}`}</div>
        </>
      ),
      sorter: (a, b) => a.price - b.price,
    },
    Ratings: {
      title: "Total Ratings",
      dataIndex: "average_rating",
      render: (value) => (
        <>
          <Rate value={value} disabled />
        </>
      ),
      filters: [
        { text: "1", value: 1.9 },
        { text: "2", value: 2.9 },
        { text: "3", value: 3.9 },
        { text: "4", value: 4.9 },
        { text: "5", value: 5.9 },
      ],
      filteredValue: filteredInfo.average_rating || null,
      onFilter: (value, record) => record.average_rating <= value,
    },
    Author: {
      title: "Author",
      dataIndex: "authors",
      sorter: (a, b) => (a.authors > b.authors) - (a.authors < b.authors),
    },
  };
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (value) => (
        <>
          <div>{`₹ ${value}`}</div>
        </>
      ),
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Total Ratings",
      dataIndex: "average_rating",
      render: (value) => (
        <>
          <Rate value={value} disabled />
        </>
      ),
      filters: [
        { text: "1", value: 1.9 },
        { text: "2", value: 2.9 },
        { text: "3", value: 3.45 },
        { text: "4", value: 4.9 },
        { text: "5", value: 5.9 },
      ],
      filteredValue: filteredInfo.average_rating || null,
      onFilter: (value, record) => record.average_rating <= value,
    },
  ];
  const plainOptions = ["Title", "Price", "Ratings", "Author"];
  const defaultCheckedList = ["Title", "Price", "Ratings"];

  const [dataColumns, setDataColumns] = React.useState(columns);
  const [checkedList, setCheckedList] = React.useState(defaultCheckedList);

  const onChange = (list) => {
    setCheckedList(list);
    const filtered = list.map((l) => {
      const value = toogleColumns[l];
      return value;
    });
    setDataColumns(filtered);
  };

  const handleVisibleChange = (visible) => {
    setPopupVisible(visible);
  };

  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
  };

  const history = useHistory();

  return (
    <div className="home-data">
      <div className="utils">
        <Popover
          content={[
            <CheckboxGroup
              key={getRandomNumber()}
              options={plainOptions}
              value={checkedList}
              onChange={onChange}
            ></CheckboxGroup>,
          ]}
          title="Toggle Columns"
          trigger="click"
          visible={visible}
          onVisibleChange={handleVisibleChange}
        >
          <Button
            type="primary"
            danger
            icon={<EyeInvisibleOutlined />}
          ></Button>
        </Popover>
      </div>

      <AntTable
        dataSource={data}
        columns={dataColumns}
        onChange={handleChange}
        onRow={(record, _) => {
          return {
            onClick: () => history.push(`bookdetails/${record.bookID}`),
          };
        }}
      />
    </div>
  );
};

export default Table;
