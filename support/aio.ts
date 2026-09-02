import { test } from "@playwright/test";

export function aioTag(ticketId: string): void {
  test.info().annotations.push({
    type: "aio",
    description: ticketId
  });
}
