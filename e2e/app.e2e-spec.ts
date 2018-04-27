import { KozahPage } from './app.po';

describe('kozah App', () => {
  let page: KozahPage;

  beforeEach(() => {
    page = new KozahPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
