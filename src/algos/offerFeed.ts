import { AppContext } from '../config'
import {
  QueryParams,
  OutputSchema as AlgoOutput,
} from '../lexicon/types/app/bsky/feed/getFeedSkeleton'
import axios from 'axios'

export const shortname = 'offerFeed'

const keywords = [
  'oferta mercado livre',
  'oferta shopee',
  'oferta amazon',
  'oferta nike',
  'oferta adidas',
  'cupom shopee',
  'cupom mercado livre',
  'cupom amazon',
  'oferta dafiti',
  'oferta aliexpress',
  'cupom aliexpress',
]

const fetchPosts = async (params: QueryParams) => {
  const response = await axios.get('https://api.exemplo.com/posts', { params })
  return response.data
}

export const handler = async (
  ctx: AppContext,
  params: QueryParams,
): Promise<AlgoOutput> => {
  const allPosts = await fetchPosts(params)

  const filteredPosts = allPosts.filter((post: any) =>
    keywords.some((keyword) =>
      post.text.toLowerCase().includes(keyword.toLowerCase()),
    ),
  )

  return {
    feed: filteredPosts.map((post: any) => ({
      postUri: post.uri,
      postCid: post.cid,
    })),
  }
}
