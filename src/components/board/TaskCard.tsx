import "../../styles/main.css"

interface TaskCardProps{
    title: string;
}
export default function TaskCard({ title }: TaskCardProps) {
    return <div className="task-card">{title}</div>
}