import { NextApiHandler } from 'next'

type CronResult =
    | {
          message: string
      }
    | { success: boolean }

const CronPropertiesHandler: NextApiHandler<CronResult> = (req, res) => {
    if (req.method === 'POST') {
        try {
            const { authorization } = req.headers

            if (authorization === `Bearer ${process.env.API_SECRET_KEY}`) {
                res.status(200).json({ success: true })
            } else {
                res.status(401).json({ success: false })
            }
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    } else {
        res.setHeader('Allow', 'POST')
            .status(405)
            .json({ message: 'Method not allowed' })
    }
}

export default CronPropertiesHandler
