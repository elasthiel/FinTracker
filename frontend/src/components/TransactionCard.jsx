import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTransaction } from "../lib/api";
import toast from "react-hot-toast";
import { useState } from "react";

const TransactionCard = ({ transaction }) => {
  const [deleteModal, setDeleteModal] = useState(false);

  const queryClient = useQueryClient();
  const { mutate: deleteTransactionMutation } = useMutation({
    mutationFn: deleteTransaction,
    onSuccess: () => {
      toast.success("Transaction deleted successfully");
      queryClient.invalidateQueries(["transactions"]);
      queryClient.invalidateQueries(["authUser"]);
      setDeleteModal(false); // Close modal after successful delete
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to delete transaction");
    },
  });

  const formatAmount = (amount) => {
    const formatted = Math.abs(amount).toLocaleString();
    return amount >= 0 ? `₱${formatted}` : `-₱${formatted}`;
  };

  const handleDelete = () => {
    deleteTransactionMutation(transaction._id);
  };

  return (
    <>
      <div className="px-6 py-4 text-sm border-b border-gray-100/20">
        {new Date(transaction.date).toLocaleDateString()}
      </div>
      <div className="px-6 py-4 text-sm font-medium border-b border-gray-100/20 text-center">
        {transaction.category}
      </div>
      <div className="px-6 py-4 text-sm border-b border-gray-100/20 text-center">
        {transaction.description}
      </div>
      <div className="px-6 py-4 text-sm border-b border-gray-100/20 text-center">
        {transaction.type}
      </div>
      <div
        className={`px-6 py-4 text-sm font-medium border-b text-center border-gray-100/20 ${
          transaction.type === "income" ? "text-green-500" : "text-red-600"
        }`}
      >
        {formatAmount(transaction.amount)}
      </div>
      <div className="border-b text-center border-gray-100/20 w-full flex">
        <div className=" relative flex">
          <button className="btn bg-base-100 m-2" onClick={() => setDeleteModal(!deleteModal)}>
            ...
          </button>
          {deleteModal && (
            <div className=" absolute left-14 shadow-lg min-w-max z-50 bg-base-300 rounded-xl overflow-auto  ">
              <button
                className="w-full px-4 py-2 text-xs font-medium text-left text-red-600 hover:bg-gray-100/20 whitespace-nowrap border-b"
                onClick={handleDelete}
              >
                Delete
              </button>
              <button
                className="w-full px-4 py-2 text-xs font-medium text-left hover:bg-gray-100/20 whitespace-nowrap"
                onClick={() => setDeleteModal(false)}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TransactionCard;
