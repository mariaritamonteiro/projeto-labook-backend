import { PostDatabase } from "../database/PostDatabase";
import { CreatePostInputDTO, CreatePostOutputDTO } from "../dtos/post/createPost.dtos";
import { deletePostInputDTO, deletePostOutputDTO } from "../dtos/post/deletePost.dto";
import { editPostInputDTO, editPostOutputDTO } from "../dtos/post/editPost.dto";
import { getPostInputDTO, getPostOutputDTO } from "../dtos/post/getPost.dto";
import { LikeOrDislikePostInputDTO, LikeOrDislikePostOutputDTO } from "../dtos/post/likeOrDislikePost.dto";
import { ForbiddenError } from "../errors/ForbiddenError";
import { NotFoundError } from "../errors/NotFoundError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { LikeDislikeDB, POST_LIKE, Posts } from "../models/Posts";
import { USER_ROLES } from "../models/Users";
import { IdGenerator } from "../services/Idgenerator";
import { TokenManager } from "../services/TokenManager";

export class PostBusiness {
  constructor(
    private postDatabase: PostDatabase,
    private idGenerator: IdGenerator,
    private tokenManager: TokenManager
  ) {}

  public createPost = async (
    input: CreatePostInputDTO
  ): Promise<CreatePostOutputDTO> => {
    const { content, token } = input

    const payload = this.tokenManager.getPayload(token)

    if (!payload) {
      throw new UnauthorizedError()
    }

    const id = this.idGenerator.generate()

    const post = new Posts(
      id,
      content,
      0,
      0,
      new Date().toISOString(),
      new Date().toISOString(),
      payload.id,
      payload.name
    )

    const postDB = post.toDBModel()
    await this.postDatabase.insertPost(postDB)

    const output: CreatePostOutputDTO = undefined

    return output
  }

  public getPost = async (
    input: getPostInputDTO
  ): Promise<getPostOutputDTO> => {
    const { token } = input

    const payload = this.tokenManager.getPayload(token)

    if (!payload) {
      throw new UnauthorizedError()
    }

    const postDBwithCreatorName =
      await this.postDatabase.getPostsWithCreatorName()
    
    const post = postDBwithCreatorName
      .map((postWithCreatorName) => {
        const post = new Posts(
          postWithCreatorName.id,
          postWithCreatorName.content,
          postWithCreatorName.likes,
          postWithCreatorName.dislikes,
          postWithCreatorName.created_at,
          postWithCreatorName.updated_at,
          postWithCreatorName.creator_id,
          postWithCreatorName.creator_name
        )

        return post.toBusinessModel()
    })

   
    const output: getPostOutputDTO = post

    return output
  }

  public editPost = async (
    input: editPostInputDTO
  ): Promise<editPostOutputDTO> => {
    const { content, token, idToEdit } = input

    const payload = this.tokenManager.getPayload(token)

    if (!payload) {
      throw new UnauthorizedError()
    }

    const postDB = await this.postDatabase
      .findPostById(idToEdit)

    if (!postDB) {
      throw new NotFoundError("playlist com essa id não existe")
    }

    if (payload.id !== postDB.creator_id) {
      throw new ForbiddenError("somente quem criou a playlist pode editá-la")
    }

    const post = new Posts(
      postDB.id,
      postDB.content,
      postDB.likes,
      postDB.dislikes,
      postDB.created_at,
      postDB.updated_at,
      postDB.creator_id,
      payload.name
    )

    post.setContent(content)

    const updatedPostDB = post.toDBModel()
    await this.postDatabase.updatePost(updatedPostDB)

    const output: editPostOutputDTO = undefined

    return output
  }

  public deletePost = async (
    input: deletePostInputDTO
  ): Promise<deletePostOutputDTO> => {
    const { token, idToDelete } = input

    const payload = this.tokenManager.getPayload(token)

    if (!payload) {
      throw new UnauthorizedError()
    }

    const postDB = await this.postDatabase
      .findPostById(idToDelete)

    if (!postDB) {
      throw new NotFoundError("playlist com essa id não existe")
    }

    if (payload.role !== USER_ROLES.ADMIN) {
      if (payload.id !== postDB.creator_id) {
        throw new ForbiddenError("somente quem criou a playlist pode editá-la")
      }
    }

    await this.postDatabase.deletePostById(idToDelete)

    const output: deletePostOutputDTO = undefined

    return output
  }

  public likeOrDislikePost = async (
    input: LikeOrDislikePostInputDTO
  ): Promise<LikeOrDislikePostOutputDTO> => {
    const { token, like, postId } = input

    const payload = this.tokenManager.getPayload(token)

    if (!payload) {
      throw new UnauthorizedError()
    }

    const postDBWithCreatorName =
      await this.postDatabase.findPlaylistWithCreatorNameById(postId)

    if (!postDBWithCreatorName) {
      throw new NotFoundError("playlist com essa id não existe")
    }

    const post = new Posts(
      postDBWithCreatorName.id,
      postDBWithCreatorName.content,
      postDBWithCreatorName.likes,
      postDBWithCreatorName.dislikes,
      postDBWithCreatorName.created_at,
      postDBWithCreatorName.updated_at,
      postDBWithCreatorName.creator_id,
      postDBWithCreatorName.creator_name
    )

    const likeSQlite = like ? 1 : 0

    const likeDislikeDB: LikeDislikeDB = {
      user_id: payload.id,
      posts_id: postId,
      like: likeSQlite
    }

    const likeDislikeExists =
      await this.postDatabase.findLikeDislike(likeDislikeDB)

    if (likeDislikeExists === POST_LIKE.ALREADY_LIKED) {
      if (like) {
        await this.postDatabase.removeLikeDislike(likeDislikeDB)
        post.removeLike()
      } else {
        await this.postDatabase.updateLikeDislike(likeDislikeDB)
        post.removeLike()
        post.addDislike()
      }

    } else if (likeDislikeExists === POST_LIKE.ALREADY_DISLIKED) {
      if (like === false) {
        await this.postDatabase.removeLikeDislike(likeDislikeDB)
        post.removeDislike()
      } else {
        await this.postDatabase.updateLikeDislike(likeDislikeDB)
        post.removeDislike()
        post.addLike()
      }

    } else {
      await this.postDatabase.insertLikeDislike(likeDislikeDB)
      like ? post.addLike() : post.addDislike()
    }

    const updatedPostDB = post.toDBModel()
    await this.postDatabase.updatePost(updatedPostDB)

    const output: LikeOrDislikePostOutputDTO = undefined

    return output
  }
}
