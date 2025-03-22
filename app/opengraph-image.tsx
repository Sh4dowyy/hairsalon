import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = "Na'Kris Stuudio - Professionaalne ilusalong"
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '48px',
        }}
      >
        <div
          style={{
            fontSize: '64px',
            fontWeight: 'bold',
            color: '#333',
            marginBottom: '24px',
          }}
        >
          Na&apos;Kris Stuudio
        </div>
        <div
          style={{
            fontSize: '32px',
            color: '#666',
            textAlign: 'center',
          }}
        >
          Laia valiku teenustega professionaalne ilusalong
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
} 