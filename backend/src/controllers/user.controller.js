import handleError from "../lib/handleError.js";
import Transaction from "../models/transaction.model.js";
import User from "../models/user.model.js";

export const createTransaction = async (req, res) => {
  try {
    const { userId, amount, category, date, description, type } = req.body;

    if (!amount || !category || !date || !userId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Create and await the transaction
    const transaction = await Transaction.create({
      userId,
      amount,
      category,
      date,
      description,
      type,
    });

    // Populate accounts.transactions with actual transaction docs
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const targetAccount = user.accounts.find((account) => account.name === category);
    if (!targetAccount) {
      return res.status(400).json({
        success: false,
        message: "Account category not found",
      });
    }

    targetAccount.transactions.push(transaction._id);

    await user.updateAccountBalance();

    return res.status(201).json({
      success: true,
      message: "Transaction created successfully",
      transaction,
    });
  } catch (error) {
    handleError(error, "createTransaction", res);
  }
};

export const getAllTransactionById = async (req, res) => {
  try {
    const { id: userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }
    const transactions = await Transaction.find({ userId });
    return res.status(200).json({
      success: true,
      message: "Transactions fetched successfully",
      transactions,
    });
  } catch (error) {
    handleError(error, "getAllTransactionById", res);
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    const { transactionId } = req.body;
    const user = req.user;
    if (!transactionId) {
      return res.status(400).json({
        success: false,
        message: "Transaction ID is required",
      });
    }
    const transaction = await Transaction.findByIdAndDelete(transactionId);
    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    await user.updateAccountBalance();

    return res.status(200).json({
      success: true,
      message: "Transaction deleted successfully",
    });
  } catch (error) {
    return handleError(error, "deleteTransaction", res);
  }
};

export const addAccount = async (req, res) => {
  try {
    const user = req.user;
    const { name, initialBalance } = req.body;

    if (!user || !name || initialBalance === undefined) {
      return res.status(400).json({
        success: false,
        message: "User ID, name, and balance are required",
      });
    }

    // Check for duplicate account name (case-insensitive)
    const duplicate = user.accounts.some(
      (account) => account.name.toLowerCase() === name.toLowerCase()
    );
    if (duplicate) {
      return res.status(400).json({
        success: false,
        message: `Account name '${name}' already exists.`,
      });
    }

    user.accounts.push({ name, initialBalance });
    await user.updateAccountBalance();

    return res.status(201).json({
      success: true,
      message: `${name} Account added successfully, your new capital is ${user.capital}`,
    });
  } catch (error) {
    handleError(error, "addAccount", res);
  }
};

export const deleteAccount = async (req, res) => {
  try {
    const user = req.user;
    const { accountName } = req.body;

    if (!user || !accountName) {
      return res.status(400).json({
        success: false,
        message: "User ID and account name are required",
      });
    }
    user.accounts = user.accounts.filter((account) => account.name !== accountName);
    await user.save();

    return res.status(200).json({
      success: true,
      message: `${accountName}Account deleted successfully, your new capital balance is ${user.capital}`,
    });
  } catch (error) {
    handleError(error, "deleteAccount", res);
  }
};
