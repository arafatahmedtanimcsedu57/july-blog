'use client'

import qs from 'qs'
import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react'

import type { Category, Post, Project } from '../../../payload/payload-types'
import type { ArchiveBlockProps } from '../../_blocks/ArchiveBlock/types'

import { Card } from '../Card'
import { Gutter } from '../Gutter'
import { PageRange } from '../PageRange'
import { Pagination } from '../Pagination'
import classes from './index.module.scss'

type Result = {
  docs: (Post | Project)[]
  hasNextPage: boolean
  hasPrevPage: boolean
  nextPage: number
  page: number
  prevPage: number
  totalDocs: number
  totalPages: number
}

export type Props = {
  categories?: ArchiveBlockProps['categories']
  className?: string
  limit?: number
  onResultChange?: (result: Result) => void // eslint-disable-line no-unused-vars
  populateBy?: 'collection' | 'selection'
  populatedDocs?: ArchiveBlockProps['populatedDocs']
  populatedDocsTotal?: ArchiveBlockProps['populatedDocsTotal']
  relationTo?: 'posts' | 'projects' | 'films' | 'studies'
  selectedDocs?: ArchiveBlockProps['selectedDocs']
  showPageRange?: boolean
  sort?: string
}

export const CollectionArchive: React.FC<Props> = (props) => {
  const {
    categories: catsFromProps,
    className,
    limit = 10,
    onResultChange,
    populateBy,
    populatedDocs,
    populatedDocsTotal,
    relationTo,
    selectedDocs,
    showPageRange,
    sort = '-createdAt',
  } = props

  const [results, setResults] = useState<Result>({
    docs:
      populatedDocs?.map((doc) => doc.value) ||
      (selectedDocs?.map((doc) => doc.value) as any) ||
      [],
    hasNextPage: false,
    hasPrevPage: false,
    nextPage: 1,
    page: 1,
    prevPage: 1,
    totalDocs: typeof populatedDocsTotal === 'number' ? populatedDocsTotal : 0,
    totalPages: 1,
  })

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)
  const scrollRef = useRef<HTMLDivElement>(null)
  const hasHydrated = useRef(false)
  const [page, setPage] = useState(1)

  const scrollToRef = useCallback(() => {
    const { current } = scrollRef
    if (current) {
      // current.scrollIntoView({
      //   behavior: 'smooth',
      // })
    }
  }, [])

  useEffect(() => {
    if (!isLoading && typeof results.page !== 'undefined') {
      // scrollToRef()
    }
  }, [isLoading, scrollToRef, results])

  useEffect(() => {
    let timer = null

    if (populateBy === 'collection') {
      // hydrate the block with fresh content after first render
      // don't show loader unless the request takes longer than x ms
      // and don't show it during initial hydration
      timer = setTimeout(() => {
        if (hasHydrated) {
          setIsLoading(true)
        }
      }, 500)

      const searchQuery = qs.stringify(
        {
          depth: 1,
          limit,
          page,
          sort,
          where: {
            ...(catsFromProps && catsFromProps?.length > 0
              ? {
                  categories: {
                    in:
                      typeof catsFromProps === 'string'
                        ? [catsFromProps]
                        : catsFromProps.map((cat: Category) => cat.id).join(','),
                  },
                }
              : {}),
          },
        },
        { encode: false },
      )

      const makeRequest = async () => {
        try {
          const req = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/${relationTo}?${searchQuery}`,
          )
          const json = await req.json()
          clearTimeout(timer)
          hasHydrated.current = true

          const { docs } = json as { docs: (Post | Project)[] }

          if (docs && Array.isArray(docs)) {
            setResults(json)
            setIsLoading(false)
            if (typeof onResultChange === 'function') {
              onResultChange(json)
            }
          }
        } catch (err) {
          console.warn(err) // eslint-disable-line no-console
          setIsLoading(false)
          setError(`Unable to load "${relationTo} archive" data at this time.`)
        }
      }

      void makeRequest()
    }

    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [page, catsFromProps, relationTo, onResultChange, sort, limit, populateBy])

  return (
    <div className={[classes.collectionArchive, className].filter(Boolean).join(' ')}>
      <div className={classes.scrollRef} ref={scrollRef} />
      {!isLoading && error && <Gutter>{error}</Gutter>}
      <Fragment>
        {showPageRange !== false && (
          <Gutter>
            <div className={classes.pageRange}>
              <PageRange
                collection={relationTo}
                currentPage={results.page}
                limit={limit}
                totalDocs={results.totalDocs}
              />
            </div>
          </Gutter>
        )}
        <Gutter>
          <div className={classes.grid}>
            {results.docs?.map((result, index) => {
              return (
                <div className={classes.column} key={index}>
                  <Card doc={result} relationTo={relationTo} showCategories />
                </div>
              )
            })}
          </div>
          {results.totalPages > 1 && (
            <Pagination
              className={classes.pagination}
              onClick={setPage}
              page={results.page}
              totalPages={results.totalPages}
            />
          )}
        </Gutter>
      </Fragment>
    </div>
  )
}
