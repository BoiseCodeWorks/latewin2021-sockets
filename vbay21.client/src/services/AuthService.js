import { initialize } from '@bcwdev/auth0provider-client'
import { AppState } from '../AppState'
import { audience, clientId, domain } from '../AuthConfig'
import router from '../router'
import { setBearer } from './AxiosService'
import { accountService } from './AccountService'

import { postService } from './PostService'
import { socketService } from './SocketService'

export const AuthService = initialize({
  domain,
  clientId,
  audience,
  onRedirectCallback: appState => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    )
  }
})

AuthService.on(AuthService.AUTH_EVENTS.AUTHENTICATED, async function() {
  setBearer(AuthService.bearer)
  await accountService.getAccount()
  AppState.user = AuthService.user
  postService.getPosts()
  // only fires off to authenticate/connect socket once we are authorized with auth0
  socketService.authenticate(AuthService.bearer)

  // NOTE if there is something you want to do once the user is authenticated, place that here
})
