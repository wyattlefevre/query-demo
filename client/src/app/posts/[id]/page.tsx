'use client'

import { usePost } from '@/queries/blogPostService'

function Page({ params }: { params: { id: string } }) {
  const { loading, error, data } = usePost(params.id)
  if (loading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>{error.message}</div>
  }
  console.log(data)
  return <div>Post Page {params.id}</div>
}

export default Page
