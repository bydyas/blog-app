/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as PostsImport } from './routes/posts'
import { Route as PostIdImport } from './routes/$postId'
import { Route as IndexImport } from './routes/index'

// Create/Update Routes

const PostsRoute = PostsImport.update({
  id: '/posts',
  path: '/posts',
  getParentRoute: () => rootRoute,
} as any)

const PostIdRoute = PostIdImport.update({
  id: '/$postId',
  path: '/$postId',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/$postId': {
      id: '/$postId'
      path: '/$postId'
      fullPath: '/$postId'
      preLoaderRoute: typeof PostIdImport
      parentRoute: typeof rootRoute
    }
    '/posts': {
      id: '/posts'
      path: '/posts'
      fullPath: '/posts'
      preLoaderRoute: typeof PostsImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/$postId': typeof PostIdRoute
  '/posts': typeof PostsRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/$postId': typeof PostIdRoute
  '/posts': typeof PostsRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/$postId': typeof PostIdRoute
  '/posts': typeof PostsRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/$postId' | '/posts'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/$postId' | '/posts'
  id: '__root__' | '/' | '/$postId' | '/posts'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  PostIdRoute: typeof PostIdRoute
  PostsRoute: typeof PostsRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  PostIdRoute: PostIdRoute,
  PostsRoute: PostsRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/$postId",
        "/posts"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/$postId": {
      "filePath": "$postId.tsx"
    },
    "/posts": {
      "filePath": "posts.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
