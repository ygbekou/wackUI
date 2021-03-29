
export class Section {
  id: number;
  name: string;
  title: string;
  description: string;
  picture: string;
  status: number;
  showInMenu: number;
  language: string;
  sectionLabel: string;
  rank: number;

  type = 'Section';

  constructor() {
    this.picture = '';
  }
}


export class SectionItem {
    id: number;
    section: Section;
    title: string;
    description: string;
    picture: string;
    status: number;
    showInMenu: string;
    language: string;
    rank: number;

    text1: string;
    text2: string;
    text3: string;

    type = 'SectionItem';

    constructor() {
      this.picture = '';
    }
  }

 export class ContactUsMessage {
    id: number;
    name: string;
    email: string;
    phone: string;
    message: string;

    type = 'ContactUsMessage';
  }

 export class Slider {
  id: number;
  name: string;
  picture: string;
  useIdAsFileName: number;

  status: number;

  type = 'Slider';

  constructor() {
      this.picture = '';
  }

}

 export class SliderText {
  id: number;
  slider: Slider;
  text1: string;
  text2: string;
  text3: string;
  language: string;

  type = 'SliderText';
}


export class Testimony {
  id: number;
  author: string;
  comments: string;
  language: string;
  rank: number;
  status: number;

  type = 'Testimony';
}


export class Country {
  id = 215;
  name: string;
  domain: string;

  type = 'Country';

}


export class CompanyHistory {
  id: number;
  year: number;
  title: string;
  description: string;
  picture: string;
  status: number;
  language: string;

  type = 'CompanyHistory';
}