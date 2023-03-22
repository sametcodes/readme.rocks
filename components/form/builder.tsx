import { cn } from "@/utils";
import { AnyObject } from "yup";

export const buildFormWithYupSchema = (
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
      <div
        key={fieldName}
        className="mb-2 flex-wrap flex basis-[min-content] min-w-full"
      >
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
