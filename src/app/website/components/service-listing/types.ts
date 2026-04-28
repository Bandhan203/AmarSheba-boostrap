import { Category } from '../../../data/mockData';

export interface ServiceListingDetail {
  id: Category;
  titleEn: string;
  titleBn: string;
  image: string;
  shortDescription: string;
  servicesOffered: string[];
  highlights: string[];
}

export interface ServiceCategoryMeta {
  id: string;
  name: string;
  nameBn: string;
  color: string;
  bg: string;
}
