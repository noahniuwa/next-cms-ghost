import Image from 'next/image'

import { HeaderPage } from '@components/HeaderPage'
import { Layout } from '@components/Layout'
import { RenderContent } from '@components/RenderContent'

import { PostClass } from '@helpers/PostClass'
import { SEO } from '@meta/seo'

import { GhostPostOrPage, GhostSettings } from '@lib/ghost'
import { ISeoImage } from '@meta/seoImage'

import { imageQuality, nextFeatureImages } from '@appConfig'

/**
 * Single page (/:slug)
 *
 * This file renders a single page and loads all the content.
 *
 */

interface PageProps {
  cmsData: {
    siteUrl: string
    page: GhostPostOrPage
    settings: GhostSettings
    seoImage: ISeoImage
  }
}

export const Page = ({ cmsData }: PageProps) => {
  const { page, siteUrl, settings, seoImage } = cmsData
  const { meta_title, meta_description } = page

  const featImg = page.featureImage
  const postClass = PostClass({ tags: page.tags, isPage: page && true, isImage: !!featImg })
  const htmlAst = page.htmlAst
  if (htmlAst === undefined) throw Error('Page.tsx: htmlAst must be defined.')

  return (
    <>
      <SEO {...{ siteUrl, settings, meta_title, meta_description, seoImage }} />
      <Layout {...{ siteUrl, settings, page }} tags={page.tags} header={<HeaderPage {...{ siteUrl, settings }} />}>
        <div className="inner">
          <article className={`post-full ${postClass}`}>
            <header className="post-full-header">
              <h1 className="post-full-title">{page.title}</h1>
            </header>

            {featImg && (
              nextFeatureImages && featImg.dimensions ? (
                <figure className="post-full-image" style={{ display: 'inherit' }}>
                  <Image
                    src={featImg.url}
                    alt={page.title}
                    quality={imageQuality}
                    layout="responsive"
                    sizes={`
                              (max-width: 350px) 350px,
                              (max-width: 530px) 530px,
                              (max-width: 710px) 710px,
                              (max-width: 1170px) 1170px,
                              (max-width: 2110px) 2110px, 2000px
                            `}
                    {...featImg.dimensions}
                  />
                </figure>
              ) : (page.feature_image && (
                <figure className="post-full-image">
                  <img src={page.feature_image} alt={page.title} />
                </figure>
              ))
            )}

            {/* The main page content */}
            <section className="post-full-content">
              <div className="post-content load-external-scripts">
                <RenderContent htmlAst={htmlAst} />
              </div>
            </section>
          </article>
        </div>
      </Layout>
    </>
  )
}
