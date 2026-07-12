import { MotionItem, StillItem, Inquiry } from './types';

export const MOTIONS: MotionItem[] = [
  {
    id: 'elysian-horizons',
    title: 'Elysian Horizons',
    category: 'Cinematic Short Film',
    year: '2023',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8RWvzEyZgUGsooavnCDEStfZCu88wXJrAhyK_CQCaydDq6y1l2s2ZjFpvCE2Vdh72ZQJLd4irGjF8IviBGfhE_17edaNbP30M2wuy_yxIxhQHtmt5aweLXEh69cDpNstJ4izpiD45oZC0BGbRbiK3bPnMLWttGjnFpQPRBZwMzWrCL95qW5UVhvkA5lybwJWbul_clr7VE0Ga_3hQkSZrKR7OZRvP7w-O8P4T4ww6Kup-AvROLUoSFG_-VUYTD5k4dUbhkVym16ul',
    duration: '04:15'
  },
  {
    id: 'gilded-vow',
    title: 'The Gilded Vow',
    category: "Director's Cut",
    year: '2023',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7WXzBoMpHOSMiWbZGqP4oF9SJzaFXBUyWA_KjliEGC_nse_TAsvw3YlPJAlszEOboT2DF9lNur4nhcp1P11nUnfb_4A5g_yQgGRQ9Og1GYMrKgbhOBjsypFpFMbX_ZQT3wbbQKOWpqlKay22jIy2ZbnTjuJucsa0SinkTJ0Hl4v2vTVzleCVuHyZtjCC6wQI0FBm36EdPcIpVkUA1dfe5FUvVRTuitgft8QLWSuzZIGg8mi3JNIx_cuFPLavIqHAvqqba6yu-ZpV0',
    duration: '03:42'
  },
  {
    id: 'ethereal-dusk',
    title: 'Ethereal Dusk in Tuscany',
    category: 'A Wedding Film',
    year: '2023',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjlFEi4ZBcOMfnCFkfI_fFS0s7JYitl4u-sIDaIEqGeJswLrPxNBVBJtRvhcMvPEUO_a-SQ5t6rCmyLCRlVwOCeDhRJtB9apHGJ5_4qh7-x6EHIaxnf_s30tTJJRizJqOp1Qex01Mka1WF3AjQjz9ZlS8xeU8VPn5ZZCiUfgE1YkUBJLS1acpnAaQVufpM5etD8Ua6byHJf4BumBs-471VeSgEQJAnO5qfS3-NsJr-P9qQ2HeAtEND-a9reDv8qV3JJXQO5tYl5Iha',
    duration: '05:10'
  },
  {
    id: 'morning-ritual',
    title: 'The Morning Ritual',
    category: 'Brand Narrative',
    year: '2024',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCiLivdy4ItvxL_K4HOrQpeOlfQOOzQEXQqv0Lk-SBeCCHrHzDu56nbMNcw56CrtvF6IpGSTqQiQo6naSiqYSqUIdy0qKoCUhRTgcQBHteFl2Z-Bap2NYpf6Ni_jfLuq45CO7YQc65OzM_Ne5w3rekxJRAha_bvXXuc3tjLWTcennGPJXTTloQWSIbp6iGI3_04ZCEsAlDHBl9cnwoD1hAOXNOv5wGesoOZO3R8ScYjVvTwutV0oLwUD1ov9Vv4GXhXs0SFkdvI-BRi',
    duration: '02:30'
  },
  {
    id: 'azure-getaway',
    title: 'The Azure Getaway',
    category: 'Cinema',
    year: '2023',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCDvEKEfp17AoWRAW9w2CSDdGSVmZrjIg5DSA-OnIl6-dqcBG_VP4tDAsRyP8NPfrH9TS74Trpa6HeO9JSJhyF8HLeXXDVP8l-K2jh3HFFQO6zEbuK8E8YWm-WK2SNMSDjHapuXurzhKEHB17KXq3-EeT-ghADcvYDkksAAie_gVtVrs6DBKYPvrh1U-GiYFjX25nh8sxXcWGOq2GEcBgrawVOPBsJpMPIluqKOZXDfRc1qmC-TnUfDsZcA6uGcRmoQUjN53mx8owXN',
    duration: '04:52'
  }
];

