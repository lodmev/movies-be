import { Movies } from '@prisma/client';
export class MovieEntity implements Movies {
  id: string;
  name: string;
  description: string;
  posterUrl: string;
  addedAt: Date;
  updatedAt: Date;
}
