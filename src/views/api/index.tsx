import request from "../../utils/request/request";
import type { FieldType } from "../types";

export const login = async (data: FieldType) => {
    return await request.post("/auth/login", data);
};

// export default {
//     login
// };
