import { PropsWithChildren } from 'react'

export function Title(props: PropsWithChildren) {
  return (
    <div className="post_title_wrapper max-w-3xl">
    <h1 className="text-2xl md:text-4xl lg:text-6xl font-semibold text-slate-800 text-pretty">
      {props.children}
    </h1>
    <div></div>
    </div>
  )
}