export interface Offer {
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
  image: Image;
  thumbnail: Image;
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
}

export interface Image {
  full_url: string;
  width: number;
  height: number;
  alt: string;
  src: string;
}

export type OfferResponse = {
  count: number;
  next: null;
  previous: null;
  results: Offer[];
};

export type OfferDetails = {
  id: number;
  meta: Meta;
  title: string;
  image: Image;
  thumbnail: Image;
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

// /workandtravel/35/?format=json&fields=* (WATDataResponse)

export type WATDataResponse = {
  id: number;
  meta: Meta;
  title: string;
  placement_options: PlacementOption[];
  process_steps: ProcessStep[];
  faq: FAQ[];
};

export type FAQ = {
  type: string;
  value: FAQValue;
  id: string;
};

export type FAQValue = {
  group_title: string;
  items: Item[];
};

export type Item = {
  question: string;
  answer: string;
};

export type Meta = {
  type: string;
  detail_url: string;
  html_url: string;
  slug: string;
  show_in_menus: boolean;
  seo_title: string;
  search_description: string;
  first_published_at: Date;
  alias_of: null;
  parent: Parent;
  locale: string;
};

export type Parent = {
  id: number;
  meta: ParentMeta;
  title: string;
};

export type ParentMeta = {
  type: string;
  detail_url: string;
  html_url: string;
};

export type PlacementOption = {
  id: number;
  name: string;
  price: string;
  description: string;
};

export type ProcessStep = {
  type: string;
  value: ProcessStepValue;
  id: string;
};

export type ProcessStepValue = {
  step_title: string;
  description: string;
};

// End /workandtravel/35/?format=json&fields=* (WATDataResponse)
