<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class MessageController extends Controller
{
    public function index()
    {
        $messages = Message::latest()
            ->select(['id', 'name', 'email', 'subject', 'created_at', 'read_at', 'replied_at', 'archived_at'])
            ->get()
            ->map(function ($message) {
                return [
                    'id' => $message->id,
                    'from' => $message->name,
                    'email' => $message->email,
                    'subject' => $message->subject,
                    'date' => $message->created_at->format('M d, Y'),
                    'status' => $message->status,
                ];
            });

        return Inertia::render('admin/messages', [
            'messages' => $messages,
            'counts' => [
                'all' => Message::count(),
                'unread' => Message::unread()->count(),
                'read' => Message::read()->count(),
                'replied' => Message::replied()->count(),
                'archived' => Message::archived()->count(),
            ],
        ]);
    }

    public function show(Message $message)
    {
        if (!$message->read_at) {
            $message->update(['read_at' => Carbon::now()]);
        }

        return response()->json([
            'message' => $message
        ]);
    }

    public function markAsRead(Message $message)
    {
        $message->update(['read_at' => Carbon::now()]);

        return back();
    }

    public function markAsUnread(Message $message)
    {
        $message->update(['read_at' => null]);

        return back();
    }

    public function reply(Message $message, Request $request)
    {
        $request->validate([
            'reply' => 'required|string'
        ]);

        // Here you would typically send the email reply
        // For now, we'll just mark it as replied
        $message->update([
            'replied_at' => Carbon::now()
        ]);

        return back();
    }

    public function archive(Message $message)
    {
        $message->update([
            'archived_at' => Carbon::now()
        ]);

        return back();
    }

    public function unarchive(Message $message)
    {
        $message->update([
            'archived_at' => null
        ]);

        return back();
    }

    public function destroy(Message $message)
    {
        $message->delete();

        return back();
    }
} 