export const STILLS: StillItem[] = [
  {
    id: 'still-groom-window',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA56Q0-Uw3YWoepMQM-a7bKL1bpj4x1bMY3sjTLIMl7771BdWbtGV67DR2LiKAk6ydcbqkc3f6096cs023s1AZLhMpbWcPexS7fvUdDKrH3ePmvKMVsV6hBBeohRLSFg6ZczH3EtQ3y7hccnqG7QVOOnf2PqBj2qV4_ghfGpG3QzEVwtBQ9GjsTFBh73UFnV1iivaTZlfN2zAY9ESlHaRDlQiCF9NAeI-h6GSLh80PKvvzgwsgrlebejljDQdi0JzS_V3kRBfii8jGb',
    aspectRatio: 'aspect-[3/4]',
    title: 'The Morning Ritual',
    location: 'Florence, Italy',
    altText: 'A moody, high-contrast portrait of a groom in a dark suit standing near an arched window.'
  },
  {
    id: 'still-intertwined-hands',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC6h17lHlcSmuLWsl6f4GL_DI7az-zcT_mSTBqhrR1aUlu-PJZr7jA5emJUtSpXJ8RzLZ__3kQzaSXO3149RpBgNZY8UWJlESRIQkbNzWfZlE5kK59_P20gW2zRLGzM-zWzK2keOH2OxHX7zU5JqOBS7Pmz6PmoJmg4ucqW3DnKSkKsjebif519bdzxKgUazed9a-M6yvdpJ2f9xtBPZlyubVjDoT40OTBkqek3Jhsr9HT0uttqD4vmRRf3p3vbohbnoD6l77ByYFdq',
    aspectRatio: 'aspect-[2/3]',
    title: 'Silent Bonds',
    location: 'Paris, France',
    altText: 'An intimate black and white photograph of two hands intertwined, focused on textures and a diamond ring.'
  },
  {
    id: 'still-vintage-car',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfrW_3E1-QnXdTLnGP094FhpCqoW6yjBlYQu3pZal2e2EawErka11Ii55opA_yay-ZjrbkeuKj326QN2Bb4XzM_oNNMUh9AeImf6JsQ0tyjZ37h_UwTbWTpDs0F_4jrtHhdV8Z7c-JWVQa9AXGLEq17PFSZIstQ9XpS5IwsUpLbSF05LZlATkq-KuKGr8XoLuDvzkPP1Rrehn8_cukc9XHFbjykdr-ZSLiNxzZZoWvoQr7oUAuTcKGzZOV2L7qAOLdP6YhvEsS21F7',
    aspectRatio: 'aspect-[4/5]',
    title: 'The Escape',
    location: 'Rome, Italy',
    altText: 'A vintage getaway car parked under a lone streetlamp at night, drenched in soft amber glows.'
  },
  {
    id: 'still-banquet-candles',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHCtrufOWsf7DuFfCS9Swvz5FjMM3ln0ealY3t34olJH9PoHGAC4dM41OMhllf0PCZsI1tkJ6hCKJ3EO12gGSMhGVx93cv9tu9WyZFWYdiUuzV9IB6Ew0QHkrT9pY2gYXAt-1Ffb_wF2jhPF9lCdv6gtlJZrqGowQKMyvC5WGwKh0gbNY4qSjAUKMuQla5sxJRcTJTNWqb4oRDZEZiiR4rJSjNQJ8IfacnlZ7FyRS5lRgs8CoRj5ZRrvltS1IjSLtMzisWvB6rbZXX',
    aspectRatio: 'aspect-video',
    title: 'Gilded Banquets',
    location: 'Siena, Italy',
    altText: 'A banquet table in a stone castle hall, illuminated exclusively by hundreds of flickering candles.'
  },
  {
    id: 'still-running-bride',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXrX06Xs_ltkouNnbpktpFcDgnWagfeXkjkO4HkpIEhEfA7uVdDvTimzgBEJ1cQpgMOBK7HWDrwGJCeyWi1rHxrjB_mW_nWgmcEqOFVFjKvRhJJjUyFl--iEezN8tC0J1bTFPtu-mgiWm4UJmor_esbMDukQsdCUqEYQMP-s51E2YrBqP67tUy_NL4_JpUhdrGVYdpI5xCVOElR6SGZ7ArbqRn3nUHkXetCu4dzATqOtMPB_zkKN8M8xV-JBU6LkEwaD391Jg2JnNq',
    aspectRatio: 'aspect-[4/5]',
    title: 'The Running Bride',
    location: 'Provence, France',
    altText: 'A high-speed fashion shot of a bride running down a dark corridor, white veil trailing behind her.'
  },
  {
    id: 'still-intertwined-rings',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7XTxaZvVyJd--gcFWhpft_Utv1dPVBxXaUnHGM4GdGX93tTWS9Yh16fpwZOkcr6Bz8_FnUQ5Pl3KN2eqPesXIUmB8-sfzzQTCVfkbxFt6mImYOKl5xu6PyapSABrmBeUScuYlPqPOgOHK21PGK1W0eqTzydrmfIsSmje9KFxeA-7MZuatL4468toKfQylDvQMsBkLcUFp_3RuMC8TVQkAGpGlCzEyCSSuVrhAMa9xzbX6vfsRsnslgONeRkjt51oU8IsDLoZzj9d4',
    aspectRatio: 'aspect-[3/4]',
    title: 'The Sacred Bond',
    location: 'Amalfi, Italy',
    altText: 'Close up of hands intertwined with wedding rings and soft window lighting.'
  },
  {
    id: 'still-mirror-bride',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAYUmidFE-ckoUZsFOba2lOFHYwteYHD9vLcnqbCqeZYCInA6GTh3-9lH7NzjGKt-WqwyTWuUTBlkZAUPNBB2BE3FLlRL875kqFllF7DzGKvhN2KrJ0NRBLHSSVLkgQ3CLdrjhzByJQoqXGZiwddAmZmT_xxAWASdxn7ohpdjorRpyK68duijOV0_HEreeaquWDPPhQ4puOFqW2kTWudCfUfAUOUzzs3UXFsw8oKrd6EB9PHOL-pyZRYNbdOGf0mcVlhHD7eQCKL1Kz',
    aspectRatio: 'aspect-[3/4]',
    title: 'Reflections',
    location: 'Milan, Italy',
    altText: 'A high-contrast black and white portrait of a bride looking thoughtfully into a classic mirror.'
  },
  {
    id: 'still-rings-velvet',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMmv3K5NXc3MbytxowSoX2ZbCfv5Eu83b0K-66QeiJtuSAqdhPxu7vxbTvhz9lBhVi23hu9M4D0Q6JbPd9ytSp7Umi-6vPBkiBR_wloSSzAFhkJ9EiIGk8vb4GIdjR7mYomO03I1rfICgiLEXqtDrmdrfcJ5WfEDGLwcUXIpS_Y1Qr5lhKg4MUKuv0IRR8YvgyLC7ZTKbqA4tEkTDIWmwYfqW8UFxbuH8lppLONQG5S7dYBg2DGNrL5tzBoLxf1mfHlanOK_Vbauzy',
    aspectRatio: 'aspect-[2/3]',
    title: 'Gilded Details',
    location: 'Venice, Italy',
    altText: 'A wedding ring resting on deep dark velvet with beautiful golden highlights.'
  },
  {
    id: 'still-manor-staircase',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuADLp9Pl2dTnyGqsGSoAZ6U8d4iDmXZm3t3b9gMgyiz4CYpkSF-9NUCStHQXxulLwMc42qj9KNCETEL30C7EK25JldaQIJi2juBmpWLfRc8XQe_R89DFb4hhlor5NkODkgTWicZHvERBtIXQutW1ob2z_Mumwe_FR5DVkB51rNxNNArz8tSgWp4I8JKjZuD7ijet1UHKiKeWIp9iuVa9XOGr-fLdgCHZC7fHCrsELHdNLFVi_dgwmKEpGOIflW2JrNXwBkSt3YlDh03',
    aspectRatio: 'aspect-[3/4]',
    title: 'Manor Ascents',
    location: 'Loire Valley, France',
    altText: 'Asymmetrical composition of an architectural grand staircase in an old European manor with golden rays.'
  },
  {
    id: 'still-champagne-glass',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_titxVlduv6FYVQpMGXnl3fFl5sDz4LMOIf2Zf0PmUlgEYehSsjCwAXGkBlPgLfbQPV4c-i3z-pRMHQeVYN-G7t6cFX46HbzLWQupUCz6Sq7gexaJQSphIyrgtDbhYCs1pruEQJkj-H_xLIs9BOjhtjH8QDqeqyGJP83sss9cTTMJFxvqeq54aPb52LtaD6Wt_twNojqichSMqaXkK-N9tnqp20-_lxqxpTT1yJma9C-i8tmWGQ3L5dOaGRsPOjww8Ry9_60sw48V',
    aspectRatio: 'aspect-[3/4]',
    title: 'The Celebrations',
    location: 'Bordeaux, France',
    altText: 'Champagne being poured into a crystal glass with frozen bubbles in rich golden ambient light.'
  },
  {
    id: 'still-cypress-dusk',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCg3zko_LOyaujNZenEnfe1X1_wX3lmKqef61w8xdHdKLAC44gWV7qEz_AhvxBxMSbNy-pj9bI9OodMFnn1tSzz2hovVn0E8JsiG4aZELXwNs3M3mNXd1uSTFeevBJp36gLBNKJ4CBy8mA17j9wNN5Xhv-eUU5VwelOuXAs_IjdyTrB_6CYcOWVD1SIsRCzajNexBG40JNAcOUbqSC_49AW6JN3IB0fYnkHgmN4e9AB67hm6xVN1pagAkV3GjyVBMK9dt7lee0Jt1NJ',
    aspectRatio: 'aspect-[2/3]',
    title: 'Tuscan Twilight',
    location: 'Tuscany, Italy',
    altText: 'Minimalist landscape of a single cypress tree silhouette against a deep twilight sky.'
  },
  {
    id: 'still-hands-close',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDkZfryI7z9noff4euFQMcTqjNeavt5Y5o_4EYenwQSnjk3AYypOG5GLFzb2S-VWJsMXeDYM7ryBoMQFwBGD-_8aq2e4d2XNoISf8IYaDm7TzPHfZOavNh25jDSh4f19RDrzuDlLTLJQRv7SIS0K1gxwz9UDaAsIecnhQ9WdTa9D3_WvoHpDeYg3kzVZSP6LWcWcxZ6NzaH56XFDtx1TDJ-pr-_J0s6PASv-ZO6Jclzu89CAHQ-5MqMt4vT17bPx8aar52Jarb15X2B',
    aspectRatio: 'aspect-[4/5]',
    title: 'The Promise',
    location: 'Lake Como, Italy',
    altText: 'Elegant high-fashion close-up shot of a couple’s hands featuring formal wedding rings.'
  }
];

export const INITIAL_INQUIRIES: Inquiry[] = [
  {
    id: 'inq-1',
    name: 'Evelyn & James',
    date: '2026-09-18',
    location: 'Lake Como, Villa d’Este',
    message: 'We are seeking an artist who can archive our weekend celebration in a cinematic, low-light film noir style. We loved your work on "Elysian Horizons" and hope to capture something similarly atmospheric.',
    createdAt: '2026-07-02T10:15:00-07:00',
    status: 'Pending',
    notes: 'Requested a drone segment and a 35mm film grain overlay if possible.'
  },
  {
    id: 'inq-2',
    name: 'Alexandra & Thomas',
    date: '2026-10-05',
    location: 'Amalfi Coast, Ravello',
    message: 'Our ceremony will overlook the Mediterranean at dusk. We want an unobtrusive documentary style that lets the light and local architectures speak for themselves.',
    createdAt: '2026-06-28T14:30:00-07:00',
    status: 'Approved',
    notes: 'Already had a video call. Contract signed, deposit received!'
  }
];
