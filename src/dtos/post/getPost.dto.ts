import { type } from 'os'
import z, { object } from 'zod'
import { PostModel } from '../../models/Posts'

export interface getPostInputDTO {
   token:string
}

export type getPostOutputDTO = PostModel

export const getPostSchema = z.object({
    token: z.string().min(1)
})