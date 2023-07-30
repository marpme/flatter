import { ImageResponse } from '@vercel/og'

export const config = {
  runtime: 'edge',
}

const OG = () => {
  return new ImageResponse(
    (
      <div tw="flex flex-col w-full h-full items-center justify-center bg-white">
        <div tw="bg-gray-50 flex w-full">
          <div tw="flex flex-col md:flex-row w-full py-12 px-4 md:items-center justify-between p-8">
            <h2 tw="flex flex-col text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 text-left">
              <span>Still searching a flat manually?</span>
              <span tw="text-indigo-600">
                Act now and discover your dream property!
              </span>
            </h2>
            <div tw="mt-8 flex md:mt-0">
              <div tw="flex rounded-md shadow">
                <a tw="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-5 py-3 text-base font-medium text-white">
                  Get started
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 739,
      height: 298,
    }
  )
}

export default OG
