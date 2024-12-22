import { Task } from '@/types/Task';
import { useState } from 'react';

type TaskModalProps = {
    isOpen: boolean;
    type: 'create' | 'update' | 'delete' | null;
    task?: Task | null;
    onClose: () => void;
    onSubmit: (data: Omit<Task, 'id'>) => void;
    onDelete: () => void;
};

type StatusType = 'not_started' | 'in_progress' | 'completed';

const TaskModal: React.FC<TaskModalProps> = ({
    isOpen,
    type,
    task,
    onClose,
    onSubmit,
    onDelete,
}) => {
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    if (!isOpen) return null;

    const validateForm = (form: HTMLFormElement): boolean => {
        const title = (
            form.elements.namedItem('title') as HTMLInputElement
        ).value.trim();
        const description = (
            form.elements.namedItem('description') as HTMLTextAreaElement
        ).value.trim();
        const status = (form.elements.namedItem('status') as HTMLSelectElement)
            .value as StatusType;

        const newErrors: { [key: string]: string } = {};

        if (!title) {
            newErrors.title = 'Title is required.';
        }

        if (!description) {
            newErrors.description = 'Description is required.';
        }

        if (!['not_started', 'in_progress', 'completed'].includes(status)) {
            newErrors.status = 'Invalid status.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="w-96 rounded-lg bg-white p-6 shadow-lg">
                <h2 className="mb-4 text-xl font-semibold">
                    {type === 'create'
                        ? 'Create New Task'
                        : type === 'update'
                          ? 'Edit Task'
                          : 'Delete Task'}
                </h2>
                {type === 'create' || type === 'update' ? (
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            const form = e.target as HTMLFormElement;
                            if (validateForm(form)) {
                                const data = {
                                    title: (
                                        form.elements.namedItem(
                                            'title',
                                        ) as HTMLInputElement
                                    ).value.trim(),
                                    description: (
                                        form.elements.namedItem(
                                            'description',
                                        ) as HTMLTextAreaElement
                                    ).value.trim(),
                                    status: (
                                        form.elements.namedItem(
                                            'status',
                                        ) as HTMLSelectElement
                                    ).value as StatusType,
                                    deadline:
                                        (
                                            form.elements.namedItem(
                                                'deadline',
                                            ) as HTMLInputElement
                                        ).value || undefined,
                                };
                                onSubmit(data);
                            }
                        }}
                    >
                        <div className="mb-4">
                            <label className="mb-1 block">Title</label>
                            <input
                                type="text"
                                name="title"
                                defaultValue={
                                    type === 'update' ? task?.title : ''
                                }
                                className={`w-full rounded border px-4 py-2 ${
                                    errors.title ? 'border-red-500' : ''
                                }`}
                            />
                            {errors.title && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.title}
                                </p>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="mb-1 block">Description</label>
                            <textarea
                                name="description"
                                defaultValue={
                                    type === 'update' ? task?.description : ''
                                }
                                className={`w-full rounded border px-4 py-2 ${
                                    errors.description ? 'border-red-500' : ''
                                }`}
                            ></textarea>
                            {errors.description && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.description}
                                </p>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="mb-1 block">Status</label>
                            <select
                                name="status"
                                defaultValue={
                                    type === 'update'
                                        ? task?.status
                                        : 'not_started'
                                }
                                className={`w-full rounded border px-4 py-2 ${
                                    errors.status ? 'border-red-500' : ''
                                }`}
                            >
                                <option value="not_started">Not Started</option>
                                <option value="in_progress">In Progress</option>
                                <option value="completed">Completed</option>
                            </select>
                            {errors.status && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.status}
                                </p>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="mb-1 block">
                                Deadline (optional)
                            </label>
                            <input
                                type="date"
                                name="deadline"
                                defaultValue={
                                    type === 'update'
                                        ? task?.deadline || ''
                                        : ''
                                }
                                className="w-full rounded border px-4 py-2"
                            />
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="mr-2 rounded bg-blue-500 px-4 py-2 text-white shadow hover:bg-blue-600"
                            >
                                {type === 'create' ? 'Create' : 'Update'}
                            </button>
                            <button
                                type="button"
                                onClick={onClose}
                                className="rounded bg-gray-500 px-4 py-2 text-white shadow hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                ) : (
                    <div>
                        <p>Are you sure you want to delete this task?</p>
                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={onDelete}
                                className="mr-2 rounded bg-red-500 px-4 py-2 text-white shadow hover:bg-red-600"
                            >
                                Yes, Delete
                            </button>
                            <button
                                onClick={onClose}
                                className="rounded bg-gray-500 px-4 py-2 text-white shadow hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TaskModal;
