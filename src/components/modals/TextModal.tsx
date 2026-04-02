import { useState, type FC } from "react";
import { BaseModal } from "./BaseModal";

interface TextModalProps { 
    title: string;
    submitLabel: string;
    initialValue?: string;
    placeholder?: string;
    onClose: () => void;
    onSubmit: (value: string) => void;
    validate: (value: string) => string | null;
}

export const TextModal: FC<TextModalProps> =({
    title,
    submitLabel,
    initialValue = "",
    placeholder = "Enter text...",
    onClose,
    onSubmit,
    validate,
}) => {
    const [value, setValue] = useState(initialValue);
    const [error, setError] = useState("");

    function getValidationError(rawValue: string): string {
        const trimValue = rawValue.trim();

        if (!trimValue) {
            return "Field cannot be empty";
        }

        return validate(trimValue) ?? "";
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.currentTarget.value;
        setValue(newValue);

        if (error) {
            setError(getValidationError(newValue));
        }
    };

    const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();

        const validError = getValidationError(value);
        if (validError) {
            setError(validError);
            return;
        }

        const trimValue = value.trim();
        setError("");
        onSubmit(trimValue);
    };

    return (
        <BaseModal title={title} onClose={onClose} zIndex={1000}>
            <form onSubmit={handleSubmit} className="modal-form">
                <input
                    type="text"
                    value={value}
                    placeholder={placeholder}
                    onChange={handleChange}
                />
                {error && <p className="form-error">{error}</p>}
                <button type="submit">{submitLabel}</button>
            </form>
        </BaseModal>
    )
}
