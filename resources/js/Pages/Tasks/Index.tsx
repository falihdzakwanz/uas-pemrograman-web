import TaskModal from '@/Components/Modal/TaskModal/Index';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Task } from '@/types/Task';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

interface TasksProps {
    tasks: Task[];
}

export default function Tasks({ tasks }: TasksProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState<
        'create' | 'update' | 'delete' | null
    >(null);
    const [currentTask, setCurrentTask] = useState<Task | null>(null);

    const handleOpenModal = (
        type: 'create' | 'update' | 'delete',
        task: Task | null = null,
    ) => {
        setModalType(type);
        setCurrentTask(task);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentTask(null);
    };

    const handleFormSubmit = (data: Partial<Task>) => {
        if (modalType === 'create') {
            router.post('/tasks', data);
        } else if (modalType === 'update' && currentTask) {
            router.put(`/tasks/${currentTask.id}`, data);
        }
        handleCloseModal();
    };

    const handleDelete = () => {
        if (currentTask) {
            router.delete(`/tasks/${currentTask.id}`);
        }
        handleCloseModal();
    };

    return (
        <AuthenticatedLayout>
            <Head title="Task List" />
            <div className="mb-4 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-800">Task List</h1>
                <button
                    onClick={() => handleOpenModal('create')}
                    className="rounded bg-blue-500 px-4 py-2 text-white shadow hover:bg-blue-600"
                >
                    Create New Task
                </button>
            </div>
            <div className="overflow-x-auto rounded bg-white shadow">
                <table className="min-w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border-b border-gray-300 px-4 py-2 text-left">
                                Title
                            </th>
                            <th className="border-b border-gray-300 px-4 py-2 text-left">
                                Description
                            </th>
                            <th className="border-b border-gray-300 px-4 py-2 text-left">
                                Status
                            </th>
                            <th className="border-b border-gray-300 px-4 py-2 text-left">
                                Deadline
                            </th>
                            <th className="border-b border-gray-300 px-4 py-2 text-left">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((task) => (
                            <tr key={task.id} className="hover:bg-gray-50">
                                <td className="border-b border-gray-300 px-4 py-2">
                                    {task.title}
                                </td>
                                <td className="border-b border-gray-300 px-4 py-2">
                                    {task.description}
                                </td>
                                <td className="border-b border-gray-300 px-4 py-2 capitalize">
                                    {task.status.replace('_', ' ')}
                                </td>
                                <td className="border-b border-gray-300 px-4 py-2">
                                    {task.deadline
                                        ? task.deadline
                                        : 'No Deadline'}
                                </td>
                                <td className="border-b border-gray-300 px-4 py-2">
                                    <button
                                        onClick={() =>
                                            handleOpenModal('update', task)
                                        }
                                        className="mr-2 rounded bg-yellow-500 px-3 py-1 text-white shadow hover:bg-yellow-600"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleOpenModal('delete', task)
                                        }
                                        className="rounded bg-red-500 px-3 py-1 text-white shadow hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <TaskModal
                isOpen={isModalOpen}
                type={modalType}
                task={currentTask}
                onClose={handleCloseModal}
                onSubmit={handleFormSubmit}
                onDelete={handleDelete}
            />
        </AuthenticatedLayout>
    );
}
