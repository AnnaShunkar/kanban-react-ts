import { Inject, Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { KAFKA_CLIENT_TOKEN } from './kafka-client.token';
import { TaskCreatedEvent } from './events/task-created.event';

@Injectable()
export class KafkaEventsService implements OnModuleInit, OnModuleDestroy {
  private readonly logger: Logger = new Logger(KafkaEventsService.name);

  constructor(
    @Inject(KAFKA_CLIENT_TOKEN)
    private readonly kafkaClient: ClientKafka,
  ) {}

  async onModuleInit(): Promise<void> {
    await this.kafkaClient.connect();
    this.logger.log('Kafka producer connected');
  }

  async onModuleDestroy(): Promise<void> {
    await this.kafkaClient.close();
  }

  async publishTaskCreatedEvent(event: TaskCreatedEvent): Promise<void> {
    await lastValueFrom(this.kafkaClient.emit('task.created', event));
  }
}
