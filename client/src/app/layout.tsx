'use client'
import './globals.css'
import { PostStoreProvider } from '@/providers/PostsStoreProvider'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache(),
  })

  return (
    <ApolloProvider client={client}>
      <PostStoreProvider initializeFromStorage={true}>
        <html lang="en">
          <body className="p-4">
            <p className="text-center text-2xl font-bold">Apollo Query Demo</p>
            <hr />
            {children}
          </body>
        </html>
      </PostStoreProvider>
    </ApolloProvider>
  )
}
