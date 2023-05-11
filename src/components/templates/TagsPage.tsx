import Tag from "@/types/tag";
import Head from "next/head";
import React from "react"
import styled from "styled-components";
import Link from "next/link";

type Props = {
	children?: JSX.Element[],
  tags: Tag[];
}

const TagsPageBox = styled.div`
  .tags-title {
    margin-bottom: 20px;
    font-family: 'Bebas Neue','Do Hyeon', cursive;
    font-size: 48px;
    opacity: 0;
    animation: appearTags 1s forwards;
  }

  .tags-list {
    display: flex;
    flex-wrap : wrap;
    opacity: 0;
    animation: appearTags 1s 0.1s forwards;
  }

  .tag {
    margin-right: 10px;
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

  @keyframes appearTags {
    0% {
      transform: translateX(-30px);
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`

const TagsPage = ({ tags } : Props) => {
  return (
    <>
      <TagsPageBox>
        <h2 className="tags-title">
          Tags
        </h2>
        <section className="tags-list-wrapper">
          <ul className="tags-list">
            {
              tags.map(({tagName, quantity}) => {
                return (
                  <li className='tag' key={tagName}>
                    <Link href={`/tags/${tagName}`}>
                      <p>{tagName}<em>({quantity})</em></p>
                    </Link>
                  </li>
                )
              })
            }
          </ul>
        </section>
      </TagsPageBox>
    </>
  )
}

export default TagsPage;