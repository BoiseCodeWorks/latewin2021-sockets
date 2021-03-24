import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { postService } from '../services/PostService'

export class PostController extends BaseController {
  constructor() {
    super('api/posts')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.deletePost)
  }

  async getAll(req, res, next) {
    try {
      return res.send(await postService.find(req.params))
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.id
      res.send(await postService.create(req.body))
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      req.body.id = req.params.id
      res.send(await postService.edit({ price: req.body.price, id: req.params.id }))
    } catch (error) {
      next(error)
    }
  }

  async deletePost(req, res, next) {
    try {
      res.send(await postService.delete(req.params.id, req.userInfo.id))
    } catch (error) {
      next(error)
    }
  }
}
