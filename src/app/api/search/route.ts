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
    
    // Use web search to get real search results
    const searchResult = await zai.functions.invoke("web_search", {
      query: query.trim(),
      num: 15 // Get more results for better experience
    })

    // Format the results properly
    const formattedResults = searchResult.map((result: any, index: number) => ({
      id: `result-${index}`,
      title: result.name,
      url: result.url,
      snippet: result.snippet,
      host: result.host_name,
      favicon: result.favicon,
      rank: result.rank || index + 1,
      date: result.date || new Date().toISOString()
    }))

    return NextResponse.json({
      results: formattedResults,
      query: query,
      total: formattedResults.length
    })

  } catch (error: any) {
    console.error('Search API error:', error)
    return NextResponse.json(
      { error: 'Search failed', message: error.message },
      { status: 500 }
    )
  }
}