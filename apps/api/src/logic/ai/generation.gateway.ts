import { 
  WebSocketGateway, 
  WebSocketServer, 
  SubscribeMessage, 
  OnGatewayConnection, 
  OnGatewayDisconnect 
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { GenerationOrchestrator } from './generation-orchestrator.service';

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

  constructor(private readonly orchestrator: GenerationOrchestrator) {}

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('start_generation')
  async handleStartGeneration(client: Socket, data: { prompt: string }) {
    this.logger.log(`Received generation request from ${client.id}: ${data.prompt}`);
    
    // 1. Notify client that we've started
    client.emit('generation_status', { step: 'analyzing', message: 'Analyzing your vision...' });

    try {
      // 2. Perform Generation
      const manifest = await this.orchestrator.generateFullWebsite(data.prompt, client.id);
      
      // 3. Stream partial updates (Simulated for this pass)
      client.emit('generation_status', { step: 'planning', message: 'Planning visual structure...' });
      await new Promise(r => setTimeout(r, 800));
      
      client.emit('generation_status', { step: 'designing', message: 'Curating color palettes and typography...' });
      await new Promise(r => setTimeout(r, 800));
      
      client.emit('generation_status', { step: 'synthesizing', message: 'Synthesizing cinematic content...' });
      await new Promise(r => setTimeout(r, 1200));

      // 4. Send the final manifest
      client.emit('generation_complete', manifest);
      
    } catch (error) {
      this.logger.error(`Generation failed: ${error.message}`);
      client.emit('generation_error', { message: 'Generation failed. Please try a different prompt.' });
    }
  }
}
