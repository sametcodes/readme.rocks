"use client";

import { useState, useRef } from "react";
import { buildFormWithYupSchema } from "./builder";

import {
  queryValidations as _queryValidations,
  viewValidations as _viewValidations,
} from "@/platforms/validations";
import { AnyObject, ValidationError } from "yup";
import {
  ConnectionProfile,
  Platform,
  PlatformQuery,
  PlatformQueryConfig,
} from "@prisma/client";
import { Image, CopyButton } from "@/components/ui";
import { objectToQueryString } from "../../utils/index";

const queryValidations = _queryValidations as { [key: string]: AnyObject };
const viewValidations = _viewValidations as { [key: string]: AnyObject };

type IConfigFormProps = {
  platformQuery: PlatformQuery & { platform: Platform };
  queryConfig?: PlatformQueryConfig & {
    platform: Platform;
    platformQuery: PlatformQuery;
  };
  connectionProfile: ConnectionProfile | null;
};

export default function PublicConfigForm({ platformQuery }: IConfigFormProps) {
  const [errors, setErrors] = useState({});
  const [queryString, setQueryString] = useState<string | undefined>(undefined);

  const $form = useRef<HTMLFormElement>(null);

  const readValidationFormValues = (
    validation: AnyObject,
    prefix: string,
    data: FormData
  ) => {
    const fields = validation.fields;
    const field_keys = Object.keys(fields);

    return field_keys.reduce((acc: any, field_key: string) => {
      const field = fields[field_key];

      if (field.type === "string") {
        acc[field_key] = data.get(prefix + "__" + field_key);
      }

      if (field.type === "number") {
        const num_value = data.get(prefix + "__" + field_key);
        if (Number(num_value) !== NaN) {
          acc[field_key] = Number(num_value);
        }
      }

      if (field.type === "boolean") {
        acc[field_key] = data.get(prefix + "__" + field_key) === "on";
      }

      return acc;
    }, {});
  };

  function mergeSchemas(...schemas: Array<any>) {
    const [first, ...rest] = schemas;

    const merged = rest.reduce(
      (mergedSchemas, schema) => mergedSchemas.concat(schema),
      first
    );

    return merged;
  }

  const readFormData = (data: FormData) => {
    try {
      const [queryValidation, viewValidation] = [
        queryValidations[platformQuery.name],
        viewValidations[platformQuery.name],
      ];
      const [query, view] = [
        queryValidation &&
          readValidationFormValues(queryValidation, "query", data),
        viewValidation &&
          readValidationFormValues(viewValidation, "view", data),
      ];

      const formDataValues = { ...(query || {}), ...(view || {}) };
      const validations = [queryValidation, viewValidation].filter(Boolean);
      const schema = mergeSchemas(...validations);
      schema.validateSync(formDataValues, { abortEarly: false });

      return {
        queryConfig: query || {},
        viewConfig: view || {},
      };
    } catch (error) {
      if (error instanceof ValidationError) {
        const errors = error.inner
          .map((err) => ({ name: err.path, message: err.message }))
          .reduce(
            (acc: any, err: any) => ({ ...acc, [err.name]: err.message }),
            {}
          );
        setErrors(errors);
      }
    }

    return null;
  };

  const onChange = (event: any) => {
    if (!$form.current) return;

    const name = event.target.name.replace("query__", "").replace("view__", "");
    if (name in errors) {
      const newErrors: any = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  const onSubmit = async (event: any) => {
    event.preventDefault();
    if (!$form.current) return;
    const formData = readFormData(new FormData($form.current));
    const query_string = objectToQueryString(
      Object.assign({}, formData, { id: platformQuery.id })
    );
    setQueryString(query_string);
  };

  return (
    <div className="flex flex-col justify-center lg:items-start lg:flex-row gap-10 mt-10">
      <form
        className="flex flex-col gap-5 lg:min-h-[400px] lg:w-1/3"
        ref={$form}
        onSubmit={onSubmit}
        onChange={onChange}
      >
        {platformQuery.name && (
          <>
            <h2 className="text-2xl text-slate-600 font-bold inline-block border-b-slate-300 border-b-[1px] pb-2">
              Input parameters
            </h2>
            <div className="flex flex-row lg:flex-col gap-5">
              <div className="flex flex-col">
                <h3 className="text-lg mb-3 border-b-slate-600 border-b-[1px] inline-block pb-1 text-slate-700">
                  Query parameters
                </h3>

                <div className="flex flex-row gap-2 flex-wrap">
                  {((queryValidations as any)[platformQuery.name] &&
                    buildFormWithYupSchema(
                      (queryValidations as any)[platformQuery.name],
                      "query",
                      {},
                      errors
                    )) || (
                    <p className="text-slate-400">No parameters required</p>
                  )}
                </div>
              </div>

              <div className="flex flex-col">
                <h3 className="text-lg mb-3 border-b-slate-600 border-b-[1px] inline-block pb-1 text-slate-700">
                  View parameters
                </h3>
                <div className="flex flex-row gap-2 flex-wrap">
                  {((viewValidations as any)[platformQuery.name] &&
                    buildFormWithYupSchema(
                      (viewValidations as any)[platformQuery.name],
                      "view",
                      {},
                      errors
                    )) || (
                    <p className="text-slate-400">No parameters available</p>
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        <div className="flex flex-row gap-2">
          <button
            type="submit"
            className="rounded-lg py-2 px-4 border-[1px] bg-slate-100 border-slate-300 hover:bg-slate-200"
          >
            Preview
          </button>
        </div>
      </form>

      <div className="border-[1px]"></div>

      <div className="flex flex-col gap-3 lg:w-2/3">
        <h2 className="text-2xl text-slate-600 font-bold mb-5 inline-block border-b-slate-300 border-b-[1px] pb-2 ">
          Output as SVG
        </h2>

        {queryString ? (
          <>
            <Image
              src={`/api/view?${queryString}`}
              title={platformQuery.name}
              width={80}
              height={80}
              layout="responsive"
              objectFit="contain"
              alt="React Logo"
              unoptimized
            />
          </>
        ) : (
          <div className="w-full h-full min-h-[350px] bg-slate-200 rounded-lg flex items-center justify-center">
            <p className="text-slate-500">
              Choose parameters and click on the preview
            </p>
          </div>
        )}

        <div className="my-[50px]">
          <h3 className="text-lg mb-4 border-b-slate-600 border-b-[1px] inline-block pb-1 text-slate-600">
            Add anywhere you want
          </h3>

          {!queryString && (
            <p className="text-slate-400">
              Preview the query to get the embed and raw links
            </p>
          )}
          {queryString && (
            <div className="flex flex-col gap-5">
              <div>
                <p className="block text-slate-700 text-sm mb-1 capitalize">
                  As markdown
                </p>
                <CopyButton
                  value={`![](${process.env.NEXT_PUBLIC_SITE_URL}/api/view?${queryString})`}
                  className="relative inline-block w-full bg-slate-200 whitespace-pre rounded-lg"
                >
                  <code className="p-4 block w-full text-sm overflow-x-scroll">
                    ![]({process.env.NEXT_PUBLIC_SITE_URL}/api/view?
                    {queryString})
                  </code>
                </CopyButton>
              </div>

              <div>
                <p className="block text-slate-700 text-sm mb-1 capitalize">
                  As HTML
                </p>
                <CopyButton
                  value={`<img src="${process.env.NEXT_PUBLIC_SITE_URL}/api/view?${queryString}" />`}
                  className="relative inline-block w-full bg-slate-200 whitespace-pre rounded-lg"
                >
                  <code className="p-4 block w-full text-sm overflow-x-scroll">
                    {`<img src="${process.env.NEXT_PUBLIC_SITE_URL}/api/view?${queryString}" />`}
                  </code>
                </CopyButton>
              </div>

              <div>
                <p className="block text-slate-700 text-sm mb-1 capitalize">
                  Raw link
                </p>
                <CopyButton
                  value={`${process.env.NEXT_PUBLIC_SITE_URL}/api/view?${queryString}`}
                  className="relative inline-block w-full bg-slate-200 whitespace-pre rounded-lg"
                >
                  <code className="p-4 block w-full text-sm overflow-x-scroll">
                    {process.env.NEXT_PUBLIC_SITE_URL}/api/view?{queryString}
                  </code>
                </CopyButton>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
