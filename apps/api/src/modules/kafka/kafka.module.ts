import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KAFKA_CLIENT_TOKEN } from './kafka-client.token';
import { KafkaEventsService } from './kafka-events.service';
import { KafkaEventsController } from './kafka-events.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: KAFKA_CLIENT_TOKEN,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'kanban-api-producer',
            brokers: [process.env.KAFKA_BROKER ?? 'localhost:9092'],
          },
          consumer: {
            groupId: 'kanban-api-producer-group',
          },
        },
      },
    ]),
  ],
  controllers: [KafkaEventsController],
  providers: [KafkaEventsService],
  exports: [KafkaEventsService],
})
export class KafkaModule {}
