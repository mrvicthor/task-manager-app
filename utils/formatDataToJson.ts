export function formDataToJson(formData: FormData): Record<string, any> {
  const data: Record<string, any> = {};

  const parseValue = (value: string) => {
    const lower = value.toLowerCase();
    return lower === "true" ? true : lower === "false" ? false : value;
  };

  formData.forEach((value, key) => {
    const keys = key.split(".");
    const lastKey = keys.pop()!;
    let current = data;
    keys.forEach((k, index) => {
      current = current[k] ??= /^\d+$/.test(keys[index + 1]) ? [] : {};
    });
    current[lastKey] = Array.isArray(current[lastKey])
      ? [...current[lastKey], parseValue(value as string)]
      : parseValue(value as string);
  });

  return data;
}
