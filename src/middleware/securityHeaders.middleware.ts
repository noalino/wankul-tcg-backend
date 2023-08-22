import { NextFunction, Request, Response } from 'express';

export default function securityHeaders(
  _: Request,
  res: Response,
  next: NextFunction,
) {
  res.set({
    'Access-Control-Allow-Methods': 'GET',
    'Cache-Control': 'no-store',
    'Content-Security-Policy': "frame-ancestors 'none'",
    'Strict-Transport-Security': 'max-age=15552000; includeSubDomains', // 180 days
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
  });
  next();
}
