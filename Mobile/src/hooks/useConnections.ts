import { useQuery } from '@tanstack/react-query';
import { api } from '../api';
import { Connection, ConnectionSearchParams } from '../models/types';

/**
 * Hook to search connections
 */
export function useConnectionSearch(params: ConnectionSearchParams) {
  return useQuery<Connection[], Error>({
    queryKey: ['connections', 'search', params],
    queryFn: () => api.searchConnections(params),
    staleTime: 30000, // 30 seconds
  });
}

/**
 * Hook to get a single connection by ID
 */
export function useConnection(connectionId: number | undefined) {
  return useQuery<Connection | null, Error>({
    queryKey: ['connections', connectionId],
    queryFn: () => (connectionId ? api.getConnectionById(connectionId) : Promise.resolve(null)),
    enabled: !!connectionId,
    staleTime: 60000, // 1 minute
  });
}

export default useConnectionSearch;
