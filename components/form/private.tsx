"use client";

import { useState, useCallback, useMemo, useRef } from "react";
import { buildFormWithYupSchema } from "./builder";

import { ValidationError, AnyObject } from "yup";
import {
  ConnectionProfile,
  Platform,
  PlatformQuery,
  PlatformQueryConfig,
} from "@prisma/client";
import { cn } from "@/utils";
import { Image, CopyButton } from "@/components/ui";
import { getPlatformValidations } from "@/platforms";

type IConfigFormProps = {
  platformQuery: PlatformQuery & { platform: Platform };
  queryConfig:
    | (PlatformQueryConfig & {
        platform: Platform;
        platformQuery: PlatformQuery;
      })
    | undefined;
  connectionProfile: ConnectionProfile | null;
  children?: React.ReactNode;
};

export default function PrivateConfigForm({
  platformQuery,
  queryConfig,
  connectionProfile,
  children,
}: IConfigFormProps) {
  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState({ data: "", loading: false });

  const $form = useRef<HTMLFormElement>(null);
  const $formHasChanged = useRef<boolean>(false);

  const [config, setConfig] = useState<PlatformQueryConfig | undefined>(
    queryConfig
  );

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

  const sendPreviewQueryRequest = useCallback(
    async (data: any) => {
      return fetch(`/api/preview/${platformQuery.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((res) => res.text());
    },
    [platformQuery.id]
  );

  const onPreview = async (event: any) => {
    event.preventDefault();
    if (!$form.current) return;

    const data = readFormData(new FormData($form.current));
    if (!data) return;

    setPreview({ data: "", loading: true });
    const previewImage = await sendPreviewQueryRequest(data);
    setPreview({ data: previewImage, loading: false });
  };

  const onSubmit = async (event: any) => {
    event.preventDefault();
    if (!$form.current) return;
    const data = readFormData(new FormData($form.current));

    if (!config) {
      return fetch(`/api/data/createPlatformQueryConfig/${platformQuery.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.success) {
            setConfig(result.data);
          } else {
            alert("ERROR");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }

    return fetch(`/api/data/editPlatformQueryConfig/${config.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          setConfig(result.data);
        } else {
          alert("ERROR");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const validation = useMemo(() => {
    return getPlatformValidations(platformQuery.platform.code);
  }, [platformQuery.platform.code]);
  if (!validation) return null;

  const readFormData = (data: FormData) => {
    try {
      const [queryValidation, viewValidation]: [AnyObject, AnyObject] = [
        validation.query[platformQuery.name],
        validation.view[platformQuery.name],
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
    $formHasChanged.current = true;

    const name = event.target.name.replace("query__", "").replace("view__", "");
    if (name in errors) {
      const newErrors: any = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  return (
    <div className="flex flex-col justify-center lg:items-start lg:flex-row gap-10 mt-10">
      <div className="flex flex-col gap-5 lg:min-h-[400px] lg:w-1/3">
        {children}
        <form
          className="flex flex-col gap-5"
          ref={$form}
          onSubmit={onSubmit}
          onChange={onChange}
        >
          <fieldset
            disabled={!connectionProfile}
            className="flex flex-col gap-5"
          >
            {platformQuery.name && (
              <>
                <h2 className="text-2xl text-slate-600 font-bold inline-block border-b-slate-300 border-b-[1px] pb-2 dark:text-gray-300 dark:border-b-gray-600">
                  Input parameters
                </h2>
                <div className="flex flex-row lg:flex-col gap-5">
                  <div>
                    <h3 className="text-lg mb-3 border-b-slate-600 border-b-[1px] inline-block pb-1 text-slate-700 dark:text-gray-300 dark:border-b-gray-600">
                      Query parameters
                    </h3>

                    <div className="flex flex-row gap-2 flex-wrap">
                      {(validation.query[platformQuery.name] &&
                        buildFormWithYupSchema(
                          validation.query[platformQuery.name],
                          "query",
                          config?.queryConfig,
                          errors
                        )) || (
                        <p className="text-slate-400 dark:text-gray-300">
                          No parameters required
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <h3 className="text-lg mb-3 border-b-slate-600 border-b-[1px] inline-block pb-1 text-slate-700 dark:text-gray-300 dark:border-b-gray-600">
                      View parameters
                    </h3>
                    <div className="flex flex-row gap-2 flex-wrap">
                      {(validation.view[platformQuery.name] &&
                        buildFormWithYupSchema(
                          validation.view[platformQuery.name],
                          "view",
                          config?.viewConfig,
                          errors
                        )) || (
                        <p className="text-slate-400 dark:text-gray-300">
                          No parameters available
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}

            <div className="flex flex-row gap-2">
              <button
                onClick={onPreview}
                disabled={
                  preview.loading ||
                  Boolean(Object.keys(errors).length) ||
                  !connectionProfile
                }
                className={cn(
                  "rounded-lg py-2 px-4 bg-slate-100 border-[1px] border-slate-300 hover:bg-slate-200",
                  "disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed dark:disabled:bg-gray-700 dark:disabled:border-gray-600 dark:disabled:hover:bg-gray-700 ",
                  "dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700"
                )}
              >
                Preview
              </button>
              <button
                type="submit"
                disabled={preview.loading || !Boolean(preview.data)}
                className={cn(
                  "rounded-lg py-2 px-4 border-[1px] bg-slate-100 border-slate-300 hover:bg-slate-200",
                  "disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed dark:disabled:bg-gray-700 dark:disabled:border-gray-600 dark:disabled:hover:bg-gray-700 ",
                  "dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700"
                )}
              >
                Save
              </button>
            </div>
          </fieldset>
        </form>
      </div>

      <div></div>

      <div className="flex flex-col gap-3 lg:w-2/3">
        <h2 className="text-2xl text-slate-600 font-bold mb-5 inline-block border-b-slate-300 border-b-[1px] pb-2 dark:text-gray-300 dark:border-b-gray-600">
          Output as SVG
        </h2>

        {!preview.data &&
          (config && connectionProfile && !preview.loading ? (
            <>
              <Image
                src={`/api/view/${config.id}${
                  $formHasChanged.current ? "?_vercel_no_cache=1" : ""
                }`}
                title={config.id}
                width={80}
                height={80}
                layout="responsive"
                objectFit="contain"
                alt="React Logo"
                unoptimized
              />
            </>
          ) : (
            <div
              className={cn(
                "w-full h-full min-h-[350px] bg-slate-200 rounded-lg flex items-center justify-center dark:bg-gray-700",
                preview.loading ? "animate-pulse" : ""
              )}
            >
              {preview.loading ? (
                <p className="text-slate-500 dark:text-gray-400">
                  The magic is happening...
                </p>
              ) : (
                <p className="text-slate-500 dark:text-gray-400">
                  {connectionProfile
                    ? "Choose parameters and click on the preview"
                    : "Connect your account first and choose parameters"}{" "}
                </p>
              )}
            </div>
          ))}

        {preview.data && (
          <div style={{ width: "500px", height: "auto", position: "relative" }}>
            {preview.data && (
              <Image
                src={`data:image/svg+xml,${encodeURIComponent(preview.data)}`}
                title=""
                width={80}
                height={80}
                layout="responsive"
                objectFit="contain"
                alt="React Logo"
                unoptimized
              />
            )}
          </div>
        )}

        <div className="my-[50px]">
          <h3 className="text-lg mb-4 border-b-slate-600 border-b-[1px] inline-block pb-1 text-slate-600 dark:text-gray-300 dark:border-b-gray-600">
            Add anywhere you want
          </h3>

          <p className="mb-5 text-slate-500 dark:text-gray-400">
            Keep in mind that this query will be cached for{" "}
            {platformQuery.cache_time} seconds. And it revalidates only if you
            make changes on the parameters.
          </p>

          {(!config || !connectionProfile) && (
            <p className="text-slate-400 dark:text-gray-400">
              Save the query to get the embed and raw links
            </p>
          )}
          {config && connectionProfile && (
            <div className="flex flex-col gap-5">
              <div>
                <p className="block text-slate-700 text-sm mb-1 capitalize dark:text-gray-400">
                  As markdown
                </p>
                <CopyButton
                  value={`![](${process.env.NEXT_PUBLIC_SITE_URL}/api/view/${config.id})`}
                  className="relative inline-block w-full border-[1px] bg-slate-200 whitespace-pre rounded-lg  dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700"
                >
                  <code className="p-4 block w-full text-sm overflow-x-scroll">
                    ![]({process.env.NEXT_PUBLIC_SITE_URL}/api/view/{config.id})
                  </code>
                </CopyButton>
              </div>

              <div>
                <p className="block text-slate-700 text-sm mb-1 capitalize dark:text-gray-400">
                  As HTML
                </p>
                <CopyButton
                  value={`<img src="${process.env.NEXT_PUBLIC_SITE_URL}/api/view/${config.id}" />`}
                  className="relative inline-block w-full border-[1px]  bg-slate-200 whitespace-pre rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700"
                >
                  <code className="p-4 block w-full text-sm overflow-x-scroll">
                    {`<img src="${process.env.NEXT_PUBLIC_SITE_URL}/api/view/${config.id}" />`}
                  </code>
                </CopyButton>
              </div>

              <div>
                <p className="block text-slate-700 text-sm mb-1 capitalize dark:text-gray-400">
                  Raw link
                </p>
                <CopyButton
                  value={`${process.env.NEXT_PUBLIC_SITE_URL}/api/view/${config.id}`}
                  className="relative inline-block w-full border-[1px]  bg-slate-200 whitespace-pre rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700"
                >
                  <code className="p-4 block w-full text-sm overflow-x-scroll">
                    {process.env.NEXT_PUBLIC_SITE_URL}/api/view/{config.id}
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
