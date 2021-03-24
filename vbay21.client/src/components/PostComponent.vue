<template>
  <div class="postComponent card col-3 h-50">
    <img class="card-img-top img-fluid" :src="postProp.img || 'https://placehold.it/200x200'" alt="">
    <div class="card-body">
      <h4 class="card-title">
        {{ postProp.title }}
      </h4>
      <p class="card-text">
        {{ postProp.description }}
      </p>
      <p>{{ postProp.price }}</p>
      <button class="btn btn-info" @click="bid(postProp)">
        Bid
      </button>
      <button class="btn btn-danger" @click="remove(postProp)">
        Remove
      </button>
    </div>
  </div>
</template>

<script>
import { AppState } from '../AppState'
import { computed, reactive } from 'vue'
import { postService } from '../services/PostService'
export default {
  name: 'PostComponent',
  props: { postProp: { type: Object, required: true } },
  setup(props) {
    const state = reactive({
      posts: computed(() => AppState.posts)
    })
    return {
      state,
      bid(post) {
        post.price += 10
        postService.edit(post)
      },
      remove(post) {
        postService.delete(post)
      }
    }
  }
}
</script>

<style scoped>

</style>
