export enum AppRoutes {
    Home = "/",
    Workspaces = "/workspaces",
    WorkspaceId = "/workspaces/:workspaceId",
}

export const getWorkspaceRoute = (workspaceId: string): string =>
    `/workspaces/${workspaceId}`;
