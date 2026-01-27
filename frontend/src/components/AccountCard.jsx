import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Wallet } from "lucide-react";
import React, { useState } from "react";
import { deleteAccount } from "../lib/api";

const AccountCard = ({ account }) => {
  const queryClient = useQueryClient();
  const { mutate: deleteMutation, isLoading } = useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => {
      queryClient.invalidateQueries(["transactions"]);
      queryClient.invalidateQueries(["authUser"]);
    },
  });

  const [isOpen, setIsOpen] = useState(false);

  if (isLoading)
    return <div className="spinner fixed inset-0 flex items-center justify-center">Loading...</div>;
  return (
    <div className=" hover:scale-[1.02] transition-all duration-300">
      <div className="card bg-base-100/50 border-2 border-dashed border-base-content/20 hover:border-primary hover:bg-primary/5 transition-all duration-300 group relative">
        <div className="card-body p-4 flex flex-col items-center justify-center">
          <div className="w-12 h-12 rounded-full border-2 border-dashed border-base-content/20 group-hover:border-primary flex items-center justify-center mb-3 transition-colors">
            <Wallet className="w-6 h-6 text-base-content/40 group-hover:text-primary transition-colors" />
          </div>
          <h3 className="font-semibold text-base-content/60 group-hover:text-primary transition-colors">
            {account.name}
          </h3>
          <p className="text-2xl text-green-500 text-center mt-1">
            ₱{account.transactions?.length ? account.balance: account.initialBalance}
          </p>
        </div>
        <div className="absolute top-0 right-0 m-2">
          <button className="btn btn-ghost btn-sm text-lg" onClick={() => setIsOpen(!isOpen)}>
            ...
          </button>

          {isOpen && (
            <div
              className={`absolute right-0 mt-1 w-16 bg-transparent rounded-md shadow-lg z-10 transition-all duration-200 ${
                isOpen ? "opacity-100 visible" : "opacity-0 invisible"
              }`}
            >
              <button
                className="w-full px-4 py-2 rounded-md text-sm text-red-600 hover:bg-transparent/20"
                onClick={() => deleteMutation(account.name)}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountCard;
