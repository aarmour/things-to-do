import { ThingsToDoPage } from './app.po';

describe('things-to-do App', function() {
  let page: ThingsToDoPage;

  beforeEach(() => {
    page = new ThingsToDoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
