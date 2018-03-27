import { UscgcPage } from './app.po';

describe('uscgc App', () => {
  let page: UscgcPage;

  beforeEach(() => {
    page = new UscgcPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
