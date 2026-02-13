import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useOfflineSync } from './useOfflineSync';

interface SubmitReadingParams {
  meterId: number;
  value: number;
  timestamp: string;
  note?: string;
  exceptionReason?: string;
  connectionInfo?: {
    customerName: string;
    locationLabel: string;
    meterSerial: string;
  };
}

/**
 * Hook to submit a reading with offline support
 */
export function useSubmitReading() {
  const queryClient = useQueryClient();
  const { submitReading } = useOfflineSync();

  return useMutation({
    mutationFn: async (params: SubmitReadingParams) => {
      const result = await submitReading(params);
      return result;
    },
    onSuccess: (result, variables) => {
      // Invalidate the last reading query to refresh data
      queryClient.invalidateQueries({
        queryKey: ['meters', variables.meterId, 'lastReading'],
      });
    },
  });
}

export default useSubmitReading;
