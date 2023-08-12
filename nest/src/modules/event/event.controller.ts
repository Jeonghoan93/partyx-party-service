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
import { Events } from 'src/common/schema/events';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventService } from './event.service';

@Controller('api/event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  async findAll(): Promise<Events[]> {
    return this.eventService.findAll();
  }

  @Get(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async findEventById(@Param('id') id: string): Promise<Events> {
    return this.eventService.findEventById(id);
  }

  @Post()
  async create(@Body() dto: CreateEventDto): Promise<Events> {
    // This is a common way to get userId from a request if you're using an authentication middleware like passport.

    return this.eventService.create(dto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
  ): Promise<Events> {
    return this.eventService.update(id, updateEventDto);
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async delete(
    @Param('id')
    id: string,
  ): Promise<Events> {
    return this.eventService.deleteOne(id);
  }
}
