
import Link from 'next/link'
import { GetStaticProps } from 'next'

import { Layout } from '@components/Layout'
import { HeaderPage } from '@components/HeaderPage'
import { PostCard } from '@components/PostCard'

import { siteUrl } from '@lib/environment'
import { getPosts, getAllSettings, GhostSettings, GhostPostsOrPages } from '@lib/ghost'
import { useLang, get } from '@utils/use-lang'

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getPosts({ limit: 3 })
  const settings = await getAllSettings()

  return {
    props: {
      siteUrl,
      settings,
      posts
    },
  }
}

interface Custom404Props {
  siteUrl: string
  posts: GhostPostsOrPages
  settings: GhostSettings
}

export default function Custom404({ siteUrl, posts, settings }: Custom404Props) {
  const text = get(useLang())

  return (
    <Layout {...{ siteUrl, settings }} header={<HeaderPage {...{ siteUrl, settings }} />} errorClass="error-content">
      <div className="inner">
        <section className="error-message">
          <h1 className="error-code">404</h1>
          <p className="error-description">{text(`PAGE_NOT_FOUND`)}</p>
          <Link href="/" ><a className="error-link">{text(`GOTO_FRONT_PAGE`)} →</a></Link>
        </section>

        <div className="post-feed">
          {posts.map((post, i) => (
            <PostCard key={post.id} post={post} num={i} />
          ))}
        </div>

      </div>
    </Layout>
  )
}
