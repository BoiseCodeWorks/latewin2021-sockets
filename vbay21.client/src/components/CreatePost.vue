<template>
  <div class="createPost mb-3 col-12 justify-content-center d-flex">
    <form @submit.prevent="createPost">
      <div class="form-inline">
        <input type="text"
               class="form-control"
               name="title"
               id="title"
               aria-describedby="helpId"
               placeholder="Post Title"
               v-model="state.newPost.title"
        >
        <input type="text"
               class="form-control"
               name="description"
               id="description"
               aria-describedby="helpId"
               placeholder="Post description"
               v-model="state.newPost.description"
        >
        <input type="text"
               class="form-control"
               name="price"
               id="price"
               aria-describedby="helpId"
               placeholder="Post price"
               v-model="state.newPost.price"
        >
        <input type="text"
               class="form-control"
               name="img"
               id="img"
               aria-describedby="helpId"
               placeholder="Post img"
               v-model="state.newPost.img"
        >
        <button class="btn btn-primary">
          Create
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { postService } from '../services/PostService'
export default {
  name: 'CreatePost',
  setup() {
    const state = reactive({
      newPost: {}
    })
    return {
      state,
      createPost() {
        console.log(state.newPost)
        postService.createPost({ ...state.newPost })
        state.newPost = {}
      }
    }
  }
}
</script>

<style scoped>

</style>
