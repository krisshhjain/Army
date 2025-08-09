import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, FileText } from 'lucide-react';

interface PDFViewerDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  pdfPath?: string;
}

const PDFViewerDialog: React.FC<PDFViewerDialogProps> = ({
  isOpen,
  onClose,
  title,
  pdfPath
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
  <DialogContent className="max-w-6xl max-h-[95vh] w-[95vw] p-0">
        <DialogHeader className="px-6 py-4 border-b">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-semibold">
              {title}
            </DialogTitle>
          </div>
        </DialogHeader>
        
        <div className="flex-1 p-6">
          {pdfPath ? (
            <div className="w-full h-[85vh] border rounded-lg overflow-hidden">
              <iframe
                src={pdfPath}
                className="w-full h-full"
                title={title}
                style={{ border: 'none' }}
              />
            </div>
          ) : (
            <div className="flex items-center justify-center h-[85vh] bg-muted rounded-lg">
              <div className="text-center">
                <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-muted-foreground mb-2">
                  PDF Not Available
                </h3>
                <p className="text-sm text-muted-foreground">
                  The PDF for this module will be added soon.
                </p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PDFViewerDialog;
