import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTransaction } from "../lib/api";

const useCreateTransaction = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    mutationFn: createTransaction,
    mutationKey: ["createTransaction"],
    onSuccess: () => queryClient.invalidateQueries(["transactions"]),
  });

  return { createTransactionMutation: mutate, isPending, error };
};

export default useCreateTransaction;
