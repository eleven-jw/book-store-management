import React, { useState, useEffect } from "react";
import { Table, Button, Input, Modal, Form, message, Space, Flex } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { getInventoryList, addInventoryItem, updateInventoryItem, deleteInventoryItem } from "./api/inventoryApi";
import type { InventoryItem } from "./api/inventoryApi";

const InventoryList: React.FC = () => {
  // 表格数据状态
  const [data, setData] = useState<InventoryItem[]>([]);
  // 添加/编辑的弹窗可见性
  const [isModalVisible, setIsModalVisible] = useState(false);
  // 当前编辑的库存项
  const [currentItem, setCurrentItem] = useState<InventoryItem | null>(null);
  // 搜索框的值
  const [searchText, setSearchText] = useState("");
  // 选择的库存项
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  // 获取库存列表数据
  const fetchInventoryList = async () => {
    try {
      const response = await getInventoryList();
      setData(response.data); // 假设返回的数据结构是 { data: InventoryItem[] }
    } catch (error) {
      message.error("Failed to fetch inventory list");
    }
  };

  // 初始化时获取库存数据
  useEffect(() => {
    fetchInventoryList();
  }, []);
  
  // 显示添加/编辑弹窗
  const showModal = (item: InventoryItem | null = null) => {
    setCurrentItem(item);
    setIsModalVisible(true);
  };

  // 关闭弹窗
  const handleCancel = () => {
    setIsModalVisible(false);
    setCurrentItem(null);
  };

  // 提交添加或编辑
  const handleOk = async (values: InventoryItem) => {
    try {
      if (currentItem) {
        // 编辑
        await updateInventoryItem(currentItem.id, values);
        setData(data.map((item) => (item.id === currentItem.id ? { ...item, ...values } : item)));
        message.success("Item updated successfully");
      } else {
        // 添加
        await addInventoryItem(values);
        setData([...data, { ...values, id: data.length + 1 }]);
        message.success("Item added successfully");
      }
      setIsModalVisible(false);
    } catch (error) {
      message.error("Failed to submit the form");
    }
  };

  // 删除项
  const handleDelete = async (id: number) => {
    try {
      await deleteInventoryItem(id);
      setData(data.filter((item) => item.id !== id));
      message.success("Item deleted successfully");
    } catch (error) {
      message.error("Failed to delete the item");
    }
  };
  // 删除多个选中的项
  const handleBulkDelete = async () => {
    try {
      await Promise.all(selectedRowKeys.map((id) => deleteInventoryItem(id as number)));
      setData(data.filter((item) => !selectedRowKeys.includes(item.id)));
      setSelectedRowKeys([]); // 清空选中的行
      message.success("Selected items deleted successfully");
    } catch (error) {
      message.error("Failed to delete selected items");
    }
  };

  // 查询功能
  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  // 表格数据处理（搜索功能）
  const filteredData = data.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()));

  // 表格列定义
  const columns = [
    {
      type: "selection",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text: any, record: InventoryItem) => (
        <span>
          <Button icon={<EditOutlined />} onClick={() => showModal(record)} style={{ marginRight: 8 }} />
          <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)} />
        </span>
      ),
    },
  ];
  // rowSelection 用于管理多选框
  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(selectedRowKeys);
    },
  };

  return (
    <div>
      {/* 查询框 */}
      <Input.Search
        placeholder="Search by name"
        onSearch={handleSearch}
        style={{ width: 300, marginBottom: 20 }}
      />
      <Flex style={{
              width: '100%',
              height: 80,
            }}
            justify={'flex-end'}
            align={'center'}>
        <Space>
          <Button
            danger
            onClick={handleBulkDelete}
            disabled={selectedRowKeys.length === 0}
          >
            Delete Selected
          </Button>
        </Space>
       <Space style={{ marginLeft: 16 }}>
          <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => showModal()}
        >
          Add Item
        </Button>
        </Space>
      </Flex>
      
      {/* 表格 */}
      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        rowSelection={rowSelection}
      />

      {/* 添加/编辑弹窗 */}
      <Modal
        title={currentItem ? "Edit Item" : "Add Item"}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          initialValues={currentItem || {}}
          onFinish={handleOk}
          layout="vertical"
        >
          <Form.Item label="Name" name="name" rules={[{ required: true, message: "Please input the name!" }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Quantity" name="quantity" rules={[{ required: true, message: "Please input quantity!" }]}>
            <Input type="number" />
          </Form.Item>

          <Form.Item label="Price" name="price" rules={[{ required: true, message: "Please input price!" }]}>
            <Input type="number" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block style={{ width: "50%", height: "40px"}}>
              {currentItem ? "Save Changes" : "Add Item"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default InventoryList;
