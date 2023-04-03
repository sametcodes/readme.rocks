"use client";

import { useState, useCallback, useMemo, useRef } from "react";
import { buildFormWithYupSchema } from "./builder";
import { mergeSchemas } from "@/utils";

import { ValidationError, AnyObject } from "yup";
import {
  ConnectionProfile,
  Platform,
  PlatformQuery,
  PlatformQueryConfig,
} from "@prisma/client";
import { cn } from "@/utils";
import { Image, CopyButton } from "@/components/ui";
import { validations } from "@/platforms";
import Link from "next/link";
import NextImage from "next/image";
import { useRouter } from "next/navigation";

type IConfigFormProps = {
  platformQuery: PlatformQuery & { platform: Platform };
  queryConfigs:
    | (PlatformQueryConfig & {
        platform: Platform;
        platformQuery: PlatformQuery;
      })[];
  connectionProfile: ConnectionProfile | null;
  activeQueryConfigId: string | null;
  children?: React.ReactNode;
};

export default function PrivateConfigForm({
  platformQuery,
  queryConfigs,
  connectionProfile,
  activeQueryConfigId,
  children,
}: IConfigFormProps) {
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState({ data: "", loading: false });

  const $form = useRef<HTMLFormElement>(null);
  const $formHasChanged = useRef<boolean>(false);

  const validation: { query: AnyObject; view: AnyObject } | null =
    useMemo(() => {
      const platformValidations = validations[platformQuery.platform.code];
      return {
        query:
          platformValidations.query[
            platformQuery.name as keyof typeof platformValidations.query
          ],
        view: platformValidations.view[
          platformQuery.name as keyof typeof platformValidations.view
        ],
      };
    }, [platformQuery.platform.code, platformQuery.name]);
  const schema = useMemo(
    () => mergeSchemas(validation?.query, validation?.view),
    [validation]
  );

  const [config, setConfig] = useState<PlatformQueryConfig | undefined>(
    queryConfigs.find((c) => c.id === activeQueryConfigId) || undefined
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
        if (Number.isFinite(Number(num_value))) {
          acc[field_key] = Number(num_value);
        }
      }

      if (field.type === "boolean") {
        acc[field_key] = data.get(prefix + "__" + field_key) === "on";
      }

      return acc;
    }, {});
  };

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

  const onDelete = async (event: any) => {
    event.preventDefault();
    if (!$form.current) return;

    return fetch(`/api/data/deletePlatformQueryConfig/${activeQueryConfigId}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          router.replace(`/build/${platformQuery.id}`);
        } else {
          alert("ERROR");
        }
      });
  };

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
            router.push(`/build/${platformQuery.id}/${result.data.id}`);
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
      headers: { "Content-Type": "application/json" },
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

  const readFormData = (data: FormData) => {
    try {
      const [query, view] = [
        validation.query &&
          readValidationFormValues(validation.query, "query", data),
        validation.view &&
          readValidationFormValues(validation.view, "view", data),
      ];

      const formDataValues = { ...(query || {}), ...(view || {}) };
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

  if (!validation) return null;

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
                      {(validation.query &&
                        buildFormWithYupSchema(
                          validation.query,
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
                      {(validation.view &&
                        buildFormWithYupSchema(
                          validation.view,
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

            <div className="flex flex-row justify-between">
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
                  {activeQueryConfigId ? "Update" : "Create"}
                </button>
              </div>
              {activeQueryConfigId && (
                <button
                  onClick={onDelete}
                  className={cn(
                    "rounded-lg py-2 px-4 border-[1px] border-red-500 bg-red-500 text-gray-100 hover:bg-red-100 hover:text-red-500",
                    "dark:hover:bg-gray-700"
                  )}
                >
                  Delete
                </button>
              )}
            </div>
          </fieldset>
        </form>

        <div className="flex flex-col gap-5">
          <h2 className="text-2xl text-slate-600 font-bold inline-block border-b-slate-300 border-b-[1px] pb-2 dark:text-gray-300 dark:border-b-gray-600">
            Saved queries
          </h2>

          {queryConfigs
            .sort((a: PlatformQueryConfig, b: PlatformQueryConfig) => {
              if (a.id < b.id) {
                return 1;
              }
              if (a.id > b.id) {
                return -1;
              }
              return 0;
            })
            .map((queryConfig) => {
              return (
                <Link
                  href={`/build/${platformQuery.id}/${queryConfig.id}`}
                  key={queryConfig.id}
                  className={cn(
                    "opacity-60 hover:opacity-100 relative w-full",
                    activeQueryConfigId === queryConfig.id && "opacity-100"
                  )}
                >
                  <NextImage
                    layout="responsive"
                    objectFit="contain"
                    src={`/api/view/${queryConfig.id}`}
                    alt={queryConfig.id}
                    width={100}
                    height={100}
                    unoptimized
                  />
                </Link>
              );
            })}
        </div>
      </div>

      <div></div>

      <div className="flex flex-col gap-3 lg:w-2/3">
        <h2 className="text-2xl text-slate-600 font-bold mb-5 inline-block border-b-slate-300 border-b-[1px] pb-2 dark:text-gray-300 dark:border-b-gray-600">
          Output as SVG
        </h2>

        {!preview.data &&
          (config &&
          connectionProfile &&
          !preview.loading &&
          activeQueryConfigId ? (
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
