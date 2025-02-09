import React from 'react';
import '@/styles/globals.css';
import { AppProps as NextAppProps } from 'next/app';

import { ContentfulLivePreviewProvider } from '@contentful/live-preview/react';
import { ThirdPartyScripts } from '@/components/ThirdPartyScripts';
import { TypePage } from '@/types/TypePage';
import { TypeConfig } from '@/types/TypeConfig';

type AppProps<P = unknown> = {
  pageProps: P;
} & Omit<NextAppProps<P>, 'pageProps'>;

// FIXME: Re-export this type from utils-contentful
// type Audience = {
//   name: string;
//   description?: string | undefined;
//   id: string;
// };

interface CustomPageProps {
  page: TypePage<'WITHOUT_UNRESOLVABLE_LINKS'>;
  config: TypeConfig<'WITHOUT_UNRESOLVABLE_LINKS'>;
  // ninetailed?: {
  //   preview: {
  //     allExperiences: ExperienceConfiguration[];
  //     allAudiences: Audience[];
  //   };
  // };
}

const B2BDemoApp = ({ Component, pageProps }: AppProps<CustomPageProps>) => {
  return (
    <div className="app">
      <ContentfulLivePreviewProvider locale="en-US">
        <ThirdPartyScripts />
        <Component {...pageProps} />
      </ContentfulLivePreviewProvider>
    </div>
  );
};

export default B2BDemoApp;
