import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useTasks } from "../../context/TaskContext";
import { useAuth } from "../../context/AuthContext";
import { useParams } from "react-router-dom";

const columns = [
  { key: "Pending", color: "secondary" },
  { key: "In Progress", color: "warning" },
  { key: "Completed", color: "success" }
];

const KanbanBoard = () => {
  const { id } = useParams(); // projectId
  const { tasks, updateTask } = useTasks();
  const { user } = useAuth();

  // Filter tasks by project
  const projectTasks = tasks[id] || [];

  // Role-based visibility
  const visibleTasks =
    user.role === "manager" || user.role === "admin"
      ? projectTasks
      : projectTasks.filter((t) => t.assigneeId === user.id || t.assigneeId?._id === user.id);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const taskId = result.draggableId;
    const newStatus = result.destination.droppableId;

    updateTask(taskId, { status: newStatus });
  };

  return (
    <div className="container-fluid mt-4">

      {/* Header */}
      <div className="mb-4">
        <h3 className="fw-bold">📌 Kanban Board</h3>
        <p className="text-muted">
          Drag tasks between columns to update their status
        </p>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="row g-3">

          {columns.map((col) => {
            const columnTasks = visibleTasks.filter(
              (t) => t.status === col.key
            );

            return (
              <div key={col.key} className="col-md-4">

                <div className="card shadow-sm border-0 h-100">

                  {/* Column Header */}
                  <div
                    className={`card-header text-white fw-semibold text-center bg-${col.color}`}
                  >
                    {col.key}
                    <span className="badge bg-light text-dark ms-2">
                      {columnTasks.length}
                    </span>
                  </div>

                  <Droppable droppableId={col.key}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="card-body"
                        style={{
                          minHeight: "350px",
                          background: snapshot.isDraggingOver
                            ? "#f8f9fa"
                            : "transparent",
                          transition: "background-color 0.2s ease"
                        }}
                      >
                        {columnTasks.map((task, index) => (
                          <Draggable
                            key={task._id}
                            draggableId={task._id.toString()}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="card mb-3 p-3 shadow-sm border-0"
                                style={{
                                  cursor: "grab",
                                  background: snapshot.isDragging
                                    ? "#e9ecef"
                                    : "#ffffff",
                                  ...provided.draggableProps.style
                                }}
                              >
                                {/* Task Title */}
                                <div className="fw-semibold mb-2">
                                  {task.title}
                                </div>

                                {/* Task Meta */}
                                <div className="d-flex justify-content-between align-items-center">
                                  <span className="badge bg-light text-dark">
                                    {task.assigneeId?.name || (task.assigneeId === user.id || task.assigneeId?._id === user.id ? user.name : "Unassigned")}
                                  </span>

                                  <span
                                    className={`badge bg-${col.color}`}
                                  >
                                    {task.status}
                                  </span>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}

                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>

                </div>
              </div>
            );
          })}

        </div>
      </DragDropContext>
    </div>
  );
};

export default KanbanBoard;
