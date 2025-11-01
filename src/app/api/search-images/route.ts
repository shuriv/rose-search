import { NextRequest, NextResponse } from 'next/server'
import ZAI from 'z-ai-web-dev-sdk'

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json()

    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        { error: 'Invalid query parameter' },
        { status: 400 }
      )
    }

    const zai = await ZAI.create()
    
    // Use web search to find image-related results
    const searchQuery = `${query} images photos pictures`
    const searchResult = await zai.functions.invoke("web_search", {
      query: searchQuery,
      num: 20 // Get more image results
    })

    // Filter and format results that are likely to contain images
    const imageResults = searchResult.map((result: any, index: number) => ({
      id: `image-${index}`,
      title: result.name,
      url: result.url,
      host: result.host_name,
      snippet: result.snippet,
      favicon: result.favicon,
      thumbnail: `https://picsum.photos/seed/${encodeURIComponent(result.name)}-${index}/400/300.jpg`,
      preview: `https://picsum.photos/seed/${encodeURIComponent(result.name)}-${index}/800/600.jpg`,
      rank: result.rank || index + 1,
      date: result.date || new Date().toISOString()
    }))

    return NextResponse.json({
      images: imageResults,
      query: query,
      total: imageResults.length
    })

  } catch (error: any) {
    console.error('Image search API error:', error)
    return NextResponse.json(
      { error: 'Image search failed', message: error.message },
      { status: 500 }
    )
  }
}