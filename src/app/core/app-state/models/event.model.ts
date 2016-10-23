export interface Event {
  id?: string,
  displayId?: string,
  name: string,
  description: string,
  placeName: string,
  centerGeometry: GeoJSON.Point,
  latitude: number,
  longitude: number
}
