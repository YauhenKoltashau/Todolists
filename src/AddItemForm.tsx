import React, {ChangeEvent, KeyboardEvent, useState} from "react"
import styles from "./App.module.css";

type AddItemFormPropsType = {
    name: string
    addItem: (title: string) => void
}

export const AddItemForm = (props: AddItemFormPropsType) => {
    const [newTitle, setNewTitle] = useState('')
    const [error, setError] = useState<string | null>(null)
    const onChangeNewTaskTitleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    const onKeyPressAddNewTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (newTitle.trim() === "") {
            return
        }
        if (e.key == 'Enter') {
            setNewTitle('');
            props.addItem(newTitle)
        }
    }
    const onClickButtonAddNewTaskHandler = () => {
        if (newTitle.trim() === "") {
            setError("Title is required")
            return
        }
        setNewTitle('');
        props.addItem(newTitle.trim())
    }
    return (
        <div>
            <input
                value={newTitle}
                onChange={onChangeNewTaskTitleInput}
                onKeyPress={onKeyPressAddNewTaskHandler}
            />

            <button
                onClick={onClickButtonAddNewTaskHandler}>{props.name}
            </button>
            {error && <div className={styles.errorMessage}>{error}</div>}
        </div>
    )
}