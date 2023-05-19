import Tag from "@/types/tag";
import React from "react"
import styled from "styled-components";
import Link from "next/link";
import { motion } from "framer-motion";
import { appearFromLeft, orchestrate } from "@/styles/framer-motions";

type Props = {
	children?: JSX.Element[],
  tags: Tag[];
}

const TagsPageBox = styled.div`
  .tags-title {
    margin-bottom: 20px;
    font-family: 'Bebas Neue','Do Hyeon', cursive;
    font-size: 48px;
  }

  .tags-list {
    display: flex;
    flex-wrap : wrap;
  }

  .tag {
    margin-right: 20px;
    margin-bottom: 20px;
    font-size: 20px;
    list-style: none;
    cursor: pointer;
    white-space:nowrap;
  }

  .tag:hover {
    text-decoration: underline;
  }

  .tag em {
    margin-left: 3px;
    font-size: 16px;
    color: #acacac;
  }
`

const TagsPage = ({ tags } : Props) => {
  return (
    <>
      <TagsPageBox>
        <motion.section
          className="tags-list-wrapper"
          variants={appearFromLeft}
          initial='hidden'
          animate='visible'
        >
          <h2 className="tags-title">
            Tags
          </h2>
          <motion.ul 
            className="tags-list"
            variants={orchestrate}
            initial='hidden'
            animate='visible'
          >
            {
              tags.map(({tagName, quantity}) => {
                return (
                  <motion.li 
                    className='tag' 
                    key={tagName}
                    variants={appearFromLeft}
                  >
                    <Link href={`/tags/${tagName}/1`}>
                      <p>{tagName}<em>({quantity})</em></p>
                    </Link>
                  </motion.li>
                )
              })
            }
          </motion.ul>
        </motion.section>
      </TagsPageBox>
    </>
  )
}

export default TagsPage;