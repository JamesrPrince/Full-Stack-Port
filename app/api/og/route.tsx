import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const title = searchParams.get('title') || 'Prince Chisenga - Full-Stack Developer'
    const type = searchParams.get('type') || 'default'
    const subtitle = searchParams.get('subtitle') || 'Full-Stack Developer & Data Analyst'

    // Define different layouts based on type
    const getLayout = () => {
      switch (type) {
        case 'blog':
          return {
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            icon: '📝',
            subtitle: 'Blog Post'
          }
        case 'project':
          return {
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            icon: '🚀',
            subtitle: 'Project'
          }
        default:
          return {
            background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
            icon: '💼',
            subtitle: subtitle
          }
      }
    }

    const layout = getLayout()

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: layout.background,
            fontFamily: 'Inter, system-ui, sans-serif',
            position: 'relative',
          }}
        >
          {/* Background Pattern */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 50%)',
            }}
          />
          
          {/* Content Container */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              padding: '60px',
              maxWidth: '900px',
              zIndex: 1,
            }}
          >
            {/* Icon */}
            <div
              style={{
                fontSize: '80px',
                marginBottom: '20px',
              }}
            >
              {layout.icon}
            </div>

            {/* Subtitle */}
            <div
              style={{
                fontSize: '24px',
                color: 'rgba(255,255,255,0.8)',
                marginBottom: '20px',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '2px',
              }}
            >
              {layout.subtitle}
            </div>

            {/* Main Title */}
            <div
              style={{
                fontSize: title.length > 50 ? '48px' : '60px',
                fontWeight: 'bold',
                color: 'white',
                lineHeight: 1.2,
                marginBottom: '30px',
                textAlign: 'center',
              }}
            >
              {title}
            </div>

            {/* Author */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                fontSize: '20px',
                color: 'rgba(255,255,255,0.9)',
                fontWeight: 500,
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '15px',
                  fontSize: '20px',
                }}
              >
                👨‍💻
              </div>
              Prince Chisenga
            </div>
          </div>

          {/* Bottom Decoration */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '8px',
              background: 'linear-gradient(90deg, #ffffff20, #ffffff40, #ffffff20)',
            }}
          />
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (e: any) {
    console.log(`${e.message}`)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}