import type { Page } from '@playwright/test';

export class EventsViewPage {
  constructor(private readonly page: Page) {}

  /** No menu lists events when the archive is empty; direct URL still hits the view action. */
  async navigateViaUrl(eventId: number) {
    await this.page.goto(`/events/view/${eventId}`);
  }
}
