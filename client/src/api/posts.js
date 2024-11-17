import axios from 'axios'

const BASE_URL = 'http://localhost:3000/posts'
const POSTS_PER_PAGE = 2

export async function getPosts() {
  const response = await axios.get(BASE_URL, {
    params: { _sort: 'title' },
  })
  return response.data
}

export async function getPostsPaginated(page) {
  const response = await axios.get(BASE_URL, {
    params: { _page: page, _sort: 'title', _limit: POSTS_PER_PAGE },
  })

  const totalPosts = parseInt(response.headers['x-total-count'], 10)
  const hasNext = page * POSTS_PER_PAGE < totalPosts

  return {
    nextPage: hasNext ? page + 1 : undefined,
    previousPage: page > 1 ? page - 1 : undefined,
    posts: response.data,
  }
}

export async function getPost(id) {
  const response = await axios.get(`${BASE_URL}/${id}`)
  return response.data
}

export async function createPost({ title, body }) {
  const response = await axios.post(BASE_URL, {
    title,
    body,
    userId: 1,
    id: Date.now(),
  })
  return response.data
}
