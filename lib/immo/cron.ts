import { CreationProperty } from '../../types/Property'
import { prisma } from '../PrimsaClient'

export const deleteRemovedEntries = async (
  listOfProperties: CreationProperty[][]
) => {
  const currentProperties = await prisma.property.findMany()
  const availableIds = listOfProperties.reduce<string[]>((all, properties) => {
    return [...all, ...properties.map(({ id }) => id)]
  }, [])

  const toBeDeleteProperties = currentProperties?.filter(
    ({ id }) => !availableIds.includes(id)
  )

  return await Promise.all(
    toBeDeleteProperties?.map(async (property) =>
      prisma.property.update({
        where: { id: property.id },
        data: { deleted: true },
      })
    ) || []
  )
}

export const upsertNewProperties = async (
  listOfProperties: CreationProperty[][]
) => {
  await Promise.all(
    listOfProperties.map(async (properties) =>
      Promise.all(
        properties.map(async (property) => {
          try {
            const dbProperty = await prisma.property.upsert({
              where: {
                id: property.id,
              },
              update: {
                deleted: false,
              },
              create: {
                ...property,
              },
            })

            return Promise.resolve({
              error: null,
              property: dbProperty,
            })
          } catch (error) {
            return Promise.resolve({
              error,
              property,
            })
          }
        })
      )
    )
  )

  return listOfProperties
}
