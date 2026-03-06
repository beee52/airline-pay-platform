export type AirlineType = 'budget' | 'full_service';

export interface Airline {
  id: string;
  name: string;
  code: string;
  airline_type: AirlineType;
}
