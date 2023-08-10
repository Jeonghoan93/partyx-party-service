import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Event } from '../../common/interfaces/event.interface';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventService } from './event.service';

interface RequestWithUser extends Request {
  user: {
    _id: string;
    // ... other properties of the user payload
  };
}

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
  async create(
    @Req() req: RequestWithUser,
    @Body() createEventDto: CreateEventDto,
  ): Promise<Event> {
    // This is a common way to get userId from a request if you're using an authentication middleware like passport.
    const userId = req.user['_id'];
    return this.eventService.create(userId, createEventDto);
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
