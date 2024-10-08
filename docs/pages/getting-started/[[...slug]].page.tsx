import type { NextPage, InferGetStaticPropsType } from "next"
import { MDXRemote } from "next-mdx-remote"
import { components } from "components/mdx"
import { PageProvider } from "contexts/page-context"
import { DocumentLayout } from "layouts/document-layout"
import { getStaticDocumentPaths, getStaticDocumentProps } from "utils/next"

export const getStaticPaths = getStaticDocumentPaths("getting-started")

export const getStaticProps = getStaticDocumentProps("getting-started")

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

const Page: NextPage<PageProps> = ({ source, ...rest }) => {
  return (
    <PageProvider {...rest}>
      <DocumentLayout {...rest}>
        {source ? <MDXRemote {...source} components={components} /> : null}
      </DocumentLayout>
    </PageProvider>
  )
}

export default Page
