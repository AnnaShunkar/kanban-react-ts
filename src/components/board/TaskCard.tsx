import "../../styles/main.css"

interface TaskCardProps {
    title: string;
    canMoveLeft: boolean;
    canMoveRight: boolean;
    onMoveLeft: () => void;
    onMoveRight: () => void;
}

export default function TaskCard({
    title,
    canMoveLeft,
    canMoveRight,
    onMoveLeft,
    onMoveRight,
}: TaskCardProps) {
    return (
        <div className="task-card">
            {canMoveLeft && (
                <button type="button" className="move-button" onClick={onMoveLeft}>
                    ←
                </button>
            )}
            <span className="task-card-title">{title}</span>
            {canMoveRight && (
                <button type="button" className="move-button" onClick={onMoveRight}>
                    →
                </button>
            )}
        </div>
    );
}
