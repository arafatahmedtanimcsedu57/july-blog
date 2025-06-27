import fs from 'fs'
import path from 'path'
import payload from 'payload'

import { home } from '../seed/home'
import { image1 } from '../seed/image-1'
import { image2 } from '../seed/image-2'
import { imageSpheres } from '../seed/image-spheres'
import { post1 } from '../seed/post-1'
import { post2 } from '../seed/post-2'
import { post3 } from '../seed/post-3'
import { postFinance3, postFinanceBuildings, postFinanceStocks } from '../seed/post-finance-images'
import { postNews2, postNewsDest, postNewsHope } from '../seed/post-news-images'
import { postTech1, postTechAi, postTechIot, postTechQuant } from '../seed/post-tech-images'
import { postsPage } from '../seed/posts-page'
import { project1 } from '../seed/project-1'
import { project2 } from '../seed/project-2'
import { project3 } from '../seed/project-3'
import { projectDesign, projectDesign2, projectDesign3 } from '../seed/project-design-images'
import { projectEng, projectEng2, projectEng3, projectEng4 } from '../seed/project-eng-images'
import {
  projectSoftware,
  projectSoftware2,
  projectSoftware3,
  projectSoftware4,
} from '../seed/project-software-images'
import { projectsPage } from '../seed/projects-page'
import { adminEmail, adminPassword } from './shared'

const collections = [
  'categories',
  'media',
  'pages',
  'posts',
  'projects',
  'comments',
  'users',
  'redirects',
]
const globals = ['header', 'settings', 'footer']

export async function seed(): Promise<void> {
  try {
    payload.logger.info(`Seeding database...`)

    await clearDB()
    await seedDB()
    payload.logger.info(`Seed Complete.`)
  } catch (error: unknown) {
    console.error(error)
    payload.logger.error('Error seeding database.')
  }
}

export async function reset(): Promise<void> {
  try {
    payload.logger.info(`Resetting database...`)

    await clearDB()
    await seedDB()
    payload.logger.info(`Reset Complete.`)
  } catch (error: unknown) {
    console.error(error)
    payload.logger.error('Error resetting database.')
  }
}

export const clearDB = async (): Promise<void> => {
  payload.logger.info(`— Clearing media...`)

  const mediaDir = path.resolve(process.cwd(), '../../../media')
  if (fs.existsSync(mediaDir)) {
    fs.rmSync(path.resolve(__dirname, '../../../media'), { recursive: true })
  }

  payload.logger.info(`— Clearing collections and globals...`)
  await Promise.all(
    collections.map(async (collection) => {
      try {
        await payload.delete({
          collection: collection as 'media',
          where: {},
        })
      } catch (error: unknown) {
        console.error(`Error deleting collection ${collection}:`, error)
        throw error
      }
    }),
    globals.map(async (global) => {
      try {
        await payload.updateGlobal({
          data: {},
          slug: global as 'header',
        })
      } catch (error: unknown) {
        console.error(`Error updating global ${global}:`, error)
        throw error
      }
    }),
  )
}

