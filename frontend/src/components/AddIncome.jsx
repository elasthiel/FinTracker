import { useState } from "react";
import useAuthUser from "../hooks/useAuthUser";
import useCreateTransaction from "../hooks/useCreateTransaction";
import { toast } from "react-hot-toast";

const AddIncome = () => {
  const { authUser: user } = useAuthUser();
  const { createTransactionMutation, isPending, error } = useCreateTransaction();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [amountError, setAmountError] = useState("");
  const [incomeData, setIncomeData] = useState({
    userId: user?._id,
    amount: "",
    category: "",
    date: new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Manila" }),
    description: "",
    type: "income",
  });

  const handleAmountChange = (e) => {
    const value = e.target.value;

    // Check kung may letters o invalid characters
    if (value && !/^\d*\.?\d*$/.test(value)) {
      setAmountError("Please enter numbers only");
    } else {
      setAmountError(""); // Clear error kung valid
    }

    setIncomeData({ ...incomeData, amount: value });
  };

  if (error) {
    toast.error("Failed to add income. Please try again.");
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    createTransactionMutation(incomeData, {
      onSuccess: () => {
        toast.success("Income added successfully!");
      },
      onError: () => {
        toast.error("Failed to add income. Please try again.");
      },
    });
    setIsModalOpen(false);
    setIncomeData({
      userId: user?._id,
      amount: "",
      category: "",
      date: new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Manila" }),
      description: "",
      type: "income",
    });
  };
  return (
    <div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center backdrop-blur-sm z-50">
          <form
            className="w-full max-w-3xl p-6 bg-base-100 rounded-lg shadow-lg relative "
            onSubmit={handleSubmit}
          >
            <div className="p-6 rounded space-y-4">
              <div className="flex justify-between">
                <h2 className="text-xl font-bold mb-4">Add Income</h2>
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
                  value={incomeData.amount}
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
                    value={incomeData.category}
                    onChange={(e) => setIncomeData({ ...incomeData, category: e.target.value })}
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
                  value={incomeData.date}
                  onChange={(e) => setIncomeData({ ...incomeData, date: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={incomeData.description}
                  onChange={(e) => setIncomeData({ ...incomeData, description: e.target.value })}
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
                    <span className="ml-2">Adding Income...</span>
                  </div>
                ) : (
                  "Add Income"
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
        Add Income
      </div>
    </div>
  );
};

export default AddIncome;
