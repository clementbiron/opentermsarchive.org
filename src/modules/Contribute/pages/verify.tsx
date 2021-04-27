import VerifyForm, { VerifyFormValues } from '../components/VerifyForm';

import Breadcrumb from 'components/BreadCrumb';
// import { CreateHashtagResponse } from 'modules/Common/interfaces';
// import LastHashtags from '../data-components/LastHashtags';
import Layout from 'modules/Embassy/components/Layout';
import React from 'react';
import axios from 'axios';
import s from './verify.module.scss';
import { useRouter } from 'next/router';
import { useToggle } from 'react-use';
// import api from 'utils/api';
import useUrl from 'hooks/useUrl';

const DOCUMENT_TYPES_URL =
  'https://raw.githubusercontent.com/ambanum/OpenTermsArchive/master/scripts/rewrite/renamer/rules/documentTypes.json';
const EMAIL_SUPPORT = 'martinratinaud@gmail.com';

interface Json {
  name: string;
  documents: {
    [key: string]: {
      fetch: string;
      select: string[];
      remove?: string[];
    };
  };
}

const VerifyPage = ({ documentTypes }: { documentTypes: any }) => {
  const router = useRouter();
  const {
    queryParams: {
      url,
      selectedCss: initialSelectedCss,
      removedCss: initialRemovedCss,
      name: initialName,
      documentType: initialDocumentType,
    },
    pushQueryParams,
  } = useUrl();
  const [showJson, toggleJson] = useToggle(false);
  const [json, setJson] = React.useState<Json>({
    name: initialName,
    documents: {
      [initialDocumentType || '???']: {
        fetch: url,
        select: initialSelectedCss,
        remove: initialRemovedCss,
      },
    },
  });
  const onSubmit = ({ name, documentType, email, ...rest }: VerifyFormValues) => {
    const newUrl = pushQueryParams({ name, documentType });
    setJson({
      name,
      documents: {
        [documentType]: rest,
      },
    });
    const subject = 'Here is a new service to track in Open Terms Archive';
    const body = `Hi,

I need you to track "${documentType}" of "${name}" for me.

Here is the url ${window.location.origin}${newUrl}

Thank you very much`;

    window.open(
      `mailto:${EMAIL_SUPPORT}?subject=${subject}&body=${encodeURIComponent(body)}`,
      '_blank'
    );

    router.push('/contribute/thanks');
  };

  const defaultValues: VerifyFormValues = {
    name: initialName,
    documentType: initialDocumentType,
    fetch: url,
    select: initialSelectedCss,
    remove: initialRemovedCss,
    email: '',
  };

  return (
    <Layout title="Contributing to Open Terms Archive">
      <div className="rf-container rf-mb-12w">
        <div className="rf-grid-row">
          <div className="rf-col">
            <h1 className="text-center rf-mb-1w">
              Contributing to Open Terms Archive
              <sup>
                <span
                  style={{
                    background: 'var(--rm500)',
                    color: 'white',
                    fontWeight: 'bold',
                  }}
                  className="rf-tag rf-tag--sm"
                >
                  BETA
                </span>
              </sup>
            </h1>
            <Breadcrumb
              className={s.breadcrumb}
              items={[
                { name: 'Open Terms Archive', url: 'https://www.opentermsarchive.org' },
                { name: 'Add a document', url: '/contribute' },
                { name: 'Verify informations' },
              ]}
            />
            <VerifyForm
              defaultValues={defaultValues}
              documentTypes={documentTypes}
              onSubmit={onSubmit}
            />
            <br />
            <br />
            <br />
            <br />
            <br />
            <button className="rf-btn rf-btn--sm rf-btn--secondary" onClick={toggleJson}>
              Show Json file (expert mode)
            </button>

            {showJson && (
              <textarea
                style={{
                  width: '800px',
                  maxWidth: '100%',
                  height: '300px',
                  overflow: 'auto',
                  padding: '10px',
                }}
              >
                {JSON.stringify(json, null, 2)}
              </textarea>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticProps() {
  const { data: documentTypes } = await axios.get(DOCUMENT_TYPES_URL);

  return {
    props: { documentTypes: [...new Set(Object.values(documentTypes))].sort() },
  };
}

export default VerifyPage;
