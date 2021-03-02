import React from "react";
import { nanoid } from "nanoid";

export function IncludeElementsWithMissingPropertyCheckbox({
    styles = {},
    classes = {},
    onChange,
    checked,
}) {
    const checkboxId = `show-missing-property-elements-${nanoid()}`;

    return (
        <div style={{ ...styles.checkbox }} className={`${classes.checkbox}`}>
            <input
                type="checkbox"
                id={checkboxId}
                style={{ ...styles.checkboxButton }}
                defaultChecked={checked}
                value={checked}
                onChange={(e) => {
                    onChange(e.target.checked);
                }}
            />
            <label
                for={checkboxId}
                style={{ ...styles.checkboxLabel }}
                className={`${classes.checkboxLabel}`}
            >
                {`${
                    checked ? "Exclude" : "Include"
                } elements with missing property`}
            </label>
        </div>
    );
}
