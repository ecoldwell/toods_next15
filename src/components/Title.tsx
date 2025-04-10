import { PropsWithChildren } from 'react'

export function Title(props: PropsWithChildren) {
  return (
    <div className="post_title_wrapper max-w-3xl">
    <h1 className="post_title">
      {props.children}
    </h1>
    </div>
  )
}