type Note = {
  rating: number;
  description: string;
};

export type Film = {
  id: string;
  image: string;
  title: string;
  release_date: string;
  running_time: string;
  description: string;
  director: string;
  producer: string;
  rt_score: string;

  watched: boolean;
  favorite: boolean;
  note: Note;
};
