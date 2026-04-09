import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { TaskCreatedEvent } from './events/task-created.event';

@Controller()
export class KafkaEventsController {
  private readonly logger: Logger = new Logger(KafkaEventsController.name);

  @EventPattern('task.created')
  handleTaskCreatedEvent(@Payload() event: TaskCreatedEvent): void {
    this.logger.log(`Received task.created event for task ${event.id}`);
  }
}
