import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import BlogPostCard from './BlogPostCard'
import BlogPostListEmpty from './BlogPostListEmpty'
import PaginationSimple from './PaginationSimple'
import CONFIG from '../config'



/**
 * 文章列表分页表格
 * @param page 当前页
 * @param posts 所有文章
 * @param tags 所有标签
 * @returns {JSX.Element}
 * @constructor
 */
const BlogPostListPage = ({ page = 1, posts = [], postCount }) => {
  const { NOTION_CONFIG } = useGlobal()
  const POSTS_PER_PAGE = siteConfig('POSTS_PER_PAGE', null, NOTION_CONFIG)
  const totalPage = Math.ceil(postCount / POSTS_PER_PAGE)

  if (!posts || posts.length === 0) {
    return <BlogPostListEmpty />
  }

  return (
    <div className='w-full justify-center px-4'>
      <div id='posts-wrapper'>
        {/* 文章列表 */}
{posts
  .filter(post => !CONFIG.EXCLUDED_CATEGORIES.includes(post.category))
  .map(post => (
    <BlogPostCard key={post.id} post={post} />
))}



      </div>
      <PaginationSimple page={page} totalPage={totalPage} />
    </div>
  )
}

export default BlogPostListPage
