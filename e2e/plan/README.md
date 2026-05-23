# DMS Calendar — E2E Test Implementation Plan

Bottom-up Playwright coverage mapped from all user-testable PHP under `src/`.

**How to use:** Pick a test section, implement the spec + page objects ([Playwright guide](../PLAYWRIGHT.md)), then check `[x]` on that test. Steps under each test are procedure reference for writing specs — not separate trackable items.

---

## Progress

| Layer | Doc | Tests | Done | Remaining |
| --- | --- | ---: | ---: | ---: |
| Setup | [Environment](environment.md) | — | — | — |
| Layer 0 | [Pre-flight](layer-0-preflight.md) | 3 | 1 | 2 |
| Layer 1 | [Reference data](layer-1-reference-data.md) | 12 | 12 | 0 |
| Layer 2a | [Events & files](layer-2-events.md) | 12 | 1 | 11 |
| Layer 2b | [Registration](layer-2-registration.md) | 10 | 0 | 10 |
| Layer 2c | [Admin & host](layer-2-admin-host.md) | 10 | 0 | 10 |
| Layer 3 | [Public calendar](layer-3-public.md) | 7 | 1 | 6 |
| **Total** | | **54** | **15** | **39** |

```bash
grep -r '^- \[x\] ' e2e/plan/layer-*.md | wc -l
```

---

## Table of contents

1. [Environment & infrastructure](environment.md)
2. [Layer 0 — Pre-flight](layer-0-preflight.md)
3. [Layer 1 — Reference data](layer-1-reference-data.md)
4. [Layer 2a — Auth, events & files](layer-2-events.md)
5. [Layer 2b — Registration flows](layer-2-registration.md)
6. [Layer 2c — Host, admin & integrations](layer-2-admin-host.md)
7. [Layer 3 — Public calendar](layer-3-public.md)

Appendices: [appendices/](appendices/)

---

## Suggested spec file mapping

| Spec file | Test sections | Layer doc |
| --- | --- | --- |
| `login.spec.ts` ✓ | §2.1 | layer-2-events |
| `home.spec.ts` ✓ | §0.1, §3.1 | layer-0, layer-3-public |
| `ldap-login.spec.ts` ✓ | §1.1 | layer-1 |
| `categories.spec.ts` ✓ | §1.2 | layer-1 |
| `committees.spec.ts` ✓ | §1.3 | layer-1 |
| `prerequisites.spec.ts` ✓ | §1.4 | layer-1 |
| `rooms.spec.ts` ✓ | §1.5 | layer-1 |
| `tools.spec.ts` ✓ | §1.6 | layer-1 |
| `configurations.spec.ts` ✓ | §1.7 | layer-1 |
| `calendar-admin.spec.ts` ✓ | §1.8 | layer-1 |
| `contacts.spec.ts` ✓ | §1.9 | layer-1 |
| `logs.spec.ts` ✓ | §1.10 | layer-1 |
| `authorization.spec.ts` ✓ | §1.11 | layer-1 |
| `events-create.spec.ts` | §2.2 – §2.4 | layer-2-events |
| `registration-free.spec.ts` | §2.10 – §2.17 | layer-2-registration |
| `registration-paid.spec.ts` | §2.18 | layer-2-registration |
| `cron.spec.ts` | §2.26 | layer-2-admin-host |
| `email.spec.ts` | §2.27 | layer-2-admin-host |
| `sso.spec.ts` | §2.28 | layer-2-admin-host |
| `smoke.spec.ts` | §3.7 | layer-3-public |

See layer docs for full section list.

---

## Playwright conventions

| Item | Location |
| --- | --- |
| Specs | `tests/*.spec.ts` |
| Page objects | `tests/pages/*.page.ts` |
| Test users | `tests/data/test-users.ts` |
| Authoring guide | [PLAYWRIGHT.md](../PLAYWRIGHT.md) |

Spec and test titles must **not** include plan section numbers (`1.1`, `§2.4`, etc.); use descriptive names only. Track plan coverage via checkboxes in layer docs and the spec mapping table in this doc.

### Marking tests done

1. Implement the spec (page objects only — see PLAYWRIGHT.md).
2. Check `[x]` on the line under the test heading.
3. Update the progress table above.

---

## Out of scope

See [appendices/out-of-scope.md](appendices/out-of-scope.md).
