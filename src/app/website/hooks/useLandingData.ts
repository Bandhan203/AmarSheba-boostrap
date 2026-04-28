import { useCallback, useEffect, useState } from 'react';
import { LandingDataResponse, getLandingData } from '../../services/website/landingService';

export const useLandingData = (area = 'Gulshan') => {
  const [data, setData] = useState<LandingDataResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadLandingData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await getLandingData(area);
      setData(response);
    } catch {
      setError('Failed to load services. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [area]);

  useEffect(() => {
    loadLandingData();
  }, [loadLandingData]);

  return {
    data,
    isLoading,
    error,
    retry: loadLandingData,
  };
};
