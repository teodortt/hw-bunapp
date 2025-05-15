import { useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Option } from "../../primitives/select";
import { router, useGlobalSearchParams } from "expo-router";

const SelectFilter = ({
  placeholder,
  options,
}: {
  placeholder: string;
  options: Option[];
}) => {
  const query = useGlobalSearchParams()[placeholder];

  const queryValue = typeof query === "string" ? query : "";

  const value = useMemo(() => {
    const selectedOption = options.find(
      (option) => option?.value === queryValue
    );
    return selectedOption;
  }, [queryValue, options]);

  const handleSelect = (option: Option) => {
    if (!option) return;
    router.setParams({ placeholder: option.value });
  };

  return (
    <Select className="flex-row" value={value} onValueChange={handleSelect}>
      <SelectTrigger className="w-[150px]">
        <SelectValue
          className="text-foreground text-sm native:text-lg"
          placeholder={placeholder}
        />
      </SelectTrigger>
      <SelectContent className="w-[150px]">
        {options.map(
          (option, i) =>
            option && (
              <SelectItem
                key={`${option.value}-${i}`}
                value={option.value}
                label={option.label}
              >
                {option.label}
              </SelectItem>
            )
        )}
      </SelectContent>
    </Select>
  );
};
