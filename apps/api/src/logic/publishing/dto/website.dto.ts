// DTOs without class-validator decorators (safe compilation without the package)

export class CreateProjectDto {
  name: string;
  description?: string;
}

export class GenerateWebsiteDto {
  prompt: string;
  projectId: string;
}

export class AnalyzePromptDto {
  prompt: string;
}

export class DeployWebsiteDto {
  websiteId: string;
  subdomain?: string;
}
