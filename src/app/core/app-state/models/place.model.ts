export interface Place {
  id: string,
  center: number[],
  geometry: GeoJSON.Point,
  placeName: string,
  text: string,
  isLoading: boolean
}
