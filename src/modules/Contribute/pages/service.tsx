import Drawer from 'components/Drawer';
import { GetContributeServiceResponse } from '../interfaces';
import IframeSelector from 'components/IframeSelector';
import Link from 'next/link';
import Loading from 'components/Loading';
import React from 'react';
import { Trans } from 'react-i18next';
import s from './service.module.css';
import { useEvent } from 'react-use';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { useToggle } from 'react-use';
import { useTranslation } from 'next-i18next';
import useUrl from 'hooks/useUrl';

const EMAIL_SUPPORT = 'contribute@disinfo.beta.gouv.fr';

const ServicePage = ({ documentTypes }: { documentTypes: string[] }) => {
  const router = useRouter();
  const { t } = useTranslation();
  useEvent('touchstart', () => {
    router.push('/contribute/sorry');
  });
  const {
    queryParams: {
      url,
      step: initialStep,
      selectedCss: initialSelectedCss,
      removedCss: initialRemovedCss,
      documentType: initialDocumentType,
      name: initialName,
      expertMode,
    },
    pushQueryParam,
  } = useUrl();

  const json = {
    name: initialName || '???',
    documents: {
      [initialDocumentType || '???']: {
        fetch: url,
        select: initialSelectedCss,
        remove: initialRemovedCss,
      },
    },
  };

  const [selectable, toggleSelectable] = React.useState('');
  const [iframeReady, toggleIframeReady] = useToggle(false);
  const [step, setStep] = React.useState<number>(initialStep ? +initialStep : 1);

  const selectedCss = !initialSelectedCss
    ? []
    : Array.isArray(initialSelectedCss)
    ? initialSelectedCss
    : [initialSelectedCss];

  const removedCss = !initialRemovedCss
    ? []
    : Array.isArray(initialRemovedCss)
    ? initialRemovedCss
    : [initialRemovedCss];

  // const data = { url: 'http://localhost:3000/contribute' };
  const { data } = useSWR<GetContributeServiceResponse>(`/api/contribute/services?url=${url}`, {
    initialData: {
      status: 'ko',
      message: '',
      url: '',
      error: '',
    },
    revalidateOnMount: true,
  });

  const passToStep = (newStep: number) => (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    pushQueryParam('step')(newStep);
    setStep(newStep);
  };

  const selectInIframe = (queryparam: 'selectedCss' | 'removedCss') => () => {
    toggleSelectable(queryparam);
  };

  const onSelect = React.useCallback(
    (cssPath: string) => {
      const cssRules = selectable === 'selectedCss' ? selectedCss : removedCss;

      if (!cssRules.includes(cssPath)) {
        pushQueryParam(selectable)([...cssRules, cssPath]);
      }
      toggleSelectable('');
    },
    [removedCss, selectedCss, pushQueryParam, selectable, toggleSelectable]
  );

  const onChangeCssRule = (queryparam: 'selectedCss' | 'removedCss', index: number) => (e: any) => {
    const value = e.target?.value;
    if (!value) {
      onRemoveCssRule(queryparam, index)();
      return;
    }
    const cssRules = queryparam === 'selectedCss' ? selectedCss : removedCss;
    const newCss = [...cssRules];
    newCss[index] = value;
    pushQueryParam(queryparam)(newCss);
  };

  const onRemoveCssRule = (queryparam: 'selectedCss' | 'removedCss', index: number) => () => {
    const cssRules = queryparam === 'selectedCss' ? selectedCss : removedCss;
    const newCss = [...cssRules];
    delete newCss[index];
    pushQueryParam(queryparam)(newCss);
  };

  const onInputChange = (fieldName: string) => (event: any) => {
    pushQueryParam(fieldName)(event.target.value);
  };

  const toggleExpertMode = () => {
    pushQueryParam('expertMode')(!!expertMode ? '' : 'true');
  };

  const onValidate = () => {
    const subject = 'Here is a new service to track in Open Terms Archive';
    const body = `Hi,

I need you to track "${initialDocumentType}" of "${initialName}" for me.

Here is the url ${window.location.href}&expertMode=true

Thank you very much`;

    window.open(
      `mailto:${EMAIL_SUPPORT}?subject=${subject}&body=${encodeURIComponent(body)}`,
      '_blank'
    );

    router.push('/contribute/thanks');
  };

  const onErrorClick = () => {
    const subject = 'I tried to add this service but it did not work';
    const body = `Hi,

I need you to track "${initialDocumentType}" of "${initialName}" for me but I add a failure with.

-----
${data?.error}
-----

Here is the url ${window.location.href}&expertMode=true

Thank you very much`;

    window.open(
      `mailto:${EMAIL_SUPPORT}?subject=${subject}&body=${encodeURIComponent(body)}`,
      '_blank'
    );

    router.push('/contribute/thanks');
  };

  const submitDisabled = !initialSelectedCss || !iframeReady;

  return (
    <div className={s.wrapper}>
      <Drawer className={s.drawer}>
        {step === 1 && (
          <>
            <nav>
              <Link href="/contribute">
                <a className={s.backButton}>Go back</a>
              </Link>
            </nav>
            <div>
              <h2>{t('contribute:service_page.title', 'What is expected from you')}</h2>
              <p>
                <Trans i18nKey="contribute:service_page.description1">
                  Most of the time, contractual documents contains a header, a footer, navigation
                  menus, possibly ads… We aim at tracking only{' '}
                  <strong>the significant parts of the document</strong>
                </Trans>
              </p>
              <p>
                <Trans i18nKey="contribute:service_page.description2">
                  In order to achieve that, you will have to select the part of the documents that
                  contains the relevant part and remove the insignificant parts.
                </Trans>
              </p>
            </div>
            <nav>
              <button type="button" className="rf-btn" onClick={passToStep(2)}>
                OK
              </button>
            </nav>
          </>
        )}
        {step === 2 && (
          <>
            <nav>
              <Link href="/contribute">
                <a className={s.backButton}>Go back</a>
              </Link>
              <a onClick={passToStep(1)}>Need help?</a>
            </nav>
            <div>
              <form>
                <div>
                  <h2>Step 2: defining this document</h2>
                  <h3>Type of document</h3>
                  <select
                    className="rf-input"
                    onChange={onInputChange('documentType')}
                    defaultValue={initialDocumentType}
                  >
                    <option value="">Select...</option>
                    {documentTypes.map((documentType) => (
                      <option key={documentType} value={documentType}>
                        {documentType}
                      </option>
                    ))}
                  </select>
                  <h3>Name of service</h3>
                  <input defaultValue={initialName} onChange={onInputChange('name')} />

                  <h2>Step 3: selecting significant part of the document</h2>
                  <h3>Significant part(s)</h3>
                  {selectedCss.map((selected, i) => (
                    <div key={selected} className={s.selectionItem}>
                      <input defaultValue={selected} onChange={onChangeCssRule('selectedCss', i)} />
                      <button type="button" onClick={onRemoveCssRule('selectedCss', i)}></button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={selectInIframe('selectedCss')}
                    disabled={!!selectable || !iframeReady}
                  >
                    Add part
                  </button>
                </div>
                <div>
                  <h3>Insignificant part(s)</h3>
                  {removedCss.map((selected, i) => (
                    <div key={selected} className={s.selectionItem}>
                      <input defaultValue={selected} onChange={onChangeCssRule('removedCss', i)} />
                      <button type="button" onClick={onRemoveCssRule('removedCss', i)}></button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={selectInIframe('removedCss')}
                    disabled={!!selectable || !iframeReady}
                  >
                    Remove part
                  </button>
                </div>
                {expertMode && (
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
              </form>
            </div>
            <nav>
              <a onClick={toggleExpertMode}>Expert Mode</a>
              <button type="button" disabled={submitDisabled} onClick={onValidate}>
                Validate
              </button>
            </nav>
          </>
        )}
      </Drawer>
      {data?.error && (
        <div className={s.fullPage}>
          <h1>We're sorry, an error occured</h1>
          <p>{data?.error}</p>
          <button type="button" onClick={onErrorClick}>
            Let us know
          </button>
        </div>
      )}
      {!data?.error && (
        <>
          {data?.url ? (
            <IframeSelector
              selectable={!!selectable}
              url={data.url}
              selected={selectedCss}
              removed={removedCss}
              onSelect={onSelect}
              onReady={toggleIframeReady}
            />
          ) : (
            <div className={s.fullPage}>
              <h1>We're preparing the website</h1>
              <p>It usually takes between 5s and 30s</p>
              <Loading />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ServicePage;
