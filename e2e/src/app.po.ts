import { browser, by, element } from 'protractor';

export class AppPage {
  // navigateTo() {
  //   return browser.get('/');
  // }

  // getParagraphText() {
  //   return element(by.css('app-root h1')).getText();
  // }

  navigateTo(link: string) {
    return browser.get(link);
  }

  getParagraphText(selector: string) {
    return element(by.css(selector)).getText();
  }

  getElement(selector: string) {
    return element(by.css(selector));
  }
  getAllElements(selector: string) {
    return element.all(by.css(selector));
  }

}
