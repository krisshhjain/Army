import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, FileText, ArrowLeft } from 'lucide-react';

interface PDFViewerDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  pdfPath?: string;
  showBackButton?: boolean;
  onBack?: () => void;
}

const PDFViewerDialog: React.FC<PDFViewerDialogProps> = ({
  isOpen,
  onClose,
  title,
  pdfPath,
  showBackButton = false,
  onBack
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[95vh] w-[98vw] h-[95vh] p-0 flex flex-col">
        <DialogHeader className="px-6 py-4 border-b shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {showBackButton && onBack && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onBack}
                  className="h-8 w-8 p-0"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              )}
              <DialogTitle className="text-lg font-semibold">
                {title}
              </DialogTitle>
            </div>
          </div>
        </DialogHeader>
        
        <div className="flex-1 p-4 min-h-0 overflow-hidden">
          {pdfPath ? (
            <div className="w-full h-full border rounded-lg overflow-hidden">
              <iframe
                src={pdfPath}
                className="w-full h-full"
                title={title}
                style={{ border: 'none' }}
              />
            </div>
          ) : (
            <div className="flex items-center justify-center h-full bg-muted rounded-lg">
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
