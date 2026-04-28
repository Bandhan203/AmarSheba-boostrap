import { CATEGORIES, PROVIDERS, type Provider } from '../../data/mockData';

interface LandingServiceCategory {
  id: string;
  name: string;
  nameBn: string;
  color: string;
  bg: string;
  emoji: string;
}

export interface LandingDataResponse {
  categories: LandingServiceCategory[];
  featuredProviders: Provider[];
  popularNearYou: {
    area: string;
    services: Array<{
      categoryId: string;
      name: string;
      nameBn: string;
      startingFrom: number;
    }>;
  };
}

const simulateNetworkDelay = async () => {
  await new Promise((resolve) => {
    setTimeout(resolve, 450);
  });
};

const getPopularNearYou = (area: string) => {
  const areaProviders = PROVIDERS.filter((provider) => provider.area.toLowerCase() === area.toLowerCase());
  const sourceProviders = areaProviders.length ? areaProviders : PROVIDERS;

  const categoryTrend = CATEGORIES.map((category) => {
    const categoryProviders = sourceProviders.filter((provider) => provider.category === category.id);
    if (!categoryProviders.length) {
      return null;
    }

    const avgRating = categoryProviders.reduce((sum, provider) => sum + provider.rating, 0) / categoryProviders.length;
    const totalReviews = categoryProviders.reduce((sum, provider) => sum + provider.reviewCount, 0);
    const startingFrom = Math.min(...categoryProviders.map((provider) => provider.price));
    const trendScore = avgRating * 20 + totalReviews / 12 + categoryProviders.length * 4;

    return {
      categoryId: category.id,
      name: category.name,
      nameBn: category.nameBn,
      startingFrom,
      trendScore,
    };
  })
    .filter((item): item is NonNullable<typeof item> => item !== null)
    .sort((first, second) => second.trendScore - first.trendScore)
    .slice(0, 6)
    .map(({ trendScore, ...rest }) => rest);

  return {
    area,
    services: categoryTrend,
  };
};

export const getLandingData = async (area = 'Gulshan'): Promise<LandingDataResponse> => {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  if (apiBaseUrl) {
    const response = await fetch(`${apiBaseUrl}/landing?area=${encodeURIComponent(area)}`, {
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Unable to fetch landing data.');
    }

    return response.json();
  }

  await simulateNetworkDelay();

  return {
    categories: CATEGORIES.map((category) => ({
      id: category.id,
      name: category.name,
      nameBn: category.nameBn,
      color: category.color,
      bg: category.bg,
      emoji: category.emoji,
    })),
    featuredProviders: PROVIDERS.filter((provider) => provider.rating >= 4.7).slice(0, 6),
    popularNearYou: getPopularNearYou(area),
  };
};
