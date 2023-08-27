import { type } from 'os'
import z from 'zod'
import { PostModel } from '../../models/Posts'

export interface getPostInputDTO {
   token:string
}

export type getPostOutputDTO = PostModel[]

export const getPostSchema = z.object({
    token: z.string().min(1)
}).transform(data => data as getPostInputDTO)