import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    capital: {
      type: Number,
      default: 0,
    },
    accounts: [
      {
        name: {
          type: String,
          required: true,
          unique: true,
        },
        initialBalance: {
          type: Number,
          default: 0,
        },
        balance: {
          type: Number,
          default: 0,
        },
        transactions: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "fintracker_transactions",
            required: true,
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.matchPassword = async function (enteredpassword) {
  const isPasswordCorrect = await bcrypt.compare(enteredpassword, this.password);
  return isPasswordCorrect;
};

userSchema.methods.recalculateCapital = async function () {
  this.capital = this.accounts.reduce((total, account) => total + account.balance, 0);
};

userSchema.methods.updateAccountBalance = async function () {
  // Populate transactions for each account
  await this.populate({
    path: "accounts.transactions",
    model: "fintracker_transactions",
  });

  this.accounts.forEach((account) => {
    let accountBalance = account.initialBalance;
    // account.transactions is now an array of transaction documents
    account.transactions.forEach((transaction) => {
      if (
        transaction &&
        typeof transaction.amount === "number" &&
        (transaction.type === "income" || transaction.type === "expense")
      ) {
        if (transaction.type === "income") {
          accountBalance += transaction.amount;
        } else if (transaction.type === "expense") {
          accountBalance -= transaction.amount;
        }
      }
    });
    account.balance = accountBalance;
  });
  await this.recalculateCapital();
  return this.save();
};

const User = mongoose.model("fintracker_user", userSchema);

export default User;
