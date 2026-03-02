import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { CheckCircle2, Circle, Clock, Plus, Trash2, ShieldAlert } from 'lucide-react';
import { cn } from '../utils/cn';
import type { UserRole } from '../components/Login';

type TaskStatus = 'To Do' | 'In Progress' | 'Completed';

interface Task {
    id: string;
    title: string;
    status: TaskStatus;
    created_at: string;
}

interface TasksSlideProps {
    role: UserRole;
}

export const TasksSlide: React.FC<TasksSlideProps> = ({ role }) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [errorMSG, setErrorMSG] = useState('');

    const isManager = role === 'manager';

    useEffect(() => {
        fetchTasks();

        // Subscribe to realtime changes
        const channel = supabase
            .channel('tasks_channel')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'tasks' }, (payload) => {
                if (payload.eventType === 'INSERT') {
                    setTasks(prev => [payload.new as Task, ...prev]);
                } else if (payload.eventType === 'UPDATE') {
                    setTasks(prev => prev.map(t => t.id === payload.new.id ? payload.new as Task : t));
                } else if (payload.eventType === 'DELETE') {
                    setTasks(prev => prev.filter(t => t.id !== payload.old.id));
                }
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const fetchTasks = async () => {
        try {
            const { data, error } = await supabase
                .from('tasks')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setTasks(data || []);
        } catch (err: any) {
            console.error('Error fetching tasks:', err.message);
            setErrorMSG('لم يتم الإتصال بقاعدة البيانات. (تأكد من إعدادات Supabase)');
            // For demo without DB:
            setTasks([
                { id: '1', title: 'مراجعة خطة النشر للأسبوع القادم', status: 'To Do', created_at: new Date().toISOString() },
                { id: '2', title: 'تصميم إعلان الفعالية التطوعية', status: 'In Progress', created_at: new Date().toISOString() },
                { id: '3', title: 'كتابة تقرير مسابقة اقرأ', status: 'Completed', created_at: new Date().toISOString() }
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const addTask = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTaskTitle.trim()) return;

        const tempId = Date.now().toString();
        const newTask = { id: tempId, title: newTaskTitle, status: 'To Do' as TaskStatus, created_at: new Date().toISOString() };

        // Optimistic UI updates
        setTasks(prev => [newTask, ...prev]);
        setNewTaskTitle('');

        try {
            const { error } = await supabase.from('tasks').insert([{ title: newTask.title, status: 'To Do' }]);
            if (error) throw error;
        } catch (err) {
            console.error('Error adding task:', err);
            // fallback for demo
        }
    };

    const updateStatus = async (id: string, currentStatus: TaskStatus) => {
        const nextStatus: Record<TaskStatus, TaskStatus> = {
            'To Do': 'In Progress',
            'In Progress': 'Completed',
            'Completed': 'To Do'
        };
        const newStatus = nextStatus[currentStatus];

        // Optimistic
        setTasks(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t));

        try {
            if (!id.includes(Date.now().toString().slice(0, 5))) { // means it's a real UUID from DB
                await supabase.from('tasks').update({ status: newStatus }).eq('id', id);
            }
        } catch (err) {
            console.error('Error updating task:', err);
        }
    };

    const deleteTask = async (id: string) => {
        setTasks(prev => prev.filter(t => t.id !== id));
        try {
            if (!id.includes(Date.now().toString().slice(0, 5))) {
                await supabase.from('tasks').delete().eq('id', id);
            }
        } catch (err) {
            console.error('Error deleting task', err);
        }
    };

    const getStatusIcon = (status: TaskStatus) => {
        if (status === 'Completed') return <CheckCircle2 className="text-green-500" />;
        if (status === 'In Progress') return <Clock className="text-secondary" />;
        return <Circle className="text-gray-400" />;
    };

    return (
        <div className="flex flex-col items-center min-h-full px-4 pt-12 pb-32">
            <div className="text-center mb-8">
                <h2 className="text-3xl md:text-5xl font-extrabold text-primary relative inline-block">
                    مهام الفريق
                    <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-1/2 h-1.5 bg-secondary rounded-full" />
                </h2>
            </div>

            {errorMSG && <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-6 text-sm">{errorMSG}</div>}

            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-4 md:p-8">
                {isManager ? (
                    <form onSubmit={addTask} className="flex gap-2 mb-8 relative">
                        <input
                            type="text"
                            value={newTaskTitle}
                            onChange={(e) => setNewTaskTitle(e.target.value)}
                            placeholder="أضف مهمة جديدة للفريق..."
                            className="flex-1 bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-secondary transition-colors font-bold"
                        />
                        <button
                            type="submit"
                            disabled={!newTaskTitle.trim()}
                            className="bg-primary hover:bg-secondary text-white p-3 rounded-xl transition-colors disabled:opacity-50 disabled:hover:bg-primary flex items-center justify-center min-w-[3rem]"
                        >
                            <Plus size={24} />
                        </button>
                    </form>
                ) : (
                    <div className="bg-primary/5 border-2 border-primary/10 p-4 rounded-xl mb-8 flex items-center gap-3">
                        <ShieldAlert className="text-primary/40" size={24} />
                        <p className="text-primary/60 text-sm font-bold">نمط العرض فقط: إضافة المهام متاحة للمشرفين.</p>
                    </div>
                )}

                <div className="flex flex-col gap-3">
                    {isLoading ? (
                        <div className="text-center text-gray-500 py-8">جاري التحميل...</div>
                    ) : tasks.length === 0 ? (
                        <div className="text-center text-gray-500 py-8">لا يوجد مهام حالية.</div>
                    ) : (
                        tasks.map(task => (
                            <div
                                key={task.id}
                                className={cn(
                                    "flex items-center justify-between p-4 rounded-xl border-2 transition-all group",
                                    task.status === 'Completed' ? "bg-green-50 border-green-200 opacity-80" : "bg-white border-gray-100 hover:border-secondary/50"
                                )}
                            >
                                <div className={cn("flex items-center gap-4 flex-1", isManager ? "cursor-pointer" : "cursor-default")} onClick={() => isManager && updateStatus(task.id, task.status)}>
                                    <div className="shrink-0 transition-transform hover:scale-110">
                                        {getStatusIcon(task.status)}
                                    </div>
                                    <span className={cn(
                                        "font-bold text-base md:text-lg transition-all line-clamp-2",
                                        task.status === 'Completed' ? "line-through text-gray-500" : "text-primary"
                                    )}>
                                        {task.title}
                                    </span>
                                </div>

                                <div className="flex items-center gap-3">
                                    <span className={cn(
                                        "text-xs font-bold px-2 py-1 rounded-md",
                                        task.status === 'Completed' ? "bg-green-100 text-green-700" :
                                            task.status === 'In Progress' ? "bg-yellow-100 text-yellow-700" : "bg-gray-100 text-gray-600"
                                    )}>
                                        {task.status === 'To Do' ? 'في الانتظار' : task.status === 'In Progress' ? 'قيد التنفيذ' : 'مكتملة'}
                                    </span>

                                    {isManager && (
                                        <button
                                            onClick={() => deleteTask(task.id)}
                                            className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-2"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};
