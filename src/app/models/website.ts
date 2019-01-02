
export class Section {
  id: number;
  name: string;
  title: string;
  description: string;
  fileLocation: string;
  status: number;
}


export class SectionItem {
    id: number;
    section: Section;
    title: string;
    description: string;
    fileLocation: string;
    status: number;
  }
