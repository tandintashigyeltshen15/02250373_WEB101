# Practical 5: Implementing Infinite Scroll with TanStack Query

## Overview

This practical implements infinite scrolling in a TikTok-style application using TanStack Query (React Query v5) and cursor-based pagination. Instead of loading all videos at once, videos are fetched in pages as the user scrolls, providing a smooth and efficient user experience.

## Prerequisites

- Node.js installed
- TikTok clone project set up (frontend + backend)
- PostgreSQL database running
- `.env.local` configured with your database and API URLs

## Installation

### 1. Install Frontend Dependencies

Navigate to the frontend project folder and install the required packages:

```bash
cd Practical5/tiktok-clone
npm install @tanstack/react-query @tanstack/react-query-devtools
```

### 2. Install Backend Dependencies (if not already installed)

```bash
cd Practical5/server
npm install
```

## Setup Instructions

### Step 1: Seed the Database

Ensure the backend server is running, then seed the database with sample data:

```bash
cd Practical5server
node seed.js
```

This creates:
- 10 users
- 50 videos (5 per user) with real video URLs
- 200 comments, 300 video likes, 150 comment likes, 40 follows

### Step 2: Start the Backend Server

```bash
cd Practical5/server
npm run dev
```

Backend runs on `http://localhost:8000`

### Step 3: Start the Frontend

```bash
cd Practical5/tiktok-clone
npm run dev
```

Frontend runs on `http://localhost:3000`

---

## Key File Changes

### Backend

#### `src/controllers/videoController.js`
Updated `getAllVideos` and `getFollowingVideos` to use **cursor-based pagination** instead of offset-based:

```js
// Uses cursor and limit instead of page and limit
const { cursor, limit = 10 } = req.query;

const videos = await prisma.video.findMany({
  take: parseInt(limit) + 1, // n+1 pattern to check if more exist
  ...(cursor && { cursor: { id: cursor }, skip: 1 }),
  orderBy: { createdAt: 'desc' },
});

const hasNextPage = videos.length > limit;
const nextCursor = hasNextPage ? videos[limit - 1].id : null;
```

### Frontend

#### `src/app/layout.js`
Wrapped the app with `QueryClientProvider` and added `ReactQueryDevtools`:

```jsx
const [queryClient] = useState(() => new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
}));

// Inside return:
<QueryClientProvider client={queryClient}>
  {children}
  <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
</QueryClientProvider>
```

> **Important:** `QueryClient` must be wrapped in `useState` to prevent a new instance being created on every render.

#### `src/services/videoService.js`
Updated to pass `cursor` parameter:

```js
export const getVideos = async ({ cursor } = {}) => {
  const params = new URLSearchParams({ limit: 10 });
  if (cursor) params.append('cursor', cursor);
  const response = await axios.get(`/videos?${params}`);
  return response.data;
};
```

#### `src/hooks/useIntersectionObserver.js`
Custom hook using the **Intersection Observer API** to detect when the user reaches the bottom of the feed:

```js
export default function useIntersectionObserver({ threshold = 0.1 } = {}) {
  const [ref, setRef] = useState(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    if (!ref) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      { threshold }
    );
    observer.observe(ref);
    return () => observer.unobserve(ref);
  }, [ref, threshold]);

  return [setRef, isIntersecting];
}
```

#### `src/components/ui/VideoFeed.jsx`
Replaced `useQuery` with `useInfiniteQuery` and attached the intersection observer to a trigger element at the bottom:

```jsx
const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
  queryKey: ['videos', feedType],
  queryFn: ({ pageParam }) => fetchFn({ cursor: pageParam }),
  initialPageParam: null,
  getNextPageParam: (lastPage) => lastPage.pagination.nextCursor,
});

useEffect(() => {
  if (isLoadMoreVisible && hasNextPage && !isFetchingNextPage) {
    fetchNextPage();
  }
}, [isLoadMoreVisible, hasNextPage, isFetchingNextPage, fetchNextPage]);
```

#### `src/components/ui/VideoCard.jsx`
Fixed video loading issues:
- Added `preload="none"` to prevent all 50 videos loading at once
- Fixed `handleVideoError` to only trigger on real network failures (`networkState === 3`)

---

## Testing

### Test 1 — API Endpoint
```
GET http://localhost:8000/api/videos?limit=5
```
Expected response includes `nextCursor` and `hasNextPage`:
```json
{
  "videos": [...],
  "pagination": {
    "nextCursor": "some-id",
    "hasNextPage": true
  }
}
```

### Test 2 — Cursor Navigation
```
GET http://localhost:8000/api/videos?limit=10&cursor=<id>
```
Returns the next 10 videos after the given cursor ID.

### Test 3 — Last Page
When no more videos exist, the response returns:
```json
{ "pagination": { "nextCursor": null, "hasNextPage": false } }
```

### Test 4 — Visual Scroll Trigger
1. Open `http://localhost:3000`
2. Open DevTools → Network tab → filter by Fetch/XHR
3. Scroll slowly down the feed
4. A new API request fires automatically near the bottom with a `cursor` query parameter

### Test 5 — TanStack Query DevTools
1. Click the TanStack icon at the bottom-left of the screen
2. Click the `["videos","forYou"]` query
3. Scroll the feed to load more pages
4. `pages[0]`, `pages[1]`, etc. grow in the Data Explorer

## Troubleshooting

| Problem | Solution |
|--------|----------|
| `error: unknown option '--no-turbopack'` | Change `"dev": "next dev"` in `package.json` |
| Videos show "Video unavailable" | Re-run `node seed.js` and clear `.next` cache with `Remove-Item -Recurse -Force .next` |
| TanStack icon not visible | Add `<ReactQueryDevtools buttonPosition="bottom-left" />` inside `QueryClientProvider` |
| `QueryClient` recreated on every render | Wrap in `useState(() => new QueryClient(...))` |
| `seed.js` not found | Run seed from the server directory, not the frontend |

## References

- [TanStack Query Documentation](https://tanstack.com/query/latest)
- [useInfiniteQuery Guide](https://tanstack.com/query/latest/docs/framework/react/guides/infinite-queries)
- [Intersection Observer API — MDN](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
- [Prisma Cursor-Based Pagination](https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination)
- [Next.js App Router Documentation](https://nextjs.org/docs/app)