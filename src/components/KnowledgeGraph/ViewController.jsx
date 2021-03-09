import React, { useState, useEffect } from "react";
import { clone, filter, find } from "lodash";

/**
 * availableView: {
 *      label
 *      uri
 *      checked
 * }
 */

/**
 * styles: {
 *     controllerContainer
 *     checkboxContainer
 *     checkboxButton
 *     checkboxLabel
 * }
 *
 * classes: {
 *     controllerContainer
 *     checkboxContainer
 *     checkboxLabel
 * }
 *
 * onViewConfigurationChange = ([viewUri1, viewUri2]) => {
 *      e.g. forEach uri => save selected View
 * }
 */

export default function ViewController({
    availableViews = [],
    styles = {},
    classes = {},
    onViewConfigurationChange = (clickedUri, checked) => {},
}) {
    return (
        <div
            style={{ ...styles.controllerContainer }}
            className={`${classes.controllerContainer}`}
        >
            {availableViews.map((availableView, key) => {
                return (
                    <div
                        style={{ ...styles.checkboxContainer }}
                        className={`${classes.checkboxContainer}`}
                    >
                        <input
                            type="checkbox"
                            id={`view-checkbox-${availableView.uri}`}
                            style={{ ...styles.checkboxButton }}
                            checked={availableView.checked}
                            name={availableView.label}
                            value={availableView.uri}
                            onChange={(e) => {
                                onViewConfigurationChange(
                                    e.target.value,
                                    e.target.checked
                                );
                            }}
                        />
                        <label
                            for={`view-checkbox-${availableView.uri}`}
                            style={{ ...styles.checkboxLabel }}
                            className={`${classes.checkboxLabel}`}
                        >
                            {availableView.label}
                        </label>
                    </div>
                );
            })}
        </div>
    );
}
