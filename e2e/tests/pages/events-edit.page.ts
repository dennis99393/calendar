import { expect, type Locator, type Page } from '@playwright/test';

import { eventStartEnd } from '../helpers/dates';

export class EventsEditPage {
  constructor(private readonly page: Page) {}

  get successMessage(): Locator {
    return this.page.locator('.alert-success');
  }

  private get shortDescriptionInput(): Locator {
    return this.page.getByLabel('Short Description');
  }

  private get eventStartInput(): Locator {
    return this.page.getByLabel('Event Start');
  }

  private get eventEndInput(): Locator {
    return this.page.getByLabel('Event End');
  }

  private get updateEventButton(): Locator {
    return this.page.getByRole('button', { name: 'Update Event' });
  }

  private get cancelEventLink(): Locator {
    return this.page.getByRole('link', { name: 'Cancel Event' });
  }

  async navigateViaUrl(eventId: number) {
    await this.page.goto(`/events/edit/${eventId}`);
  }

  async updateShortDescription(text: string) {
    await this.shortDescriptionInput.fill(text);
    await this.updateEventButton.click();
  }

  async updateSchedule(daysFromNow: number, durationHours = 2) {
    const { start, end } = eventStartEnd(daysFromNow, durationHours);
    await this.eventStartInput.fill(start);
    await this.eventEndInput.fill(end);
    await this.updateEventButton.click();
  }

  async cancelEvent() {
    this.page.once('dialog', (dialog) => dialog.accept());
    await this.cancelEventLink.click();
  }

  async expectSuccessFlash() {
    await expect(this.successMessage).toContainText('The event has been updated');
  }

  async expectEventStartReadOnly() {
    await expect(this.eventStartInput).toBeHidden();
    await expect(this.page.getByText('Event Start').first()).toBeVisible();
  }

  async expectEventStartEditable() {
    await expect(this.eventStartInput).toBeVisible();
  }

  async expectBlockedEditAlert() {
    await expect(this.page.getByText(/events can no longer be edited/)).toBeVisible();
  }
}
