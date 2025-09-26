/* eslint-disable react/display-name */
import { useMemo } from 'react'
import { getMDXComponent } from 'mdx-bundler/client'
import Image from './image'
import CustomLink from './link'
import TOCInline from './TOCInline'
import Pre from './Pre'

export const MDXComponents = {
  Image,
  TOCInline,
  a: CustomLink,
  pre: Pre,
  wrapper: ({ components, layout, ...rest }) => {
    const Layout = require(`../layouts/${layout}`).default
    return <Layout {...rest} />
  },
}

export const Mdx = ({ code, components, ...rest }) => {
  const MDXLayout = useMemo(() => getMDXComponent(code), [code])

  return <MDXLayout components={{ ...MDXComponents, ...components }} {...rest} />
}
