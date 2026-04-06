export enum AppRoute {
    HOME = "/",
    WORKSPACES = "/workspaces",
    WORKSPACE = "/workspaces/:workspaceId",
}

export const getWorkspaceRoute = (workspaceId: string): string =>
    AppRoute.WORKSPACE.replace(":workspaceId", workspaceId);
