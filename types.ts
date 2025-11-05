export interface Slide {
  image: string;
  text: {
    en: string;
    lv: string;
    ru: string;
  };
}

export interface Story {
  id: string;
  title: string;
  coverImage: string;
  slides: Slide[];
}

export enum Language {
  EN = 'en',
  LV = 'lv',
  RU = 'ru',
}
