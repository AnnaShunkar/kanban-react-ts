
export function validWorkspaceTitle(title: string): string | null {
    const trimTitle = title.trim();
    if (!trimTitle) {
        return "Workspace name cannot be empty";
    };
    if (trimTitle.length < 5 || trimTitle.length > 30) {
        return "Workspace name must be between 5 and 30 characters";
    };
    if (/\d/.test(trimTitle)) {
        return "Workspace name cannot contain numbers";
    };
    if (!/^[a-z]+$/.test(trimTitle)) {
        return "Workspace name can't contain uppercase letters";
    };
    return null;
}
export function validColumnTitle(title: string): string | null {
    const trimTitle = title.trim();
    if (!trimTitle) {
        return "Column name cannot be empty";
    };
    if (trimTitle.length < 5 || trimTitle.length > 20) {
        return "Column name must be between 5 and 20 characters";
    };
    return null;
}
export function validTaskTitle(title: string): string | null {
    const trimTitle = title.trim();
    if (!trimTitle) {
        return "Task name cannot be empty";
    };
    return null;
}