import { FiChevronDown } from 'react-icons/fi';
import React from 'react';
import classNames from 'classnames';
import useSWR from 'swr';
import { useTranslation } from 'next-i18next';

type SelectServiceProps = {
  serviceProps: any;
  documentTypeProps: any;
  service: string;
  documentType: string;
  defaultServices: any;
} & React.HTMLAttributes<HTMLDivElement>;

// https://github.com/ambanum/OpenTermsArchive.org/issues/21
const dmaActors = [
  'Amazon.com',
  'Apple',
  'Facebook',
  'Google',
  'Gmail',
  'Instagram',
  'Spotify',
  'TikTok',
  'WhatsApp',
  'YouTube',
];

const SelectService: React.FC<SelectServiceProps> = React.memo(
  ({
    serviceProps,
    documentTypeProps,
    service: selectedService,
    documentType: selectedDocumentType,
    defaultServices,
  }) => {
    const { t } = useTranslation('common');
    const { data } = useSWR('/api/ota/services', {
      initialData: defaultServices,
      revalidateOnMount: true,
    });

    const services = data
      ? // sort services with insensitive case
        Object.keys(data).sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' }))
      : [];
    const documentTypes: string[] = data ? data[selectedService] || [] : [];

    const loading = !data;

    const dmaServices = services.filter((service) => dmaActors.includes(service));
    const otherServices = services.filter((service) => !dmaActors.includes(service));

    return (
      <>
        <div className={classNames('formfield')}>
          <label htmlFor="services">
            {t('common:subscribe_form.fields.service.label', 'Select a service')}
          </label>
          <div className={classNames('select')}>
            {
              // This is done in order for default values to be selected correctly
              // if the options are not present at init, it will never be selected
              loading ? (
                <select key="select_service_disabled" disabled />
              ) : (
                <select
                  key="select_service"
                  id="services"
                  defaultValue={selectedService}
                  {...serviceProps}
                >
                  <option value="">
                    {t('common:subscribe_form.fields.service.default', 'Select...')}
                  </option>
                  <optgroup>
                    {dmaServices.map((service) => (
                      <option
                        key={`${selectedService}_${service}`}
                        value={service}
                        selected={service === selectedService}
                      >
                        {service}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup>
                    {otherServices.map((service) => (
                      <option
                        key={`${selectedService}_${service}`}
                        value={service}
                        selected={service === selectedService}
                      >
                        {service}
                      </option>
                    ))}
                  </optgroup>
                </select>
              )
            }
            <FiChevronDown color="#333333"></FiChevronDown>
          </div>
        </div>
        <div className={classNames('formfield')}>
          <label htmlFor="documentTypes">
            {t('common:subscribe_form.fields.document.label', 'Select a document type')}
          </label>
          <div className={classNames('select')}>
            {
              // This is done in order for default values to be selected correctly
              // if the options are not present at init, it will never be selected
              loading ? (
                <select key="select_documentTypes_disabled" disabled />
              ) : (
                <select
                  key={`select_documentTypes`}
                  id="documentTypes"
                  defaultValue={selectedDocumentType}
                  {...documentTypeProps}
                >
                  <option value="">
                    {t('common:subscribe_form.fields.document.default', 'Select...')}
                  </option>
                  {documentTypes.map((documentType) => (
                    <option key={`${selectedService}_${documentType}`} value={documentType}>
                      {documentType}
                    </option>
                  ))}
                </select>
              )
            }
            <FiChevronDown color="#333333"></FiChevronDown>
          </div>
        </div>
      </>
    );
  }
);

export default SelectService;