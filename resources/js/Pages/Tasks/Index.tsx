import TaskModal from '@/Components/Modal/TaskModal/Index';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Task } from '@/types/Task';
import { Head, router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

interface TasksProps {
    tasks: Task[]; // Data awal tasks, diterima dari server saat rendering pertama
}

export default function Tasks({ tasks }: TasksProps) {
    // Ambil ID pengguna dari sesi atau authentication state (contoh disimpan dalam global context atau cookie)
    const userId = usePage().props.auth.user.id;

    // State untuk menyimpan daftar tasks
    const [taskList, setTaskList] = useState<Task[]>(tasks);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState<
        'create' | 'update' | 'delete' | null
    >(null);
    const [currentTask, setCurrentTask] = useState<Task | null>(null);
    const [statusFilter, setStatusFilter] = useState<string>('all');

    // Ambil parameter 'status' dari URL untuk menetapkan filter awal
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const status = urlParams.get('status');
        if (status) {
            setStatusFilter(status);
        }

        // Cek localStorage untuk task list berdasarkan userId
        const storedTasks = localStorage.getItem(`tasks-${userId}`);
        if (storedTasks) {
            setTaskList(JSON.parse(storedTasks));
        } else {
            fetchTasks(); // Jika tidak ada, ambil dari server
        }
    }, []);

    // Fungsi untuk mengambil daftar tasks dari server
    const fetchTasks = () => {
        router.get(
            '/tasks',
            { status: statusFilter },
            {
                onSuccess: (page: any) => {
                    const fetchedTasks = page.props.tasks;
                    setTaskList(fetchedTasks);

                    // Simpan task list ke localStorage berdasarkan user ID
                    localStorage.setItem(
                        `tasks-${userId}`,
                        JSON.stringify(fetchedTasks),
                    );
                },
            },
        );
    };

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
            router.post('/tasks', data, {
                onSuccess: () => fetchTasks(), // Refresh setelah create
            });
        } else if (modalType === 'update' && currentTask) {
            router.put(`/tasks/${currentTask.id}`, data, {
                onSuccess: () => fetchTasks(), // Refresh setelah update
            });
        }
        handleCloseModal();
    };

    const handleDelete = () => {
        if (currentTask) {
            router.delete(`/tasks/${currentTask.id}`, {
                onSuccess: () => fetchTasks(), // Refresh setelah delete
            });
        }
        handleCloseModal();
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedStatus = e.target.value;
        setStatusFilter(selectedStatus);

        // Update URL tanpa refresh halaman dan kirim permintaan baru dengan filter
        router.get(
            '/tasks',
            { status: selectedStatus },
            {
                onSuccess: (page: any) => {
                    const filteredTasks = page.props.tasks;
                    setTaskList(filteredTasks);

                    // Simpan filter results ke localStorage berdasarkan user ID
                    localStorage.setItem(
                        `tasks-${userId}`,
                        JSON.stringify(filteredTasks),
                    );
                },
            },
        );
    };

    return (
        <AuthenticatedLayout>
            <Head title="Task List" />
            <div className="mb-4 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-800">Task List</h1>

                <select
                    onChange={handleFilterChange}
                    value={statusFilter}
                    className="rounded border px-4 py-2 shadow-md"
                >
                    <option value="all">All Tasks</option>
                    <option value="not_started">Not Started</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>

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
                        <tr className="bg-blue-500 text-white">
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
                        {taskList.map((task) => (
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
                                    {task.deadline || 'No Deadline'}
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
