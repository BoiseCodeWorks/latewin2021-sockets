import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
import socketService from './SocketService'

class PostService {
  async find(query = {}) {
    const posts = await dbContext.Posts.find(query)
    return posts
  }

  async findById(id) {
    const post = await dbContext.Posts.findById(id)
    if (!post) {
      throw new BadRequest('Invalid Id')
    }
    return post
  }

  async create(body) {
    const post = await dbContext.Posts.create(body)
    socketService.messageRoom('general', 'create:post', post)
    return post
  }

  async delete(id, creatorId) {
    await dbContext.Posts.findOneAndDelete({ _id: id, creatorId: creatorId })
    socketService.messageRoom('general', 'remove:post', id)
    return 'deleted'
  }

  async edit(postData) {
    const post = await dbContext.Posts.findByIdAndUpdate({ _id: postData.id }, postData, { new: true })
    socketService.messageRoom('general', 'update:post', post)
    return post
  }
}

export const postService = new PostService()
