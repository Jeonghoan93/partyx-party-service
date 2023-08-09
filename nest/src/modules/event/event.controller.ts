import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Event } from '../../common/interfaces/event.interface';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventService } from './event.service';

@Controller('api/event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  async findAll(): Promise<Event[]> {
    return this.eventService.findAll();
  }

  @Get(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async getById(@Param('id') id: string): Promise<Event> {
    return this.eventService.getById(id);
  }

  @Post()
  async create(@Body() createEventDto: CreateEventDto): Promise<Event> {
    return this.eventService.create(createEventDto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
  ): Promise<Event> {
    return this.eventService.update(id, updateEventDto);
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async delete(
    @Param('id')
    id: string,
  ): Promise<Event> {
    return this.eventService.delete(id);
  }
}
