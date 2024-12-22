<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    //Fungsi untuk menampilkan daftar tasks dengan filter yang diambil dari session.
    public function index(Request $request)
    {
        // Cek apakah filter status sudah ada di session
        $statusFilter = session('status_filter', 'all'); // Default filter = 'all' jika tidak ada session filter
        
        // Jika ada query parameter status, simpan ke dalam session
        if ($request->has('status')) {
            $statusFilter = $request->get('status'); // Ambil nilai filter dari query string
            session(['status_filter' => $statusFilter]); // Simpan filter yang diterima di session
        }

        // Query untuk mengambil tasks yang terkait dengan user yang sedang login
        $tasksQuery = Auth::user()->tasks();

        // Jika filter status tidak 'all', terapkan filter berdasarkan status
        if ($statusFilter !== 'all') {
            $tasksQuery->where('status', $statusFilter); // Filter berdasarkan status task
        }

        // Ambil tasks yang sudah difilter
        $tasks = $tasksQuery->get();

        // Kembalikan tampilan Inertia dengan data tasks dan statusFilter yang sedang diterapkan
        return Inertia::render('Tasks/Index', [
            'tasks' => $tasks,
            'statusFilter' => $statusFilter, // Mengirimkan statusFilter ke frontend
        ]);
    }

    /**
     * Fungsi untuk menyimpan task baru ke dalam database
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|in:not_started,in_progress,completed',
            'deadline' => 'nullable|date',
        ]);

        Auth::user()->tasks()->create($validatedData);
        return redirect()->route('tasks.index')->with('message', 'Task created successfully');
    }

    /**
     * Fungsi untuk mengupdate data task
     */
    public function update(Request $request, Task $task)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|in:not_started,in_progress,completed',
            'deadline' => 'nullable|date',
        ]);

        $task->update($request->all());

        return redirect()->route('tasks.index')->with('message', 'Task updated successfully');
    }

    /**
     * Fungsi untuk menghapus task
     */
    public function destroy(Task $task)
    {
        $task->delete();
        return redirect()->route('tasks.index')->with('message', 'Task deleted successfully');
    }
}
