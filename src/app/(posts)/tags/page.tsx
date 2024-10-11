import React from 'react'

import { Title } from '@/components/ui/Title'
import { getAllTags } from '@/apis/tag'
import { TagsList } from '@/components/post/TagsList/TagsList'

const TagsPage = () => {
  const tags = getAllTags()

  return (
    <div>
      <Title>Tags</Title>
      <TagsList tags={tags} />
    </div>
  )
}

export default TagsPage
