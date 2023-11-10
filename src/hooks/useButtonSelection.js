import React, { useState } from "react";

const useButtonSelection = (initialButtons, externalHandler) => {
    const [selected, setSelected] = useState(initialButtons[0].label);

    const handleSelectionChange = (newSelection) => {
        //console.log(`Selected: ${newSelection}`);
        setSelected(newSelection);
        if (externalHandler) {
            externalHandler(newSelection);
        }
    };

    return [selected, handleSelectionChange];
};

export default useButtonSelection;