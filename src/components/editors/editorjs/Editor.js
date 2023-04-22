//./components/Editor
import React, { memo, useEffect, useRef } from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import { EDITOR_TOOLS } from "./EditorTools";

const EditorBlock = ({ data, onChange, holder }) => {
    //add a reference to editor
    const ref = useRef();

    //initialize editorjs
    useEffect(() => {
        //initialize editor if we don't have a reference
        if (!ref.current) {
            const editor = new EditorJS({
                minHeight: 0,
                holder: holder,
                tools: EDITOR_TOOLS,
                inlineToolbar: true,
                autofocus: true,
                data,
                async onChange(api, event) {
                    const data = await api.saver.save();
                    onChange(data);
                },
            });
            ref.current = editor;
        }

        //add a return function handle cleanup
        return () => {
            if (ref.current && ref.current.destroy) {
                ref.current.destroy();
            }
        };
    }, []);

    return <div className="editor" id={holder} />;
};

export default memo(EditorBlock);