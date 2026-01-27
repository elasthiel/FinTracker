import React from "react";
import { useState } from "react";
import useAuthUser from "../hooks/useAuthUser";
import useCreateTransaction from "../hooks/useCreateTransaction";
import toast from "react-hot-toast";

const AddExpense = () => {
  const { authUser: user } = useAuthUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [amountError, setAmountError] = useState("");
  const [expenseData, setExpenseData] = useState({
    userId: user?._id,
    amount: "",
    category: "",
    date: new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Manila" }),
    description: "",
    type: "expense",
  });

 const handleAmountChange = (e) => {
    const value = e.target.value;

    // Check kung may letters o invalid characters
    if (value && !/^\d*\.?\d*$/.test(value)) {
      setAmountError("Please enter numbers only");
    } else {
      setAmountError(""); // Clear error kung valid
    }

    setExpenseData({ ...expenseData, amount: value });
  };

  const { createTransactionMutation, isPending, error } = useCreateTransaction();

  if (error) {
    toast.error("Failed to add expense. Please try again.");
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    createTransactionMutation(expenseData, {
      onSuccess: () => {
        toast.success("Expense added successfully!");
      },
      onError: () => {
        toast.error("Failed to add expense. Please try again.");
      },
    });
    setIsModalOpen(false);
    setExpenseData({
      userId: user?._id,
      amount: "",
      category: "",
      date: new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Manila" }),
      description: "",
      type: "expense",
    });
  };
  return (
    <div>
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center backdrop-blur-sm z-50"
        >
          <form
            className="w-full max-w-3xl p-6 bg-base-100 rounded-lg shadow-lg relative"
            onSubmit={handleSubmit}
          >
            <div className="p-6 rounded space-y-4">
              <div className="flex justify-between">
                <h2 className="text-xl font-bold mb-4">Add Expense</h2>
                <button
                  type="button"
                  className="btn btn-circle btn-error text-xl font-bold btn-sm absolute top-3 right-3"
                  onClick={() => setIsModalOpen(false)}
                >
                  X
                </button>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Amount</label>
                <input
                  type="text" // Change to text para ma-detect ang letters
                  value={expenseData.amount}
                  onChange={handleAmountChange} // Use custom handler
                  className={`w-full p-2 border rounded ${
                    amountError ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter amount"
                  required
                />
                {amountError && <p className="text-red-500 text-sm mt-1">{amountError}</p>}
              </div>
              {/* Rest of your form fields... */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Category</label>
                <div className="relative">
                  <select
                    value={expenseData.category}
                    onChange={(e) => setExpenseData({ ...expenseData, category: e.target.value })}
                    className="w-full p-2 border rounded appearance-none pr-8"
                    required
                  >
                    <option value="">Select category</option>
                    {user.accounts.map((account) => (
                      <option key={account._id} value={account.name}>
                        {account.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Date</label>
                <input
                  type="date"
                  value={expenseData.date}
                  onChange={(e) => setExpenseData({ ...expenseData, date: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={expenseData.description}
                  onChange={(e) => setExpenseData({ ...expenseData, description: e.target.value })}
                  className="w-full p-2 border rounded"
                  rows={5}
                ></textarea>
              </div>
              <button
                type="submit"
                className="btn btn-primary w-full mt-4"
                disabled={amountError || isPending}
              >
                {isPending ? (
                  <div className="flex items-center">
                    <div className="loading loading-spinner loading-sm"></div>
                    <span className="ml-2">Adding Expense...</span>
                  </div>
                ) : (
                  "Add Expense"
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="btn btn-secondary" onClick={() => setIsModalOpen(true)}>
        Add Expense
      </div>
    </div>
  );
};

export default AddExpense;
