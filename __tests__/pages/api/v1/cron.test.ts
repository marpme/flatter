import CronPropertiesHandler, {
    CronResult,
} from '../../../../pages/api/v1/cron'
import { NextApiRequestBuilder, ResponseMock } from 'next-test-suite'
import { afterEach, beforeEach } from 'vitest'

describe('integration - cron job', () => {
    it('should reject invalid methods', async () => {
        const req = new NextApiRequestBuilder().setMethod('GET').build()
        const res = ResponseMock<CronResult>()

        CronPropertiesHandler(req, res)

        expect(res.getStatusCode()).toEqual(405)
        expect(res.getBodyJson()).toStrictEqual({
            success: false,
            message: 'Method not allowed',
        })
    })

    it('should reject valid method without authentication', async () => {
        const req = new NextApiRequestBuilder().setMethod('POST').build()
        const res = ResponseMock<CronResult>()

        CronPropertiesHandler(req, res)

        expect(res.getStatusCode()).toEqual(401)
        expect(res.getBodyJson()).toStrictEqual({
            success: false,
            message: 'access denied',
        })
    })

    it('should reject valid method with wrong authentication', async () => {
        const req = new NextApiRequestBuilder()
            .setMethod('POST')
            .setHeaders({ authorization: 'Bearer ABC123' })
            .build()
        const res = ResponseMock<CronResult>()

        CronPropertiesHandler(req, res)

        expect(res.getStatusCode()).toEqual(401)
        expect(res.getBodyJson()).toStrictEqual({
            success: false,
            message: 'access denied',
        })
    })

    describe('with authentication', () => {
        let originalApiKey: string | undefined

        beforeEach(() => {
            originalApiKey = process.env.API_SECRET_KEY
            process.env.API_SECRET_KEY = 'ValidTokenOfMine'
        })

        afterEach(() => {
            process.env.API_SECRET_KEY = originalApiKey
        })

        /*it('should run cron job and return properties scanned', async () => {
            const req = new NextApiRequestBuilder()
                .setMethod('POST')
                .setHeaders({ authorization: 'Bearer ValidTokenOfMine' })
                .build()
            const res = ResponseMock<CronResult>()

            CronPropertiesHandler(req, res)

            expect(res.getBodyJson()).toStrictEqual({
                success: false,
                message: 'access denied',
            })
            expect(res.getStatusCode()).toEqual(200)
        })*/
    })
})
