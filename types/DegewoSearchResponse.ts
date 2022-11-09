export interface DegewoSearchResult {
    immos: Immo[]
    hints: null
    category_aggregations: CategoryAggregation[]
    search_params: SearchParams
    total: number
    pagination: Pagination
}

export interface CategoryAggregation {
    key: string
    doc_count: number
}

export interface Immo {
    id: string
    hidden: boolean
    property_number: string
    original_external_id: string
    open_immo_object: boolean
    property_authority_name: null
    contact_link: string
    headline: string
    living_space: number
    commercial_space: null
    property_space: null
    number_of_rooms: NumberOfRooms
    zipcode: string
    city: City
    street: string
    street_number: string
    floor: number
    number_of_floors: number
    story: null
    rent_cold: string
    rent_total_with_vat: string
    rent_total_without_vat: string
    rent_pa: null
    buying_price: null
    service_charges_cold: number
    service_charges_warm: number
    price_per_square_meter: null
    common_charge: null
    service_fee: null
    deposit: Deposit
    company: null
    construction_year: number
    location_details_environment: null | string
    location_details_inhouse: null
    location_details_story: null
    description: null | string
    available_from: AvailableFrom
    other_information: string
    logo: null
    wenr: null
    energy_efficiency: number
    endenergiebedarf_strom: null
    endenergiebedarf_waerme: null
    energy_efficiency_class: string
    energy_certificate_type: EnergyCertificateType
    primary_energy_carrier: PrimaryEnergyCarrier
    wbs_required: boolean
    location: Location
    property_type_id: number
    property_type: null
    housing_type_id: null
    housing_type: null
    condition_id: null
    condition: null
    authority_id: null
    authority: Authority
    neighborhood_id: number
    neighborhood: Neighborhood
    external_data: ExternalDatum[]
    furnishings: Furnishing[]
    furnishings_text: string
    property_categories: PropertyCategory[]
    special_offers: any[]
    district_tour: null
    is_business: boolean
    space: string
    price: string
    address: string
    full_address: string
    thumb_path: string
    thumb_url: string
    mobile_thumb_path: string
    mobile_thumb_url: string
    property_path: string
    price_label: PriceLabel
}

export interface Authority {
    surname: Surname
    prename: null
    telephone: null
    fax: null
    email: Email
    email_expose: Email
    zipcode: string
    city: City
    street: Street
    street_number: null
    customer_service_description: null
    opening_hours_title: null
    opening_hours_1: null
    opening_hours_2: null
    opening_hours_3: null
    opening_hours_4: null
}

export enum City {
    Berlin = 'Berlin',
}

export enum Email {
    AnfragenDegewoInteressentenanfragenDe = 'anfragen@degewo.interessentenanfragen.de',
}

export enum Street {
    Postfach = 'Postfach',
}

export enum Surname {
    DegewoAG = 'degewo AG',
    DegewoMarzahnerWohnungsgesellschaftMBH = 'degewo Marzahner Wohnungsgesellschaft mbH',
    DegewoNordWohnungsgesellschaftMBH = 'degewo Nord Wohnungsgesellschaft mbH',
}

export enum AvailableFrom {
    Sofort = 'sofort',
    The15112022 = '15.11.2022',
}

export enum Deposit {
    DreiNettokaltmieten = 'drei Nettokaltmieten',
}

export enum EnergyCertificateType {
    Bedarf = 'BEDARF',
    Verbrauch = 'VERBRAUCH',
}

export interface ExternalDatum {
    filename: string
    name: string
    type: Type | null
    priority: number
}

export enum Type {
    Außenansicht = 'Außenansicht',
    Grundriss = 'Grundriss',
    Innenansicht = 'Innenansicht',
}

export interface Furnishing {
    id: number
    name: FurnishingName
    searchable: null
}

export enum FurnishingName {
    Aufzug = 'Aufzug',
    BalkonLoggia = 'Balkon/Loggia',
    Barrierefrei = 'barrierefrei',
}

export interface Location {
    lat: number
    lon: number
}

export interface Neighborhood {
    name: null
    district: District
}

export enum District {
    MarzahnHellersdorf = 'Marzahn-Hellersdorf',
    Mitte = 'Mitte',
    TempelhofSchöneberg = 'Tempelhof-Schöneberg',
}

export enum NumberOfRooms {
    The1Zimmer = '1 Zimmer',
    The2Zimmer = '2 Zimmer',
    The3Zimmer = '3 Zimmer',
}

export enum PriceLabel {
    Warmmiete = 'Warmmiete:',
}

export enum PrimaryEnergyCarrier {
    Fernwärme = 'Fernwärme',
}

export interface PropertyCategory {
    id: number
    name: PropertyCategoryName
}

export enum PropertyCategoryName {
    Wohnung = 'Wohnung',
}

export interface Pagination {
    current_page: string
    prev_page: string
    next_page: string
    first_page: string
    last_page: string
}

export interface SearchParams {
    size: number
    page: number
    property_type_id: number
    categories: string[]
    lat: null
    lon: null
    area: null
    address: null
    district: null
    property_number: null
    price_switch: boolean
    price_radio: string
    price_from: null
    price_to: null
    qm_radio: string
    qm_from: null
    qm_to: null
    rooms_radio: string
    rooms_from: null
    rooms_to: null
    features: any[]
    wbs_required: null
    order: string
}
