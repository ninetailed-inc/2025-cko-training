import { useForm, SubmitHandler } from 'react-hook-form';
import classNames from 'classnames';
import type { TypeHubspotFormWithoutUnresolvableLinksResponse } from '@/types/TypeHubspotForm';

type FormValues = {
  firstname: string;
  lastname: string;
  companyname: string;
  companysize: string;
  email: string;
  ninetailedid: string;
  ninetailed_organization_id: string;
  ninetailed_environment: string;
};

export const HubspotForm = (
  hubspotForm: TypeHubspotFormWithoutUnresolvableLinksResponse
) => {
  const { fields } = hubspotForm;

  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitSuccessful, isSubmitting, errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      await fetch(
        `https://api.hsforms.com/submissions/v3/integration/submit/${fields.hubspotPortalId}/${fields.hubspotFormId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fields: [
              {
                objectTypeId: '0-1',
                name: 'firstname',
                value: data.firstname,
              },
              {
                objectTypeId: '0-1',
                name: 'lastname',
                value: data.lastname,
              },
              {
                objectTypeId: '0-2',
                name: 'name',
                value: data.companyname,
              },
              {
                objectTypeId: '0-1',
                name: 'companysize',
                value: data.companysize,
              },
              {
                objectTypeId: '0-1',
                name: 'email',
                value: data.email,
              },
              {
                objectTypeId: '0-1',
                name: 'ninetailedid',
                value: data.ninetailedid,
              },
              {
                objectTypeId: '0-1',
                name: 'ninetailed_organization_id',
                value: data.ninetailed_organization_id,
              },
              {
                objectTypeId: '0-1',
                name: 'ninetailed_environment',
                value: data.ninetailed_environment,
              },
            ],
          }),
        }
      );
      const {
        // eslint-disable-next-line
        ninetailedid,
        // eslint-disable-next-line
        ninetailed_organization_id,
        // eslint-disable-next-line
        ninetailed_environment,
        ...traitData
      } = data;
    } catch (e) {
      setError('root.submissionError', {
        message: 'Submission error, see console',
      });
      console.error(e);
    }
  };

  return (
    <div className="mx-auto max-w-md -mt-10 px-4 sm:max-w-3xl sm:px-6 lg:px-12 lg:max-w-7xl mb-10 lg:mb-20">
      {isSubmitSuccessful && (
        <p className="p-2 w-full text-center bg-green-200 rounded border-green-400 border-2">
          Thanks for your submission!
        </p>
      )}
      {errors.root?.submissionError && (
        <p className="p-2 mb-10 w-full text-center bg-red-200 rounded border-red-400 border-2">
          {errors.root.submissionError.message}
        </p>
      )}
      {!isSubmitSuccessful && (
        <form
          id="contactForm"
          name="contactForm"
          onSubmit={(...args) => void handleSubmit(onSubmit)(...args)}
          className="flex flex-col space-y-4 items-start"
        >
          <fieldset className="flex flex-row w-full gap-4 flex-wrap">
            <div className="flex flex-col flex-1">
              <label htmlFor="firstname" className="text-sm font-bold">
                First Name
              </label>
              <input
                id="firstname"
                className="border-2 h-10 px-3 rounded focus:outline-amber-500 border-indigo-300"
                {...register('firstname', { required: true })}
              />
              {errors.firstname && (
                <p className="text-orange-500 text-sm">
                  First name is required.
                </p>
              )}
            </div>
            <div className="flex flex-col flex-1">
              <label htmlFor="lastname" className="text-sm font-bold">
                Last Name
              </label>
              <input
                id="lastname"
                className="border-2 h-10 px-3 rounded focus:outline-amber-500 border-indigo-300"
                {...register('lastname', { required: true })}
              />
              {errors.lastname && (
                <p className="text-orange-500 text-sm">
                  Last name is required.
                </p>
              )}
            </div>
          </fieldset>
          <fieldset className="flex flex-col w-full">
            <label htmlFor="companyname" className="text-sm font-bold">
              Company Name
            </label>
            <input
              id="companyname"
              className="border-2 h-10 px-3 rounded focus:outline-amber-500 border-indigo-300"
              {...register('companyname', { required: true })}
            />
            {errors.companyname && (
              <p className="text-orange-500 text-sm">
                Company name is required.
              </p>
            )}
          </fieldset>
          <fieldset className="flex flex-col w-full">
            <label htmlFor="companysize" className="text-sm font-bold">
              Company Size
            </label>
            <select
              id="companysize"
              className="border-2 h-10 px-3 rounded focus:outline-amber-500 border-indigo-300"
              {...register('companysize', { required: true })}
              defaultValue=""
            >
              <option disabled value="">
                Please Select
              </option>
              <option value="1-50">1-50</option>
              <option value="51-200">51-200</option>
              <option value="201-500">201-500</option>
              <option value="501-1000">501-1000</option>
              <option value="1001-2000">1001-2000</option>
              <option value="more_than_2000">More than 2000</option>
            </select>
            {errors.companysize && (
              <p className="text-orange-500 text-sm">
                Company size is required.
              </p>
            )}
          </fieldset>
          <fieldset className="flex flex-col w-full">
            <label htmlFor="email" className="text-sm font-bold">
              Business Email
            </label>
            <input
              id="email"
              className="border-2 h-10 px-3 rounded focus:outline-amber-500 border-indigo-300"
              {...register('email', {
                required: true,
                pattern:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              })}
            />
            {errors.email && (
              <p className="text-orange-500 text-sm">Email is required.</p>
            )}
          </fieldset>
        </form>
      )}
    </div>
  );
};
