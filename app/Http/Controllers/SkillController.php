<?php

namespace App\Http\Controllers;

use App\Models\Skill;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SkillController extends Controller
{
    public function index()
    {
        $skills = Skill::orderBy('display_type')
            ->orderBy('order')
            ->get()
            ->groupBy('display_type');

        return Inertia::render('admin/skills', [
            'skills' => $skills,
            'progressSkillsCount' => Skill::where('display_type', 'progress')->where('is_visible', true)->count(),
            'cardSkillsCount' => Skill::where('display_type', 'card')->where('is_visible', true)->count(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'proficiency' => 'required|integer|min:0|max:100',
            'category' => 'required|string|max:255',
            'display_type' => 'required|in:progress,card',
            'is_visible' => 'boolean',
        ]);

        $maxOrder = Skill::where('display_type', $validated['display_type'])->max('order') ?? 0;
        $skill = Skill::create([
            ...$validated,
            'order' => $maxOrder + 1,
        ]);

        return redirect()->back();
    }

    public function update(Request $request, Skill $skill)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'proficiency' => 'required|integer|min:0|max:100',
            'category' => 'required|string|max:255',
            'display_type' => 'required|in:progress,card',
            'is_visible' => 'boolean',
        ]);

        // If display type changed, adjust order
        if ($validated['display_type'] !== $skill->display_type) {
            $maxOrder = Skill::where('display_type', $validated['display_type'])->max('order') ?? 0;
            $validated['order'] = $maxOrder + 1;
        }

        $skill->update($validated);

        return redirect()->back();
    }

    public function destroy(Skill $skill)
    {
        $skill->delete();
        return redirect()->back();
    }

    public function reorder(Request $request)
    {
        $request->validate([
            'orderedIds' => 'required|array',
            'orderedIds.*' => 'integer',
            'display_type' => 'required|in:progress,card',
        ]);

        foreach ($request->orderedIds as $index => $id) {
            Skill::where('id', $id)
                ->where('display_type', $request->display_type)
                ->update(['order' => $index]);
        }

        return response()->json(['success' => true]);
    }

    public function toggleVisibility(Skill $skill)
    {
        // Check if we can toggle visibility based on display type limits
        if ($skill->is_visible) {
            $skill->update(['is_visible' => false]);
        } else {
            $visibleCount = Skill::where('display_type', $skill->display_type)
                ->where('is_visible', true)
                ->count();

            $maxVisible = $skill->display_type === 'progress' ? 5 : 6;

            if ($visibleCount >= $maxVisible) {
                return response()->json([
                    'success' => false,
                    'message' => "You can only show {$maxVisible} skills in the {$skill->display_type} section.",
                ], 422);
            }

            $skill->update(['is_visible' => true]);
        }

        return redirect()->back();
    }
} 