import { Angular2TesisPage } from './app.po';

describe('angular2-tesis App', () => {
  let page: Angular2TesisPage;

  beforeEach(() => {
    page = new Angular2TesisPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
