export interface HowogeSearchResponse {
  immoobjects: Immoobject[]
  badges: any[]
}

export interface HowogeCountResponse {
  cntImmoobjects: number
  allImmoobjects: number
}

export interface Immoobject {
  uid: number
  title: string
  image: string
  district: string
  rent: number
  area: number
  rooms: number
  wbs: string
  features: string[]
  coordinates: Coordinates
  icon: string
  link: string
  favorite: boolean
  notice: string
}

export interface Coordinates {
  lat: string
  lng: string
}
