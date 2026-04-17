export interface Track {
  id: string;
  title: string;
  artist: string;
  url: string;
  cover: string;
}

export const tracks: Track[] = [
  {
    id: "1",
    title: "Neon Horizon",
    artist: "Cyber Synth",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    cover: "https://picsum.photos/seed/neon1/400/400",
  },
  {
    id: "2",
    title: "Midnight Drive",
    artist: "Retro Wave",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    cover: "https://picsum.photos/seed/neon2/400/400",
  },
  {
    id: "3",
    title: "Digital Ghost",
    artist: "Lo-Fi AI",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    cover: "https://picsum.photos/seed/neon3/400/400",
  },
];
