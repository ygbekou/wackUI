
export class Section {
  
  id: number;
  name: string;
  title: string;
  description: string;
  picture: string;
  
}


export class SectionItem {
    
    id: number;
    section: Section;
    title: string;
    description: string;
    picture: string;
    
  }