import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { ICellEditorParams } from "ag-grid-community";
import { styled } from "@mui/material/styles";

const NumberSelectInput = styled("input")`
  height: 100%;
  width: 100%;
`;

const selectOnFocusNumberEditor = forwardRef(
  (props: ICellEditorParams, ref) => {
    const [value, setValue] = useState(props.value);
    const refInput = useRef<HTMLInputElement>(null);

    useEffect(() => {
      refInput.current?.focus();

      if (value === undefined) return;

      const start = value.toString().indexOf(".") + 1;
      const end = value.toString().length;
      refInput.current?.setSelectionRange(start, end);
    }, []);

    /* Component Editor Lifecycle methods */
    useImperativeHandle(ref, () => {
      return {
        // the final value to send to the grid, on completion of editing
        getValue() {
          return value;
        },

        // Gets called once before editing starts, to give editor a chance to
        // cancel the editing before it even starts.
        isCancelBeforeStart() {
          return false;
        },

        // Gets called once when editing is finished (e.g. if Enter is pressed).
        // If you return true, then the result of the edit will be ignored.
        isCancelAfterEnd() {
          return value;
        },
      };
    });

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
      const {
        target: { value },
      } = event;
      let newValue = value
        .replace(/[^\d-/.]+/g, "")
        .replace(/(?!^)-/g, "")
        .replace(/(?<=\..*)\./g, "");
      setValue(newValue);
    }

    return (
      <NumberSelectInput
        ref={refInput}
        value={value}
        onChange={handleChange}
        className="ag-input-field-input ag-text-field-input"
      />
    );
  }
);

export default selectOnFocusNumberEditor;
