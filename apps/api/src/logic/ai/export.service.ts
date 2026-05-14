import { Injectable, Logger } from '@nestjs/common';
import { WebsiteManifest } from '@ayragen/schema';
import { CodeGeneratorService } from './code-generator.service';
import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';

@Injectable()
export class ExportService {
  private readonly logger = new Logger(ExportService.name);

  constructor(private readonly codeGenerator: CodeGeneratorService) {}

  /**
   * Exports a cinematic website project as a ZIP archive.
   */
  async exportProject(manifest: WebsiteManifest): Promise<string> {
    const exportId = `export_${manifest.id}_${Date.now()}`;
    const baseDir = path.join(process.cwd(), 'temp_exports', exportId);
    
    try {
      this.logger.log(`[EXPORT] Creating project bundle for: ${manifest.id}`);
      
      // 1. Generate files
      const files = this.codeGenerator.generateNextJsProject(manifest);

      // 2. Write files to temporary disk
      for (const [filePath, content] of Object.entries(files)) {
        const absolutePath = path.join(baseDir, filePath);
        const dir = path.dirname(absolutePath);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(absolutePath, content);
      }

      // 3. Create ZIP using system command (more reliable than installing extra dependencies)
      const zipName = `${manifest.id}_source.zip`;
      const zipPath = path.join(process.cwd(), 'temp_exports', zipName);
      
      this.logger.log(`[EXPORT] Compressing bundle into: ${zipName}`);
      execSync(`cd "${baseDir}" && zip -r "../${zipName}" .`);

      // 4. Cleanup source directory
      fs.rmSync(baseDir, { recursive: true, force: true });

      return zipName; // Return the filename to the controller
    } catch (error) {
      this.logger.error(`[EXPORT] Failed to package project: ${error.message}`);
      throw error;
    }
  }
}
