import { ElementsDatasource } from '../../../domain/datasources/elements/elements.datasource';
import { SearchElementsQueryParamsDto } from '../../../domain/dto/elements/searchElementsQuery.dto';
import { UpdateElementsDto } from '../../../domain/dto/elements/updateElements.dto';
import { CreateElementsDto } from '../../../domain/dto/elements/createElements.dto';
import { ElementsEntity } from '../../../domain/entities';
import { prisma } from '../../../data/database';
import { AppCustomError } from '../../../domain/errors/AppCustom.error';
import { ElementsMapper } from '../../../domain/mappers';

export class ElementsDatasourceImplementation implements ElementsDatasource {

    async getElementsById(id: string): Promise<ElementsEntity> {

        const existingElements =
            await prisma.elements.findUnique({
                where:{
                    id: Number(id),
                }
            })

        if(!existingElements) {
            throw AppCustomError.badRequest(
                'No elements found'
            )
        }

        return ElementsMapper.prismaToEntity(
            existingElements
        )
    }

    async createElements(
      dto: CreateElementsDto,
    ): Promise<ElementsEntity> {
      const {
        name
      } = dto
      
      const elements = await prisma.elements.create({
        data:{
                          name: name,
        }
      })
  
      const elementsEntity = ElementsMapper.prismaToEntity(elements)
      return elementsEntity
    }

    async getElements(
        queryParams: SearchElementsQueryParamsDto
    ): Promise<[ElementsEntity[], number]> {

        const { page, limit } = queryParams

        const elementsCount =
            prisma.elements.count()

        const elementsFound =
            prisma.elements.findMany({
                take: Number(limit),
                skip: (
                    (Number(page) - 1) *
                    Number(limit)
                )
            })

        const [total, elements] =
            await Promise.all([
                elementsCount,
                elementsFound
            ])

        const elementsEntities =
            elements.map(
                (elements) =>
                    ElementsMapper.prismaToEntity(
                        elements
                    )
            )

        return [
            elementsEntities,
            total
        ]
    }

    async updateElements(
        dto: UpdateElementsDto,
        id: string
    ): Promise<ElementsEntity> {

        const existingElements =
            await prisma.elements.findFirst({
                where:{ id:Number(id) }
            })

        if(!existingElements) {
            throw AppCustomError.notFound(
                'Elements not found'
            )
        }

        const {
            name
        } = dto

        let data:any = {}

                if (name !== undefined) data.name = name

        const updatedElements =
            await prisma.elements.update({
                where:{ id: Number(id) },
                data
            })

        return ElementsMapper.prismaToEntity(
            updatedElements
        )
    }

    async deleteElements(
        id: string
    ): Promise<string> {

        const existingElements =
            await prisma.elements.findFirst({
                where:{ id:Number(id) }
            })

        if(!existingElements) {
            throw AppCustomError.notFound(
                'Elements not found'
            )
        }

        await prisma.elements.delete({
            where:{ id:Number(id) }
        })

        return 'Elements deleted successfully'
    }
}
