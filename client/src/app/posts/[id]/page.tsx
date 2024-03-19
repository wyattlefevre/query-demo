'use client'
import PostViewBad from '@/components/PostViewBad'
import PostViewGood from '@/components/PostViewGood'

function Page({ params }: { params: { id: string } }) {
  // return <PostViewGood id={params.id}/>
  return <PostViewBad id={params.id}/>
}

export default Page
