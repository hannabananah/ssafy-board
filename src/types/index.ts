export type Board = {
  id: string;
  thumbnail: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  content: string;
  onClick: () => void;
};

export type Boards = Board[];
