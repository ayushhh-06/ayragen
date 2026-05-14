import { Injectable, Logger } from '@nestjs/common';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { PrismaService } from '../../database/prisma.service';
import axios from 'axios';

@Injectable()
export class SocialService {
  private readonly logger = new Logger(SocialService.name);

  constructor(private prisma: PrismaService) {}

  async generateOgImage(websiteId: string): Promise<Buffer> {
    const website = await this.prisma.generatedWebsite.findUnique({ where: { id: websiteId } });
    if (!website) throw new Error('Website not found');

    const manifest = JSON.parse(website.manifest as string);
    const title = manifest.title || 'Untitled Vision';
    const vibe = manifest.emotionalTone?.vibe || 'Draft';
    const bgImage = manifest.sections[0]?.content?.backgroundImage || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe';

    // Fetch a font (Inter Bold)
    const fontResponse = await axios.get('https://github.com/google/fonts/raw/main/ofl/inter/Inter-Bold.ttf', { responseType: 'arraybuffer' });
    const fontData = fontResponse.data;

    const svg = await satori(
      {
        type: 'div',
        props: {
          style: {
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#050505',
            backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            padding: '80px',
            fontFamily: 'Inter',
            position: 'relative',
          },
          children: [
            {
              type: 'div',
              props: {
                style: {
                  position: 'absolute',
                  top: '60px',
                  left: '60px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                },
                children: [
                   {
                     type: 'div',
                     props: {
                       style: { width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#c084fc' }
                     }
                   },
                   {
                     type: 'span',
                     props: {
                       style: { fontSize: '18px', fontWeight: 900, color: 'white', textTransform: 'uppercase', letterSpacing: '0.2em' },
                       children: 'AuraGen AI'
                     }
                   }
                ]
              }
            },
            {
              type: 'h1',
              props: {
                style: {
                  fontSize: '84px',
                  fontWeight: 900,
                  color: 'white',
                  textAlign: 'center',
                  textTransform: 'uppercase',
                  letterSpacing: '-0.04em',
                  lineHeight: 1.1,
                  marginBottom: '20px',
                },
                children: title,
              }
            },
            {
              type: 'span',
              props: {
                style: {
                  fontSize: '14px',
                  fontWeight: 700,
                  color: '#c084fc',
                  textTransform: 'uppercase',
                  letterSpacing: '0.4em',
                  opacity: 0.8,
                },
                children: vibe,
              }
            }
          ],
        },
      },
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Inter',
            data: fontData,
            weight: 700,
            style: 'normal',
          },
        ],
      },
    );

    const resvg = new Resvg(svg, {
      background: '#050505',
      fitTo: { mode: 'width', value: 1200 },
    });

    return resvg.render().asPng();
  }
}
