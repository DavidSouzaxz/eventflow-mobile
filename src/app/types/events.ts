export interface Event {
  batches: Batch[];
  capacity: number;
  date: string;
  description: string;
  id: string;
  imageUrl: string;
  location: string;
  owner: {
    name: string;
  };
  ownerId: string;
  price: number;
  ticketLimitPerPerson: number;
  title: string;
}

export interface Batch {
  id: string;
  name: string;
  price: number;
  limit: number;
  eventId: string;
}

export interface Booking {
  batchId: string;
  couponCode?: string;
  eventId: string;
  quantity: number;
}
