import { Organisation } from '../../types/Organisation'
import Property from '../../types/Property'
import { JSDOM } from 'jsdom'

export const getGesobauProperties = async (): Promise<Property[]> => {
    const gesobauResponse = await fetch(
        `https://www.gesobau.de/mieten/wohnungssuche.html?${getFlatQueryParams}`
    )

    const htmlText = await gesobauResponse.text()
    const dom = new JSDOM(htmlText)

    return Array.from(
        dom.window.document.querySelectorAll(
            '.tx-kesearch-pi1 .tab-pane.active .list_item'
        )
    ).map((propertyNode) => {
        const price = safeNumberQuery(
            propertyNode,
            '.list_item-details > :nth-child(1)'
        )
        const sqmeter = safeNumberQuery(
            propertyNode,
            '.list_item-details > :nth-child(2)'
        )
        const thumbnailImage = new URL(
            safeNodeQuery<HTMLSourceElement>(
                propertyNode,
                '.list_item-thumb source'
            ).srcset!,
            'https://www.gesobau.de/'
        ).toString()

        return {
            id: `${Organisation.GESOBAU}/${propertyNode.id}`,
            org: Organisation.GESOBAU,
            address: safeTextQuery(propertyNode, '.list_item-location'),
            price: price,
            sqmeter: sqmeter,
            headline: safeTextQuery(propertyNode, '.list_item-title > a'),
            thumbnail: thumbnailImage,
            imageLinks: [thumbnailImage],
            propertyLink: `https://www.gesobau.de${
                safeNodeQuery<HTMLAnchorElement>(propertyNode, 'a').href
            }`,
            // FIXME: get actual data here ...
            roomCount: 0,
            wbs: false,
        }
    })
}

const safeTextQuery = (node: Element, selector: string): string =>
    node.querySelector(selector)!.textContent!

const safeNodeQuery = <T extends Element>(node: Element, selector: string): T =>
    node.querySelector<T>(selector)!

const safeNumberQuery = (node: Element, selector: string): number =>
    parseFloat(
        safeTextQuery(node, selector)
            .replace(' €', '')
            .replace('Warmmiete: ', '')
            .replace('Fläche: ', '')
            .replace('.', '')
            .replace(',', '.')
    )

const getFlatQueryParams = (page = '1') => {
    const searchParams = new URLSearchParams()

    searchParams.append('id', '2')
    searchParams.append('tx_kesearch_pi1[sword]', '')
    searchParams.append('tx_kesearch_pi1[zimmer]', '')
    searchParams.append('tx_kesearch_pi1[flaecheMin]', '')
    searchParams.append('tx_kesearch_pi1[mieteMax]', '')
    searchParams.append('tx_kesearch_pi1[page]', page)
    searchParams.append('tx_kesearch_pi1[resetFilters]', '0')
    searchParams.append('tx_kesearch_pi1[sortByField]', '')
    searchParams.append('tx_kesearch_pi1[sortByDir]', '#ergebnisliste-anker')

    return searchParams.toString()
}
