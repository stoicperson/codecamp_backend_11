import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Image } from './entities/image.entity';
import {
  IImagesServiceCreateMany,
  IImagesServiceDelete,
  IImagesServiceFindById,
} from './interfaces/images-service.interface';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image)
    private readonly imagesRepository: Repository<Image>,

    private readonly dataSource: DataSource,
  ) {}

  createMany({ imageUrls }: IImagesServiceCreateMany): Promise<Image[]> {
    const imagesEntities = this.imagesRepository.create(
      imageUrls.map((url) => ({
        url,
      })),
    );
    return this.imagesRepository.save(imagesEntities);
  }

  findById({ ticketId }: IImagesServiceFindById): Promise<Image[]> {
    return this.imagesRepository.find({
      where: {
        ticket: {
          id: ticketId,
        },
      },
    });
  }

  async delete({ ids }: IImagesServiceDelete): Promise<boolean> {
    const result = await this.dataSource
      .createQueryBuilder()
      .delete()
      .from(Image)
      .where('id IN (:id)', { id: [...ids] })
      .execute();

    return result.affected ? true : false;
  }
}
