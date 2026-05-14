import { Injectable, Logger } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import ffmpeg from 'fluent-ffmpeg';
import * as path from 'path';
import * as fs from 'fs';
import { WebsiteManifest } from '@auragen/schema';
import { TelemetryService } from '../common/telemetry.service';

@Injectable()
export class VideoExportService {
  private readonly logger = new Logger(VideoExportService.name);
  private readonly tempDir = path.join(process.cwd(), 'temp_video_frames');

  constructor(private readonly telemetry: TelemetryService) {
    if (!fs.existsSync(this.tempDir)) {
      fs.mkdirSync(this.tempDir, { recursive: true });
    }
  }

  async renderManifestToVideo(manifest: WebsiteManifest, userId: string): Promise<string> {
    const traceId = `video_${Math.random().toString(36).substring(7)}`;
    const outputFileName = `${traceId}.mp4`;
    const outputPath = path.join(process.cwd(), 'public/exports', outputFileName);
    
    this.logger.log(`[VIDEO-ENGINE] Starting cinematic render for ${manifest.title} (Trace: ${traceId})`);
    
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
      const page = await browser.newPage();
      await page.setViewport({ width: 1920, height: 1080 });

      // In a real scenario, we'd navigate to a specialized render route
      // For now, we'll simulate the "Cinematic Frame Capture"
      const framePaths: string[] = [];

      for (let i = 0; i < manifest.sections.length; i++) {
        const section = manifest.sections[i];
        this.logger.log(`[VIDEO-ENGINE] Capturing section: ${section.type}`);
        
        // Navigation / Content Injection logic here
        // await page.goto(`http://localhost:3000/render-section?id=${section.id}`);
        
        const framePath = path.join(this.tempDir, `${traceId}_frame_${i}.png`);
        // await page.screenshot({ path: framePath });
        
        // Simulating frame generation for now
        fs.writeFileSync(framePath, 'dummy data'); 
        framePaths.push(framePath);
      }

      await browser.close();

      // FFmpeg Orchestration
      return new Promise((resolve, reject) => {
        ffmpeg()
          .input(path.join(this.tempDir, `${traceId}_frame_%d.png`))
          .inputFPS(1) // 1 frame per section for simple slide-show style
          .videoCodec('libx264')
          .outputOptions('-pix_fmt yuv420p')
          .on('end', () => {
             this.logger.log(`[VIDEO-ENGINE] Render complete: ${outputFileName}`);
             resolve(outputFileName);
          })
          .on('error', (err) => {
             this.logger.error(`[VIDEO-ENGINE] FFmpeg failed: ${err.message}`);
             reject(err);
          })
          .save(outputPath);
      });

    } catch (error) {
      await browser.close();
      this.logger.error(`[VIDEO-ENGINE] Pipeline failed: ${error.message}`);
      throw error;
    }
  }
}
