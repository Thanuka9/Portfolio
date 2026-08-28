import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {routing} from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

const BLOCKED_ARTICLE_SLUGS = new Set([
  'financial-sector-risk-analytics-pipeline',
  'reproducible-macroeconomic-forecasting',
]);

export default function middleware(request: NextRequest) {
  const parts = request.nextUrl.pathname.split('/').filter(Boolean);
  const blogIndex = parts.indexOf('blog');

  if (blogIndex !== -1) {
    const slug = parts[blogIndex + 1];
    if (slug && BLOCKED_ARTICLE_SLUGS.has(slug)) {
      return new NextResponse(null, { status: 404 });
    }
  }

  return intlMiddleware(request);
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(en)/:path*']
};
