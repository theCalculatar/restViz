/*!
 * restViz - A custom API documentation middleware
 * Copyright (c) 2025 Mahlane Alpheus Mabetlela
 * Licensed under the MIT License (MIT)
 */

import * as path from 'path'
import { Request, Response, NextFunction } from 'express'
import { updateRoutes, ExtractedRoute } from './utils'
import { routeExtractor } from './lib'

export interface ThemeOptions {
  title?: string
  theme?: 'light' | 'dark'
}

export const init = (express: any, options: ThemeOptions = {}) => {
  let routeExtracted = false
  let routes: ExtractedRoute[] = []

  const uiPath = path.join(__dirname, '../ui')
  const viewsPath = path.join(__dirname, '../../views')

  const staticMiddleware = express.static(uiPath)

  return (req: Request, res: Response, next: NextFunction) => {
    const app = req.app

    if (!routeExtracted) {
      const existingViews = app.get('views')

      app.set('view engine', 'ejs')
      app.set('views', [
        ...(Array.isArray(existingViews)
          ? existingViews
          : existingViews
            ? [existingViews]
            : []),
        viewsPath,
      ])

      const router = (app as any)._router || (app as any).router || []
      routes = updateRoutes(routeExtractor(router)) // Extract all registered routes

      routeExtracted = true
    }

    if (req.path === '/restviz/ui' || req.path.startsWith('/restviz/ui/')) {
      req.url = req.url.replace(/^\/restviz\/ui/, '') || '/'
      return staticMiddleware(req, res, next)
    }

    // Root route for listing endpoints
    if (req.path === '/restviz') {
      return res.render('restviz', {
        config: JSON.stringify({
          version: '4.0.0',
          hideEmpty: true,
          name: options?.title || 'My API Documentation',
          groupBy: 'controller', // "tag" | "path"
          description:
            'Api monitoring and documentation tool for RESTful services.',
          environment: 'DEV',

          // UI / Theme
          theme: options?.theme || 'light', // "light" | "dark"
          accentColor: 'blue',

          // Interactive API Testing
          enableTryItOut: true,
          timeout: 5000,
          retries: 3,

          baseUrl: 'http://localhost:3000',
        }),

        routes: JSON.stringify(routes),
      })
    }

    return next()
  }
}
