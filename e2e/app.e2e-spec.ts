import { SOMEPage } from './app.po';

describe('some App', function() {
  let page: SOMEPage;

  beforeEach(() => {
    page = new SOMEPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
