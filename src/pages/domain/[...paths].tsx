import type { GetStaticPaths, GetStaticPathsResult, GetStaticProps } from 'next';
import { WithMdxResult, getI18nContentFilePaths, loadMdxFile } from 'modules/I18n/hoc/withMdx';

import Button from 'modules/Common/components/Button';
import Container from 'modules/Common/containers/Container';
import Contributors from 'modules/OTA-api/data-components/Contributors';
import Layout from 'modules/Common/containers/Layout';
import { Link } from 'modules/I18n';
import LinkIcon from 'modules/Common/components/LinkIcon';
import { MDXRemote } from 'next-mdx-remote';
import React from 'react';
import TextContent from 'modules/Common/components/TextContent';
import ThumbGallery from 'modules/Common/components/ThumbGallery';
import ThumbGalleryItem from 'modules/Common/components/ThumbGalleryItem';
import useTranslation from 'next-translate/useTranslation';

const STATIC_PAGES_PATH = 'pages';

export default function CaseStudyPage({ mdxContent }: WithMdxResult) {
  const { frontmatter = {} } = mdxContent || {};
  const { t } = useTranslation();
  
  
  return (
    <Layout
      title={frontmatter['html_title'] ?? frontmatter['title'] ?? frontmatter['hero.title']}
      desc={frontmatter['html_description']}
    >
      <Container
        gridCols={frontmatter['grid.cols'] || 8}
        gridGutters={frontmatter['grid.gutters'] || 7}
      >
        <p className='mb__2XL color__light font-style__italic'>
          {t('domain:impact-model-reminder')} <Link href="/impact">{t('domain:impact-model-link')}</Link>
        </p>
        <TextContent>
          <h2>{frontmatter.title}</h2>
          {mdxContent && (
            <MDXRemote
              {...mdxContent}
              components={{
                Button,
                LinkIcon,
                Contributors,
                Link,
                ThumbGallery,
                ThumbGalleryItem,
              }}
            />
          )}
        </TextContent>
      </Container>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  return {
    paths: (locales || []).reduce(
      (acc, locale) => [
        ...acc,
        ...getI18nContentFilePaths(STATIC_PAGES_PATH, locale, {
          subfolder: 'domain',
          extension: false,
        }).files.map((filename) => ({
          params: {
            paths: [filename.replace('domain/', '')],
          },
          locale,
        })),
      ],
      [] as GetStaticPathsResult['paths']
    ),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async (props) => {
  const mdxFile = await loadMdxFile(
    {
      filename: `domain/${(props?.params?.paths as string[]).join('/')}`,
      folder: STATIC_PAGES_PATH,
    },
    props.locale
  );

  if (!mdxFile) {
    return { notFound: true };
  }

  return { props: { mdxContent: mdxFile } };
};
