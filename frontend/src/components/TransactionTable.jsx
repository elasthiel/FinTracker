import React from "react";
import useGetAllTransaction from "../hooks/useGetAllTransaction";
import useAuthUser from "../hooks/useAuthUser";
import TransactionCard from "./TransactionCard";

export default function TransactionTable() {
  const { authUser: user } = useAuthUser();
  const { transactions, isLoading, error } = useGetAllTransaction(user?._id);

  // Check if user exists
  if (!user) {
    return (
      <div className="max-w-8xl mx-auto p-6">
        <div className="text-center py-8">Please log in to view transactions</div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="max-w-8xl mx-auto p-6">
        <div className="text-center py-8">Loading transactions...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-8xl mx-auto p-6">
        <div className="text-center py-8 text-red-500">
          Error: {error.message || "Failed to load transactions"}
        </div>
      </div>
    );
  }

  const sortedTransactions = [...(transactions || [])].sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return (
    <div className="max-w-8xl mx-auto p-6">
      <div className="rounded-lg shadow-sm overflow-hidden">
        <div className="grid grid-cols-6 gap-0">
          {/* Header */}
          <div className="px-6 py-3 text-xs font-medium uppercase border-b border-gray-200">
            Date
          </div>
          <div className="px-6 py-3 text-xs text-center font-medium uppercase tracking-wide border-b border-gray-200">
            Category
          </div>
          <div className="px-6 py-3 text-xs text-center font-medium uppercase tracking-wide border-b border-gray-200">
            Description
          </div>
          <div className="px-6 py-3 text-xs text-center font-medium uppercase tracking-wide border-b border-gray-200">
            Type
          </div>
          <div className="px-6 py-3 text-xs text-center font-medium uppercase tracking-wide border-b border-gray-200">
            Amount
          </div>
          <div className="px-6 py-3 uppercase tracking-wide border-b border-gray-200"></div>

          {/* Transaction Rows */}
          {sortedTransactions.length > 0 ? (
            sortedTransactions.map((transaction) => (
              <TransactionCard key={transaction._id} transaction={transaction} />
            ))
          ) : (
            <div className="col-span-6 px-6 py-8 text-center text-gray-500">
              No transactions found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
