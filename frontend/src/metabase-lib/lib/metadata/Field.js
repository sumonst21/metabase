/* @flow weak */

import Base from "./Base";
import Table from "./Table";

import { FieldIDDimension } from "../Dimension";

import { getFieldValues } from "metabase/lib/query/field";
import {
    isDate,
    isNumber,
    isNumeric,
    isBoolean,
    isString,
    isSummable,
    isCategory,
    isDimension,
    isMetric,
    isPK,
    isFK,
    getIconForField,
    getFieldType
} from "metabase/lib/schema_metadata";

/**
 * Wrapper class for field metadata objects. Belongs to a Table.
 */
export default class Field extends Base {
    displayName: string;
    description: string;

    table: Table;

    fieldType() {
        return getFieldType(this);
    }

    isDate() {
        return isDate(this);
    }
    isNumber() {
        return isNumber(this);
    }
    isNumeric() {
        return isNumeric(this);
    }
    isBoolean() {
        return isBoolean(this);
    }
    isString() {
        return isString(this);
    }
    isSummable() {
        return isSummable(this);
    }
    isCategory() {
        return isCategory(this);
    }
    isMetric() {
        return isMetric(this);
    }

    isCompatibleWith(field: Field) {
        return (
            this.isDate() === field.isDate() ||
            this.isNumeric() === field.isNumeric() ||
            this.id === field.id
        )
    }

    /**
     * Tells if this column can be used in a breakout
     * Currently returns `true` for everything expect for aggregation columns
     */
    isDimension() {
        return isDimension(this);
    }
    isID() {
        return isPK(this) || isFK(this);
    }
    isPK() {
        return isPK(this);
    }
    isFK() {
        return isFK(this);
    }

    fieldValues(): Array<string> {
        return getFieldValues(this._object);
    }

    icon() {
        return getIconForField(this);
    }

    dimension() {
        return new FieldIDDimension(null, [this.id], this.metadata);
    }

    operator(op) {
        if (this.operators_lookup) {
            return this.operators_lookup[op];
        }
    }
}
