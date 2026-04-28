---
title: "Getting Started with TypeScript"
description: "An introduction to TypeScript and why it makes JavaScript development better."
pubDate: 2026-04-26
tags: ["typescript", "javascript", "programming"]
---

# Getting Started with TypeScript

TypeScript is a strongly typed superset of JavaScript that compiles to plain JavaScript. It adds optional static typing and class-based object-oriented programming to the language.

## Why TypeScript?

- **Catch errors early** — type errors are caught at compile time, not runtime
- **Better tooling** — editors can provide smarter autocomplete and refactoring
- **Readable code** — types serve as inline documentation
- **Safer refactoring** — the compiler tells you everywhere a change breaks things

## Basic Types

```ts
let name: string = "Alice";
let age: number = 30;
let isActive: boolean = true;
let tags: string[] = ["typescript", "javascript"];
```

## Interfaces

```ts
interface Post {
  title: string;
  description: string;
  pubDate: Date;
  tags: string[];
}
```

## Functions

```ts
function greet(name: string): string {
  return `Hello, ${name}!`;
}
```

## Getting Started

Install TypeScript globally and initialize a project:

```bash
npm install -g typescript
tsc --init
```

This generates a `tsconfig.json` where you can configure the compiler options for your project.
