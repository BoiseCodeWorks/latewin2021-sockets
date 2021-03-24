<template>
  <div class="home flex-grow-1 container-fluid">
    <div class="row justify-content-center">
      <div class="col-3">
        <img class="img-fluid" src="https://bcw.blob.core.windows.net/public/img/8600856373152463" alt="CodeWorks Logo">
        <h1 class="my-5 bg-dark text-light p-3 rounded d-flex align-items-center">
          <span class="mx-2 text-white">Vue 3 Starter</span>
        </h1>
      </div>
      <CreatePost />
    </div>
    <div class="row">
    </div>
    <div class="row">
      <PostComponent v-for="p in state.posts" :key="p.id" :post-prop="p" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { socketService } from '../services/SocketService'
export default {
  name: 'Home',
  setup() {
    onMounted(() => {
      socketService.emit('join:room', 'general')
      // first arg is action to do, 2nd is data to be passed
    })
    const state = reactive({
      posts: computed(() => AppState.posts)
    })
    return {
      state
    }
  }
}
</script>

<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}
</style>
