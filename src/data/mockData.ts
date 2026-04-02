import type { Workspace } from "../types/workspace";

export const mockWorkspaces: Workspace[] = [
    {
        id: "workspace-1",
        title: "Frontend",
        columns: [
            {
                id: "column-1",
                title: 'To do',
                tasks: [
                    { id: 'task-1', title: 'Create header' },
                    { id: 'task-2', title: 'Add routing' },
                ],
            },
            {
                id: "column-2",
                title: "In progress",
                tasks: [
                    { id: 'task-3', title: 'Create header' }
                ],
            },
            {
                id: "column-3",
                title: "Done",
                tasks: [
                    { id: 'task-4', title: 'Prepare mock data' }
                ],
            },
        ],
    },
];