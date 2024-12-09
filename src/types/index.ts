export type Course = {
    id: string;
    title: string;
    description: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced';
  };
  
  export type Instructor = {
    id: string;
    name: string;
    bio: string;
    avatar: string;
  };
  