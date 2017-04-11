import { QuzxWebPage } from './app.po';

describe('quzx-web App', () => {
  let page: QuzxWebPage;

  beforeEach(() => {
    page = new QuzxWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
