# Next.js Routing

## 1. What Is Routing in Next.js

**Routing** in Next.js is **file-system based**.

* URL paths are derived from the folder structure.
* No manual route configuration (unlike React Router or Express).
* Both frontend pages and backend APIs use the same routing system.

Next.js is a full-stack React framework maintained by Vercel.

---

## 2. App Router (Modern Routing System)

Next.js 13+ introduced the **App Router**.

### Key Characteristics

* Uses `/app` directory
* File-based routing
* Supports server components by default
* Built-in layouts
* Nested routing
* Streaming and loading states
* Integrated backend API routes

---

## 3. Core Routing Mental Model

```
Folder → URL segment
page.tsx → route entry
layout.tsx → wrapper UI
```

Example:

```
app/
  about/
    page.tsx
```

Creates:

```
/about
```

---

## 4. Important Special Files (App Router)

### 4.1 `page.tsx` — Route Entry Point (Required)

* Defines UI for a route.
* Required to create a page.

```
app/users/page.tsx → /users
```

Without `page.tsx`, no route is created.

---

### 4.2 `layout.tsx` — Shared UI Wrapper

* Wraps pages inside the same folder.
* Used for navbar, sidebar, footer, etc.
* Layouts are nested automatically.

Example:

```
app/layout.tsx        → global layout
app/users/layout.tsx  → users section layout
```

Execution order:

```
global layout → users layout → page
```

Benefits:

* UI persistence across navigation
* Clean separation of page sections
* Avoids conditional layout logic

---

### 4.3 `loading.tsx` — Loading UI

* Automatically displayed while page loads or data fetches.
* No manual state handling required.

---

### 4.4 `error.tsx` — Error Boundary

* Handles runtime errors for that route segment.

---

### 4.5 `route.ts` — Backend API Endpoint

Defines server-side handlers.

Example:

```
app/api/users/route.ts → /api/users
```

Supports HTTP methods:

```
GET
POST
PUT
DELETE
```

Replaces Express routes in many cases.

---

## 5. Nested Routing

Folders create nested URLs.

Example:

```
app/dashboard/settings/page.tsx
```

Creates:

```
/dashboard/settings
```

Each folder represents a path segment.

---

## 6. Dynamic Routes

Used for parameterized URLs.

### Syntax

```
[id]
```

Example:

```
app/users/[id]/page.tsx
```

Matches:

```
/users/1
/users/abc
```

Access parameter:

```ts
params.id
```

Equivalent to Express or React Router `:id`.

---

## 7. Route Groups `(folderName)`

Folders wrapped in parentheses:

```
(auth)
(dashboard)
```

### Behavior

* Not included in URL.
* Used only for organization or layout grouping.

Example:

```
app/(auth)/login/page.tsx
```

Creates:

```
/login
```

Not:

```
/auth/login
```

Purpose:

* Group related routes
* Share layouts
* Organize large applications

---

## 8. Components vs Routes (Important Distinction)

Only folders containing `page.tsx` create routes.

Non-route folders:

```
components/
hooks/
utils/
lib/
```

These are ignored by the router.

Example:

```
app/users/components/UserList.tsx
```

* Not a route
* Only reusable UI

Rule:

```
No page.tsx → not a route
```

---

## 9. Layout Nesting Behavior

Layouts stack automatically.

Structure:

```
app/layout.tsx
app/users/layout.tsx
app/users/page.tsx
```

Render order:

```
global layout → users layout → page
```

This enables:

* section-specific UI
* persistent components
* scalable architecture

---

## 10. How Frontend and Backend Communicate

Next.js supports full-stack architecture.

### API Routes

```
app/api/messages/route.ts
```

Frontend calls:

```js
fetch("/api/messages")
```

Backend and frontend exist in same project.

---

## 11. Request Lifecycle (High-Level)

When user visits `/users`:

1. Next.js resolves folder structure.
2. Loads matching `page.tsx`.
3. Applies parent layouts.
4. Executes server logic if needed.
5. Returns rendered UI.

---

## 12. App Router vs Traditional React Routing

### React Router

* Manual route definitions
* Separate configuration

Example:

```js
<Route path="/users" element={<Users />} />
```

---

### Next.js App Router

* Automatic routing
* Convention-based

```
app/users/page.tsx
```

---

## 13. Benefits of File-Based Routing

* Predictable structure
* Less boilerplate
* Better scalability
* Automatic code splitting
* Built-in performance optimization
* Clear separation of UI sections

---

## 14. Typical Real-World Structure

```
app/
  layout.tsx
  page.tsx
  (auth)/
    login/page.tsx
    register/page.tsx
  users/
    page.tsx
    [id]/page.tsx
  dashboard/
    layout.tsx
    page.tsx
  api/
    users/route.ts
```

---

## 15. Key Interview Points to Remember

* Next.js uses file-system based routing.
* `/app` directory powers App Router.
* `page.tsx` creates routes.
* `layout.tsx` provides shared UI.
* Route groups `(folder)` organize code without affecting URLs.
* Dynamic routes use `[param]`.
* API routes are built-in via `route.ts`.
* Only folders with `page.tsx` affect routing.
* Layouts are nested automatically.
* Frontend and backend coexist in one project.

---