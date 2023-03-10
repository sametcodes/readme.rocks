"use client";

import { Platform } from "@prisma/client";
import { useEffect, useState, useCallback, useRef } from "react";

import * as _queryValidations from "@/services/platform/validations";
import * as _viewValidations from "@/components/view/validations";
import { AnyObject, ValidationError } from "yup";
import Image from "next/image";
import { useRouter } from "next/navigation";

const queryValidations = _queryValidations as { [key: string]: AnyObject };
const viewValidations = _viewValidations as { [key: string]: AnyObject };

type IConfigFormProps = {
  platforms: Platform[];
  selected?: {
    platformId: string;
    queryId: string;
    schemaName: string;
  };
  initialValues?: any;
};

export default function ConfigForm({
  platforms,
  initialValues = null,
  selected = { platformId: "", queryId: "", schemaName: "" },
}: IConfigFormProps) {
  const router = useRouter();

  const [meta, setMeta] = useState({
    platformId: selected.platformId,
    queryId: selected.queryId,
    schemaName: selected.schemaName,
  });
  const [loading, setLoading] = useState(false);
  const [queries, setQueries] = useState([] as any[]);
  const [errors, setErrors] = useState({});

  const [preview, setPreview] = useState({
    data: "",
    loading: false,
  });

  const $form = useRef<HTMLFormElement>(null);

  // fetching platform queries
  useEffect(() => {
    if (!meta.platformId) return;
    setLoading(true);
    (() =>
      fetch(`/api/data/getPlatformQueries/${meta.platformId}`, {})
        .then((res) => res.json())
        .then((result) => setQueries(result.data))
        .finally(() => setLoading(false)))();
  }, [meta.platformId]);

  // fetching forms
  useEffect(() => {
    if (!meta.queryId) return;

    const query = queries.find((q) => q.id === meta.queryId);
    if (!query) return;

    setMeta((meta) => ({ ...meta, schemaName: query.name }));
  }, [meta.queryId, queries]);

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

  function mergeSchemas(...schemas: any[]) {
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
        queryValidations[meta.schemaName],
        viewValidations[meta.schemaName],
      ];
      const [query, view] = [
        queryValidation &&
          readValidationFormValues(queryValidation, "query", data),
        viewValidation &&
          readValidationFormValues(viewValidation, "view", data),
      ];

      const formDataValues = Object.assign({}, query || {}, view || {});
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

    const allowed = ["platformId", "queryId"];
    if (!allowed.includes(event.target.name)) return;
    setPreview({ data: "", loading: false });

    const form = new FormData($form.current);
    const data = Object.fromEntries(form.entries());
    let params = data as any;
    if (event.target.name === "platformId")
      params = { ...params, schemaName: "" };
    setMeta(params);
  };

  const sendPreviewQueryRequest = useCallback(
    async (data: any) => {
      return fetch(`/api/preview/${meta.queryId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((res) => res.text());
    },
    [meta.queryId]
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

    fetch(`/api/data/createPlatformQueryConfig/${meta.queryId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        router.push(`/query`);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  console.log(meta);

  return (
    <div>
      <form ref={$form} onSubmit={onSubmit} onChange={onChange}>
        <div>
          <Select
            name="platformId"
            options={platforms.map((p) => ({ label: p.name, value: p.id }))}
            disabled={loading || selected.platformId}
            value={selected.platformId || undefined}
          />
          <Select
            name="queryId"
            options={queries.map((q) => ({ label: q.title, value: q.id }))}
            disabled={loading || selected.queryId}
            value={selected.queryId || undefined}
          />
        </div>

        {meta.schemaName && (
          <div>
            <h3>Query parameters</h3>
            {((queryValidations as any)[meta.schemaName] &&
              buildFormWithYupSchema(
                (queryValidations as any)[meta.schemaName],
                "query",
                initialValues,
                errors
              )) || <p>No parameters required</p>}

            <h3>View parameters</h3>
            {((viewValidations as any)[meta.schemaName] &&
              buildFormWithYupSchema(
                (viewValidations as any)[meta.schemaName],
                "view",
                initialValues,
                errors
              )) || <p>No parameters available</p>}
          </div>
        )}

        <div>
          <button
            onClick={onPreview}
            disabled={loading || Boolean(Object.keys(errors).length)}
          >
            Preview
          </button>
          <button type="submit" disabled={loading || !Boolean(preview.data)}>
            Save
          </button>
        </div>
      </form>

      {preview.loading && <p>Preview loading...</p>}
      {preview.data && (
        <div>
          <h3>Preview</h3>
          <div style={{ width: "500px", height: "auto", position: "relative" }}>
            {preview.data && (
              <Image
                src={`data:image/svg+xml,${encodeURIComponent(preview.data)}`}
                title=""
                width={100}
                height={100}
                layout="responsive"
                objectFit="contain"
                alt="React Logo"
                unoptimized
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export const Select = ({
  name,
  options,
  ...props
}: {
  name: string;
  options: { label: string; value: string }[];
  [key: string]: any;
}) => {
  return (
    <select name={name} {...props}>
      <option value="">-</option>
      {options.map((option: any) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

const buildFormWithYupSchema = (
  validationSchema: AnyObject,
  prefix: string,
  initialValues: any,
  errors: { [key: string]: string }
) => {
  const fields = Object.keys(validationSchema.fields);

  console.log(initialValues);
  if (!fields.length) return null;
  return fields.map((fieldName) => {
    const field = validationSchema.fields[fieldName];
    const fieldType = field.type;

    let fieldProps: any = {
      name: prefix + "__" + fieldName,
      placeholder: fieldName,
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
      <div key={fieldName}>
        <label htmlFor={fieldName}>{fieldName}</label>
        {inputElement}
        <p style={{ color: "red" }}>
          {errors[fieldName] && <span>{errors[fieldName]}</span>}
        </p>
      </div>
    );
  });
};
