import { CharttestPage } from './app.po';

describe('charttest App', () => {
  let page: CharttestPage;

  beforeEach(() => {
    page = new CharttestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
