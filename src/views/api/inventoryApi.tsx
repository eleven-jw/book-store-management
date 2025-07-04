import request from "../../utils/request/request";

export interface InventoryItem {
    id: number;
    name: string;
    price?: number;
    quantity: number;
    description?: string;
}
export const getInventoryList = async () => {
    return await request.get("/inventory/list");
};

export const addInventoryItem = async (data: InventoryItem) => {
    return await request.post("/inventory/add", data);
};

export const updateInventoryItem = async (id: number, data: InventoryItem) => {
    return await request.post(`/inventory/update/${id}`, data);
};

export const deleteInventoryItem = async (id: number) => {
    return await request.post(`/inventory/delete/${id}`);
};