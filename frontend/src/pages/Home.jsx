import { useState } from "react";
import {
  Plus,
  Wallet,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import AddExpense from "../components/AddExpense";
import AddIncome from "../components/AddIncome";
import TransactionTable from "../components/TransactionTable";
import AddAccountModal from "../components/AddAccountModal";
import AccountCard from "../components/AccountCard";
import useGetAllTransaction from "../hooks/useGetAllTransaction";
import useAuthUser from "../hooks/useAuthUser";

const Home = () => {
  const { authUser: user } = useAuthUser();
  const [modal, setModal] = useState(false);

  const formatter = new Intl.NumberFormat("en-PH");

  const { transactions, isLoading } = useGetAllTransaction(user?._id);

  const expenses = transactions?.filter((transaction) => transaction.type === "expense") || [];
  const totalExpenses = expenses.reduce((acc, transaction) => acc + transaction.amount, 0);

  const income = transactions?.filter((transaction) => transaction.type === "income") || [];
  const totalIncome = income.reduce((acc, transaction) => acc + transaction.amount, 0);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="text-base-content/60">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-base-content">
            Welcome back, {user?.fullName?.split(" ")[0]}
          </h1>
          <p className="text-base-content/60 mt-1">
            Here's what's happening with your finances
          </p>
        </div>
        <div className="flex gap-3">
          <AddIncome />
          <AddExpense />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Total Capital */}
        <div className="bg-base-100 border border-base-300 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-base-content/60">Total Capital</p>
              <p className="text-2xl font-bold text-primary mt-1">
                ₱{formatter.format(user?.capital || 0)}
              </p>
            </div>
            <div className="p-3 rounded-full bg-primary/10">
              <Wallet className="w-6 h-6 text-primary" />
            </div>
          </div>
        </div>

        {/* Total Income */}
        <div className="bg-base-100 border border-base-300 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-base-content/60">Total Income</p>
              <p className="text-2xl font-bold text-success mt-1">
                +₱{formatter.format(totalIncome)}
              </p>
            </div>
            <div className="p-3 rounded-full bg-success/10">
              <TrendingUp className="w-6 h-6 text-success" />
            </div>
          </div>
        </div>

        {/* Total Expenses */}
        <div className="bg-base-100 border border-base-300 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-base-content/60">Total Expenses</p>
              <p className="text-2xl font-bold text-error mt-1">
                -₱{formatter.format(totalExpenses)}
              </p>
            </div>
            <div className="p-3 rounded-full bg-error/10">
              <TrendingDown className="w-6 h-6 text-error" />
            </div>
          </div>
        </div>
      </div>

      {/* Accounts Section */}
      <div className="bg-base-100 border border-base-300 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-base-300 flex justify-between items-center">
          <div>
            <h2 className="font-semibold">Your Accounts</h2>
            <p className="text-sm text-base-content/60">
              Track where your money is stored
            </p>
          </div>
          <button
            onClick={() => setModal(true)}
            className="btn btn-sm btn-primary gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Account
          </button>
        </div>

        <div className="p-4">
          {user?.accounts?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {user.accounts.map((account, index) => (
                <AccountCard account={account} key={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-base-200 mb-3">
                <Wallet className="w-6 h-6 text-base-content/40" />
              </div>
              <p className="text-base-content/60">No accounts yet</p>
              <button
                onClick={() => setModal(true)}
                className="btn btn-sm btn-ghost text-primary mt-2"
              >
                Add your first account
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Transactions Section */}
      <div className="bg-base-100 border border-base-300 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-base-300">
          <h2 className="font-semibold">Recent Transactions</h2>
          <p className="text-sm text-base-content/60">
            Your latest financial activity
          </p>
        </div>
        <TransactionTable />
      </div>

      {/* Add Account Modal */}
      <AddAccountModal open={modal} onClose={() => setModal(false)} />
    </div>
  );
};

export default Home;
