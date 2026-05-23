import { expect, type Locator, type Page } from '@playwright/test';

import { HeaderComponent } from '../components/header.component';

export class PendingEventsPage {
  readonly header: HeaderComponent;

  constructor(private readonly page: Page) {
    this.header = new HeaderComponent(page.getByRole('navigation'));
  }

  get heading(): Locator {
    return this.page.getByRole('heading', { name: 'Pending Events' });
  }

  async navigateViaMenu() {
    await this.header.openAdminLink('Pending Events');
  }

  async navigateViaUrl() {
    await this.page.goto('/events/pending');
  }

  async expectAccessDenied() {
    await expect(this.heading).toBeHidden();
  }
}
