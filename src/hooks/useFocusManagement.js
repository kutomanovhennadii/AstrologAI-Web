import { useState, useRef } from 'react';

const useFocusManagement = (refIdentifiers, screenOffsets, setFieldOffset) => {

    const refs = Object.fromEntries(refIdentifiers.map(id => [id, useRef(null)]));
    //console.log("useFocusManagement Created refs:", refs);

    const refMethods = Object.fromEntries(refIdentifiers.map(id => [
        id,
        () => refs[id].current && refs[id].current.removeFocus && refs[id].current.removeFocus(),
    ]));

    const removeFocusFromAll = (exceptRef) => {
        const currentID = exceptRef.current.myUniqueId;
        //console.log("removeFocusFromAll currentID = ", currentID);
        for (const [id, removeFn] of Object.entries(refMethods)) {
            if (currentID !== id) {
                removeFn();
            }
        }

        setFieldOffset(screenOffsets[currentID] || 0);
    };

    return [removeFocusFromAll, refs];
};

export default useFocusManagement;






