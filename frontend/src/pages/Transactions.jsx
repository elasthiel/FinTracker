import { useState, useMemo } from "react";
import {
  Search,
  Filter,
  ArrowUpCircle,
  ArrowDownCircle,
  Calendar,
  X,
  TrendingUp,
  TrendingDown,
  Wallet,
} from "lucide-react";
import useAuthUser from "../hooks/useAuthUser";
import useGetAllTransaction from "../hooks/useGetAllTransaction";
import AddIncome from "../components/AddIncome";
import AddExpense from "../components/AddExpense";
import TransactionCard from "../components/TransactionCard";

const Transactions = () => {
  const { authUser: user } = useAuthUser();
  const { transactions, isLoading } = useGetAllTransaction(user?._id);

  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [showFilters, setShowFilters] = useState(false);

  const formatter = new Intl.NumberFormat("en-PH");

  const categories = useMemo(() => {
    if (!user?.accounts) return [];
    return user.accounts.map((acc) => acc.name);
  }, [user?.accounts]);

  const filteredTransactions = useMemo(() => {
    if (!transactions) return [];

    return transactions
      .filter((t) => {
        if (typeFilter !== "all" && t.type !== typeFilter) return false;

        if (categoryFilter !== "all" && t.category !== categoryFilter) return false;

        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          const matchesDescription = t.description?.toLowerCase().includes(query);
          const matchesCategory = t.category?.toLowerCase().includes(query);
          if (!matchesDescription && !matchesCategory) return false;
        }

        if (dateRange.start) {
          const transactionDate = new Date(t.date);
          const startDate = new Date(dateRange.start);
          if (transactionDate < startDate) return false;
        }

        if (dateRange.end) {
          const transactionDate = new Date(t.date);
          const endDate = new Date(dateRange.end);
          if (transactionDate > endDate) return false;
        }

        return true;
      })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [transactions, typeFilter, categoryFilter, searchQuery, dateRange]);

  const stats = useMemo(() => {
    const income = filteredTransactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);
    const expenses = filteredTransactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);
    return {
      income,
      expenses,
      net: income - expenses,
      count: filteredTransactions.length,
    };
  }, [filteredTransactions]);

  const clearFilters = () => {
    setSearchQuery("");
    setTypeFilter("all");
    setCategoryFilter("all");
    setDateRange({ start: "", end: "" });
  };

  const hasActiveFilters =
    searchQuery || typeFilter !== "all" || categoryFilter !== "all" || dateRange.start || dateRange.end;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="text-base-content/60">Loading transactions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-base-content">Transactions</h1>
          <p className="text-base-content/60 mt-1">
            View and manage all your transactions
          </p>
        </div>
        <div className="flex gap-3">
          <AddIncome />
          <AddExpense />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-base-100 border border-base-300 rounded-xl p-4 flex items-center gap-4">
          <div className="p-3 rounded-full bg-success/10">
            <TrendingUp className="w-6 h-6 text-success" />
          </div>
          <div>
            <p className="text-sm text-base-content/60">Total Income</p>
            <p className="text-xl font-bold text-success">
              +₱{formatter.format(stats.income)}
            </p>
          </div>
        </div>

        <div className="bg-base-100 border border-base-300 rounded-xl p-4 flex items-center gap-4">
          <div className="p-3 rounded-full bg-error/10">
            <TrendingDown className="w-6 h-6 text-error" />
          </div>
          <div>
            <p className="text-sm text-base-content/60">Total Expenses</p>
            <p className="text-xl font-bold text-error">
              -₱{formatter.format(stats.expenses)}
            </p>
          </div>
        </div>

        <div className="bg-base-100 border border-base-300 rounded-xl p-4 flex items-center gap-4">
          <div className="p-3 rounded-full bg-primary/10">
            <Wallet className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-base-content/60">Net Balance</p>
            <p
              className={`text-xl font-bold ${
                stats.net >= 0 ? "text-success" : "text-error"
              }`}
            >
              {stats.net >= 0 ? "+" : "-"}₱{formatter.format(Math.abs(stats.net))}
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-base-100 border border-base-300 rounded-xl p-4 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/40" />
            <input
              type="text"
              placeholder="Search by description or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input input-bordered w-full pl-10"
            />
          </div>

          {/* Filter Toggle Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`btn ${showFilters ? "btn-primary" : "btn-ghost"} gap-2`}
          >
            <Filter className="w-5 h-5" />
            Filters
            {hasActiveFilters && (
              <span className="badge badge-sm badge-primary">Active</span>
            )}
          </button>

          {hasActiveFilters && (
            <button onClick={clearFilters} className="btn btn-ghost btn-error gap-2">
              <X className="w-5 h-5" />
              Clear
            </button>
          )}
        </div>

        {/* Filter Options */}
        {showFilters && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-base-300">
            {/* Type Filter */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Type</span>
              </label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="select select-bordered w-full"
              >
                <option value="all">All Types</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>

            {/* Category Filter */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Account</span>
              </label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="select select-bordered w-full"
              >
                <option value="all">All Accounts</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Range Start */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">From Date</span>
              </label>
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) =>
                  setDateRange((prev) => ({ ...prev, start: e.target.value }))
                }
                className="input input-bordered w-full"
              />
            </div>

            {/* Date Range End */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">To Date</span>
              </label>
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) =>
                  setDateRange((prev) => ({ ...prev, end: e.target.value }))
                }
                className="input input-bordered w-full"
              />
            </div>
          </div>
        )}
      </div>

      {/* Transactions Table */}
      <div className="bg-base-100 border border-base-300 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-base-300 flex justify-between items-center">
          <h2 className="font-semibold">
            {hasActiveFilters ? "Filtered Results" : "All Transactions"}
          </h2>
          <span className="text-sm text-base-content/60">
            {stats.count} transaction{stats.count !== 1 ? "s" : ""}
          </span>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[700px]">
            <div className="grid grid-cols-6 gap-0">
              {/* Header */}
              <div className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-base-content/60 bg-base-200/50 border-b border-base-300">
                Date
              </div>
              <div className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-base-content/60 bg-base-200/50 border-b border-base-300 text-center">
                Account
              </div>
              <div className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-base-content/60 bg-base-200/50 border-b border-base-300 text-center">
                Description
              </div>
              <div className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-base-content/60 bg-base-200/50 border-b border-base-300 text-center">
                Type
              </div>
              <div className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-base-content/60 bg-base-200/50 border-b border-base-300 text-center">
                Amount
              </div>
              <div className="px-6 py-3 bg-base-200/50 border-b border-base-300"></div>

              {/* Transaction Rows */}
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction) => (
                  <TransactionCard key={transaction._id} transaction={transaction} />
                ))
              ) : (
                <div className="col-span-6 px-6 py-12 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <Calendar className="w-12 h-12 text-base-content/20" />
                    <p className="text-base-content/60">
                      {hasActiveFilters
                        ? "No transactions match your filters"
                        : "No transactions yet"}
                    </p>
                    {hasActiveFilters && (
                      <button onClick={clearFilters} className="btn btn-sm btn-ghost">
                        Clear filters
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
