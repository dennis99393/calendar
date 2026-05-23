import { expect, type Locator, type Page } from '@playwright/test';

import { HeaderComponent } from '../components/header.component';

export class PendingHonorariaPage {
  readonly header: HeaderComponent;

  constructor(private readonly page: Page) {
    this.header = new HeaderComponent(page.getByRole('navigation'));
  }

  get heading(): Locator {
    return this.page.getByRole('heading', { name: 'Pending Events Requesting Honorarium' });
  }

  async navigateViaMenu() {
    await this.header.openHonorariaLink('Pending');
  }
}
