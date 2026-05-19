export type PrismaModel = {
  name: string;
  fields: PrismaField[];
};

export interface PrismaField {
  name: string;
  type: string;

  isOptional: boolean;
  isArray: boolean;

  attributes: string[];
}