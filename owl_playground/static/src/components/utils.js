/** @odoo-module **/

import { useRef, useEffect } from "@odoo/owl";

function useAutoFocus(name) {
    const ref = useRef(name);
    useEffect(
        (el) => el && el.focus(),
        () => [ref.el]
    );
}

export { useAutoFocus }