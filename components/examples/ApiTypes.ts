export type Offer = {
  id: number;
  meta: {
    type: string;
    detail_url: string;
    html_url: string;
    slug: string;
    show_in_menus: boolean;
    seo_title: string;
    search_description: string;
    first_published_at: Date;
    alias_of: any;
    locale: string;
  };
  title: string;
  image: {
    id: number;
    meta: {
      type: string;
      detail_url: string;
      download_url: string;
    };
    title: string;
  };
  position: string;
  employer: string;
  city: string;
  state: string;
  english_level: string;
  start_date: string;
  end_date: string;
  hourly_rate: string;
  hours_per_week: string;
  tips_available: boolean;
  rate_display: any;
  rate_display_type: any;
  features: string;
  job_description: string;
  top_offer: boolean;
  just_few_left: boolean;
  unavailable: boolean;
  housing_available: boolean;
  housing_price_per_week: string;
  gallery_images: any[];
};

export type OfferResponse = {
  count: number;
  next: null;
  previous: null;
  results: Offer[];
};

export type OfferDetails = {
  id: number;
  meta: {
    type: string;
    detail_url: string;
    html_url: string;
    slug: string;
    show_in_menus: boolean;
    seo_title: string;
    search_description: string;
    first_published_at: Date;
    alias_of: any;
    parent: {
      id: number;
      meta: {
        type: string;
        detail_url: string;
        html_url: string;
      };
      title: string;
    };
  };
  title: string;
  image: {
    id: number;
    meta: {
      type: string;
      detail_url: string;
      download_url: string;
    };
    title: string;
  };
  position: string;
  employer: string;
  city: string;
  state: string;
  english_level: string;
  start_date: string;
  end_date: string;
  hourly_rate: string;
  hours_per_week: string;
  tips_available: boolean;
  rate_display: any;
  rate_display_type: any;
  features: string;
  job_description: string;
  top_offer: boolean;
  just_few_left: boolean;
  unavailable: boolean;
  housing_available: boolean;
  housing_price_per_week: string;
  gallery_images: any[];
};
