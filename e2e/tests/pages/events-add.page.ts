import { expect, type Locator, type Page } from '@playwright/test';

import { HeaderComponent } from '../components/header.component';

export class EventsAddPage {
  readonly header: HeaderComponent;

  constructor(private readonly page: Page) {
    this.header = new HeaderComponent(page.getByRole('navigation'));
  }

  get generalLegend(): Locator {
    return this.page.getByRole('group', { name: 'General' });
  }

  get submitEventButton(): Locator {
    return this.page.getByRole('button', { name: 'Submit Event' });
  }

  get honorariumLegend(): Locator {
    return this.page.getByRole('group', { name: 'Honorarium' });
  }

  private get optionalCategoriesSelect(): Locator {
    return this.page.getByLabel('Categories');
  }

  private get committeeSelect(): Locator {
    return this.page.locator('#honorarium-committee-id');
  }

  private get fulfillsPrerequisiteSelect(): Locator {
    return this.page.locator('#fulfills-prerequisite-id');
  }

  private get requiresPrerequisiteSelect(): Locator {
    return this.page.locator('#requires-prerequisite-id');
  }

  private get roomSelect(): Locator {
    return this.page.locator('#room-id');
  }

  private get toolsSelect(): Locator {
    return this.page.locator('#tools-ids');
  }

  private get sponsoredEventCheckbox(): Locator {
    return this.page.getByLabel('Sponsored Event');
  }

  private get existingInstructorsSelect(): Locator {
    return this.page.getByLabel('Existing Instructors');
  }

  private get requestHonorariumCheckbox(): Locator {
    return this.page.getByLabel('Request Honorarium');
  }

  get eventStartHelp(): Locator {
    return this.page.getByText(/at least \d+ days from today/);
  }

  get minimumBookingLeadTime(): Locator {
    return this.page.locator('#config-mininum-booking-lead-time');
  }

  private get honorariumSection(): Locator {
    return this.page.getByRole('group', { name: 'Honorarium' });
  }

  async navigateViaMenu() {
    await this.header.goToSubmitEvent();
  }

  async navigateViaUrl() {
    await this.page.goto('/events/add');
  }

  async selectClassType() {
    await this.page.getByRole('radio', { name: 'Class' }).check();
  }

  async expectOptionalCategoryOption(name: string) {
    await expect(this.optionalCategoriesSelect.locator('option', { hasText: name })).toHaveCount(1);
  }

  async expectSelectOption(select: Locator, name: string) {
    await expect(select.locator('option', { hasText: name })).toHaveCount(1);
  }

  async expectCommitteeOption(name: string) {
    await this.expectSelectOption(this.committeeSelect, name);
  }

  async expectPrerequisiteInDropdowns(name: string) {
    await this.expectSelectOption(this.fulfillsPrerequisiteSelect, name);
    await this.expectSelectOption(this.requiresPrerequisiteSelect, name);
  }

  async expectRoomOption(name: string) {
    await this.expectSelectOption(this.roomSelect, name);
  }

  async expectToolOption(name: string) {
    await this.expectSelectOption(this.toolsSelect, name);
  }

  async enableSponsoredEvent() {
    await this.sponsoredEventCheckbox.check();
  }

  async expectExistingInstructorOption(name: string) {
    await this.expectSelectOption(this.existingInstructorsSelect, name);
  }

  async expectRequestHonorariumEnabled(enabled: boolean) {
    if (enabled) {
      await expect(this.requestHonorariumCheckbox).toBeEnabled();
    } else {
      await expect(this.requestHonorariumCheckbox).toBeDisabled();
    }
  }

  async expectHonorariumMessage(text: string) {
    await expect(this.honorariumSection).toContainText(text);
  }

  async expectHonorariumMessageHidden(text: string) {
    await expect(this.honorariumSection).not.toContainText(text);
  }
}
