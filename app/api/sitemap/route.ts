import { NextRequest, NextResponse } from 'next/server'
import { generateMainSitemap, generateSitemapXml } from '@/lib/seo/sitemap'

export async function GET(request: NextRequest) {
  try {
    const urls = await generateMainSitemap()
    const sitemapXml = generateSitemapXml(urls)

    return new NextResponse(sitemapXml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    })
  } catch (error) {
    console.error('Error generating sitemap:', error)
    return new NextResponse('Error generating sitemap', { status: 500 })
  }
}