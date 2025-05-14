export interface Project {
  id?: string;
  title: string;
  description: string;
  imageUrl: string;
  liveUrl?: string;
  githubUrl?: string;
  technologies: string[];
  featured: boolean;
}

export interface Skill {
  id?: string;
  name: string;
  icon: string;
  category: string;
  proficiency: number;
} 