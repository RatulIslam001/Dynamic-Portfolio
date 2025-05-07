import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function Education() {
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-900">Education</h2>
                <Button className="bg-[#20B2AA] hover:bg-[#1a9994] text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Education
                </Button>
            </div>
            <Card className="border border-gray-200">
                <div className="p-6 text-center text-gray-500">
                    No education entries added yet. Click the button above to add your first education entry.
                </div>
            </Card>
        </div>
    );
} 