export async function seedDB(): Promise<void> {
  payload.logger.info(`— Seeding demo author and user...`)

  const [{ id: demoAuthorID }, { id: demoUserID }] = await Promise.all([
    payload.create({
      collection: 'users',
      data: {
        name: 'Demo Author',
        email: adminEmail,
        password: adminPassword,
        roles: ['admin'],
      },
    }),
    payload.create({
      collection: 'users',
      data: {
        name: 'Demo User',
        email: 'demo-user@payloadcms.com',
        password: 'password',
        roles: ['user'],
      },
    }),
  ])

  payload.logger.info(`— Seeding media...`)

  const [
    image1Doc,
    image2Doc,
    imageSpheresDoc,
    postImage1Doc,
    postTechAi1Doc,
    postTechIot1Doc,
    postTechQuant1Doc,
    postImage2Doc,
    postNewsHope2Doc,
    postNewsDest2Doc,
    postImage3Doc,
    postFinanceStocks3Doc,
    postFinanceBuildings3Doc,
    projectDesignDoc,
    projectDesign2Doc,
    projectDesign3Doc,
    projectSoftwareDoc,
    projectSoftware2Doc,
    projectSoftware3Doc,
    projectSoftware4Doc,
    projectEngDoc,
    projectEng2Doc,
    projectEng3Doc,
    projectEng4Doc,
  ] = await Promise.all([
    payload.create({
      collection: 'media',
      data: image1,
      filePath: path.resolve(__dirname, 'image-1.jpg'),
    }),
    payload.create({
      collection: 'media',
      data: image2,
      filePath: path.resolve(__dirname, 'image-2.jpg'),
    }),
    payload.create({
      collection: 'media',
      data: imageSpheres,
      filePath: path.resolve(__dirname, 'image-spheres.jpg'),
    }),
    payload.create({
      collection: 'media',
      data: postTech1,
      filePath: path.resolve(__dirname, 'post-tech-1.jpg'),
    }),
    payload.create({
      collection: 'media',
      data: postTechAi,
      filePath: path.resolve(__dirname, 'post-ai-1.jpg'),
    }),
    payload.create({
      collection: 'media',
      data: postTechIot,
      filePath: path.resolve(__dirname, 'post-iot-1.jpg'),
    }),
    payload.create({
      collection: 'media',
      data: postTechQuant,
      filePath: path.resolve(__dirname, 'post-quant-1.jpg'),
    }),
    payload.create({
      collection: 'media',
      data: postNews2,
      filePath: path.resolve(__dirname, 'post-news-2.jpg'),
    }),
    payload.create({
      collection: 'media',
      data: postNewsHope,
      filePath: path.resolve(__dirname, 'post-hope-2.jpg'),
    }),
    payload.create({
      collection: 'media',
      data: postNewsDest,
      filePath: path.resolve(__dirname, 'post-destination-2.jpg'),
    }),
    payload.create({
      collection: 'media',
      data: postFinance3,
      filePath: path.resolve(__dirname, 'post-finance-3.jpg'),
    }),
    payload.create({
      collection: 'media',
      data: postFinanceStocks,
      filePath: path.resolve(__dirname, 'post-stocks-3.jpg'),
    }),
    payload.create({
      collection: 'media',
      data: postFinanceBuildings,
      filePath: path.resolve(__dirname, 'post-buildings-3.jpg'),
    }),
    payload.create({
      collection: 'media',
      data: projectDesign,
      filePath: path.resolve(__dirname, 'project-design.jpg'),
    }),
    payload.create({
      collection: 'media',
      data: projectDesign2,
      filePath: path.resolve(__dirname, 'project-design-2.jpg'),
    }),
    payload.create({
      collection: 'media',
      data: projectDesign3,
      filePath: path.resolve(__dirname, 'project-design-3.jpg'),
    }),
    payload.create({
      collection: 'media',
      data: projectSoftware,
      filePath: path.resolve(__dirname, 'project-software-1.jpg'),
    }),
    payload.create({
      collection: 'media',
      data: projectSoftware2,
      filePath: path.resolve(__dirname, 'project-software-2.jpg'),
    }),
    payload.create({
      collection: 'media',
      data: projectSoftware3,
      filePath: path.resolve(__dirname, 'project-software-3.jpg'),
    }),
    payload.create({
      collection: 'media',
      data: projectSoftware4,
      filePath: path.resolve(__dirname, 'project-software-4.jpg'),
    }),
    payload.create({
      collection: 'media',
      data: projectEng,
      filePath: path.resolve(__dirname, 'project-eng-1.jpg'),
    }),
    payload.create({
      collection: 'media',
      data: projectEng2,
      filePath: path.resolve(__dirname, 'project-eng-2.jpg'),
    }),
    payload.create({
      collection: 'media',
      data: projectEng3,
      filePath: path.resolve(__dirname, 'project-eng-3.jpg'),
    }),
    payload.create({
      collection: 'media',
      data: projectEng4,
      filePath: path.resolve(__dirname, 'project-eng-4.jpg'),
    }),
  ])

  payload.logger.info(`— Seeding categories...`)

  const [
    technologyCategory,
    newsCategory,
    financeCategory,
    designCat,
    softwareCat,
    engineeringCat,
  ] = await Promise.all([
    payload.create({
      collection: 'categories',
      data: {
        title: 'Technology',
      },
    }),
    payload.create({
      collection: 'categories',
      data: {
        title: 'News',
      },
    }),
    payload.create({
      collection: 'categories',
      data: {
        title: 'Finance',
      },
    }),
    payload.create({
      collection: 'categories',
      data: {
        title: 'Design',
      },
    }),
    payload.create({
      collection: 'categories',
      data: {
        title: 'Software',
      },
    }),
    payload.create({
      collection: 'categories',
      data: {
        title: 'Engineering',
      },
    }),
  ])

  payload.logger.info(`— Seeding posts...`)

  // Do not create posts with `Promise.all` because we want the posts to be created in order
  // This way we can sort them by `createdAt` or `publishedOn` and they will be in the expected order
  const post1Doc = await payload.create({
    collection: 'posts',
    data: JSON.parse(
      JSON.stringify({ ...post1, categories: [technologyCategory.id] })
        .replace(/\{\{IMAGE-1\}\}/g, postImage1Doc?.id?.toString())
        .replace(/\{\{IMAGE-2\}\}/g, postTechAi1Doc?.id?.toString())
        .replace(/\{\{IMAGE-3\}\}/g, postTechIot1Doc?.id?.toString())
        .replace(/\{\{IMAGE-4\}\}/g, postTechQuant1Doc?.id?.toString())
        .replace(/\{\{AUTHOR\}\}/g, demoAuthorID.toString()),
    ),
  })

  const post2Doc = await payload.create({
    collection: 'posts',
    data: JSON.parse(
      JSON.stringify({ ...post2, categories: [newsCategory.id] })
        .replace(/\{\{IMAGE-1\}\}/g, postImage2Doc?.id?.toString())
        .replace(/\{\{IMAGE-2\}\}/g, postNewsHope2Doc?.id?.toString())
        .replace(/\{\{IMAGE-3\}\}/g, postNewsDest2Doc?.id?.toString())
        .replace(/\{\{AUTHOR\}\}/g, demoAuthorID.toString()),
    ),
  })

  const post3Doc = await payload.create({
    collection: 'posts',
    data: JSON.parse(
      JSON.stringify({ ...post3, categories: [financeCategory.id] })
        .replace(/\{\{IMAGE-1\}\}/g, postImage3Doc?.id?.toString())
        .replace(/\{\{IMAGE-2\}\}/g, postFinanceStocks3Doc?.id?.toString())
        .replace(/\{\{IMAGE-3\}\}/g, postFinanceBuildings3Doc?.id?.toString())
        .replace(/\{\{AUTHOR\}\}/g, demoAuthorID.toString()),
    ),
  })

  const posts = [post1Doc, post2Doc, post3Doc]

  // update each post with related posts

  await Promise.all([
    payload.update({
      id: post1Doc.id.toString(),
      collection: 'posts',
      data: {
        relatedPosts: [post2Doc.id.toString(), post3Doc.id.toString()],
      },
    }),
    payload.update({
      id: post2Doc.id.toString(),
      collection: 'posts',
      data: {
        relatedPosts: [post1Doc.id.toString(), post3Doc.id.toString()],
      },
    }),
    payload.update({
      id: post3Doc.id.toString(),
      collection: 'posts',
      data: {
        relatedPosts: [post1Doc.id.toString(), post2Doc.id.toString()],
      },
    }),
  ])

  payload.logger.info(`— Seeding comments...`)

  await Promise.all(
    posts.map(
      async (post) =>
        await payload.create({
          collection: 'comments',
          data: {
            _status: 'published',
            comment: `This is a comment on post: ${post.title}. It has been approved by an admin and is now visible to the public. You can leave your own comment on this post using the form below.`,
            doc: String(post.id),
            user: String(demoUserID),
          },
        }),
    ),
  )

  payload.logger.info(`— Seeding projects...`)

  // Do not create posts with `Promise.all` because we want the posts to be created in order
  // This way we can sort them by `createdAt` or `publishedOn` and they will be in the expected order
  const project1Doc = await payload.create({
    collection: 'projects',
    data: JSON.parse(
      JSON.stringify({ ...project1, categories: [designCat.id] })
        .replace(/\{\{IMAGE\}\}/g, projectDesignDoc?.id?.toString())
        .replace(/\{\{IMAGE-2\}\}/g, projectDesign2Doc?.id?.toString())
        .replace(/\{\{IMAGE-3\}\}/g, projectDesign3Doc?.id?.toString())
        .replace(/\{\{IMAGE-SPHERE\}\}/g, imageSpheresDoc?.id?.toString()),
    ),
  })

  const project2Doc = await payload.create({
    collection: 'projects',
    data: JSON.parse(
      JSON.stringify({ ...project2, categories: [softwareCat.id] })
        .replace(/\{\{IMAGE-1\}\}/g, projectSoftwareDoc?.id?.toString())
        .replace(/\{\{IMAGE-2\}\}/g, projectSoftware2Doc?.id?.toString())
        .replace(/\{\{IMAGE-3\}\}/g, projectSoftware3Doc?.id?.toString())
        .replace(/\{\{IMAGE-4\}\}/g, projectSoftware4Doc?.id?.toString()),
    ),
  })

  const project3Doc = await payload.create({
    collection: 'projects',
    data: JSON.parse(
      JSON.stringify({ ...project3, categories: [engineeringCat.id] })
        .replace(/\{\{IMAGE-1\}\}/g, projectEngDoc?.id?.toString())
        .replace(/\{\{IMAGE-2\}\}/g, projectEng2Doc?.id?.toString())
        .replace(/\{\{IMAGE-3\}\}/g, projectEng3Doc?.id?.toString())
        .replace(/\{\{IMAGE-4\}\}/g, projectEng4Doc?.id?.toString()),
    ),
  })

  // update each project with related projects

  await Promise.all([
    payload.update({
      id: project1Doc.id.toString(),
      collection: 'projects',
      data: {
        relatedProjects: [project2Doc.id.toString(), project3Doc.id.toString()],
      },
    }),
    payload.update({
      id: project2Doc.id.toString(),
      collection: 'projects',
      data: {
        relatedProjects: [project1Doc.id.toString(), project3Doc.id.toString()],
      },
    }),
    payload.update({
      id: project3Doc.id.toString(),
      collection: 'projects',
      data: {
        relatedProjects: [project1Doc.id.toString(), project2Doc.id.toString()],
      },
    }),
  ])

  payload.logger.info(`— Seeding posts page...`)

  const { id: postsPageID } = await payload.create({
    collection: 'pages',
    data: JSON.parse(
      JSON.stringify(postsPage).replace(/\{\{IMAGE\}\}/g, image1Doc?.id?.toString()),
    ),
  })

  payload.logger.info(`— Seeding projects page...`)

  const { id: projectsPageID } = await payload.create({
    collection: 'pages',
    data: JSON.parse(
      JSON.stringify(projectsPage).replace(/\{\{IMAGE\}\}/g, image1Doc?.id?.toString()),
    ),
  })

  payload.logger.info(`— Seeding home page...`)

  await payload.create({
    collection: 'pages',
    data: JSON.parse(
      JSON.stringify(home)
        .replace(/\{\{IMAGE_1\}\}/g, image1Doc?.id?.toString())
        .replace(/\{\{IMAGE_2\}\}/g, image2Doc?.id?.toString())
        .replace(/\{\{POSTS_PAGE_ID\}\}/g, postsPageID.toString())
        .replace(/\{\{PROJECTS_PAGE_ID\}\}/g, projectsPageID.toString()),
    ),
  })

  payload.logger.info(`— Seeding settings...`)

  await payload.updateGlobal({
    slug: 'settings',
    data: {
      postsPage: postsPageID.toString(),
      projectsPage: projectsPageID.toString(),
    },
  })
}
