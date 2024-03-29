import { CreationProperty } from '../../types/Property'
import { Organisation } from '../../types/Organisation'
import {
  HowogeCountResponse,
  HowogeSearchResponse,
} from '../../types/HowogeSearchResponse'

const fetchHowogePropertyPage = async (
  page: number
): Promise<Array<CreationProperty>> => {
  const propertiesResponse = await fetch(
    'https://www.howoge.de/?type=999&tx_howsite_json_list[action]=immoList',
    {
      body: createSearchParam(String(page)).toString(),
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }
  )

  if (!propertiesResponse.ok) {
    throw new Error('Could not fetch howoge properties')
  }

  const { immoobjects: properties }: HowogeSearchResponse =
    await propertiesResponse.json()

  return properties.map<CreationProperty>((property: any) => ({
    id: `${Organisation.HOWOGE}/${property.uid}`,
    organisation: Organisation.HOWOGE,
    address: property.title,
    price: property.rent,
    sqmeter: property.area,
    headline: property.notice + ' - ' + property.title,
    thumbnail: property.image,
    imageLinks: [`https://www.howoge.de${property.image}`],
    link: `https://www.howoge.de${property.link}`,
    wbs: property.wbs === 'ja',
    roomCount: property.rooms,
  }))
}

export const getHowogeProperties = async (): Promise<CreationProperty[]> => {
  const countResponse = await fetch(
    'https://www.howoge.de/?type=999&tx_howsite_json_list[action]=immoList',
    {
      body: createSearchParam().toString(),
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }
  )

  if (!countResponse.ok) {
    throw new Error('Could not fetch howoge count of properties')
  }

  const { cntImmoobjects: immoObjectCount }: HowogeCountResponse =
    await countResponse.json()

  const pageCount = calculatePageCount(immoObjectCount)

  const immos: Array<CreationProperty> = []
  for (let pageIndex = 1; pageIndex <= Math.min(pageCount, 50); pageIndex++) {
    console.log('updating pages:', pageIndex, 'of', Math.min(pageCount, 10))
    let additionalProperties = await fetchHowogePropertyPage(pageIndex)
    immos.push(...additionalProperties)
  }

  return immos
}

const immoPerPage = 12

const calculatePageCount = (immoObjectsCount: number) =>
  Math.ceil(immoObjectsCount / 12)

const createSearchParam = (page: string = '1') => {
  const searchParams = new URLSearchParams()

  searchParams.append('tx_howsite_json_list[page]', page)
  searchParams.append('tx_howsite_json_list[limit]', String(immoPerPage))
  searchParams.append('tx_howsite_json_list[lang]', '')
  searchParams.append('tx_howsite_json_list[rent]', '')
  searchParams.append('tx_howsite_json_list[area]', '')
  searchParams.append('tx_howsite_json_list[rooms]', 'egal')
  searchParams.append('tx_howsite_json_list[wbs]', 'all-offers')

  return searchParams
}
