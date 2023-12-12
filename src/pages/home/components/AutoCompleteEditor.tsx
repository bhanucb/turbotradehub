import React, {
  forwardRef,
  SyntheticEvent,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, {
  AutocompleteRenderInputParams,
} from "@mui/material/Autocomplete";
import { styled } from "@mui/material/styles";
import { searchBenchmarks } from "../../../api/Benchmarks";
import CircularProgress from "@mui/material/CircularProgress";
import { ICellEditorParams } from "ag-grid-community";

const StyledAutocomplete = styled("div")`
  .input-text {
    font-size: 12px;
  }
`;
const Option = styled("li")`
  font-size: 12px;
`;

type CustomCellEditorParamsWithOptions = ICellEditorParams & {
  options: Promise<string[]>;
};

export default forwardRef((_: CustomCellEditorParamsWithOptions, ref) => {
  const [value, setValue] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const [options, setOptions] = useState<string[]>([]);
  const timeoutId = useRef<NodeJS.Timeout>();
  const [loading, setLoading] = useState<boolean>(false);
  const debounceValue = 500;

  useImperativeHandle(ref, () => {
    return {
      getValue: () => {
        return value;
      },
    };
  });

  function onChangeHandler(_: SyntheticEvent, value: string) {
    setValue(value);
  }

  function onInputChangeHandler(
    _: SyntheticEvent,
    inputValue: React.SetStateAction<string>
  ) {
    setInputValue(inputValue);
  }

  function renderOption(
    props: React.HTMLAttributes<HTMLLIElement>,
    value: string
  ) {
    return <Option {...props}>{value}</Option>;
  }

  function renderInput(params: AutocompleteRenderInputParams) {
    return (
      <TextField
        {...params}
        autoFocus
        placeholder={"Enter key"}
        InputProps={{
          ...params.InputProps,
          endAdornment: (
            <React.Fragment>
              {loading ? <CircularProgress color="inherit" size={15} /> : null}
              {params.InputProps.endAdornment}
            </React.Fragment>
          ),
        }}
      />
    );
  }

  useEffect(() => {
    clearTimeout(timeoutId.current);
    if (!inputValue.trim()) return;
    setLoading(true);
    //debounce, to avoid call api on each key type
    timeoutId.current = setTimeout(() => {
      searchBenchmarks(inputValue)
        .then((data) => {
          setOptions(data);
        })
        .finally(() => {
          setLoading(false);
        });
    }, debounceValue);
  }, [inputValue]);

  return (
    <StyledAutocomplete>
      <Autocomplete
        // sx={{
        //   width: 300,
        // }}
        classes={{ input: "input-text" }}
        options={loading ? [] : options}
        value={value}
        onChange={onChangeHandler}
        inputValue={inputValue}
        onInputChange={onInputChangeHandler}
        disableClearable
        fullWidth={true}
        disableListWrap={true}
        loading={loading}
        freeSolo={false} //if true it disable No options message
        loadingText={"Loading…"}
        size={"small"}
        id="benchmark-autocomplete"
        renderOption={renderOption}
        renderInput={renderInput}
        filterOptions={(x) => x}
        noOptionsText={"No options available"}
      />
    </StyledAutocomplete>
  );
});
