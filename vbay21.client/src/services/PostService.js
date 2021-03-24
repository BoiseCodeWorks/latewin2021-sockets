import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class PostService {
  async getPosts() {
    try {
      const res = await api.get('/api/posts')
      AppState.posts = res.data
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  async createPost(newPost) {
    try {
      await api.post('/api/posts', newPost)
      // this.getPosts()
      // AppState.posts.push(res.data)
    } catch (error) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', error)
    }
  }

  async edit(post) {
    try {
      await api.put('/api/posts/' + post._id, post)
      // this.getPosts()
    } catch (error) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', error)
    }
  }

  async delete(post) {
    try {
      await api.delete('/api/posts/' + post._id)
      // this.getPosts()
    } catch (error) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', error)
    }
  }
}

export const postService = new PostService()
