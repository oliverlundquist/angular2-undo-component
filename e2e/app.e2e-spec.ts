import { Angular2UndoComponentPage } from './app.po';

describe('angular2-undo-component App', function() {
  let page: Angular2UndoComponentPage;

  beforeEach(() => {
    page = new Angular2UndoComponentPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
