import { axiosInstance } from "./axios";
export const getAuthUser = async () => {
  try {
    const res = await axiosInstance.get("/auth/me");
    return res.data;
  } catch (error) {
    console.log("Error in getAuthUser:", error);
    return null;
  }
};
export const signup = async (userData) => {
  const res = await axiosInstance.post("/auth/signup", userData);
  return res.data;
};

export const login = async (userData) => {
  const res = await axiosInstance.post("/auth/login", userData);
  return res.data;
};

export const logout = async () => {
  try {
    const res = await axiosInstance.post("/auth/logout");
    return res.data;
  } catch (error) {
    console.log("Error in logout:", error);
    return null;
  }
};

export const createTransaction = async (transactionData) => {
  const res = await axiosInstance.post("/user/create", transactionData);
  return res.data;
};

export const getTransactions = async (userId) => {
  try {
    const res = await axiosInstance.get(`/user/${userId}`);
    return res.data;
  } catch (error) {
    console.log("Error in getTransactions:", error);
    return null;
  }
};

export const deleteTransaction = async (transactionId) => {
  const res = await axiosInstance.delete("/user/delete-transaction", { data: { transactionId } });
  return res.data;
};

export const addAccount = async (accountData) => {
  const res = await axiosInstance.post("/user/add-account", accountData);
  return res.data;
};

export const deleteAccount = async (accountName) => {
  const res = await axiosInstance.delete("/user/delete-account", { data: { accountName } });
  return res.data;
};
