export class CreateEventDto {
  readonly title: string;
  readonly description: string;
  readonly price: number;
  readonly date: Date;
  readonly startTime: Date;
  readonly endTime: Date;
  readonly maxOccupancy: number;
  readonly minOccupancy: number;
  readonly location: {
    type: 'Point';
    coordinates: [number, number];
  };
  readonly host: {
    id: string;
    name: string;
  };
  readonly theme: string;
  readonly music: string[];
  readonly eventImages: string[];
  readonly attendees: {
    userId: string;
    RSVPStatus: string;
  }[];
  readonly entertainment: {
    entertainerId: string;
    startTime: Date;
    endTime: Date;
  }[];
  readonly supplies: {
    supplyId: string;
    quantity: number;
  }[];
}
