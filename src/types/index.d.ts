declare module 'restviz' {
  import { Request, Response, NextFunction, Express } from 'express'

  /**
   * Supported themes for the RestViz UI.
   */
  export type Theme = 'light' | 'dark'

  /**
   * Configuration options for RestViz initialization.
   */
  export interface Options {
    title?: string
    theme?: Theme
  }

  /**
   * Middleware function for RestViz.
   */
  export type Middleware = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => void

  /**
   * Initialize RestViz with optional configuration options.
   * Returns a middleware function.
   *
   * @param express - Express instance.
   * @param options - Configuration options for RestViz.
   * @returns A middleware function.
   * @since 2.0.0
   */
  export function init(express: Express, options?: Options): Middleware
}
