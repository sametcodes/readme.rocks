"use client";

import { useState, useCallback, useRef } from "react";

import * as _queryValidations from "@/services/platform/validations";
import * as _viewValidations from "@/views/queries/validations";
import { AnyObject, ValidationError } from "yup";
import { useRouter } from "next/navigation";
import { PlatformQuery, PlatformQueryConfig } from "@prisma/client";
import { cn } from "@/utils";
import { Image, CopyButton } from "@/components/ui";

const queryValidations = _queryValidations as { [key: string]: AnyObject };
const viewValidations = _viewValidations as { [key: string]: AnyObject };

type IConfigFormProps = {
  platformQuery: PlatformQuery;
  queryConfig?: PlatformQueryConfig;
};

export default function ConfigForm({
  platformQuery,
  queryConfig,
}: IConfigFormProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [preview, setPreview] = useState({ data: "", loading: false });
  const $form = useRef<HTMLFormElement>(null);

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

  return (
    <div className="flex flex-col justify-center lg:items-start lg:flex-row gap-10 mt-10">
      <form
        ref={$form}
        onSubmit={onSubmit}
        onChange={onChange}
        className="flex flex-col gap-5 lg:min-h-[400px] flex-1"
      >
        {platformQuery.name && (
          <>
            <h2 className="text-2xl text-slate-600 font-bold inline-block border-b-slate-300 border-b-[1px] pb-2">
              Input parameters
            </h2>
            <div className="flex flex-row lg:flex-col gap-3">
              <div>
                <h3 className="text-lg mb-3 border-b-slate-600 border-b-[1px] inline-block pb-1 text-slate-700">
                  Query parameters
                </h3>

                <div className="flex flex-row gap-2">
                  {((queryValidations as any)[platformQuery.name] &&
                    buildFormWithYupSchema(
                      (queryValidations as any)[platformQuery.name],
                      "query",
                      config?.queryConfig,
                      errors
                    )) || (
                    <p className="text-slate-400">No parameters required</p>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg mb-3 border-b-slate-600 border-b-[1px] inline-block pb-1 text-slate-700">
                  View parameters
                </h3>
                {((viewValidations as any)[platformQuery.name] &&
                  buildFormWithYupSchema(
                    (viewValidations as any)[platformQuery.name],
                    "view",
                    config?.viewConfig,
                    errors
                  )) || (
                  <p className="text-slate-400">No parameters available</p>
                )}
              </div>
            </div>
          </>
        )}

        <div className="flex flex-row gap-2">
          <button
            onClick={onPreview}
            disabled={loading || Boolean(Object.keys(errors).length)}
            className="rounded-lg py-2 px-4 bg-slate-100 border-[1px] border-slate-300 hover:bg-slate-200"
          >
            Preview
          </button>
          <button
            type="submit"
            disabled={loading || !Boolean(preview.data)}
            className={cn(
              "rounded-lg py-2 px-4 bg-slate-100 border-[1px]",
              preview.data
                ? "bg-slate-100 border-slate-300 hover:bg-slate-200"
                : "bg-slate-200 text-slate-400 cursor-not-allowed"
            )}
          >
            Save
          </button>
        </div>
      </form>

      <div className="border-[1px]"></div>

      <div className="flex flex-col flex-1 gap-3">
        <h2 className="text-2xl text-slate-600 font-bold mb-5 inline-block border-b-slate-300 border-b-[1px] pb-2 ">
          Output as SVG
        </h2>

        {!preview.data &&
          (config && !preview.loading ? (
            <>
              <Image
                src={`/api/view/${config.id}`}
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
                "w-full h-full min-h-[350px] bg-slate-200 rounded-lg flex items-center justify-center",
                preview.loading ? "animate-pulse" : ""
              )}
            >
              {preview.loading ? (
                <p className="text-slate-500">The magic is happening...</p>
              ) : (
                <p className="text-slate-500">
                  Choose parameters and click on the preview
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
          <h3 className="text-lg mb-4 border-b-slate-600 border-b-[1px] inline-block pb-1 text-slate-600">
            Add anywhere you want
          </h3>

          {!config && (
            <p className="text-slate-400">
              Save the query to get the embed and raw links
            </p>
          )}
          {config && (
            <div className="flex flex-col gap-5">
              <div>
                <p className="block text-slate-700 text-sm mb-1 capitalize">
                  As markdown
                </p>
                <CopyButton
                  value={`![](${process.env.NEXT_PUBLIC_SITE_URL}/api/view/${config.id})`}
                  className="relative inline-block w-full bg-slate-200 whitespace-pre rounded-lg"
                >
                  <code className="p-4 block w-full text-sm overflow-x-scroll">
                    ![]({process.env.NEXT_PUBLIC_SITE_URL}/api/view/{config.id})
                  </code>
                </CopyButton>
              </div>

              <div>
                <p className="block text-slate-700 text-sm mb-1 capitalize">
                  As HTML
                </p>
                <CopyButton
                  value={`<img src="${process.env.NEXT_PUBLIC_SITE_URL}/api/view/${config.id}" />`}
                  className="relative inline-block w-full bg-slate-200 whitespace-pre rounded-lg"
                >
                  <code className="p-4 block w-full text-sm overflow-x-scroll">
                    {`<img src="${process.env.NEXT_PUBLIC_SITE_URL}/api/view/${config.id}" />`}
                  </code>
                </CopyButton>
              </div>

              <div>
                <p className="block text-slate-700 text-sm mb-1 capitalize">
                  Raw link
                </p>
                <CopyButton
                  value={`${process.env.NEXT_PUBLIC_SITE_URL}/api/view/${config.id}`}
                  className="relative inline-block w-full bg-slate-200 whitespace-pre rounded-lg"
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

const buildFormWithYupSchema = (
  validationSchema: AnyObject,
  prefix: string,
  initialValues: any,
  errors: { [key: string]: string }
) => {
  const fields = Object.keys(validationSchema.fields);

  if (!fields.length) return null;
  return fields.map((fieldName) => {
    const field = validationSchema.fields[fieldName];
    const fieldType = field.type;

    let fieldProps: any = {
      name: prefix + "__" + fieldName,
      placeholder: fieldName,
      className: cn(
        "rounded-lg py-2 px-4 bg-slate-100 border-[1px] border-slate-300 w-full"
      ),
    };

    if (initialValues && initialValues[fieldName]) {
      fieldProps = { ...fieldProps, defaultValue: initialValues[fieldName] };
    }

    let inputElement = null;
    switch (fieldType) {
      case "number":
        inputElement = <input type="number" {...fieldProps} />;
        break;
      case "string":
        if (field._whitelist.size > 1) {
          inputElement = (
            <select {...fieldProps}>
              {Array.from(field._whitelist).map((enumValue: any) => (
                <option key={enumValue} value={enumValue}>
                  {enumValue}
                </option>
              ))}
            </select>
          );
        } else {
          inputElement = <input type="text" {...fieldProps} />;
        }
        break;
      case "boolean":
        inputElement = <input type="checkbox" id={fieldName} {...fieldProps} />;
        break;
      default:
        inputElement = <input type="text" {...fieldProps} />;
        break;
    }

    return (
      <div key={fieldName} className="mb-2 w-full">
        <label
          htmlFor={fieldName}
          className="block text-slate-500 text-md mb-1 capitalize"
        >
          {fieldName}
        </label>
        {inputElement}
        <p style={{ color: "red" }}>
          {errors[fieldName] && <span>{errors[fieldName]}</span>}
        </p>
      </div>
    );
  });
};
