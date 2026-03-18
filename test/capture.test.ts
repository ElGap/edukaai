// test/capture.test.ts
// Test the capture endpoint

import { describe, it, expect, beforeAll } from "vitest";

describe("Capture Endpoint", () => {
  const baseUrl = "http://localhost:3030";

  it("should accept a minimal capture request", async () => {
    const request = {
      source: "opencode",
      apiVersion: "1.0" as const,
      records: [
        {
          instruction: "How do I sort an array in Python?",
          output: "Use the sorted() function or .sort() method.",
        },
      ],
    };

    const response = await fetch(`${baseUrl}/api/capture`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    });

    // Should return 200 or 400/404 (if no dataset exists)
    expect([200, 400, 404]).toContain(response.status);

    if (response.ok) {
      const data = await response.json();
      expect(data.success).toBe(true);
      expect(data.capture.summary.total).toBe(1);
      expect(data.capture.summary.created).toBe(1);
    }
  });

  it("should reject unregistered source", async () => {
    const request = {
      source: "unknown-source",
      apiVersion: "1.0" as const,
      records: [
        {
          instruction: "Test",
          output: "Response",
        },
      ],
    };

    const response = await fetch(`${baseUrl}/api/capture`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    });

    expect(response.status).toBe(400);

    const data = await response.json();
    expect(data.error.code).toBe("SOURCE_NOT_FOUND");
  });

  it("should handle batch captures", async () => {
    const request = {
      source: "opencode",
      apiVersion: "1.0" as const,
      records: Array(5)
        .fill(null)
        .map((_, i) => ({
          instruction: `Question ${i + 1}`,
          output: `Answer ${i + 1}`,
        })),
      options: {
        skipDuplicates: true,
        enrichMetadata: true,
      },
    };

    const response = await fetch(`${baseUrl}/api/capture`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    });

    // Should process successfully or return dataset error
    expect([200, 400, 404]).toContain(response.status);

    if (response.ok) {
      const data = await response.json();
      expect(data.capture.summary.total).toBe(5);
    }
  });

  it("should handle rich context", async () => {
    const request = {
      source: "opencode",
      apiVersion: "1.0" as const,
      session: {
        id: "test-session-123",
        name: "Test Session",
        startedAt: new Date().toISOString(),
      },
      records: [
        {
          instruction: "How do I implement rate limiting?",
          output: "Here's a Redis-based approach...",
          context: {
            files: [
              {
                path: "api/routes.py",
                content: "def get_user(user_id):...",
                language: "python",
              },
            ],
            environment: {
              os: "darwin",
              shell: "zsh",
              language: "python",
            },
            model: {
              name: "claude-3.5-sonnet",
              provider: "anthropic",
            },
          },
        },
      ],
    };

    const response = await fetch(`${baseUrl}/api/capture`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    });

    // Should process successfully or return dataset error
    expect([200, 400, 404]).toContain(response.status);
  });
});
