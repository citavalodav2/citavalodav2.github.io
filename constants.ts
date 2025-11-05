import { Language, Story } from './types';

export const LANGUAGES = [
  { code: Language.EN, name: 'English' },
  { code: Language.LV, name: 'Latvian' },
  { code: Language.RU, name: 'Russian' },
];

export const INITIAL_STORIES: Story[] = [{
  id: 'friendly-bear',
  title: 'A Day with a Friendly Bear',
  coverImage: 'https://picsum.photos/800/600?image=1020',
  slides: [
    {
      image: 'https://picsum.photos/800/600?image=1020',
      text: {
        en: 'Once upon a time, in a big green forest, lived a friendly bear.',
        lv: 'Reiz, lielā zaļā mežā, dzīvoja draudzīgs lācis.',
        ru: 'Однажды, в большом зеленом лесу, жил-был дружелюбный медведь.',
      },
    },
    {
      image: 'https://picsum.photos/800/600?image=1054',
      text: {
        en: 'The bear loved to eat sweet, red berries from the bushes.',
        lv: 'Lācim ļoti garšoja saldas, sarkanas ogas no krūmiem.',
        ru: 'Медведь очень любил есть сладкие красные ягоды с кустов.',
      },
    },
    {
      image: 'https://picsum.photos/800/600?image=218',
      text: {
        en: 'He also liked to watch the fish swim in the clear, blue river.',
        lv: 'Viņam arī patika vērot zivis, kas peldēja dzidrajā, zilajā upē.',
        ru: 'Ему также нравилось смотреть, как рыбки плавают в чистой голубой реке.',
      },
    },
    {
      image: 'https://picsum.photos/800/600?image=1043',
      text: {
        en: 'Every day was a happy day for the friendly bear in the forest.',
        lv: 'Katra diena mežā bija laimīga diena draudzīgajam lācim.',
        ru: 'Каждый день в лесу был счастливым для дружелюбного медведя.',
      },
    },
  ],
}];