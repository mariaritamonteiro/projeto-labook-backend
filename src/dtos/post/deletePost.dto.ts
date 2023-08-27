import z from 'zod'

export interface deletePostInputDTO {
  token:string,
  idToDelete:string
  
}
export type deletePostOutputDTO = undefined

export const deletePostSchema = z.object({
    token: z.string().min(1),
    idToDelete: z.string().min(1)
})