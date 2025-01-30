import React from "react";
import { IComment } from "../libs/definitions"
import { SubmitHandler, useForm } from "react-hook-form";
import { commentsService } from "../services/comments.service";
import { useMutation } from "@tanstack/react-query";
import { useRouteContext } from "@tanstack/react-router";

interface Props {
  data: IComment[];
  profileId: string;
  postId: string;
  canSend: boolean;
}

export const Comments: React.FC<Props> = ({ data, canSend, profileId, postId }) => {
  const context = useRouteContext({ from: '/$postId' })
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<{ text: string }>()

  const mutation = useMutation({
    mutationFn: (data: any) => commentsService.createOne(data),
    onSuccess: () => context.queryClient.invalidateQueries({ queryKey: [`post-${postId}`] }),
  })

  const onSubmit: SubmitHandler<{ text: string }> = ({ text }) => {
    mutation.mutate({ text, postId, profileId });
    reset();
  }

  return (
    <section className='pt-3 border-t border-accent'>
      <h6 className='font-semibold text-2xl text-primary'>Comments ({data.length})</h6>
      {canSend && (
        <form className="my-6" onSubmit={handleSubmit(onSubmit)}>
          <input
            placeholder='What do you think?'
            className='block mb-1 h-12 w-full rounded border border-primary px-3' 
            {...register("text", { required: true, minLength: 6 })}
          />
          {errors.text && <span className='text-red-500 mb-1'>This field is required (min length = 6)</span>}
          <input
            className='mt-4 w-full cursor-pointer bg-accent text-white px-3 py-2 rounded hover:opacity-[75%]' 
            type="submit"
            value={"Send"}
          />
        </form>
      )}
      <ul>
        {data.map((v) => {
          const authorName = `${v.profile.firstName} ${v.profile.lastName}`
          const publishedAt = new Date(v.createdAt).toLocaleDateString('en-UK', {
            year: 'numeric',
            month: '2-digit',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          });

          return (
            <li key={v.id} className="mt-5 border border-secondary rounded px-5 py-3">
              <div className="flex justify-between gap-3 font-semibold text-md">
                <span>{authorName}</span>
                <span>{publishedAt}</span>
              </div>
              <p className="mt-2 font-bold text-xl text-primary">{v.text}</p>
            </li>
          )
        })}
      </ul>
    </section>
  )
}