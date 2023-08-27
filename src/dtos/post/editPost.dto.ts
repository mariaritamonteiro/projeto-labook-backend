import z from 'zod'

export interface editPostInputDTO{
    content:string,
    token:string,
    idToEdit:string
}
export type editPostOutputDTO = undefined

export const editPostSchema = z.object({
    content:z.string().min(1),
    token:z.string().min(1),
    idToEdit:z.string().min(1)
})