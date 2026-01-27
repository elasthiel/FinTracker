import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getTransactions } from "../lib/api";

const useGetAllTransaction = (userId) => {
  const queryClient = useQueryClient();
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["transactions", userId],
    queryFn: () => getTransactions(userId),
    enabled: !!userId, // Only fetch if userId exists
    onSuccess: () => queryClient.invalidateQueries(["authUser"]), // Invalidate the transactions query when data changes
  });

  return {
    transactions: data?.transactions,
    isLoading,
    error,
    refetch,
  };
};

export default useGetAllTransaction;
