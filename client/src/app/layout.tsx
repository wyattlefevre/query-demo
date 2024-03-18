'use client'
import { Inter } from 'next/font/google'
import './globals.css'
import { PostStoreProvider } from '@/providers/PostsStoreProvider'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

const inter = Inter({ subsets: ['latin'] })

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
          <body className={inter.className}>{children}</body>
        </html>
      </PostStoreProvider>
    </ApolloProvider>
  )
}
