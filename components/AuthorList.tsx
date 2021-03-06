import Image from 'next/image'
import Link from 'next/link'

import { resolveUrl } from '@utils/routing'
import { useLang, get } from '@utils/use-lang'

import { HoverOnAvatar } from '@components/effects/HoverOnAvatar'
import { AvatarIcon } from '@icons/AvatarIcon'
import { GhostAuthor } from '@lib/ghost'

import { nextFeatureImages, imageQuality } from '@appConfig'

interface AuthorListProps {
  authors?: GhostAuthor[]
  isPost?: boolean
}

export const AuthorList = ({ authors, isPost }: AuthorListProps) => {
  const text = get(useLang())

  return (
    <ul className="author-list">
      {authors?.map((author, i) => {
        const url = resolveUrl({ slug: author.slug, url: author.url || undefined })
        const profileImg = author.profileImage

        return (
          <HoverOnAvatar
            key={i}
            activeClass="hovered"
            render={(hover) => (
              <li key={i} ref={hover.anchorRef} className="author-list-item">
                {!isPost && <div className="author-name-tooltip">{author.name}</div>}
                {isPost && (
                  <div className={`author-card ${hover.state.currentClass}`}>
                    <div className="author-profile-image">
                      {profileImg && nextFeatureImages ? (
                        <Image
                          src={profileImg.url}
                          alt={author.name}
                          layout="responsive"
                          quality={imageQuality}
                          {...profileImg.dimensions}
                        />
                      ) : (author.profile_image && (
                        <img src={author.profile_image} alt={author.name} />
                      ))}
                    </div>
                    <div className="author-info">
                      {author.bio ? (
                        <div className="bio">
                          <h2>{author.name}</h2>
                          <p>{author.bio}</p>
                          <p>
                            <Link href={url}>
                              <a>{text(`MORE_POSTS`)}</a>
                            </Link>{' '}
                            {text(`BY`)} {author.name}.
                          </p>
                        </div>
                      ) : (
                          <>
                            <h2>{author.name}</h2>
                            <p>
                              {text(`READ`)}{' '}
                              <Link href={url}>
                                <a>{text(`MORE_POSTS_SM`)}</a>
                              </Link>{' '}
                              {text(`BY_THIS_AUTHOR`)}.
                          </p>
                          </>
                        )}
                    </div>
                  </div>
                )}
                <Link href={url}>
                  {profileImg && nextFeatureImages ? (
                    <a className={`${(isPost && `author`) || `static`}-avatar`} aria-label={author.name}>
                      <Image
                        src={profileImg.url}
                        alt={author.name}
                        layout="responsive"
                        quality={imageQuality}
                        {...profileImg.dimensions}
                      />
                    </a>
                  ) : (author.profile_image ? (
                    <a className={`${(isPost && `author`) || `static`}-avatar`} aria-label={author.name}>
                      <img src={author.profile_image} alt={author.name} />
                    </a>
                  ) : (
                      <a className={`${(isPost && `author`) || `static`}-avatar author-profile-image`} aria-label={author.name}>
                        <AvatarIcon />
                      </a>
                    ))
                  }
                </Link>
              </li>
            )
            }
          />
        )
      })}
    </ul >
  )
}
