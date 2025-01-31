import React from "react";
import { Link } from "@tanstack/react-router"

import ArrowImg from '../assets/icons/arrow.svg';
import { IPost } from "../libs/definitions";

export const PreviewPost: React.FC<IPost> = ({
  id,
  createdAt,
  previewSrc,
  title,
  body,
  profile
 }) => {
  const publishedAt = new Date(createdAt).toLocaleDateString('en-UK', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Link to="/$postId" params={{ postId: id }}>
      <figure className="pb-3 border-b border-transparent hover:border-accent">
        <img className='max-h-60 min-h-60 w-full object-cover' src={previewSrc} alt='' />
        <figcaption className='mt-[32px]'>
          <p className='mb-3 text-sm text-accent font-semibold'>
            {profile.firstName} {profile.lastName} &#x2022; {publishedAt}
          </p>
          <h2 className='flex gap-4 justify-between'>
            <span className='text-2xl font-semibold line-clamp-1'>{title}</span>
            <img className='size-6' src={ArrowImg} alt='' />
          </h2>
          <div className='mt-3 text-secondary line-clamp-2' dangerouslySetInnerHTML={{ __html: body }} />
        </figcaption>
      </figure>
    </Link>
  )
}