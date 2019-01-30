
export class Section {
  id: number;
  name: string;
  title: string;
  description: string;
  fileLocation: string;
  status: number;
  language: string;
  sectionLabel: string;

  constructor() {
      this.fileLocation = '';
  }
}


export class SectionItem {
    id: number;
    section: Section;
    title: string;
    description: string;
    fileLocation: string;
    status: number;
    language: string;

     constructor() {
      this.fileLocation = '';
    }
  }

export class ContactUsMessage {
    id: number;
    name: string;
    email: string;
    phone: string;
    message: string;
  }
