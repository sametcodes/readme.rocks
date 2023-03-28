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

    const errorMessage =
      errors[fieldName] &&
      errors[fieldName].replaceAll(fieldName, field.spec.meta.label);

    let fieldProps: any = {
      name: prefix + "__" + fieldName,
      placeholder: field?.spec?.meta?.placeholder || fieldName,
      className: cn(
        "rounded-lg py-2 px-4 bg-slate-100 border-[1px] border-slate-300 w-full",
        errorMessage && "border-red-500 border-[2px] bg-red-100",
        "dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
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
        inputElement = (
          <div
            className="block w-full"
            onClick={() => {
              const input: HTMLInputElement | null = document.querySelector(
                `#${fieldName}`
              );
              if (!input) return;

              input.checked = !input.checked;

              // @ts-ignore
              input?.nextSibling?.classList.toggle("bg-[#3056d3]");
              // @ts-ignore
              input?.nextSibling?.classList.toggle("bg-[#CCCCCE]");
              // @ts-ignore
              input?.nextSibling?.classList.toggle("justify-end");
            }}
          >
            <input
              type="checkbox"
              id={fieldName}
              {...fieldProps}
              className={cn(fieldProps.className, "inline p-3 w-4 h-4 sr-only")}
            />

            <span className="slider mr-3 flex h-[26px] w-[50px] items-center rounded-full bg-[#CCCCCE] p-1 duration-200">
              <span className="dot h-[18px] w-[18px] rounded-full bg-white duration-200"></span>
            </span>
          </div>
        );
        break;
      default:
        inputElement = <input type="text" {...fieldProps} />;
        break;
    }

    return (
      <div
        key={fieldName}
        className="mb-2 flex-wrap flex basis-[min-content] min-w-full items-center"
      >
        <label
          htmlFor={fieldName}
          className="block text-slate-700 text-md mb-1 dark:text-gray-400"
        >
          {field?.spec?.meta?.label || fieldName}
        </label>
        {inputElement}
        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
        {field?.spec?.meta?.description && (
          <p className="text-slate-400 text-sm mt-2 dark:text-gray-400">
            {" "}
            {field.spec.meta.description}{" "}
          </p>
        )}
      </div>
    );
  });
};
