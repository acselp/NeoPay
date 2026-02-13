import { useQuery } from '@tanstack/react-query';
import { api } from '../api';
import { Meter, LastReadingResponse } from '../models/types';

/**
 * Hook to get a meter by ID
 */
export function useMeter(meterId: number | undefined) {
  return useQuery<Meter | null, Error>({
    queryKey: ['meters', meterId],
    queryFn: () => (meterId ? api.getMeterById(meterId) : Promise.resolve(null)),
    enabled: !!meterId,
    staleTime: 60000, // 1 minute
  });
}

/**
 * Hook to get a meter by barcode
 */
export function useMeterByBarcode(barcode: string | undefined) {
  return useQuery<Meter | null, Error>({
    queryKey: ['meters', 'barcode', barcode],
    queryFn: () => (barcode ? api.getMeterByBarcode(barcode) : Promise.resolve(null)),
    enabled: !!barcode,
    staleTime: 60000, // 1 minute
  });
}

/**
 * Hook to get the last reading for a meter
 */
export function useLastReading(meterId: number | undefined) {
  return useQuery<LastReadingResponse, Error>({
    queryKey: ['meters', meterId, 'lastReading'],
    queryFn: () =>
      meterId
        ? api.getLastReading(meterId)
        : Promise.resolve({ reading: null, averageConsumption: undefined }),
    enabled: !!meterId,
    staleTime: 30000, // 30 seconds - readings change more frequently
  });
}
