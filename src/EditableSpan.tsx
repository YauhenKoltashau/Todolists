import React, {ChangeEvent, useState} from "react";
type editModeType = boolean
type EditableSpanPropsType = {
    title: string
    editTitle:(title: string)=>void



}
export const EditableSpan = (props: EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState<editModeType>(false)
    let [title, setTitle] = useState(props.title)
    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)

    }
    const activateViewMode = () => {
        setEditMode(false)
        props.editTitle(title)



    }

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

        return editMode
            ? <input value={title} onChange={changeTitle} autoFocus onBlur={activateViewMode}/>
            : <span onDoubleClick={activateEditMode}>{title}</span>

    }