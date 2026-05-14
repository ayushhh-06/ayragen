import { 
  WebSocketGateway, 
  WebSocketServer, 
  SubscribeMessage, 
  OnGatewayConnection, 
  OnGatewayDisconnect 
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger, UnauthorizedException } from '@nestjs/common';
import { GenerationOrchestrator } from './generation-orchestrator.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../database/prisma.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: 'generation',
})
export class GenerationGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(GenerationGateway.name);
  
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly orchestrator: GenerationOrchestrator,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async handleConnection(client: Socket) {
    this.logger.log(`Client connecting: ${client.id}`);
    try {
      const token = client.handshake.auth?.token;
      if (!token) throw new UnauthorizedException('No token provided');
      
      const payload = this.jwtService.verify(token);
      client.data.userId = payload.userId;
      this.logger.log(`Client authenticated: ${client.id} (User: ${payload.userId})`);
    } catch (err) {
      this.logger.warn(`Auth failed for client ${client.id}: ${err.message}`);
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('start_generation')
  async handleStartGeneration(client: Socket, data: { prompt: string }) {
    const userId = client.data.userId;
    if (!userId) {
      client.emit('generation_error', { message: 'Unauthorized session.' });
      return;
    }

    this.logger.log(`Received generation request from ${userId}: ${data.prompt}`);
    
    client.emit('generation_status', { step: 'analyzing', message: 'Analyzing your vision...' });

    try {
      // 1. Ensure the user has at least one project (or create a default one)
      let project = await this.prisma.project.findFirst({
        where: { userId }
      });

      if (!project) {
        project = await this.prisma.project.create({
          data: {
            name: 'My First Vision',
            description: 'Automatically created for your first generation.',
            userId: userId
          }
        });
      }

      // 2. Perform Generation and Save
      const manifest = await this.orchestrator.generateFullWebsite(data.prompt, userId, project.id);
      
      // 3. Stream status updates
      client.emit('generation_status', { step: 'planning', message: 'Architecting cinematic layout...' });
      await new Promise(r => setTimeout(r, 800));
      
      client.emit('generation_status', { step: 'designing', message: 'Applying neural design tokens...' });
      await new Promise(r => setTimeout(r, 800));
      
      client.emit('generation_status', { step: 'synthesizing', message: 'Weaving emotional content...' });
      await new Promise(r => setTimeout(r, 1200));

      // 4. Send the final manifest
      client.emit('generation_complete', manifest);
      
    } catch (error) {
      this.logger.error(`Generation failed for ${userId}: ${error.message}`);
      client.emit('generation_error', { message: 'Our neural engines encountered an anomaly. Please try a different prompt.' });
    }
  }
}
